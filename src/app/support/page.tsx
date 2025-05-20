
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, BookOpen, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  subject: z.string().min(5, {
    message: "L'objet doit contenir au moins 5 caractères.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function SupportPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    toast({
      title: "Message envoyé !",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log("Form data submitted:", data);
    // Ici, vous intégreriez la logique d'envoi (par exemple, appel API)
    form.reset(); // Réinitialiser le formulaire après soumission
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Support et À Propos</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-6 w-6 text-accent" />
              Contacter le Support
            </CardTitle>
            <CardDescription>
              Pour toute question, réclamation ou suggestion, veuillez remplir le formulaire ci-dessous.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objet</FormLabel>
                      <FormControl>
                        <Input placeholder="Objet de votre message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Écrivez votre message ici..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer le Message
                </Button>
              </form>
            </Form>
            <div className="mt-6 border-t pt-4">
              <h4 className="font-semibold text-foreground">Conseils d'utilisation :</h4>
              <ul className="list-disc list-inside pl-4 mt-2 text-muted-foreground text-sm">
                <li>Assurez-vous que votre image contient un personnage et un arrière-plan distincts.</li>
                <li>Les images de haute qualité donnent généralement de meilleurs résultats.</li>
                <li>Le processus de génération peut prendre quelques instants, merci de votre patience.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-accent" />
              À Propos d'Artimotion
            </CardTitle>
            <CardDescription>
              Notre mission et l'équipe derrière ce projet innovant.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Notre Vision</h3>
              <p className="text-muted-foreground">
                Artimotion est né de la passion pour l'art et la technologie. C'est un projet développé dans le cadre de notre module "Computer Vision" en première année du Master Intelligence Artificielle et Technologies Émergentes (MIATE). Notre objectif est de fusionner la créativité humaine avec la puissance de l'intelligence artificielle pour offrir des outils uniques qui permettent de redécouvrir et de réinterpréter l'art sous une nouvelle forme dynamique.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">L'Équipe Créative</h3>
              <p className="text-muted-foreground">
                Ce projet a été conçu et réalisé par une équipe d'étudiants enthousiastes :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-sm mt-2 text-muted-foreground">
                <ul className="space-y-1">
                    <li>ALOUACH Abdennour</li>
                    <li>EL HAMDAOUI Rania</li>
                </ul>
                <ul className="space-y-1">
                    <li>ELGARRAB Idris</li>
                    <li>HAMMOUCHI Ouissal</li>
                </ul>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="font-semibold text-lg text-foreground">Supervision Académique</h3>
              <p className="text-muted-foreground">
                Nous avons eu le privilège d'être guidés et supervisés par le Professeur Anas CHARROUD tout au long de ce projet.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
