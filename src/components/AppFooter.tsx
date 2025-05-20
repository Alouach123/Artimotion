import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { ArtimotionLogo } from './ArtimotionLogo';

export function AppFooter() {
  return (
    <footer className="py-8 border-t border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Colonne 1: Artimotion Info */}
          <div className="flex flex-col items-center md:items-start">
            <ArtimotionLogo />
            <p className="text-sm mt-2 text-center md:text-left">
              Transformez votre art, une animation à la fois.
            </p>
            <p className="text-xs mt-1 text-center md:text-left">&copy; {new Date().getFullYear()} Artimotion. Tous droits réservés.</p>
          </div>

          {/* Colonne 2: Équipe du Projet */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-3">Projet de Module "Computer Vision"</h3>
            <h4 className="text-md font-medium text-foreground mb-1">Équipe :</h4>
            <ul className="text-sm space-y-1 list-disc list-inside ml-4">
              <li>ALOUACH Abdennour</li>
              <li>EL HAMDAOUI Rania</li>
              <li>ELGARRAB Idris</li>
              <li>HAMMOUCHI Ouissal</li>
            </ul>
            <p className="text-sm mt-3">
              <span className="font-medium text-foreground">Supervisé par :</span> Prof. CHARROUD Anas
            </p>
          </div>

          {/* Colonne 3: Réseaux Sociaux */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-foreground mb-2">Suivez-nous</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
