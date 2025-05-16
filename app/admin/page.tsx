'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { Search, User, Key, Clock, Calendar, CheckCircle, XCircle, Filter, Menu, X, Home, Settings, BarChart2, Shield, Plus } from 'lucide-react';

// Configuration d'Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`,
  },
});

// Composant Navbar (inchangé)
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

// Composant Footer (inchangé)
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
type AddSubAdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (formData: { nom: string; prenom: string; email: string; password: string }) => void;
};

// Composant pour le formulaire d'ajout de sous-admin
interface FormData {
  nom: string;
  prenom: string;
  statut: 'Professeur' | 'Travailleur 2iE';
  email: string;
  password: string;
  numero_inscription: string;
  uid_badge_rfid: string;
}


const AddSubAdminModal: React.FC<AddSubAdminModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    statut: 'Professeur',
    email: '',
    password: '2ieAdmin2025',
    numero_inscription: '',
    uid_badge_rfid: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    try {
      const response = await api.post('/users/register', {
        ...formData,
        numero_inscription: formData.numero_inscription || null,
        uid_badge_rfid: formData.uid_badge_rfid || null,
        isadmin: true
      });
      setSuccess(response.data.message);
      setError('');
      onAdd(response.data.user);
      setFormData({
        nom: '',
        prenom: '',
        statut: 'Professeur',
        email: '',
        password: '2ieAdmin2025',
        numero_inscription: '',
        uid_badge_rfid: '',
      });
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de l\'ajout du sous-admin.');
      setSuccess('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Ajouter un sous-admin</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, nom: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              value={formData.prenom}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, prenom: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              value={formData.statut}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setFormData({ ...formData, statut: e.target.value as FormData['statut'] })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="Professeur">Professeur</option>
              <option value="Travailleur 2iE">Travailleur 2iE</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Numéro d'inscription</label>
            <input
              type="text"
              value={formData.numero_inscription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, numero_inscription: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">UID Badge RFID</label>
            <input
              type="text"
              value={formData.uid_badge_rfid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, uid_badge_rfid: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, password: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('personnes');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('tous');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [personnes, setPersonnes] = useState([]);
  const [badges, setBadges] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [subAdmins, setSubAdmins] = useState([]);
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Couleurs thématiques 2iE
  const colors = {
    primary: '#E30613', // Rouge 2iE
    secondary: '#007BFF', // Bleu
    tertiary: '#FFC107', // Jaune
    success: '#28A745', // Vert
    neutral: '#4A4A4A', // Gris foncé
    lightBg: '#F7F7F7', // Gris clair pour les fonds
  };

  // Récupérer les données depuis les API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Récupérer les salles
        const sallesResponse = await api.get('/salles');
        setSalles(sallesResponse.data);

        // Récupérer les personnes présentes (demandes approuvées)
        const demandesApprouvees = await api.get('/demande-acces?statut=approuvee');
        const personnesData = await Promise.all(
          demandesApprouvees.data.demandes.map(async (demande) => {
            const user = (await api.get(`/users/${demande.user_id}`)).data;
            const salle = (await api.get(`/salles/${demande.salle_id}`)).data;
            return {
              id: demande.id,
              nom: user.nom,
              prenom: user.prenom,
              statut: user.statut,
              salle: salle.nom,
              numero_inscription: user.numero_inscription || 'Non défini',
              uid_badge_rfid: user.uid_badge_rfid || 'Non défini',
              heureEntree: new Date(demande.created_at).toLocaleTimeString(),
            };
          })
        );
        setPersonnes(personnesData);

        // Récupérer les badges (tous les utilisateurs)
        const badgesResponse = await api.get('/users');
        setBadges(badgesResponse.data.map(user => ({
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          statut: user.statut,
          numero_inscription: user.numero_inscription || 'Non défini',
          uid_badge_rfid: user.uid_badge_rfid || 'Non défini',
          actif: user.etat,
        })));

        // Récupérer les demandes d'accès
        const demandesResponse = await api.get('/demande-acces');
        const demandesData = await Promise.all(
          demandesResponse.data.demandes.map(async (demande) => {
            const user = (await api.get(`/users/${demande.user_id}`)).data;
            const salle = (await api.get(`/salles/${demande.salle_id}`)).data;
            return {
              id: demande.id,
              nom: user.nom,
              prenom: user.prenom,
              statut: user.statut,
              numero_inscription: user.numero_inscription || 'Non défini',
              uid_badge_rfid: user.uid_badge_rfid || 'Non défini',
              salle: salle.nom,
            };
          })
        );
        setDemandes(demandesData);

        // Récupérer les sous-admins
        const subAdminsResponse = await api.get('/users?admin=true');
        setSubAdmins(subAdminsResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fonction pour basculer l'état du badge (actif/inactif)
  const toggleBadgeStatus = async (id) => {
    try {
      const user = badges.find(b => b.id === id);
      await api.patch(`/users/${id}`, { etat: !user.actif });
      setBadges(badges.map(b => b.id === id ? { ...b, actif: !b.actif } : b));
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la mise à jour du badge.');
    }
  };

  // Fonction pour basculer le statut admin
  const toggleAdminStatus = async (id) => {
    try {
      const admin = subAdmins.find(a => a.id === id);
      await api.patch(`/users/${id}`, { isadmin: !admin.isadmin });
      setSubAdmins(subAdmins.map(a => a.id === id ? { ...a, isadmin: !a.isadmin } : a));
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la mise à jour du statut admin.');
    }
  };

  // Fonction pour approuver une demande d'accès
  const approveRequest = async (id) => {
    try {
      await api.patch(`/demande-acces/${id}/approuver`);
      setDemandes(demandes.filter(d => d.id !== id));
      // Rafraîchir les personnes présentes
      const demandesApprouvees = await api.get('/demande-acces?statut=approuvee');
      const personnesData = await Promise.all(
        demandesApprouvees.data.demandes.map(async (demande) => {
          const user = (await api.get(`/users/${demande.user_id}`)).data;
          const salle = (await api.get(`/salles/${demande.salle_id}`)).data;
          return {
            id: demande.id,
            nom: user.nom,
            prenom: user.prenom,
            statut: user.statut,
            salle: salle.nom,
            numero_inscription: user.numero_inscription || 'Non défini',
            uid_badge_rfid: user.uid_badge_rfid || 'Non défini',
            heureEntree: new Date(demande.created_at).toLocaleTimeString(),
          };
        })
      );
      setPersonnes(personnesData);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'approbation de la demande.');
    }
  };

  // Fonction pour rejeter une demande d'accès
  const rejectRequest = async (id) => {
    try {
      await api.patch(`/demande-acces/${id}/rejeter`);
      setDemandes(demandes.filter(d => d.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du rejet de la demande.');
    }
  };

  // Fonction pour ajouter un sous-admin
  const handleAddSubAdmin = (newAdmin) => {
    setSubAdmins([...subAdmins, newAdmin]);
  };

  // Filtrage des données
  const filteredPersonnes = personnes.filter(personne => {
    const matchesSearch = 
      personne.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      personne.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (personne.numero_inscription !== 'Non défini' && personne.numero_inscription.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (personne.uid_badge_rfid !== 'Non défini' && personne.uid_badge_rfid.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterBy === 'tous') return matchesSearch;
    return matchesSearch && personne.salle === filterBy;
  });

  const filteredBadges = badges.filter(badge => 
    badge.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (badge.numero_inscription !== 'Non défini' && badge.numero_inscription.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (badge.uid_badge_rfid !== 'Non défini' && badge.uid_badge_rfid.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDemandes = demandes.filter(demande => 
    demande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (demande.numero_inscription !== 'Non défini' && demande.numero_inscription.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (demande.uid_badge_rfid !== 'Non défini' && demande.uid_badge_rfid.toLowerCase().includes(searchTerm.toLowerCase())) ||
    demande.salle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubAdmins = subAdmins.filter(admin => 
    admin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (admin.numero_inscription && admin.numero_inscription.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (admin.uid_badge_rfid && admin.uid_badge_rfid.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

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
                {personnes.length}
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
                {badges.length}
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
                {demandes.length}
              </span>
            </div>
            <div
              className={`flex items-center px-6 py-4 cursor-pointer transition-all duration-200 ${
                activeTab === 'subadmins' ? 'bg-purple-50 border-l-4 border-purple-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab('subadmins');
                setShowMobileMenu(false);
              }}
            >
              <Shield className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700 font-medium">Sous-admins</span>
              <span className="ml-auto bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {subAdmins.length}
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
                {activeTab === 'subadmins' && <span className="text-purple-500">Sous-admins</span>}
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
                      {salles.map((salle) => (
                        <option key={salle.id} value={salle.nom}>
                          Salle {salle.nom}
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
                {activeTab === 'subadmins' && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center px-4 py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un sous-admin
                  </button>
                )}
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
                        UID RFID
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
                              personne.statut === 'Travailleur 2iE'
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
                          {personne.numero_inscription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {personne.uid_badge_rfid}
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
                        UID RFID
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
                              badge.statut === 'Travailleur 2iE'
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
                          {badge.numero_inscription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {badge.uid_badge_rfid}
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
                        UID RFID
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
                              demande.statut === 'Travailleur 2iE'
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
                          {demande.numero_inscription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {demande.uid_badge_rfid}
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
            {activeTab === 'subadmins' && (
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
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        N° Inscription
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        UID RFID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Rôle Admin
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubAdmins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="font-medium text-purple-600">
                                {admin.prenom[0]}{admin.nom[0]}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {admin.nom} {admin.prenom}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              admin.statut === 'Travailleur 2iE'
                                ? 'bg-blue-100 text-blue-800'
                                : admin.statut === 'Professeur'
                                ? 'bg-green-100 text-green-800'
                                : admin.statut === 'Étudiant'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {admin.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {admin.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {admin.numero_inscription || 'Non défini'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {admin.uid_badge_rfid || 'Non défini'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              admin.isadmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {admin.isadmin ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleAdminStatus(admin.id)}
                            className={`px-4 py-2 rounded-md text-white shadow-sm transition-all duration-200 ${
                              admin.isadmin ? 'bg-red-600 hover:bg-red-700' : 'bg-green-500 hover:bg-green-600'
                            }`}
                          >
                            {admin.isadmin ? 'Retirer' : 'Ajouter'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredSubAdmins.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun sous-admin ne correspond à votre recherche
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <AddSubAdminModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSubAdmin}
      />
      <Footer />
    </div>
  );
}