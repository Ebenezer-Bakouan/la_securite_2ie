'use client';

import { useState } from 'react';

export default function RoomsPage() {
  const [roomName, setRoomName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour enregistrer la salle (appel API vers le backend)
    console.log('Nouvelle salle:', { roomName, capacity, openTime, closeTime });
    setRoomName('');
    setCapacity('');
    setOpenTime('');
    setCloseTime('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Gestion des salles</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Ajouter une salle</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
              Nom de la salle
            </label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex. Salle A101"
            />
          </div>
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacité (personnes)
            </label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex. 50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="openTime" className="block text-sm font-medium text-gray-700">
                Heure d&apos;ouverture
              </label>
              <input
                type="time"
                id="openTime"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="closeTime" className="block text-sm font-medium text-gray-700">
                Heure de fermeture
              </label>
              <input
                type="time"
                id="closeTime"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Ajouter
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Salles existantes</h2>
        <div className="mt-4 space-y-4">
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold">Salle A101</h3>
            <p>Capacité : 50 | Présents : 20</p>
            <p>Horaires : 08:00 - 18:00</p>
          </div>
          {/* Ajouter plus de salles dynamiquement */}
        </div>
      </div>
    </div>
  );
}