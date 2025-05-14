import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Personnes présentes</h2>
          <p className="text-4xl font-bold text-blue-600">42</p>
          <p className="text-gray-500">Dans toutes les salles</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Badges enregistrés</h2>
          <p className="text-4xl font-bold text-blue-600">128</p>
          <Link href="/admin/badges" className="text-blue-500 hover:underline">
            Voir détails
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Demandes d&apos;accès</h2>
          <p className="text-4xl font-bold text-blue-600">5</p>
          <Link href="/admin/requests" className="text-blue-500 hover:underline">
            Gérer les demandes
          </Link>
        </div>
      </div>
    </div>
  );
}