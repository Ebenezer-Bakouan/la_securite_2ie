'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export default function RegisterPage() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [statut, setStatut] = useState('Étudiant');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !prenom || !email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        nom,
        prenom,
        email,
        statut,
        password,
        isadmin: false
      });

      if (response.data.message) {
        window.location.href = '/';
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Erreur lors de l'inscription");
      } else {
        setError("Erreur de connexion au serveur");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Augmentation significative de la largeur à max-w-6xl (72rem) */}
      <section className="bg-white shadow-xl rounded-xl py-10 px-8 w-full max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center mb-8 max-w-full mx-auto">
            <Image
              src="/logo2ie.png"
              alt="Université 2iE Logo"
              width={200}  // Logo plus grand
              height={200}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Inscription</h1>
          <div className="flex justify-center">
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-sm"></div>
              <div className="w-8 h-8 bg-yellow-400 rounded-sm"></div>
              <div className="w-8 h-8 bg-green-500 rounded-sm"></div>
              <div className="w-8 h-8 bg-blue-500 rounded-sm"></div>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-10 p-5 bg-red-100 text-red-700 rounded-lg text-center font-medium text-xl">
            {error}
          </div>
        )}

        {/* Division du formulaire en deux colonnes sur les écrans plus larges */}
        <form onSubmit={handleSubmit} className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label htmlFor="nom" className="block text-xl font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="block w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Dupont"
                required
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="prenom" className="block text-xl font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="block w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Jean"
                required
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="exemple@2ie-edu.org"
                required
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="statut" className="block text-xl font-medium text-gray-700">
                Statut
              </label>
              <select
                id="statut"
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="block w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              >
                <option value="Étudiant">Étudiant</option>
                <option value="Professeur">Professeur</option>
                <option value="Stagiaire">Stagiaire</option>
                <option value="Travailleur 2iE">Travailleur 2iE</option>
              </select>
            </div>

            <div className="space-y-4 md:col-span-2">
              <label htmlFor="password" className="block text-xl font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-4 text-lg rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-5 px-6 rounded-lg text-2xl font-medium hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Inscription en cours...' : "S'inscrire"}
            </button>
          </div>
        </form>

        <footer className="mt-10 text-center">
          <p className="text-xl text-gray-600">
            Déjà inscrit ?{' '}
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Se connecter
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}