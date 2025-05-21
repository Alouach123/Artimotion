
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, RotateCcw, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';


interface AnimationResultProps {
  animationUri: string;
  scenario: string;
  onStartOver: () => void;
}

export function AnimationResult({ animationUri, scenario, onStartOver }: AnimationResultProps) {
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [animationUrlForSharing, setAnimationUrlForSharing] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // For this example, we'll just use the animationUri directly for the "copy link"
    // In a real app, you'd upload this to a host and get a shareable URL.
    setAnimationUrlForSharing(typeof window !== 'undefined' ? window.location.href : ''); // Placeholder
  }, []);


  const handleDownload = () => {
    if (!isMounted) return;
    try {
      const link = document.createElement('a');
      link.href = animationUri;
      // Try to determine file extension from data URI MIME type
      const mimeType = animationUri.substring(animationUri.indexOf(':') + 1, animationUri.indexOf(';'));
      let extension = 'gif'; // default
      if (mimeType === 'image/gif') extension = 'gif';
      else if (mimeType === 'video/mp4') extension = 'mp4';
      else if (mimeType === 'video/webm') extension = 'webm';
      // Add more types as needed
      
      link.download = `artimotion_animation.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Téléchargement Initié",
        description: `Votre animation artimotion_animation.${extension} est en cours de téléchargement.`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Erreur de Téléchargement",
        description: "Impossible de télécharger l'animation. Essayez de copier le Data URI.",
        variant: "destructive",
      });
    }
  };
  
  const copyToClipboard = async (text: string, type: string) => {
    if (!isMounted || !navigator.clipboard) {
        toast({ title: "Erreur", description: "Le presse-papiers n'est pas disponible.", variant: "destructive" });
        return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `${type} copié!`, description: `Le ${type.toLowerCase()} a été copié dans le presse-papiers.` });
    } catch (err) {
      toast({ title: `Échec de la copie du ${type.toLowerCase()}`, description: "Veuillez réessayer.", variant: "destructive" });
    }
  };

  if (!isMounted) {
    return (
      <Card className="w-full shadow-xl animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mt-1"></div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-full aspect-video bg-muted rounded-lg"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="flex space-x-2 w-full">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 bg-muted rounded flex-1"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Basic check for video MIME types, otherwise assume image (GIF)
  const isVideo = animationUri.startsWith('data:video/');

  return (
    <Card className="w-full shadow-xl transform transition-all duration-500 ease-out scale-100">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl text-primary">Votre Animation est Prête !</CardTitle>
        <CardDescription>"{scenario}"</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-inner bg-muted-foreground/10">
          {isVideo ? (
            <video
              src={animationUri}
              controls
              autoPlay
              loop
              className="w-full h-full object-contain"
              data-ai-hint="animated scene"
            />
          ) : (
            <Image
              src={animationUri}
              alt="Animation générée"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
              data-ai-hint="animated scene"
              unoptimized={true} // Important for data URIs in next/image
            />
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button onClick={handleDownload} className="w-full sm:w-auto" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Télécharger
          </Button>
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto" size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Partager
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Partager votre animation</DialogTitle>
                <DialogDescription>
                  Copiez le lien (si hébergé) ou le Data URI pour partager votre création.
                  Pour un partage facile sur les réseaux sociaux, téléchargez d'abord l'animation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="link" className="text-right">
                    Lien
                  </Label>
                  <Input id="link" value={animationUrlForSharing} readOnly className="col-span-3" />
                </div>
                 <Button onClick={() => copyToClipboard(animationUrlForSharing, 'Lien')} variant="secondary" className="w-full">Copier le lien</Button>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="data-uri" className="text-right">
                    Data URI
                  </Label>
                  <Input id="data-uri" value={animationUri.substring(0,50) + "..."} readOnly className="col-span-3" />
                </div>
                <Button onClick={() => copyToClipboard(animationUri, 'Data URI')} variant="secondary" className="w-full">Copier Data URI</Button>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Fermer</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Button onClick={onStartOver} variant="ghost" className="text-muted-foreground hover:text-primary">
          <RotateCcw className="mr-2 h-4 w-4" />
          Créer une autre animation
        </Button>
      </CardContent>
    </Card>
  );
}
