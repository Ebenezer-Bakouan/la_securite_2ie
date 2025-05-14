'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Key, Clock, Calendar, CheckCircle, XCircle, Filter, Menu, X, Home, Settings, BarChart2, Trash2 } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

// Composant Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-screen z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Image
              src="/logo2ie.png"
              alt="Université 2iE Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <div className="ml-4">
              <Link href="/admin" className="text-2xl font-bold tracking-tight text-white">
                La Sécurité 2iE
              </Link>
              <div className="flex space-x-2 mt-2">
                <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/admin"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Tableau de bord
            </Link>
            <Link
              href="/admin/rooms"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Nouvelles salles
            </Link>
            <Link
              href="/admin/settings"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Paramètres
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            >
              Tableau de bord
            </Link>
            <Link
              href="/admin/rooms"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            >
              Nouvelles salles
            </Link>
            <Link
              href="/admin/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            >
              Paramètres
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// Composant Footer
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 fixed bottom-0 left-0 w-screen z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/logo2ie.png"
              alt="Université 2iE Logo"
              width={60}
              height={60}
              className="object-contain mr-4"
            />
            <div>
              <p className="text-sm font-medium">
                © 2025 Institut International d'Ingénierie de l'Eau et de l'Environnement (2iE). Tous droits réservés.
              </p>
              <p className="text-sm">
                Contact :{' '}
                <a href="mailto:contact@2ie-edu.org" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  contact@2ie-edu.org
                </a>
              </p>
            </div>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.2ie-edu.org/support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Support
            </a>
            <a
              href="https://www.2ie-edu.org/documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Documentation
            </a>
            <a
              href="https://www.2ie-edu.org/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function RoomsPage() {
  const [roomName, setRoomName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName || !capacity || !openTime || !closeTime) {
      setMessage('Tous les champs sont obligatoires.');
      return;
    }
    console.log('Nouvelle salle:', { roomName, capacity, openTime, closeTime });
    setMessage('Salle ajoutée avec succès !');
    setTimeout(() => setMessage(null), 3000);
    setRoomName('');
    setCapacity('');
    setOpenTime('');
    setCloseTime('');
    setIsModalOpen(false);
  };

  const handleDelete = (roomName: string) => {
    console.log(`Supprimer la salle ${roomName}`);
    // Logique de suppression (simulation)
  };

  // Données fictives pour les salles existantes
  const existingRooms = [
    { name: 'Salle A101', capacity: 50, present: 20, open: '08:00', close: '18:00' },
    { name: 'Salle B202', capacity: 30, present: 15, open: '09:00', close: '17:00' },
    { name: 'Salle C303', capacity: 40, present: 25, open: '07:30', close: '19:00' },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
      `}</style>
      <Navbar />
      <div className="flex-1 pt-20 pb-32 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Gestion des salles</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Ajouter
            </button>
          </div>
          {message && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md text-center">
              {message}
            </div>
          )}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Salles existantes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Capacité</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Présents</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Horaires</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {existingRooms.map((room) => (
                    <tr key={room.name} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{room.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{room.present}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{room.open} - {room.close}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(room.name)}
                          className="text-red-600 hover:text-red-800 transition duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modale pour ajouter une salle */}
      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
            <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Ajouter une nouvelle salle
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
                        Nom de la salle
                      </label>
                      <input
                        type="text"
                        id="roomName"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Ex. Salle A101"
                        required
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
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Ex. 50"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="openTime" className="block text-sm font-medium text-gray-700">
                          Heure d'ouverture
                        </label>
                        <input
                          type="time"
                          id="openTime"
                          value={openTime}
                          onChange={(e) => setOpenTime(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          required
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
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                      >
                        Ajouter
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}