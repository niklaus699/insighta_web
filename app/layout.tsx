import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <nav className="border-b p-4 flex gap-6 bg-gray-50 text-black">
          <a href="/dashboard" className="font-bold">Insighta</a>
          <a href="/profiles">Profiles</a>
          <a href="/search">Search</a>
          <a href="/account" className="ml-auto">Account</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}