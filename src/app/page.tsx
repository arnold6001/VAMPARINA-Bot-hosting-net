"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, Link } from "lucide-react"; // Add lucide-react for icons: npm install lucide-react

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("creds", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        // Reset form after success
        setFile(null);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
          VAMPARINA Bot Hosting Net
        </h1>
        <p className="text-xl opacity-90">Deploy your WhatsApp bot in seconds. 24/7 Uptime Powered by Vercel.</p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Repo Link Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" /> Repository
            </CardTitle>
            <CardDescription>Fork and customize your bot.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://github.com/arnold6001/VAMPARINA-V1" target="_blank" rel="noopener noreferrer">
                Go to GitHub Repo
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Get Session Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" /> Get Session ID
            </CardTitle>
            <CardDescription>Generate QR/Pair Code for creds.json.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" asChild>
              <a href="http://arnoldchirchir.onrender.com" target="_blank" rel="noopener noreferrer">
                Open WhatsApp Linker
              </a>
            </Button>
            <p className="text-sm opacity-75 mt-4 text-center">
              Scan QR or use pair code to generate your creds.json, then upload below.
            </p>
          </CardContent>
        </Card>

        {/* Upload Card */}
        <Card className="md:col-span-2 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" /> Upload Creds.json
            </CardTitle>
            <CardDescription>Upload your session file to deploy. Bots stay active 24/7.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="creds">Select creds.json</Label>
              <Input
                id="creds"
                type="file"
                accept=".json"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-pink-500 file:to-purple-600 file:text-white hover:file:from-pink-600 hover:file:to-purple-700"
              />
            </div>
            <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
              {uploading ? (
                <>Uploading...</>
              ) : success ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" /> Deployed Successfully!
                </>
              ) : (
                "Deploy Bot"
              )}
            </Button>
            {success && (
              <p className="text-green-400 text-sm text-center">
                Your bot is now live 24/7! Fork the repo, add this file to /session, and host on Render/Replit.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer Credits */}
      <footer className="mt-12 text-center opacity-75">
        <p>Created by <strong>Arnold Chirchir</strong> | Contact: <a href="mailto:arnoldkipruto193@gmail.com" className="underline">arnoldkipruto193@gmail.com</a></p>
        <p className="text-sm mt-2">© 2025 VAMPARINA Bot Hosting. All rights reserved.</p>
      </footer>
    </div>
  );
}