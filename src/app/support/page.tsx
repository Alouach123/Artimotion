
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, BookOpen } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Support et À Propos</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-accent" />
              À Propos de Nous
            </CardTitle>
            <CardDescription>
              Découvrez l'équipe derrière Artimotion et le contexte de ce projet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Projet de Module</h3>
              <p className="text-muted-foreground">
                Artimotion est un projet réalisé dans le cadre du module "Computer Vision".
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">L'Équipe</h3>
              <p className="text-muted-foreground">
                Ce projet a été développé par une équipe d'étudiants passionnés du Master Intelligence Artificielle et Technologies Émergentes (MIATE) :
              </p>
              <ul className="list-disc list-inside pl-4 mt-2 text-muted-foreground">
                <li>ALOUACH Abdennour</li>
                <li>EL HAMDAOUI Rania</li>
                <li>ELGARRAB Idris</li>
                <li>HAMMOUCHI Ouissal</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Supervision</h3>
              <p className="text-muted-foreground">
                Supervisé par : Prof. CHARROUD Anas
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-6 w-6 text-accent" />
              Contacter le Support
            </CardTitle>
            <CardDescription>
              Pour toute question, réclamation ou suggestion, n'hésitez pas à nous contacter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Vous pouvez nous joindre par email à l'adresse suivante :
            </p>
            <p className="font-semibold text-primary hover:underline">
              <a href="mailto:support@artimotion.example.com">support@artimotion.example.com</a>
            </p>
            <p className="text-muted-foreground">
              Nous nous efforcerons de vous répondre dans les plus brefs délais.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold text-foreground">Conseils d'utilisation :</h4>
              <ul className="list-disc list-inside pl-4 mt-2 text-muted-foreground text-sm">
                <li>Assurez-vous que votre image contient un personnage et un arrière-plan distincts.</li>
                <li>Les images de haute qualité donnent généralement de meilleurs résultats.</li>
                <li>Le processus de génération peut prendre quelques instants, merci de votre patience.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
