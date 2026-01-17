/**
 * Service to handle communication with Google Gemini AI.
 * Supports both a secure backend proxy (production) and direct client-side calls (local development).
 */
export const GeminiService = {
    // Frontier Model Chain (Updated Jan 2026): Best -> High Performance -> Legacy
    MODEL_CHAIN: [
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-3-pro-preview', // Frontier Preview
        'gemini-1.5-pro',
        'gemini-1.0-pro'
    ],

    /**
     * Primary entry point to send a message to Gemini.
     */
    sendMessage: async function (message) {
        return this._executeWithFallback(message, 0);
    },

    /**
     * Internal execution with recursive fallback through the model chain.
     * @private
     */
    _executeWithFallback: async function (message, modelIndex) {
        const model = this.MODEL_CHAIN[modelIndex];
        if (!model) {
            return "Deep Grid Error: Even the latest Gemini 2.5 models are returning 'Not Found'. This almost certainly means your API Key is invalid or restricted. Please go to AI Studio, create a *NEW* API Key, and ensure you've enabled the 'Generative Language API'.";
        }

        console.log(`[GeminiService] Handshaking with model: ${model}`);

        // 1. Try Backend Proxy
        try {
            const proxyResponse = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: message, model })
            });

            if (proxyResponse.ok) {
                const data = await proxyResponse.json();
                return data.text;
            }
        } catch (e) { /* Proxy fail in dev */ }

        // 2. Client-Side Fallback
        const localKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!localKey) return "[CONFIG MISSING]: Add VITE_GEMINI_API_KEY to .env";

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${localKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: `System Context: You are a friendly coding tutor for COlearn. Answer concisely.\n\nUser: ${message}` }]
                    }]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const errMsg = data.error?.message || 'Unknown API Error';
                console.warn(`[GeminiService] Model ${model} returned: ${errMsg}`);

                // Fallback on availability errors
                if (errMsg.toLowerCase().includes("not found") || errMsg.toLowerCase().includes("not supported")) {
                    return this._executeWithFallback(message, modelIndex + 1);
                }

                throw new Error(errMsg);
            }

            return data.candidates?.[0]?.content?.parts?.[0]?.text || "Communication glitch. No response.";

        } catch (error) {
            console.error(`[GeminiService] Error with ${model}:`, error.message);
            // On any failure, try the next model just in case it's a transient or model-specific issue
            return this._executeWithFallback(message, modelIndex + 1);
        }
    }
};
