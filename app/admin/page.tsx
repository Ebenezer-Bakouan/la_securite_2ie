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
type Admin = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  isadmin: boolean;
  statut: string;
  numero_inscription: string | null;
  uid_badge_rfid: string | null;
};

type AddSubAdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (admin: Admin) => void;
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Erreur lors de l\'ajout du sous-admin.');
      }
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
  interface Personne {
    id: string;
    nom: string;
    prenom: string;
    statut: string;
    salle: string;
    numero_inscription: string;
    uid_badge_rfid: string;
    heureEntree: string;
  }
  
    const [personnes, setPersonnes] = useState<Personne[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  interface Demande {
    id: string;
    nom: string;
    prenom: string;
    statut: string;
    salle: string;
    numero_inscription: string;
    uid_badge_rfid: string;
  }

  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [subAdmins, setSubAdmins] = useState<Admin[]>([]);
  interface Salle {
    id: string;
    nom: string;
  }
  const [salles, setSalles] = useState<Salle[]>([]);
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
          demandesApprouvees.data.demandes.map(async (demande: { user_id: any; salle_id: any; id: any; created_at: string | number | Date; }) => {
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
        setBadges(badgesResponse.data.map((user: { id: any; nom: any; prenom: any; statut: any; numero_inscription: any; uid_badge_rfid: any; etat: any; }) => ({
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
          demandesResponse.data.demandes.map(async (demande: { user_id: any; salle_id: any; id: any; }) => {
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
        setDemandes(demandesData as never[]);

        // Récupérer les sous-admins
        const subAdminsResponse = await api.get('/users?admin=true');
        setSubAdmins(subAdminsResponse.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data?.error) {
          setError(err.response.data.error);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erreur lors du chargement des données.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Define interfaces for your data types
  interface Badge {
    id: string;
    nom: string;
    prenom: string;
    statut: string;
    actif: boolean;
    numero_inscription: string;
    uid_badge_rfid: string;
  }

  interface Admin {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    isadmin: boolean;
    statut: string;
    numero_inscription: string | null;
    uid_badge_rfid: string | null;
  }

  interface Demande {
    id: string;
    user_id: string;
    salle_id: string;
    nom: string;
    prenom: string;
    statut: string;
    salle: string;
    numero_inscription: string;
    uid_badge_rfid: string;
    created_at: string;
  }

  // Fonction pour basculer l'état du badge (actif/inactif)
  const toggleBadgeStatus = async (id: string) => {
    try {
      const user = badges.find((b: Badge) => b.id === id);
      if (!user) return;
      await api.patch(`/users/${id}`, { etat: !user.actif });
      setBadges(badges.map((b: Badge) => b.id === id ? { ...b, actif: !b.actif } : b));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erreur lors de la mise à jour du badge.');
      }
    }
  };

  // Fonction pour basculer le statut admin
  const toggleAdminStatus = async (id: string) => {
    try {
      const admin = subAdmins.find((a: Admin) => a.id === id);
      if (!admin) return;
      await api.patch(`/users/${id}`, { isadmin: !admin.isadmin });
      setSubAdmins(subAdmins.map((a: Admin) => a.id === id ? { ...a, isadmin: !a.isadmin } : a) as never[]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erreur lors de la mise à jour du statut admin.');
      }
    }
  };

  // Fonction pour approuver une demande d'accès
  const approveRequest = async (id: string) => {
    try {
      await api.patch(`/demande-acces/${id}/approuver`);
      setDemandes(demandes.filter((d: Demande) => d.id !== id));
      // Rafraîchir les personnes présentes
      const demandesApprouvees = await api.get('/demande-acces?statut=approuvee');
      const personnesData = await Promise.all(
        demandesApprouvees.data.demandes.map(async (demande: Demande) => {
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
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erreur lors de l\'approbation de la demande.');
      }
    }
  };

  // Fonction pour rejeter une demande d'accès
  const rejectRequest = async (id: string) => {
    try {
      await api.patch(`/demande-acces/${id}/rejeter`);
      setDemandes(demandes.filter((d: Demande) => d.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erreur lors du rejet de la demande.');
      }
    }
  };

  // Fonction pour ajouter un sous-admin
  const handleAddSubAdmin = (newAdmin: Admin) => {
    setSubAdmins([...subAdmins, newAdmin] as never[]);
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

  const filteredBadges = badges.filter((badge: Badge) => 
    badge.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (badge.numero_inscription !== 'Non défini' && badge.numero_inscription.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (badge.uid_badge_rfid !== 'Non défini' && badge.uid_badge_rfid.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDemandes = demandes.filter((demande: Demande) => 
    demande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (demande.numero_inscription !== 'Non défini' && demande.numero_inscription.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (demande.uid_badge_rfid !== 'Non défini' && demande.uid_badge_rfid.toLowerCase().includes(searchTerm.toLowerCase())) ||
    demande.salle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubAdmins = subAdmins.filter((admin: Admin) => 
    admin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (admin.numero_inscription && admin.numero_inscription.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (admin.uid_badge_rfid && admin.uid_badge_rfid.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Sidebar Tabs */}
        <div className="mb-4 md:mb-0 md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
          <button
            className={`flex items-center px-4 py-2 rounded-md w-full text-left ${activeTab === 'personnes' ? 'bg-purple-100 text-purple-700 font-semibold' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('personnes')}
          >
            <User className="mr-2 h-5 w-5" /> Personnes présentes
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md w-full text-left ${activeTab === 'badges' ? 'bg-purple-100 text-purple-700 font-semibold' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('badges')}
          >
            <Key className="mr-2 h-5 w-5" /> Badges
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md w-full text-left ${activeTab === 'demandes' ? 'bg-purple-100 text-purple-700 font-semibold' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('demandes')}
          >
            <Clock className="mr-2 h-5 w-5" /> Demandes d'accès
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md w-full text-left ${activeTab === 'subadmins' ? 'bg-purple-100 text-purple-700 font-semibold' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('subadmins')}
          >
            <Shield className="mr-2 h-5 w-5" /> Sous-admins
          </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="relative">
            <input
              type="text"
              placeholder="Recherche..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {activeTab === 'personnes' && (
            <select
              value={filterBy}
              onChange={e => setFilterBy(e.target.value)}
              className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="tous">Toutes les salles</option>
              {salles.map(salle => (
              <option key={salle.id} value={salle.nom}>{salle.nom}</option>
              ))}
            </select>
            )}
          </div>
          {activeTab === 'subadmins' && (
            <button
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={() => setShowAddModal(true)}
            >
            <Plus className="mr-2 h-5 w-5" /> Ajouter un sous-admin
            </button>
          )}
          </div>
          {/* Tab Content */}
          {activeTab === 'personnes' && (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Personnes présentes</h2>
            <table className="min-w-full">
            <thead>
              <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prénom</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Salle</th>
              <th className="px-4 py-2">Numéro d'inscription</th>
              <th className="px-4 py-2">UID Badge RFID</th>
              <th className="px-4 py-2">Heure d'entrée</th>
              </tr>
            </thead>
            <tbody>
              {filteredPersonnes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">Aucune personne présente.</td>
              </tr>
              ) : (
              filteredPersonnes.map(personne => (
                <tr key={personne.id}>
                <td className="px-4 py-2">{personne.nom}</td>
                <td className="px-4 py-2">{personne.prenom}</td>
                <td className="px-4 py-2">{personne.statut}</td>
                <td className="px-4 py-2">{personne.salle}</td>
                <td className="px-4 py-2">{personne.numero_inscription}</td>
                <td className="px-4 py-2">{personne.uid_badge_rfid}</td>
                <td className="px-4 py-2">{personne.heureEntree}</td>
                </tr>
              ))
              )}
            </tbody>
            </table>
          </div>
          )}
          {activeTab === 'badges' && (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Badges</h2>
            <table className="min-w-full">
            <thead>
              <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prénom</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Numéro d'inscription</th>
              <th className="px-4 py-2">UID Badge RFID</th>
              <th className="px-4 py-2">État</th>
              <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBadges.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">Aucun badge trouvé.</td>
              </tr>
              ) : (
              filteredBadges.map(badge => (
                <tr key={badge.id}>
                <td className="px-4 py-2">{badge.nom}</td>
                <td className="px-4 py-2">{badge.prenom}</td>
                <td className="px-4 py-2">{badge.statut}</td>
                <td className="px-4 py-2">{badge.numero_inscription}</td>
                <td className="px-4 py-2">{badge.uid_badge_rfid}</td>
                <td className="px-4 py-2">
                  {badge.actif ? (
                  <span className="inline-flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-1" /> Actif
                  </span>
                  ) : (
                  <span className="inline-flex items-center text-red-600">
                    <XCircle className="h-5 w-5 mr-1" /> Inactif
                  </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                  className={`px-3 py-1 rounded-md text-white ${badge.actif ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  onClick={() => toggleBadgeStatus(badge.id)}
                  >
                  {badge.actif ? 'Désactiver' : 'Activer'}
                  </button>
                </td>
                </tr>
              ))
              )}
            </tbody>
            </table>
          </div>
          )}
          {activeTab === 'demandes' && (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Demandes d'accès</h2>
            <table className="min-w-full">
            <thead>
              <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prénom</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Salle</th>
              <th className="px-4 py-2">Numéro d'inscription</th>
              <th className="px-4 py-2">UID Badge RFID</th>
              <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">Aucune demande en attente.</td>
              </tr>
              ) : (
              filteredDemandes.map(demande => (
                <tr key={demande.id}>
                <td className="px-4 py-2">{demande.nom}</td>
                <td className="px-4 py-2">{demande.prenom}</td>
                <td className="px-4 py-2">{demande.statut}</td>
                <td className="px-4 py-2">{demande.salle}</td>
                <td className="px-4 py-2">{demande.numero_inscription}</td>
                <td className="px-4 py-2">{demande.uid_badge_rfid}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                  className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
                  onClick={() => approveRequest(demande.id)}
                  >
                  Approuver
                  </button>
                  <button
                  className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                  onClick={() => rejectRequest(demande.id)}
                  >
                  Rejeter
                  </button>
                </td>
                </tr>
              ))
              )}
            </tbody>
            </table>
          </div>
          )}
          {activeTab === 'subadmins' && (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Sous-admins</h2>
            <table className="min-w-full">
            <thead>
              <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prénom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Numéro d'inscription</th>
              <th className="px-4 py-2">UID Badge RFID</th>
              <th className="px-4 py-2">Admin</th>
              <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubAdmins.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">Aucun sous-admin trouvé.</td>
              </tr>
              ) : (
              filteredSubAdmins.map(admin => (
                <tr key={admin.id}>
                <td className="px-4 py-2">{admin.nom}</td>
                <td className="px-4 py-2">{admin.prenom}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">{admin.statut}</td>
                <td className="px-4 py-2">{admin.numero_inscription || 'Non défini'}</td>
                <td className="px-4 py-2">{admin.uid_badge_rfid || 'Non défini'}</td>
                <td className="px-4 py-2">
                  {admin.isadmin ? (
                  <span className="inline-flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-1" /> Oui
                  </span>
                  ) : (
                  <span className="inline-flex items-center text-red-600">
                    <XCircle className="h-5 w-5 mr-1" /> Non
                  </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                  className={`px-3 py-1 rounded-md text-white ${admin.isadmin ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  onClick={() => toggleAdminStatus(admin.id)}
                  >
                  {admin.isadmin ? 'Retirer admin' : 'Rendre admin'}
                  </button>
                </td>
                </tr>
              ))
              )}
            </tbody>
            </table>
          </div>
          )}
        </div>
        </div>
      </div>
      </div>
      <Footer />
      <AddSubAdminModal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      onAdd={(admin) => handleAddSubAdmin(admin)}
      />
    </>
  );
}