'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Key, Clock, Calendar, CheckCircle, XCircle, Filter, Menu, X, Home, Settings, BarChart2 } from 'lucide-react';

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
      {/* Menu mobile */}
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('personnes');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('tous');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Couleurs thématiques 2iE
  const colors = {
    primary: '#E30613', // Rouge 2iE
    secondary: '#007BFF', // Bleu
    tertiary: '#FFC107', // Jaune
    success: '#28A745', // Vert
    neutral: '#4A4A4A', // Gris foncé
    lightBg: '#F7F7F7', // Gris clair pour les fonds
  };

  // Données fictives pour l'exemple
  const personnesData = [
    { id: 1, nom: 'Dubois', prenom: 'Marie', statut: 'Étudiant', salle: 'A101', numInscription: '2025001', heureEntree: '08:15' },
    { id: 2, nom: 'Martin', prenom: 'Thomas', statut: 'Professeur', salle: 'B202', numInscription: '2025002', heureEntree: '09:30' },
    { id: 3, nom: 'Bernard', prenom: 'Sophie', statut: 'Stagiaire', salle: 'A101', numInscription: '2025003', heureEntree: '08:45' },
    { id: 4, nom: 'Petit', prenom: 'Lucas', statut: 'Admin 2IE', salle: 'C303', numInscription: '2025004', heureEntree: '10:00' },
    { id: 5, nom: 'Robert', prenom: 'Emma', statut: 'Étudiant', salle: 'A101', numInscription: '2025005', heureEntree: '08:30' },
  ];

  const badgesData = [
    { id: 1, nom: 'Dubois', prenom: 'Marie', statut: 'Étudiant', numInscription: '2025001', actif: true },
    { id: 2, nom: 'Martin', prenom: 'Thomas', statut: 'Professeur', numInscription: '2025002', actif: true },
    { id: 3, nom: 'Bernard', prenom: 'Sophie', statut: 'Stagiaire', numInscription: '2025003', actif: true },
    { id: 4, nom: 'Petit', prenom: 'Lucas', statut: 'Admin 2IE', numInscription: '2025004', actif: false },
    { id: 5, nom: 'Robert', prenom: 'Emma', statut: 'Étudiant', numInscription: '2025005', actif: true },
  ];

  const demandesData = [
    { id: 1, nom: 'Dupont', prenom: 'Alexandre', statut: 'Étudiant', numInscription: '2025006', salle: 'B202' },
    { id: 2, nom: 'Leroy', prenom: 'Chloé', statut: 'Stagiaire', numInscription: '2025007', salle: 'C303' },
    { id: 3, nom: 'Moreau', prenom: 'Hugo', statut: 'Professeur', numInscription: '2025008', salle: 'A101' },
    { id: 4, nom: 'Simon', prenom: 'Léa', statut: 'Étudiant', numInscription: '2025009', salle: 'B202' },
    { id: 5, nom: 'Laurent', prenom: 'Jules', statut: 'Admin 2IE', numInscription: '2025010', salle: 'D404' },
  ];

  const sallesData = [
    { id: 'A101', count: 15 },
    { id: 'B202', count: 12 },
    { id: 'C303', count: 8 },
    { id: 'D404', count: 7 },
  ];

  // Fonction pour basculer l'état du badge (actif/inactif)
  const toggleBadgeStatus = (id) => {
    console.log(`Basculer le statut du badge ${id}`);
  };

  // Fonction pour approuver une demande d'accès
  const approveRequest = (id) => {
    console.log(`Demande ${id} approuvée`);
  };

  // Fonction pour rejeter une demande d'accès
  const rejectRequest = (id) => {
    console.log(`Demande ${id} rejetée`);
  };

  // Filtrage des données en fonction du terme de recherche et du filtre
  const filteredPersonnes = personnesData.filter(personne => {
    const matchesSearch = 
      personne.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      personne.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      personne.numInscription.includes(searchTerm.toLowerCase());
    
    if (filterBy === 'tous') return matchesSearch;
    return matchesSearch && personne.salle === filterBy;
  });

  const filteredBadges = badgesData.filter(badge => 
    badge.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.numInscription.includes(searchTerm.toLowerCase())
  );

  const filteredDemandes = demandesData.filter(demande => 
    demande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.numInscription.includes(searchTerm.toLowerCase()) ||
    demande.salle.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen w-screen -ml-100">
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
      `}</style>
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-20 pb-32">
        {/* Sidebar */}
        <div className="hidden md:block w-72 bg-white shadow-xl border-r border-gray-200 fixed top-20 bottom-32 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin 2iE</h1>
          </div>
          <nav className="mt-6">
            <Link href="/" className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-100 transition-all duration-200">
              <Home className="h-5 w-5 text-gray-600 mr-3" />
              <span className="font-medium">Accueil</span>
            </Link>
            <div className="px-6 py-2">
              <h2 className="text-xs uppercase font-semibold text-gray-500 tracking-wide">Gestion des Accès</h2>
            </div>
            <div
              className={`flex items-center px-6 py-4 cursor-pointer transition-all duration-200 ${
                activeTab === 'personnes' ? 'bg-red-50 border-l-4 border-red-600' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab('personnes');
                setShowMobileMenu(false);
              }}
            >
              <User className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700 font-medium">Personnes présentes</span>
              <span className="ml-auto bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {personnesData.length}
              </span>
            </div>
            <div
              className={`flex items-center px-6 py-4 cursor-pointer transition-all duration-200 ${
                activeTab === 'badges' ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab('badges');
                setShowMobileMenu(false);
              }}
            >
              <Key className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700 font-medium">Badges enregistrés</span>
              <span className="ml-auto bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {badgesData.length}
              </span>
            </div>
            <div
              className={`flex items-center px-6 py-4 cursor-pointer transition-all duration-200 ${
                activeTab === 'demandes' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab('demandes');
                setShowMobileMenu(false);
              }}
            >
              <Clock className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700 font-medium">Demandes d'accès</span>
              <span className="ml-auto bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {demandesData.length}
              </span>
            </div>
            <div className="px-6 py-2">
              <h2 className="text-xs uppercase font-semibold text-gray-500 tracking-wide">Analyse</h2>
            </div>
            <Link href="/admin/statistics" className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-100 transition-all duration-200">
              <BarChart2 className="h-5 w-5 text-gray-600 mr-3" />
              <span className="font-medium">Voir les statistiques</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-100 transition-all duration-200">
              <Settings className="h-5 w-5 text-gray-600 mr-3" />
              <span className="font-medium">Paramètres</span>
            </Link>
          </nav>
        </div>

        {/* Bouton pour afficher le menu sur mobile */}
        <div className="md:hidden fixed top-24 right-4 z-50">
          <button onClick={() => setShowMobileMenu(true)}>
            <Menu className="h-8 w-8 text-gray-600" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto md:ml-72 bg-gray-50 w-full">
          <div className="p-8 mx-auto max-w-7xl">
            {/* Header et barre de recherche */}
            <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-between mb-8 w-full">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 text-center md:text-left">
                {activeTab === 'personnes' && <span className="text-red-600">Personnes présentes</span>}
                {activeTab === 'badges' && <span className="text-blue-500">Badges enregistrés</span>}
                {activeTab === 'demandes' && <span className="text-yellow-500">Demandes d'accès</span>}
              </h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                {activeTab === 'personnes' && (
                  <div className="relative w-full md:w-auto">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full md:w-auto"
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                    >
                      <option value="tous">Toutes les salles</option>
                      {sallesData.map((salle) => (
                        <option key={salle.id} value={salle.id}>
                          Salle {salle.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contenu principal selon l'onglet actif */}
            {activeTab === 'personnes' && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full mx-auto max-w-7xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nom & Prénom
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        N° Inscription
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Salle
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Heure d'entrée
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPersonnes.map((personne) => (
                      <tr key={personne.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="font-medium text-red-600">
                                {personne.prenom[0]}{personne.nom[0]}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {personne.nom} {personne.prenom}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              personne.statut === 'Admin 2IE'
                                ? 'bg-blue-100 text-blue-800'
                                : personne.statut === 'Professeur'
                                ? 'bg-green-100 text-green-800'
                                : personne.statut === 'Étudiant'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {personne.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {personne.numInscription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Salle {personne.salle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {personne.heureEntree}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPersonnes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune personne ne correspond à votre recherche
                  </div>
                )}
              </div>
            )}
            {activeTab === 'badges' && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full mx-auto max-w-7xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nom & Prénom
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        N° Inscription
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        État
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBadges.map((badge) => (
                      <tr key={badge.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="font-medium text-blue-600">
                                {badge.prenom[0]}{badge.nom[0]}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {badge.nom} {badge.prenom}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              badge.statut === 'Admin 2IE'
                                ? 'bg-blue-100 text-blue-800'
                                : badge.statut === 'Professeur'
                                ? 'bg-green-100 text-green-800'
                                : badge.statut === 'Étudiant'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {badge.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {badge.numInscription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              badge.actif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {badge.actif ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleBadgeStatus(badge.id)}
                            className={`px-4 py-2 rounded-md text-white shadow-sm transition-all duration-200 ${
                              badge.actif ? 'bg-red-600 hover:bg-red-700' : 'bg-green-500 hover:bg-green-600'
                            }`}
                          >
                            {badge.actif ? 'Désactiver' : 'Activer'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredBadges.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun badge ne correspond à votre recherche
                  </div>
                )}
              </div>
            )}
            {activeTab === 'demandes' && (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full mx-auto max-w-7xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nom & Prénom
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        N° Inscription
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Salle demandée
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDemandes.map((demande) => (
                      <tr key={demande.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="font-medium text-yellow-600">
                                {demande.prenom[0]}{demande.nom[0]}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {demande.nom} {demande.prenom}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              demande.statut === 'Admin 2IE'
                                ? 'bg-blue-100 text-blue-800'
                                : demande.statut === 'Professeur'
                                ? 'bg-green-100 text-green-800'
                                : demande.statut === 'Étudiant'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {demande.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {demande.numInscription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Salle {demande.salle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => approveRequest(demande.id)}
                              className="flex items-center px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 shadow-sm transition-all duration-200"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Valider
                            </button>
                            <button
                              onClick={() => rejectRequest(demande.id)}
                              className="flex items-center px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-200"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rejeter
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredDemandes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune demande ne correspond à votre recherche
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}