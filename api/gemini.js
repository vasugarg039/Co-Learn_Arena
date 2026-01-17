export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, model = 'gemini-1.5-flash' } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server misconfiguration: API Key missing' });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: `System Context: You are a friendly coding tutor.\n\nUser: ${prompt}` }]
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Forward the specific error so the client can decide whether to fallback
            return res.status(response.status).json({
                error: data.error?.message || 'Gemini API Error',
                code: data.error?.status || 'UNKNOWN'
            });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
