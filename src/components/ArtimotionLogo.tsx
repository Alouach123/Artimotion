import { Palette } from 'lucide-react';
import type { SVGProps } from 'react';

export function ArtimotionLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="Artimotion Logo">
      <Palette className="h-8 w-8 text-accent" />
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
        Artimotion
      </span>
    </div>
  );
}
