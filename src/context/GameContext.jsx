import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameMasterService } from '../services/GameMasterService';
import { PistonService } from '../services/PistonService';
import { useGamification } from './GamificationContext';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const { user, awardXP } = useGamification();
    const [gameState, setGameState] = useState('LOBBY'); // LOBBY, SPINNING, VOTING, SHOWDOWN, RESULT
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [challenge, setChallenge] = useState(null);
    const [votes, setVotes] = useState({ truth: 0, dare: 0 });
    const [votingResult, setVotingResult] = useState(null); // New State
    const [roundLog, setRoundLog] = useState([]);

    // Initialize Game
    const startGame = () => {
        // Add User + 3 Bots
        const human = {
            ...user,
            name: user?.displayName || user?.name || "Player 1",
            isBot: false,
            score: 0,
            status: 'ready'
        };
        const bots = GameMasterService.bots.map(b => ({ ...b, isBot: true, score: 0, status: 'ready' }));
        const newPlayers = [human, ...bots];
        setPlayers(newPlayers);
        setGameState('SPINNING');
        setRoundLog(['Game Started! Spinning the wheel...']);

        // Trigger first spin
        spinWheel(newPlayers);
    };

    // Spin Wheel -> SELECTION
    const spinWheel = (currentPlayers) => {
        const pool = currentPlayers || players;
        setGameState('SPINNING');

        if (!pool || pool.length === 0) return;

        setTimeout(() => {
            const victim = pool[Math.floor(Math.random() * pool.length)];
            setCurrentPlayer(victim);
            setGameState('SELECTION');
            setRoundLog(prev => [...prev, `${victim.name} is the Chosen One!`]);

            // Bot Auto-Choice
            if (victim.isBot) {
                const choice = Math.random() > 0.5 ? 'truth' : 'dare';
                setTimeout(() => makeChoice(choice, victim), 2000);
            }
        }, 4000);
    };

    // Chosen One Makes Selection
    const makeChoice = (type, playerOverride = null) => {
        const activePlayer = playerOverride || currentPlayer;
        if (!activePlayer) return;

        // Pick a Challenger (Someone else)
        const others = players.filter(p => p.id !== activePlayer.id);
        const challenger = others.length > 0 ? others[Math.floor(Math.random() * others.length)] : { name: "The Squad" };

        setRoundLog(prev => [...prev, `${activePlayer.name} chose ${type.toUpperCase()}!`]);

        // Generate Challenge based on Choice
        const progress = JSON.parse(localStorage.getItem('pythonQuestProgress'));
        const newChallenge = GameMasterService.generateChallenge(type, progress);
        setChallenge(newChallenge);
        setGameState('SHOWDOWN');
    };



    // Submit Challenge (Piston Integration)
    const submitChallenge = async (submission) => {
        let success = false;
        let output = "";

        if (challenge.type === 'truth') {
            success = GameMasterService.validateTruth(submission, challenge);
        } else {
            // Dare: Piston Execution
            try {
                setRoundLog(prev => [...prev, `Compiling code on Piston...`]);
                const result = await PistonService.validateDare(submission, challenge.testCase);
                success = result.passed;
                output = result.output;
            } catch (e) {
                console.error("Piston Error", e);
                success = false;
                output = "Execution Failed";
            }
        }

        if (success) {
            setRoundLog(prev => [...prev, `Success! ${output ? `[${output}]` : ''} (+${challenge.xp} XP)`]);
            setPlayers(prev => prev.map(p => p.id === currentPlayer.id ? { ...p, score: p.score + challenge.xp } : p));
            if (!currentPlayer.isBot) awardXP(challenge.xp, `Survived ${challenge.type}`);
        } else {
            setRoundLog(prev => [...prev, `Failed. ${output ? `[${output}]` : ''} (-50 XP)`]);
            setPlayers(prev => prev.map(p => p.id === currentPlayer.id ? { ...p, score: Math.max(0, p.score - 50) } : p));
        }

        setTimeout(() => {
            setChallenge(null);
            setCurrentPlayer(null);
            spinWheel();
        }, 4000);
    };

    return (
        <GameContext.Provider value={{
            gameState,
            players,
            currentPlayer,
            challenge,
            roundLog,
            startGame,
            spinWheel,
            makeChoice,
            submitChallenge
        }}>
            {children}
        </GameContext.Provider>
    );
};
