import { pythonRoadmap } from '../data/pythonRoadmap';

export const GameMasterService = {
    // Mock bot personalities
    bots: [
        { id: 'bot-1', name: 'Alex_AI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', personality: 'aggressive' },
        { id: 'bot-2', name: 'Sam_AI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', personality: 'analytical' },
        { id: 'bot-3', name: 'Jordan_AI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', personality: 'random' }
    ],

    generateChallenge: (type, progress) => {
        // 1. Identify unlocked topics
        const unlockedNodes = [];
        if (pythonRoadmap && pythonRoadmap.phases) {
            pythonRoadmap.phases.forEach(phase => {
                phase.nodes.forEach(node => {
                    if (progress && (progress[node.id] === 'completed' || progress[node.id] === 'unlocked')) {
                        unlockedNodes.push(node);
                    }
                });
            });
        }

        // Fallback if nothing unlocked
        if (unlockedNodes.length === 0) {
            unlockedNodes.push({ title: "Python Basics" }); // Fallback
        }

        // 2. Pick a random topic
        const topic = unlockedNodes[Math.floor(Math.random() * unlockedNodes.length)];

        if (type === 'truth') {
            return {
                type: 'truth',
                topic: topic.title,
                question: `Explain the concept of "${topic.title}" and give an example.`,
                options: [
                    "It is a way to store data.",
                    "It is a control flow structure.",
                    "It is a function definition.",
                    "It is a fundamental concept."
                ],
                correctAnswer: 0,
                xp: 100
            };
        } else {
            // Dare (Piston Compatible)
            return {
                type: 'dare',
                topic: topic.title,
                instruction: `Write a Python function named 'solution' that prints "Hello ${topic.title}".`,
                starterCode: `def solution():\n    # Print "Hello ${topic.title}"\n    pass`,
                testCase: `import sys\nfrom io import StringIO\n\n_captured_stdout = StringIO()\nsys.stdout = _captured_stdout\n\nsolution()\n\noutput = _captured_stdout.getvalue().strip()\nassert output == "Hello ${topic.title}"`,
                xp: 200
            };
        }
    },

    // Piston handles validation now
    validateTruth: (answerIndex, challenge) => {
        return answerIndex === challenge.correctAnswer;
    }
};
