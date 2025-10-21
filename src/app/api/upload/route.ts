import { NextRequest, NextResponse } from "next/server";
import nextConnect from "next-connect";

const handler = nextConnect<NextRequest, NextResponse>();

handler.post(async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Simulate file handling (in production, save to temp storage or process)
    // For now, validate it's JSON and return success
    const formData = await req.formData();
    const file = formData.get("creds") as File;
    if (!file || file.name !== "creds.json") {
      return res.status(400).json({ error: "Please upload creds.json" });
    }

    // Optional: Parse JSON to validate
    const text = await file.text();
    JSON.parse(text); // Throws if invalid JSON

    // In a full setup, you'd zip the repo + this file and trigger a deploy (e.g., via Vercel API or GitHub)
    return res.status(200).json({ message: "Upload successful! Bot deployed (simulated). Add to /session folder for full setup." });
  } catch (error) {
    return res.status(500).json({ error: "Invalid JSON in creds.json" });
  }
});

export { handler as POST };