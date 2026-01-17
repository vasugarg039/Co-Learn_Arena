import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        xp: 0,
        level: 1,
        streak: 1,
        badges: [],
        currentTitle: 'Novice',
        coins: 100,
        energy: 100,
        maxEnergy: 100,
        lastEnergyRefill: Date.now(),
        activityLog: [] // tracks dates of activity (e.g., "DOC-2023-10-27")
    });

    // Updated Daily Challenge State with Quiz
    const [dailyChallenge, setDailyChallenge] = useState({
        text: "Explain stack vs heap in 3 lines",
        completed: false,
        xp: 150,
        coins: 50,
        quizQuestion: "Which memory region is automatically managed by the CPU?",
        options: ["Heap", "Stack", "Hard Drive", "Cloud"],
        correctAnswer: "Stack"
    });

    const [rewardQueue, setRewardQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Energy Refill Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => {
                if (prev.energy < prev.maxEnergy) {
                    const newEnergy = Math.min(prev.maxEnergy, prev.energy + 1);
                    return { ...prev, energy: newEnergy };
                }
                return prev;
            });
        }, 60000); // 1 energy per minute

        return () => clearInterval(interval);
    }, []);

    // Auth & stats sync
    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && db) {
                const userRef = doc(db, 'users', currentUser.uid);
                const unsubscribeStats = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setStats(prev => ({
                            ...prev,
                            ...data,
                            energy: data.energy ?? prev.energy,
                            coins: data.coins ?? prev.coins,
                            activityLog: data.activityLog || prev.activityLog || []
                        }));
                    }
                    setLoading(false);
                });
                return () => unsubscribeStats();
            } else {
                setStats({ xp: 0, level: 1, streak: 1, badges: [], currentTitle: 'Novice', coins: 100, energy: 100, maxEnergy: 100, activityLog: [] });
                setLoading(false);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    const playSound = (type) => {
        if (!soundEnabled) return;
        console.log(`[SFX] Playing: ${type}`);
    };

    const addReward = (reward) => {
        setRewardQueue(prev => [...prev, { id: Date.now(), ...reward }]);
    };

    const clearReward = (id) => {
        setRewardQueue(prev => prev.filter(r => r.id !== id));
    };

    const awardXP = async (amount, reason, coinsEarned = 0) => {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);

        try {
            const today = new Date().toISOString().split('T')[0];
            const newXP = stats.xp + amount;
            const newLevel = 1 + Math.floor(newXP / 1000);

            const updateData = {
                xp: increment(amount),
                coins: increment(coinsEarned),
                activityLog: arrayUnion(today)
            };

            if (newLevel > stats.level) {
                updateData.level = newLevel;
                addReward({ type: 'levelup', message: `Leveled Up to ${newLevel}!` });
                playSound('levelup');
            } else {
                addReward({ type: 'xp', message: `+${amount} XP: ${reason}` });
                if (coinsEarned > 0) {
                    addReward({ type: 'coins', message: `+${coinsEarned} Coins earned!` });
                }
                playSound('xp');
            }

            await updateDoc(userRef, updateData);

            // Optimistic UI update for immediate feedback
            setStats(prev => ({
                ...prev,
                xp: prev.xp + amount,
                level: newLevel > prev.level ? newLevel : prev.level,
                coins: prev.coins + coinsEarned,
                activityLog: prev.activityLog.includes(today) ? prev.activityLog : [...prev.activityLog, today]
            }));

        } catch (error) {
            console.error("Failed to award XP:", error);
        }
    };

    const consumeEnergy = async (amount) => {
        if (!user || stats.energy < amount) return false;

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                energy: stats.energy - amount,
                lastEnergyRefill: Date.now()
            });
            return true;
        } catch (error) {
            console.error("Failed to consume energy:", error);
            return false;
        }
    };

    const unlockBadge = async (badgeId, badgeName, icon) => {
        if (!user || !db) return;
        const userRef = doc(db, 'users', user.uid);

        try {
            const badge = { id: badgeId, name: badgeName, icon, unlockedAt: new Date().toISOString() };
            await updateDoc(userRef, {
                badges: arrayUnion(badge)
            });
            addReward({ type: 'badge', message: `Achievement Unlocked: ${badgeName}!` });
            playSound('badge');
        } catch (error) {
            console.error("Failed to unlock badge:", error);
        }
    };

    // New Quiz-Based Completion Logic
    const completeDailyChallenge = async (userAnswer) => {
        if (dailyChallenge.completed) return { success: true, message: "Already completed!" };

        if (userAnswer === dailyChallenge.correctAnswer) {
            setDailyChallenge(prev => ({ ...prev, completed: true }));
            await awardXP(dailyChallenge.xp, "Daily Mission Ace", dailyChallenge.coins);
            return { success: true, message: "Correct! Mission Complete." };
        } else {
            return { success: false, message: "Incorrect. Try again!" };
        }
    };

    const toggleSound = () => setSoundEnabled(!soundEnabled);

    return (
        <GamificationContext.Provider value={{
            stats,
            awardXP,
            consumeEnergy,
            unlockBadge,
            dailyChallenge,
            completeDailyChallenge,
            rewardQueue,
            clearReward,
            soundEnabled,
            toggleSound,
            loading,
            user
        }}>
            {children}
        </GamificationContext.Provider>
    );
};
