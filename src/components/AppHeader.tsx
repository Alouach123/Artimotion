
import { ArtimotionLogo } from '@/components/ArtimotionLogo';
import Link from 'next/link';
import { ThemeToggleButton } from './theme-toggle-button';

export function AppHeader() {
  return (
    <header className="py-4 px-4 md:px-6 bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <ArtimotionLogo />
        </Link>
        <ThemeToggleButton />
      </div>
    </header>
  );
}
