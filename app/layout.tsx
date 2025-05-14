// src/app/layout.tsx
import './globals.css'; // Importation des styles Tailwind
import Navbar from '@/components/Navbar'; // Importation de la barre de navigation
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

      </body>
    </html>
  );
}