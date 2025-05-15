'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, Calendar, CheckCircle, XCircle, Filter, Menu, X, Home, ClipboardList, PlusCircle, Eye } from 'lucide-react';
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
              <Link href="/home" className="text-2xl font-bold tracking-tight text-white">
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
              href="/home"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Accueil
            </Link>
            <Link
              href="/make-request"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Faire une demande
            </Link>
            <Link
              href="/my-requests"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Mes demandes
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
              href="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            >
              Accueil
            </Link>
            <Link
              href="/make-request"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            >
              Faire une demande
            </Link>
            <Link
              href="/my-requests"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            >
              Mes demandes
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

export default function AccessRequestPage() {
  const [salle, setSalle] = useState('');
  const [date, setDate] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [motif, setMotif] = useState('');
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('newRequest');

  // Données fictives pour les salles disponibles
  const sallesDisponibles = [
    'Salle A101',
    'Salle B202',
    'Salle C303',
    'Amphi A',
    'Laboratoire Chimie',
  ];

  // Données fictives pour les demandes existantes
  const demandes = [
    { id: 1, salle: 'Salle A101', date: '2025-05-18', heureDebut: '09:00', heureFin: '11:00', motif: 'Réunion de projet', statut: 'Approuvée' },
    { id: 2, salle: 'Amphi A', date: '2025-05-20', heureDebut: '14:00', heureFin: '16:00', motif: 'Conférence', statut: 'En attente' },
    { id: 3, salle: 'Laboratoire Chimie', date: '2025-05-22', heureDebut: '10:00', heureFin: '12:00', motif: 'Travaux pratiques', statut: 'Refusée' },
  ];

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Approuvée': return 'bg-green-100 text-green-800';
      case 'Refusée': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!salle || !date || !heureDebut || !heureFin || !motif) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs.' });
      return;
    }

    console.log('Nouvelle demande:', { salle, date, heureDebut, heureFin, motif });
    setMessage({ type: 'success', text: 'Demande soumise avec succès !' });
    setTimeout(() => setMessage(null), 3000);
    setSalle('');
    setDate('');
    setHeureDebut('');
    setHeureFin('');
    setMotif('');
    setIsModalOpen(false);
  };

  const viewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Demandes d'accès aux salles</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Nouvelle demande
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md text-center`}>
              {message.text}
            </div>
          )}

          {/* Onglets pour alterner entre les sections */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  className={`py-4 px-6 font-medium text-lg border-b-2 ${activeTab === 'newRequest' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('newRequest')}
                >
                  Faire une demande
                </button>
                <button
                  className={`py-4 px-6 font-medium text-lg border-b-2 ${activeTab === 'myRequests' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('myRequests')}
                >
                  Mes demandes
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'newRequest' ? (
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Nouvelle demande d'accès</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="salle" className="block text-lg font-medium text-gray-700 mb-2">
                      Salle
                    </label>
                    <select
                      id="salle"
                      value={salle}
                      onChange={(e) => setSalle(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="">Sélectionnez une salle</option>
                      {sallesDisponibles.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="heureDebut" className="block text-lg font-medium text-gray-700 mb-2">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      id="heureDebut"
                      value={heureDebut}
                      onChange={(e) => setHeureDebut(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="heureFin" className="block text-lg font-medium text-gray-700 mb-2">
                      Heure de fin
                    </label>
                    <input
                      type="time"
                      id="heureFin"
                      value={heureFin}
                      onChange={(e) => setHeureFin(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="motif" className="block text-lg font-medium text-gray-700 mb-2">
                    Motif de la demande
                  </label>
                  <textarea
                    id="motif"
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Veuillez expliquer le motif de votre demande d'accès..."
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Soumettre la demande
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Mes demandes d'accès</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Salle</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Horaires</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {demandes.map((demande) => (
                      <tr key={demande.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{demande.salle}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(demande.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {demande.heureDebut} - {demande.heureFin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(demande.statut)}`}>
                            {demande.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => viewDetails(demande)}
                            className="text-blue-600 hover:text-blue-800 transition duration-200 flex items-center"
                          >
                            <Eye className="h-5 w-5 mr-1" /> Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Modale pour une nouvelle demande rapide */}
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
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 mb-4">
                    Nouvelle demande d'accès
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="modal-salle" className="block text-sm font-medium text-gray-700">
                        Salle
                      </label>
                      <select
                        id="modal-salle"
                        value={salle}
                        onChange={(e) => setSalle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                      >
                        <option value="">Sélectionnez une salle</option>
                        {sallesDisponibles.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="modal-date" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        id="modal-date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="modal-heureDebut" className="block text-sm font-medium text-gray-700">
                          Heure de début
                        </label>
                        <input
                          type="time"
                          id="modal-heureDebut"
                          value={heureDebut}
                          onChange={(e) => setHeureDebut(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="modal-heureFin" className="block text-sm font-medium text-gray-700">
                          Heure de fin
                        </label>
                        <input
                          type="time"
                          id="modal-heureFin"
                          value={heureFin}
                          onChange={(e) => setHeureFin(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="modal-motif" className="block text-sm font-medium text-gray-700">
                        Motif
                      </label>
                      <textarea
                        id="modal-motif"
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Veuillez expliquer le motif de votre demande..."
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
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
                        Soumettre
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modale pour les détails d'une demande */}
      <Transition appear show={isDetailsModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsDetailsModalOpen(false)}>
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
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 mb-4">
                    Détails de la demande
                  </Dialog.Title>
                  {selectedRequest && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Salle</p>
                        <p className="mt-1 text-lg font-medium">{selectedRequest.salle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date</p>
                        <p className="mt-1 text-lg">{new Date(selectedRequest.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Horaires</p>
                        <p className="mt-1 text-lg">{selectedRequest.heureDebut} - {selectedRequest.heureFin}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Motif</p>
                        <p className="mt-1 text-lg">{selectedRequest.motif}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Statut</p>
                        <p className={`mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedRequest.statut)}`}>
                          {selectedRequest.statut}
                        </p>
                      </div>

                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => setIsDetailsModalOpen(false)}
                          className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                        >
                          Fermer
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}