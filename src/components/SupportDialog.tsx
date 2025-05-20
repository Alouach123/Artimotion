
"use client";

import { Button } from "@/components/ui/button";
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
import { LifeBuoy } from 'lucide-react';

export function SupportDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-foreground hover:bg-primary/10 hover:text-primary">
          <LifeBuoy className="mr-2 h-5 w-5" />
          Support
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support Artimotion</DialogTitle>
          <DialogDescription>
            Besoin d'aide ou vous avez des questions ? Contactez-nous !
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Pour toute demande de support, veuillez nous envoyer un email à :
          </p>
          <p className="font-semibold text-primary mt-1">support@artimotion.example.com</p>
          <p className="text-sm text-muted-foreground mt-4">
            Nous ferons de notre mieux pour vous répondre dans les plus brefs délais.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
