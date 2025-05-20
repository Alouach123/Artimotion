import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="py-8 border-t border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1: Artimotion Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Artimotion</h3>
            <p className="text-sm mb-1">
              Transformez votre art, une animation à la fois.
            </p>
            <p className="text-xs">&copy; {new Date().getFullYear()} Artimotion. Tous droits réservés.</p>
          </div>

          {/* Colonne 2: Équipe du Projet */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Projet de Module "Computer Vision"</h3>
            <ul className="text-sm space-y-1">
              <li>ALOUACH Abdennour</li>
              <li>EL HAMDAOUI Rania</li>
              <li>ELGARRAB Idris</li>
              <li>HAMMOUCHI Ouissal</li>
            </ul>
          </div>

          {/* Colonne 3: Réseaux Sociaux */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Suivez-nous</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              {/* Ajoutez d'autres icônes de réseaux sociaux ici si nécessaire */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
