import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from './providers';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = { title: 'FitLog — Workout Library', description: 'Train with intent. Log every set.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppProvider><Header />{children}<Footer /></AppProvider></body></html>;
}
