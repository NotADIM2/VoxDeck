import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoxDeck - Wispr Flow Voice to Investor Pitch Deck',
  description:
    'Turn unstructured voice brain-dumps into professional 10-slide startup pitch decks and 60-second investor scripts using Google Gemini 1.5 Flash.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
