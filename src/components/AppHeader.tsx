import { ArtimotionLogo } from '@/components/ArtimotionLogo';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="py-4 px-4 md:px-6 bg-card shadow-md">
      <div className="container mx-auto">
        <Link href="/">
          <ArtimotionLogo />
        </Link>
      </div>
    </header>
  );
}
