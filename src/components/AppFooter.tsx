import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { ArtimotionLogo } from './ArtimotionLogo';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AppFooter() {
  return (
    <footer className="py-8 border-t border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Colonne 1: Artimotion Info, Social, Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <ArtimotionLogo />
            <p className="text-sm text-center md:text-left">
              Transformez votre art, une animation à la fois.
            </p>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 text-center md:text-left">Suivez-nous</h3>
              <div className="flex justify-center md:justify-start space-x-4">
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
            <p className="text-xs mt-4 text-center md:text-left">&copy; {new Date().getFullYear()} Artimotion. Tous droits réservés.</p>
          </div>

          {/* Colonne 2: Équipe du Projet */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-3">Projet de Module "Computer Vision"</h3>
            <h4 className="text-md font-medium text-foreground mb-1">Équipe :</h4>
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              <ul className="space-y-1">
                <li>ALOUACH Abdennour</li>
                <li>EL HAMDAOUI Rania</li>
              </ul>
              <ul className="space-y-1">
                <li>ELGARRAB Idris</li>
                <li>HAMMOUCHI Ouissal</li>
              </ul>
            </div>
            <p className="text-sm mt-3">
              <span className="font-medium text-foreground">Supervisé par :</span> Prof. CHARROUD Anas
            </p>
          </div>

          {/* Colonne 3: Rester Informé */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">Restez Informé</h3>
            <p className="text-sm mb-3">Recevez les dernières nouvelles et mises à jour directement dans votre boîte de réception.</p>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="footer-email" className="sr-only">Votre email</Label>
              <Input type="email" id="footer-email" placeholder="Votre email" className="bg-background/50" />
              <Button type="submit" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Mail className="mr-2 h-4 w-4" />
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
