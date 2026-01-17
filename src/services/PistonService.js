
const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

export const PistonService = {
    /**
     * Executes code using Piston API
     * @param {string} language - e.g., 'python'
     * @param {string} code - The source code
     * @returns {Promise<{run: {stdout: string, stderr: string, output: string}, message?: string}>}
     */
    executeCode: async (language, code) => {
        try {
            const response = await fetch(PISTON_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: language,
                    version: "3.10.0", // Defaulting to Python 3.10 for now
                    files: [{ content: code }]
                })
            });

            if (!response.ok) {
                throw new Error("Failed to execute code");
            }

            return await response.json();
        } catch (error) {
            console.error("Piston Execution Error:", error);
            return { run: { stdout: "", stderr: error.message, output: error.message } };
        }
    },

    /**
     * Validates a dare by capturing stdout/stderr
     * @param {string} userCode 
     * @param {string} validationCode - Code that runs tests (asserts)
     * @returns {Promise<{passed: boolean, output: string}>}
     */
    validateDare: async (userCode, validationCode) => {
        // We append the validation code to the user code
        const fullCode = `${userCode}\n\n${validationCode}`;

        const result = await PistonService.executeCode('python', fullCode);

        // If stderr is empty and stdout contains what we expect (optional), or just no error
        // For simple challenges, if it executes without error (exit code 0), it passes.
        const isSuccess = !result.run.stderr && result.run.code === 0;

        return {
            passed: isSuccess,
            output: result.run.output
        };
    }
};
