export default function RequestsPage() {
  const requests = [
    { id: 1, user: 'Jean Dupont', room: 'A101', date: '2025-05-14', status: 'En attente' },
    { id: 2, user: 'Marie Curie', room: 'B202', date: '2025-05-14', status: 'En attente' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Demandes d&apos;accès</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Liste des demandes</h2>
        <table className="min-w-full mt-4 divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Utilisateur</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Salle</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{request.user}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.room}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.status}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-green-600 hover:underline mr-2">Approuver</button>
                  <button className="text-red-600 hover:underline">Refuser</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}