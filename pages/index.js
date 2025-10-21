import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    setStatus(result.message);
    // Here, integrate with deployment service (e.g., Vercel API or Render webhook)
    // For now, simulate success
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-purple-400">VAMPARINA Bot Hosting Net</h1>
        <p className="text-xl text-center mb-4">Your one-stop panel for deploying and managing powerful WhatsApp bots powered by the VAMPARINA V1 framework.</p>
        <p className="text-center mb-8">Built with ❤️ by <strong>Arnold Chirchir</strong>. For support: <a href="mailto:arnoldkipruto193@gmail.com" className="text-purple-400 hover:underline">arnoldkipruto193@gmail.com</a></p>
        <p className="text-center mb-8 text-green-400 font-semibold">Bots hosted here are <strong>active 24/7</strong>!</p>
        <div className="text-center mb-8">
          <a href="https://github.com/arnold6001/VAMPARINA-V1" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block">
            Explore the Source Repository
          </a>
        </div>

        {/* Step 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Step 1: Get Your Session ID</h2>
          <p className="mb-4">To authenticate your bot, you need a session credentials file. Click below to generate it:</p>
          <button>
            onClick={() => window.open('http://arnoldchirchir.onrender.com', '_blank')} 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          
            Get Session ID
          </button>
          <p className="mt-2 text-sm text-gray-300">Scan QR with WhatsApp > Linked Devices, download creds.json.</p>
        </section>

        {/* Step 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Step 2: Upload & Deploy</h2>
          <p className="mb-4">Upload your creds.js (or .json) file. Your bot deploys instantly!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="credsFile" className="block text-sm font-medium text-gray-300">Select creds file:</label>
              <input 
                type="file" 
                id="credsFile" 
                name="credsFile" 
                accept=".js,.json" 
                required 
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-purple-500"
              />
            </div>
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Deploy Bot
            </button>
          </form>
          {status && <div id="status" className="mt-4 p-4 bg-green-800 rounded-lg">{status}</div>}
        </section>

        {/* Features */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Bot Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <li>• Tag all group members (.tagall)</li>
            <li>• Admin tools: Mute/Unmute, Warns</li>
            <li>• Games: Tic-Tac-Toe</li>
            <li>• TTS & Sticker Creator</li>
            <li>• Anti-Link Detection</li>
            <li>• And more – Fully Customizable!</li>
          </ul>
        </section>
      </div>
    </div>
  );
}