import type { VercelRequest, VercelResponse } from '@vercel/node';

// Use dynamic require for pdf-parse (CommonJS package in ESM context)
const pdfParse = require('pdf-parse');

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log("🔥 ROAST API INVOKED");

    // Set CORS headers for local development
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
        const { resumeBase64, jobDescription } = req.body;

        if (!resumeBase64 || !jobDescription) {
            return res.status(400).json({ error: 'Missing resume or job description' });
        }

        // 1. Decode PDF from Base64
        console.log("📄 Decoding PDF...");
        const pdfBuffer = Buffer.from(resumeBase64, 'base64');
        console.log(`📄 PDF Buffer Size: ${pdfBuffer.length} bytes`);

        // 2. Extract text from PDF
        console.log("📝 Parsing PDF...");
        let resumeText = "";
        try {
            const pdfData = await pdfParse(pdfBuffer);
            resumeText = pdfData.text;
            console.log(`✅ PDF Parsed: ${resumeText.length} characters`);
        } catch (pdfError: any) {
            console.error("❌ PDF Parse Error:", pdfError.message);
            return res.status(500).json({
                error: 'PDF parsing failed',
                details: pdfError.message
            });
        }

        if (!resumeText || resumeText.trim().length < 20) {
            return res.status(400).json({
                error: 'Could not extract meaningful text from the PDF.'
            });
        }

        // 3. Call OpenAI (CometAPI)
        const apiKey = process.env.COMET_API_KEY;
        if (!apiKey) {
            console.error("❌ Missing API Key");
            return res.status(500).json({ error: 'Server misconfiguration: Missing API key' });
        }

        console.log("🤖 Calling AI...");
        const systemPrompt = `You are a toxic, elite Hiring Manager. Compare the resume to the job description.
1. Roast the user (mean & funny, 2-3 paragraphs).
2. List exactly 5 missing keywords/skills.
Return valid JSON only: { "roast": "string", "missingKeywords": ["string"] }`;

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}` }
                ],
                response_format: { type: 'json_object' },
            }),
        });

        if (!openaiResponse.ok) {
            const errorText = await openaiResponse.text();
            console.error("❌ OpenAI Error:", errorText);
            return res.status(500).json({
                error: 'AI service failed',
                details: errorText.slice(0, 200)
            });
        }

        const aiData = await openaiResponse.json();
        console.log("✅ AI Response received");

        const content = aiData.choices?.[0]?.message?.content;
        if (!content) {
            return res.status(500).json({ error: 'Empty AI response' });
        }

        const result = JSON.parse(content);
        return res.status(200).json(result);

    } catch (error: any) {
        console.error("🔥 CRITICAL ERROR:", error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}
