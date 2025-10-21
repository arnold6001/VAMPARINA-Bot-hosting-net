'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [groupInvite, setGroupInvite] = useState('');
  const [bots, setBots] = useState<any[]>([]);
  const [referralLink, setReferralLink] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/');
    fetchBots();
    setReferralLink(`${window.location.origin}/?ref=${token}`);
  }, []);

  const fetchBots = async () => {
    const res = await fetch('/api/status', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (res.ok) setBots(await res.json());
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('session', file);
    const res = await fetch('/api/deploy-bot', { method: 'POST', body: formData, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (res.ok) {
      alert('Bot deployed permanently! 24/7 active with low latency.');
      fetchBots();
    }
  };

  const handleAddGroup = async () => {
    await fetch('/api/add-group', { method: 'POST', body: JSON.stringify({ invite: groupInvite }), headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` } });
    alert('Group added for hourly bumps & protection!');
    setGroupInvite('');
  };

  const shareReferral = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied! Earn VIP role at 100+ referrals.');
  };

  return (
    <div className="min-h-screen bg-vamp-bg p-8">
      <h1 className="text-3xl font-bold text-vamp-purple mb-8">Dashboard: Free Forever Hosting</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Deploy Bot */}
        <div className="vamp-card">
          <h2 className="text-xl mb-4">Deploy Bot (Permanent)</h2>
          <form onSubmit={handleDeploy} className="space-y-4">
            <label>Upload Session File (Any Type)</label>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full p-3 bg-gray-800 rounded" />
            <a href="http://arnoldchirchir.onrender.com" target="_blank" className="block text-blue-400 mb-4">📱 Get Session ID</a>
            <a href="https://github.com/arnold6001/VAMPARINA-V1" target="_blank" className="block text-green-400 mb-4">🔗 Fork Repo</a>
            <button type="submit" className="w-full bg-vamp-purple py-2 rounded">🚀 Deploy (Low Latency, DDoS Protected)</button>
          </form>
        </div>

        {/* Add Group for Bumps/Protection */}
        <div className="vamp-card">
          <h2 className="text-xl mb-4">Add Group for Hourly Bumps & Protection</h2>
          <input
            placeholder="Group Invite Link"
            value={groupInvite}
            onChange={(e) => setGroupInvite(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded mb-4"
          />
          <button onClick={handleAddGroup} className="w-full bg-green-600 py-2 rounded mb-4">📢 Add & Enable Auto-Bump/Protect</button>
          <p className="text-sm opacity-70">Zero-Trust Security | Auto-Moderation (Anti-Spam)</p>
        </div>

        {/* Bot Status Monitor */}
        <div className="vamp-card">
          <h2 className="text-xl mb-4">Bot Status (24/7 Forever)</h2>
          <ul className="space-y-2">
            {bots.map((bot) => (
              <li key={bot.id} className="flex justify-between">
                <span>Bot {bot.id.slice(0,8)}: {bot.status} (Latency: {bot.latency}ms)</span>
                <div>
                  <a href={`/logs/${bot.id}`} className="text-blue-400 mr-2">Logs</a>
                  <button onClick={() => fetch(`/api/protect-bot/${bot.id}`)} className="text-green-400">Protect</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Referrals & Community */}
        <div className="vamp-card">
          <h2 className="text-xl mb-4">Referrals (Unlock VIP Roles)</h2>
          <p>Your Referrals: {bots.length > 0 ? bots[0].user.referrals : 0}</p>
          <button onClick={shareReferral} className="w-full bg-yellow-600 py-2 rounded mt-4">Copy Referral Link</button>
          <p className="text-sm mt-4 opacity-70">Join Support Discord: <a href="https://discord.gg/katabump" className="text-blue-400">30k+ Members</a> | Instant Help</p>
        </div>
      </div>
      <p className="text-center mt-8 opacity-70">Auto-Updates Daily | DDoS Protected | Owned by Arnold Chirchir (arnoldkipruto193@gmail.com)</p>
    </div>
  );
}