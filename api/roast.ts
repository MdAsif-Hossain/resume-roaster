import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
// @ts-ignore
import pdf from 'pdf-parse/lib/pdf-parse.js';

const openai = new OpenAI({
    apiKey: process.env.COMET_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { resumeBase64, jobDescription } = req.body;

        if (!resumeBase64 || !jobDescription) {
            return res.status(400).json({ error: 'Missing resume or job description' });
        }

        // Decode Base64 PDF
        const pdfBuffer = Buffer.from(resumeBase64, 'base64');

        // Parse PDF
        // pdf-parse might struggle with Buffer directly in some envs, but usually works
        const data = await pdf(pdfBuffer);
        const resumeText = data.text;

        if (!resumeText || resumeText.length < 50) {
            return res.status(400).json({ error: 'Could not extract text from resume (or it is too short).' });
        }

        const systemPrompt = `You are a toxic, elite Hiring Manager. Compare the resume to the job description. 
1. Roast the user (mean & funny). 
2. List 5 missing keywords. 
Return JSON: { roast: string, missingKeywords: string[] }`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // or user's preferred model, assuming gpt-4o or similar
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `RESUME: ${resumeText}\n\nJOB DESCRIPTION: ${jobDescription}` }
            ],
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;
        const result = JSON.parse(content || '{}');

        return res.status(200).json(result);

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
