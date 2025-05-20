
import { ArtimotionLogo } from '@/components/ArtimotionLogo';
import Link from 'next/link';
import { ThemeToggleButton } from './theme-toggle-button';
import { Button } from '@/components/ui/button';
import { Wand2, LifeBuoy } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-4 px-4 md:px-6 bg-card shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
            <ArtimotionLogo />
          </a>
        </Link>
        <div className="flex items-center space-x-3">
          <Link href="/create-animation" passHref legacyBehavior>
            <Button variant="ghost" className="text-foreground hover:bg-primary/10 hover:text-primary">
              <Wand2 className="mr-2 h-5 w-5" />
              Créer une Animation
            </Button>
          </Link>
          <Link href="/support" passHref legacyBehavior>
            <Button variant="ghost" className="text-foreground hover:bg-primary/10 hover:text-primary">
              <LifeBuoy className="mr-2 h-5 w-5" />
              Support
            </Button>
          </Link>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
