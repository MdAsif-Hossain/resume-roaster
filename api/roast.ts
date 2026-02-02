import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log("🔥 ROAST API INVOKED - Method:", req.method);

    // CORS
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

        // Skip PDF parsing for now - just use the base64 length as a placeholder
        const resumeText = `[Resume uploaded: ${resumeBase64.length} characters of base64 data]`;

        // Check API key
        const apiKey = process.env.COMET_API_KEY;
        if (!apiKey) {
            console.log("❌ No API key");
            return res.status(500).json({ error: 'Missing COMET_API_KEY in environment' });
        }

        console.log("🤖 Calling OpenAI...");
        const systemPrompt = `You are a toxic, elite Hiring Manager. Based on the job description provided, generate a funny roast about a generic resume. Be mean but funny.
Return valid JSON only: { "roast": "your roast here", "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"] }`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `JOB DESCRIPTION:\n${jobDescription}\n\n(Resume was uploaded but parsing is being debugged)` }
                ],
                response_format: { type: 'json_object' },
            }),
        });

        console.log("📡 OpenAI response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log("❌ OpenAI error:", errorText);
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

    } catch (error: any) {
        console.error("🔥 ERROR:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
