import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Artimotion - Transformez votre art en animation',
  description: 'Transformez vos œuvres d\'art en animations captivantes avec Artimotion !',
  icons: {
    icon: '/palette-favicon.svg', // Updated to use the new SVG favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          <main className="flex-grow">
            {children}
          </main>
          <AppFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
