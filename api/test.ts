import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    console.log("🔥 TEST API HIT");
    return res.status(200).json({ status: "ok", message: "API is working!" });
}
