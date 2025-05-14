'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    // Simulation de connexion
    console.log('Connexion avec:', { email, password });
    setError(null);
    // Redirection ou autre logique ici
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <section className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo2ie.png"
              alt="Université 2iE Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Connexion Administrateur</h1>
          
          <div className="flex justify-center">
            <div className="flex space-x-3">
              <div className="w-5 h-5 bg-red-600 rounded-sm"></div>
              <div className="w-5 h-5 bg-yellow-400 rounded-sm"></div>
              <div className="w-5 h-5 bg-green-500 rounded-sm"></div>
              <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="admin@2ie-edu.org"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="••••••••"
            />
          </div>

            <button
              onClick={async (e) => {
              e.preventDefault();
              if (!email || !password) {
                setError('Veuillez remplir tous les champs.');
                return;
              }
              // Simulation de connexion
              console.log('Connexion avec:', { email, password });
              setError(null);
              // Redirection avec router.push
              window.location.href = '/admin';
              }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Connexion 
            </button>
        </div>

        <footer className="mt-6 text-center">
          <p className="text-base text-gray-600">
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