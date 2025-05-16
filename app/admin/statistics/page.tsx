'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

// Types pour les données
type Salle = {
  nom: string;
  nombre_presents: number;
  capacite: number;
};

type Demande = {
  statut_demande: string;
};

type User = {
  statut: string;
};

type UtilisationJour = {
  jour: string;
  reservations: number;
};

type TauxOccupation = {
  mois: string;
  tauxOccupation: number;
};

type StatutDistribution = {
  statut: string;
  count: number;
};

const Statistics = () => {
  const [salleData, setSalleData] = useState<Salle[]>([]);
  const [demandeData, setDemandeData] = useState<StatutDistribution[]>([]);
  const [utilisationParJour, setUtilisationParJour] = useState<UtilisationJour[]>([]);
  const [tauxOccupation, setTauxOccupation] = useState<TauxOccupation[]>([]);
  const [distributionStatut, setDistributionStatut] = useState<StatutDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  // Couleurs pour les graphiques
  const [isOpen, setIsOpen] = useState(false);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données des salles
        const sallesResponse = await fetch('http://localhost:5000/api/salles');
        const salles: Salle[] = await sallesResponse.json();
        setSalleData(salles);

        // Récupérer la distribution des demandes d'accès par statut
        const demandesResponse = await fetch('http://localhost:5000/api/demande-acces');
        const demandes = await demandesResponse.json();
        const demandeStats: StatutDistribution[] = [
          { statut: 'en_attente', count: demandes.demandes.filter((d: Demande) => d.statut_demande === 'en_attente').length },
          { statut: 'approuvee', count: demandes.demandes.filter((d: Demande) => d.statut_demande === 'approuvee').length },
          { statut: 'rejetee', count: demandes.demandes.filter((d: Demande) => d.statut_demande === 'rejetee').length }
        ];
        setDemandeData(demandeStats);

        // Récupérer la distribution des utilisateurs par statut
        const usersResponse = await fetch('http://localhost:5000/api/users');
        const users: User[] = await usersResponse.json();
        const userStats: StatutDistribution[] = [
          { statut: 'Étudiant', count: users.filter((u: User) => u.statut === 'Étudiant').length },
          { statut: 'Professeur', count: users.filter((u: User) => u.statut === 'Professeur').length },
          { statut: 'Stagiaire', count: users.filter((u: User) => u.statut === 'Stagiaire').length },
          { statut: 'Travailleur 2iE', count: users.filter((u: User) => u.statut === 'Travailleur 2iE').length }
        ];
        setDistributionStatut(userStats);

        // Récupérer l'utilisation par jour (nécessite un nouvel endpoint)
        const utilisationResponse = await fetch('http://localhost:5000/api/statistiques/utilisation-par-jour');
        const utilisation: UtilisationJour[] = await utilisationResponse.json();
        setUtilisationParJour(utilisation);

        // Récupérer le taux d'occupation par mois (nécessite un nouvel endpoint)
        const occupationResponse = await fetch('http://localhost:5000/api/statistiques/taux-occupation');
        const occupation: TauxOccupation[] = await occupationResponse.json();
        setTauxOccupation(occupation);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-semibold text-gray-600">Chargement des statistiques...</div>
      </div>
    );
  }

  // Calculer le pourcentage d'occupation pour chaque salle
  const salleOccupationData = salleData.map((salle) => ({
    nom: salle.nom,
    pourcentageOccupation: salle.capacite > 0 ? Math.round((salle.nombre_presents / salle.capacite) * 100) : 0
  }));

  return (
    <>
      <nav className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-screen z-50 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Image
                src="/logo2ie.png"
                alt="Université 2iE Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
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
                aria-label="Ouvrir le menu"
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
      <div className="p-6 bg-gray-50 min-h-screen mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord statistique</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique 1: Occupation actuelle des salles */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Occupation actuelle des salles</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={salleData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nom" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === "nombre_presents") return [value, "Présents"];
                    if (name === "capacite") return [value, "Capacité"];
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar dataKey="nombre_presents" name="Présents" fill="#0088FE" />
                <Bar dataKey="capacite" name="Capacité totale" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique 2: Pourcentage d'occupation des salles */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pourcentage d'occupation des salles</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={salleOccupationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nom" angle={-45} textAnchor="end" height={70} />
                <YAxis unit="%" />
                <Tooltip formatter={(value: number) => [`${value}%`, "Occupation"]} />
                <Bar dataKey="pourcentageOccupation" name="Pourcentage d'occupation" fill="#8884d8">
                  {salleOccupationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.pourcentageOccupation > 80 ? '#ff4d4d' :
                        entry.pourcentageOccupation > 50 ? '#ffa64d' : '#4dff88'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique 3: Distribution des demandes d'accès */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Distribution des demandes d'accès</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={demandeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="statut"
                  label={({ statut, percent }) => `${statut}: ${(percent * 100).toFixed(0)}%`}
                >
                  {demandeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string, props: any) => {
                    const statusLabels: Record<string, string> = {
                      'en_attente': 'En attente',
                      'approuvee': 'Approuvée',
                      'rejetee': 'Rejetée'
                    };
                    return [value, statusLabels[props.payload.statut] || props.payload.statut];
                  }}
                />
                <Legend
                  formatter={(value: string) => {
                    const statusLabels: Record<string, string> = {
                      'en_attente': 'En attente',
                      'approuvee': 'Approuvée',
                      'rejetee': 'Rejetée'
                    };
                    return statusLabels[value] || value;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique 4: Utilisation des salles par jour de la semaine */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Utilisation par jour de la semaine</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={utilisationParJour}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="reservations" name="Réservations" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique 5: Évolution du taux d'occupation */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Évolution du taux d'occupation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={tauxOccupation}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis unit="%" />
                <Tooltip formatter={(value: number) => [`${value}%`, "Taux d'occupation"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tauxOccupation"
                  name="Taux d'occupation"
                  stroke="#FF8042"
                  strokeWidth={2}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique 6: Distribution des utilisateurs par statut */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Utilisateurs par statut</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionStatut}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="statut"
                  label={({ statut, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {distributionStatut.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section pour les métriques clés */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-semibold text-gray-600">Total des salles</h3>
            <p className="text-3xl font-bold text-blue-600">{salleData.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-semibold text-gray-600">Capacité totale</h3>
            <p className="text-3xl font-bold text-green-600">
              {salleData.reduce((sum, salle) => sum + (salle.capacite || 0), 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-semibold text-gray-600">Personnes présentes</h3>
            <p className="text-3xl font-bold text-purple-600">
              {salleData.reduce((sum, salle) => sum + (salle.nombre_presents || 0), 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="font-semibold text-gray-600">Taux d'occupation moyen</h3>
            <p className="text-3xl font-bold text-orange-600">
              {salleData.length > 0
                ? Math.round(
                    salleData.reduce(
                      (sum, salle) =>
                        sum + (salle.capacite > 0 ? salle.nombre_presents / salle.capacite : 0),
                      0
                    ) /
                      salleData.length *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;