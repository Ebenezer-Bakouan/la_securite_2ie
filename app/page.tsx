'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState(''); // Remplacé numero_inscription par email pour plus de généralité
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Utilisation de email au lieu de numero_inscription
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur de connexion');

      const { user } = data;
      // Redirection basée sur isadmin (ajouté dans la réponse de l'API)
      const redirectUrl = user.isadmin ? '/admin' : '/home';
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err.message);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Connexion</h1>
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

        {/* Formulaire centré avec une largeur maximale pour un meilleur aspect */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 md:col-span-2 lg:col-span-1">
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

            <div className="space-y-4 md:col-span-2 lg:col-span-1">
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
              />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-5 px-6 rounded-lg text-2xl font-medium hover:bg-blue-700 transition duration-200"
            >
              Connexion
            </button>
          </div>
        </form>

        <footer className="mt-10 text-center space-y-4">
          <p className="text-xl text-gray-600">
            Pas encore inscrit ?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              S'inscrire
            </Link>
          </p>
          <p className="text-xl text-gray-600">
            Mot de passe oublié ?{' '}
            <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              Réinitialiser
            </span>
          </p>
        </footer>
      </section>
    </main>
  );
}