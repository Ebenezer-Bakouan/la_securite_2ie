"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [Nom, setNom] = useState("");
  const [pays, setPays] = useState("");
  const [region, setRegion] = useState("");
  const [village, setVillage] = useState("");
  const [distance, setDistance] = useState("");


  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple
    if (!Nom || !pays || !region || !village || !distance) {
      alert("Tous les champs sont requis.");
      return;
    }


    try {
      const res = await axios.post("http://localhost:4000/Inscription", {
        nom: Nom,
        pays: pays,
        region: region,
        village: village,
        distance: distance
      });

      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err) {
      alert("Échec de la connexion au serveur ");
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 justify-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Inscription
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Votre nom"
            value={Nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            pays
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Votre pays"
            value={pays}
            onChange={(e) => setPays(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            region
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Votre region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Votre village"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telephone
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
