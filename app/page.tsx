'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>('');

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.name === 'creds.json' && file.type === 'application/json') {
      setUploadedFile(file);
      setValidationMessage('File uploaded successfully! Now follow the deployment steps below.');
    } else {
      setValidationMessage('Invalid file. Please upload creds.json (JSON format).');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">VAMPARINA Bot Hosting Net</h1>
        <p className="text-xl">Host your WhatsApp group management bot easily. Bots run 24/7 on reliable platforms!</p>
        <p className="mt-4">Owner: Arnold Chirchir</p>
        <p>Company Email: arnoldkipruto193@gmail.com</p>
      </header>

      <section className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">Linked to Repository</h2>
        <p>Our bot is based on the open-source VAMPARINA-V1 repo. Fork it to get started!</p>
        <a 
          href="https://github.com/arnold6001/VAMPARINA-V1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded text-white"
        >
          View & Fork Repo
        </a>
      </section>

      <section className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">Get Session ID</h2>
        <p>Click below to get your pairing code or QR for linking WhatsApp (no scanning needed if using pair code).</p>
        <a 
          href="http://arnoldchirchir.onrender.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
        >
          Get Session ID
        </a>
      </section>

      <section className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Upload creds.json to Deploy</h2>
        <p>Upload your creds.json file (generated from the session linker above). We'll validate it here, then guide you to deploy.</p>
        <div 
          {...getRootProps()} 
          className="border-2 border-dashed border-purple-500 p-8 text-center cursor-pointer rounded mt-4"
        >
          <input {...getInputProps()} />
          <p>Drag & drop creds.json here, or click to select.</p>
        </div>
        {validationMessage && <p className="mt-4 text-lg">{validationMessage}</p>}
        {uploadedFile && (
          <div className="mt-6">
            <h3 className="text-2xl mb-2">Deployment Steps:</h3>
            <ol className="list-decimal pl-6">
              <li>Fork the repo above.</li>
              <li>Create a new folder called "session" in your forked repo.</li>
              <li>Upload your creds.json to the session folder and commit.</li>
              <li>Deploy to a 24/7 host like Render (render.com): Create a new Node.js service, link your GitHub repo, and set environment vars if needed.</li>
              <li>Run `npm install` and `node index.js` on the host. Your bot will be active 24/7!</li>
            </ol>
            <p className="mt-4">Note: For production, ensure compliance with WhatsApp terms to avoid bans.</p>
          </div>
        )}
      </section>

      <footer className="mt-12 text-center">
        <p>&copy; 2025 VAMPARINA Bot Hosting Net. All rights reserved.</p>
      </footer>
    </div>
  );
}