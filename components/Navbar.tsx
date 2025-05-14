import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
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
            <Link href="/admin" className="ml-4 text-2xl font-bold tracking-tight">
              <span className="text-red-600">La</span> <span className="text-blue-500">Sécurité</span>{' '}
              <span className="text-green-500">2iE</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/admin"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/badges"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Badges
            </Link>
            <Link
              href="/admin/rooms"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Salles
            </Link>
            <Link
              href="/admin/requests"
              className="text-lg font-medium hover:text-yellow-400 transition-colors duration-200"
            >
              Demandes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}