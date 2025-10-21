'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      // Set JWT in localStorage/cookie
      const { token } = await res.json();
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } else {
      alert('Auth failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vamp-dark via-black to-vamp-purple flex items-center justify-center p-4">
      <div className="vamp-card max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-vamp-purple mb-2">🧛‍♀️ VAMPARINA</h1>
          <p className="text-xl opacity-90">Bot Hosting Net</p>
          <p className="text-sm opacity-70">Free Forever WhatsApp Bot Hosting. Low Latency, DDoS Protected, Auto-Updates.</p>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-vamp-purple rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-vamp-purple rounded-lg"
            required
          />
          <button type="submit" className="w-full bg-vamp-purple hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4 text-vamp-purple underline">
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
        {/* Owner Info */}
        <div className="vamp-card p-4 text-center text-sm opacity-70 mt-8">
          <p><strong>Owner:</strong> Arnold Chirchir</p>
          <p><strong>Email:</strong> arnoldkipruto193@gmail.com</p>
          <a href="https://discord.gg/katabump" className="text-blue-400">Join Community Discord (30k+ Members)</a>
        </div>
      </div>
    </div>
  );
}