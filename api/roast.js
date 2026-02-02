// Plain JavaScript serverless function for Vercel
export default async function handler(req, res) {
    console.log("🔥 ROAST API INVOKED - Method:", req.method);

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log("📦 Parsing body...");
        const { resumeBase64, jobDescription } = req.body;

        if (!resumeBase64 || !jobDescription) {
            console.log("❌ Missing data");
            return res.status(400).json({ error: 'Missing resume or job description' });
        }

        console.log("📄 Got resume data, length:", resumeBase64.length);

        // For now, skip PDF parsing - just acknowledge the upload
        const resumeText = `[Resume uploaded: ${resumeBase64.length} characters]`;

        // Check API key
        const apiKey = process.env.COMET_API_KEY;
        if (!apiKey) {
            console.log("❌ No API key");
            return res.status(500).json({ error: 'Missing COMET_API_KEY in environment' });
        }

        console.log("🤖 Calling CometAPI...");
        console.log("API Key present:", apiKey ? "Yes (length: " + apiKey.length + ")" : "No");

        const systemPrompt = `You are a toxic, elite Hiring Manager. 

        **INPUT CONTEXT:**
        - Resume Text: (Provided below)
        - Target Job: (Provided below)
        - Candidate Location: ${req.body.currentLocation}
        - Target Country: ${req.body.targetCountry}

        **TASK:**
        1. **Roast**: Write a brutal, funny, toxic critique (2 paragraphs). Mention their location stupidity if they are applying for an on-site job abroad without visa support.
        2. **Suggestions**: Provide genuinely helpful advice to fix their application, but keep a slightly condescending tone.
        
        **OUTPUT FORMAT (JSON ONLY):**
        {
            "roast": "string (brutal feedback)",
            "missingKeywords": ["skill1", "skill2"],
            "suggestions": [
                { "title": "Visa Reality", "content": "string (explain if they have a chance or are delusional)" },
                { "title": "Resume Formatting", "content": "string (feedback on structure/length)" },
                { "title": "Skill Gaps", "content": "string (what to learn)" },
                { "title": "Action Plan", "content": "string (what to do next)" }
            ]
        }`;

        // CometAPI endpoint (OpenAI-compatible)
        const response = await fetch('https://api.cometapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `JOB DESCRIPTION:\n${jobDescription}\n\nNote: Resume parsing is being debugged, so roast based on the job requirements.` }
                ],
                response_format: { type: 'json_object' },
            }),
        });

        console.log("📡 OpenAI response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log("❌ OpenAI error:", errorText.slice(0, 300));
            return res.status(500).json({ error: 'AI request failed', details: errorText.slice(0, 300) });
        }

        const data = await response.json();
        console.log("✅ Got AI response");

        const content = data.choices?.[0]?.message?.content;
        if (!content) {
            return res.status(500).json({ error: 'Empty AI response' });
        }

        const result = JSON.parse(content);
        console.log("✅ Returning result");
        return res.status(200).json(result);

    } catch (error) {
        console.error("🔥 ERROR:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
