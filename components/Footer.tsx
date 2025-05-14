import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Image
            src="/logo2ie.png"
            alt="Université 2iE Logo"
            width={60}
            height={60}
            className="object-contain mb-2"
          />
          <p className="text-sm">© 2025 Université 2iE. Tous droits réservés.</p>
          <p className="text-sm">Contact : <a href="mailto:contact@2ie-edu.org" className="text-blue-400 hover:text-blue-300">contact@2ie-edu.org</a></p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.2ie-edu.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
            Site officiel
          </a>
          <a href="https://www.2ie-edu.org/contact" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}