import { pythonRoadmap } from '../data/pythonRoadmap';

// Simulated AI Generator
export const RoadmapGenerator = {
    generateRoadmap: (level) => {
        console.log("Generating roadmap for level:", level);

        if (!pythonRoadmap) {
            console.error("Critical Error: pythonRoadmap data is missing or undefined.");
            return null;
        }

        // Base templates based on level
        let newRoadmap = JSON.parse(JSON.stringify(pythonRoadmap)); // Deep copy

        if (!newRoadmap || !newRoadmap.phases) {
            console.error("Critical Error: Invalid roadmap structure.");
            return null;
        }

        if (level === 'Beginner') {
            // Full roadmap, standard pacing
            newRoadmap.title = "Python 3 Mastery: Foundations First";
            newRoadmap.description = "A comprehensive path starting from the absolute basics.";
        } else if (level === 'Intermediate') {
            // Compress Phase 1, focus on Phase 2 + Advanced topics
            newRoadmap.title = "Python 3 Mastery: Accelerated Track";
            newRoadmap.description = "Skipping the basics. Focusing on data structures and algorithms.";

            // Mark Phase 1 nodes as completed/skipped
            newRoadmap.phases[0].nodes.forEach(node => {
                node.status = 'completed'; // Auto-complete basics
            });
            // Unlock first node of Phase 2
            if (newRoadmap.phases[1] && newRoadmap.phases[1].nodes.length > 0) {
                newRoadmap.phases[1].nodes[0].status = 'unlocked';
            }
            // Add an 'Optimization' phase
            newRoadmap.phases.push({
                id: 'phase-3',
                title: 'Phase 3: Optimization & Scale',
                description: 'Advanced patterns and performance.',
                color: '#f59e0b',
                nodes: [
                    {
                        id: 'p3-1',
                        title: 'Generators & Iterators',
                        type: 'code',
                        status: 'locked',
                        xp: 600,
                        content: {
                            summary: "Memory efficient iteration using yield.",
                            codeSnippet: `def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1`,
                            task: "Refactor a large list processing function to use a generator.",
                            description: "Handling large datasets efficiently."
                        }
                    },
                    {
                        id: 'p3-2',
                        title: 'Decorators',
                        type: 'code',
                        status: 'locked',
                        xp: 700,
                        content: {
                            summary: "Modifying function behavior without changing its code.",
                            codeSnippet: `@time_it
def slow_function():
    time.sleep(1)`,
                            task: "Create a decorator that logs the execution time of a function.",
                            description: "Metaprogramming basics."
                        }
                    }
                ]
            });
        } else if (level === 'Advanced') {
            // System Design & Architecture focus
            newRoadmap.title = "Python 3 Mastery: Architect & Systems";
            newRoadmap.description = "High-level design, concurrency, and internals.";
            // Complete Phase 1 & 2
            newRoadmap.phases[0].nodes.forEach(n => n.status = 'completed');
            newRoadmap.phases[1].nodes.forEach(n => n.status = 'completed');

            // Add Advanced Phase as unlocked starting point
            newRoadmap.phases.push({
                id: 'phase-expert',
                title: 'Phase Expert: Concurrency & Internals',
                description: 'Mastering the GIL, Multiprocessing, and AsyncIO.',
                color: '#ec4899',
                nodes: [
                    {
                        id: 'ex-1',
                        title: 'AsyncIO & Event Loop',
                        type: 'code',
                        status: 'unlocked',
                        xp: 1000,
                        content: {
                            summary: "Asynchronous programming for high-concurrency I/O.",
                            codeSnippet: `import asyncio
async def main():
    print('Hello')
    await asyncio.sleep(1)
    print('World')`,
                            task: "Build an async web scraper that fetches 10 URLs concurrently.",
                            description: "Non-blocking code execution."
                        }
                    }
                ]
            });
        }

        return newRoadmap;
    },

    getNextRecommendation: (currentProgress, roadmapData) => {
        // Simple logic: Find first unlocked or locked node
        for (const phase of roadmapData.phases) {
            for (const node of phase.nodes) {
                if (currentProgress[node.id] === 'unlocked') {
                    return { node, reason: "Ready to start" };
                }
            }
        }
        return null;
    }
};
