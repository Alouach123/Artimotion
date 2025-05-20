import { Palette } from 'lucide-react';
import type { SVGProps } from 'react';

export function ArtimotionLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="Artimotion Logo">
      <Palette className="h-8 w-8 text-accent" />
      {/* The text will use the accent color, which is yellow in both light and dark themes */}
      <span className="text-2xl font-bold text-accent">
        Artimotion
      </span>
    </div>
  );
}
