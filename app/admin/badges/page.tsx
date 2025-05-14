'use client';

import { useState } from 'react';

export default function BadgesPage() {
  const [badgeId, setBadgeId] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour enregistrer le badge (appel API vers le backend)
    console.log('Enregistrement badge:', { badgeId, userName });
    setBadgeId('');
    setUserName('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Gestion des badges RFID</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Enregistrer un nouveau badge</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="badgeId" className="block text-sm font-medium text-gray-700">
              ID du badge RFID
            </label>
            <input
              type="text"
              id="badgeId"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Scanner le badge..."
            />
          </div>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Nom de l&apos;utilisateur
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nom complet"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Statistiques</h2>
        <p className="text-2xl font-bold text-blue-600">128 badges enregistrés</p>
      </div>
    </div>
  );
}