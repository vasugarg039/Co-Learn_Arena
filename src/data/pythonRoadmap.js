export const pythonRoadmap = {
    id: 'python-mastery',
    title: 'Python 3 Mastery: From Zero to Hero',
    description: 'Embark on a structured journey to master Python. Unlock nodes, complete challenges, and earn badges.',
    phases: [
        {
            id: 'phase-1',
            title: 'Phase 1: Foundations (Week 1-2)',
            description: 'Building the bedrock of your coding skills.',
            color: '#6366f1', // Indigo
            nodes: [
                {
                    id: 'p1-1',
                    title: 'What is Python?',
                    type: 'video',
                    status: 'unlocked', // First node is open
                    xp: 50,
                    content: {
                        summary: "Python is a high-level, interpreted language known for readability. Used in Web Dev, AI, Data Science, and Automation.",
                        videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8", // Placeholder
                        task: "Install Python and check version in terminal: `python --version`",
                        description: "Understanding the ecosystem and setting up your environment is the first step."
                    }
                },
                {
                    id: 'p1-2',
                    title: 'Variables & Data Types',
                    type: 'code',
                    status: 'locked',
                    xp: 100,
                    content: {
                        summary: "Variables are containers for storing data values. Common types: int, float, str, bool.",
                        codeSnippet: `name = "Cadet"
age = 25
is_active = True
print(f"User {name} is {age} years old.")`,
                        task: "Create variables for your name, squad name, and level, then print them.",
                        description: "Learn how to store and manipulate basic data."
                    }
                },
                {
                    id: 'p1-3',
                    title: 'Input & Output',
                    type: 'code',
                    status: 'locked',
                    xp: 100,
                    content: {
                        summary: "Interact with the user using input() and show results with print().",
                        codeSnippet: `user_input = input("Enter command: ")
print(f"Executing {user_input}...")`,
                        task: "Write a script that asks for a user's favorite color and prints a personalized message.",
                        description: "Making your programs interactive."
                    }
                },
                {
                    id: 'p1-4',
                    title: 'Operators',
                    type: 'quiz',
                    status: 'locked',
                    xp: 150,
                    content: {
                        summary: "Arithmetic (+, -, *, /), Relational (==, !=, >), and Logical (and, or, not) operators.",
                        codeSnippet: `score = 85
passed = score > 50 and score < 100`,
                        task: "Create a simple calculator that adds two numbers input by the user.",
                        description: "Performing operations on data."
                    }
                },
                {
                    id: 'p1-5',
                    title: 'Control Flow (If/Else)',
                    type: 'logic',
                    status: 'locked',
                    xp: 200,
                    content: {
                        summary: "Making decisions in code using if, elif, and else statements.",
                        codeSnippet: `energy = 80
if energy > 50:
    print("Ready for mission!")
else:
    print("Recharge required.")`,
                        task: "Build a number guessing game where the user has to guess a secret number.",
                        description: "Directing the flow of execution."
                    }
                },
                {
                    id: 'p1-6',
                    title: 'Loops (For & While)',
                    type: 'logic',
                    status: 'locked',
                    xp: 250,
                    content: {
                        summary: "Repeating actions efficiently. For loops iterate over sequences; While loops run while a condition is true.",
                        codeSnippet: `for i in range(5):
    print(f"Iteration {i}")`,
                        task: "Write a program that prints a pyramid pattern of stars.",
                        description: "Automating repetitive tasks."
                    }
                }
            ]
        },
        {
            id: 'phase-2',
            title: 'Phase 2: Core Concepts (Week 3-4)',
            description: 'Dive deeper into data structures and modular programming.',
            color: '#10b981', // Emerald
            nodes: [
                {
                    id: 'p2-1',
                    title: 'Lists & Tuples',
                    type: 'structure',
                    status: 'locked',
                    xp: 300,
                    content: {
                        summary: "Lists are mutable sequences; Tuples are immutable. Essential for storing collections.",
                        codeSnippet: `squad = ["Alex", "Sam", "Jordan"]
squad.append("Taylor")
print(squad[0])`,
                        task: "Create a shopping list manager where users can add and remove items.",
                        description: "Managing ordered collections of data."
                    }
                },
                {
                    id: 'p2-2',
                    title: 'Dictionaries & Sets',
                    type: 'structure',
                    status: 'locked',
                    xp: 350,
                    content: {
                        summary: "Dictionaries store key-value pairs. Sets store unique elements.",
                        codeSnippet: `user = {"name": "Alex", "xp": 1200}
print(user["xp"])`,
                        task: "Build a simple phonebook application using a dictionary.",
                        description: "Mapping data and handling uniqueness."
                    }
                },
                {
                    id: 'p2-3',
                    title: 'Functions',
                    type: 'function',
                    status: 'locked',
                    xp: 400,
                    content: {
                        summary: "Reusable blocks of code. Learn about arguments, return values, and scope.",
                        codeSnippet: `def greet(name):
    return f"Welcome, {name}!"

print(greet("Cadet"))`,
                        task: "Write a function `is_prime(n)` that returns True if a number is prime.",
                        description: "Writing modular, reusable code."
                    }
                },
                {
                    id: 'p2-4',
                    title: 'File Handling',
                    type: 'io',
                    status: 'locked',
                    xp: 450,
                    content: {
                        summary: "Reading from and writing to files (I/O operations).",
                        codeSnippet: `with open("log.txt", "w") as f:
    f.write("System Online")`,
                        task: "Create a note-taking app that saves notes to a text file.",
                        description: "Persisting data to storage."
                    }
                },
                {
                    id: 'p2-5',
                    title: 'Exception Handling',
                    type: 'safety',
                    status: 'locked',
                    xp: 500,
                    content: {
                        summary: "Handling errors gracefully using try, except, and finally blocks.",
                        codeSnippet: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")`,
                        task: "Modify your calculator to handle invalid inputs without crashing.",
                        description: "Building robust, crash-proof applications."
                    }
                }
            ]
        }
    ]
};
