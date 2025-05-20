
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Palette, Wand2, Brain, GalleryVertical, UploadCloud, Scissors, Sparkles, Film, Info, BrainCircuit, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Lightbulb,
      title: "Expérience Intuitive",
      description: "Interface conviviale pour une transformation d'art sans effort.",
    },
    {
      icon: BrainCircuit, 
      title: "Technologie de Pointe",
      description: "Modèles d'IA avancés pour des résultats de haute qualité et des animations uniques.",
    },
    {
      icon: Palette,
      title: "Créativité Sans Limites",
      description: "Explorez de nouvelles dimensions artistiques et partagez vos créations animées.",
    },
  ];

  const howItWorksSteps = [
    { id: 1, icon: UploadCloud, title: "1. Téléversez votre image", description: "Importez une image artistique contenant un personnage et son arrière-plan." },
    { id: 2, icon: Wand2, title: "2. Amélioration IA", description: "Notre IA améliore la qualité de votre image, la débruite et la rend plus réaliste." },
    { id: 3, icon: Scissors, title: "3. Séparation Magique", description: "L'IA isole le personnage et complète intelligemment l'arrière-plan." },
    { id: 4, icon: Sparkles, title: "4. Analyse Créative", description: "Un scénario logique et imaginatif est créé pour lier personnage et décor." },
    { id: 5, icon: Film, title: "5. Animation Instantanée", description: "Une animation de 5 secondes prend vie, fusionnant tous les éléments avec fluidité." },
  ];

  const artExamples = [
    { src: "https://placehold.co/600x400.png", alt: "Exemple d'art généré par IA 1", hint: "abstract colorful" },
    { src: "https://placehold.co/600x400.png", alt: "Exemple d'art classique revisité par IA 1", hint: "classic painting" },
    { src: "https://placehold.co/600x400.png", alt: "Concept d'animation IA 1", hint: "fantasy animation" },
    { src: "https://placehold.co/600x400.png", alt: "Personnage animé par IA", hint: "animated character" },
    { src: "https://placehold.co/600x400.png", alt: "Paysage dynamique", hint: "dynamic landscape" },
    { src: "https://placehold.co/600x400.png", alt: "Création originale IA", hint: "ai original" },
  ];

  return (
    <>
      {/* AppHeader et AppFooter sont maintenant dans RootLayout */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-xl shadow-lg mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="text-accent">
              Artimotion
            </span>: Donnez Vie à Votre Art
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transformez vos images statiques en animations captivantes et explorez la fusion de l'art classique et de la technologie moderne. Libérez votre créativité avec la puissance de l'intelligence artificielle.
          </p>
          <Link href="/create-animation" passHref>
            <Button size="lg" className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-shadow bg-accent text-accent-foreground hover:bg-accent/90">
              <Wand2 className="mr-2 h-5 w-5" />
              Commencer à Animer
            </Button>
          </Link>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-10">Comment ça fonctionne ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {howItWorksSteps.map((step, idx) => (
              <Card key={idx} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm border border-border hover:border-primary">
                <CardHeader className="flex flex-col items-center p-6">
                  <div className="bg-accent/20 p-4 rounded-full w-fit mb-4">
                    <step.icon className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI and Art History Section */}
        <section className="mb-16 py-12 bg-card rounded-lg shadow-md">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-8">L'IA au Service de l'Art: Une Nouvelle Ère Créative</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image 
                  src="https://placehold.co/800x600.png" 
                  alt="Concept d'art fusionnant IA et techniques classiques" 
                  width={800} 
                  height={600} 
                  className="rounded-lg shadow-xl object-cover"
                  data-ai-hint="ai art concept"
                />
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  L'intelligence artificielle redéfinit les frontières de la création artistique. Chez Artimotion, nous exploitons cette technologie pour offrir des outils innovants qui permettent aux artistes et aux créateurs de tous niveaux d'explorer de nouvelles formes d'expression.
                </p>
                <p>
                  De la Renaissance à l'Impressionnisme, chaque époque a vu l'art évoluer avec les outils de son temps. Aujourd'hui, l'IA n'est pas un remplacement de la créativité humaine, mais un puissant collaborateur. Elle peut analyser des styles, générer des variations, et surtout, comme avec Artimotion, animer l'immobile pour raconter de nouvelles histoires.
                </p>
                <p>
                  Imaginez donner vie aux personnages de vos tableaux préférés, ou voir un paysage statique s'animer au rythme d'une brise numérique. C'est la promesse d'Artimotion : un pont entre l'héritage artistique et le futur numérique.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Artimotion Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-10">Pourquoi choisir Artimotion ?</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
             {features.map((feature, idx) => (
              <Card key={idx} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm border border-border hover:border-primary">
                 <CardHeader className="flex flex-row items-center gap-4 p-6">
                   <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-7 h-7 text-primary" />
                   </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-12 py-12 bg-card rounded-lg shadow-md">
           <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-10">Galerie d'Inspirations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artExamples.map((art, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                  <Image 
                    src={art.src} 
                    alt={art.alt} 
                    width={600} 
                    height={400} 
                    className="w-full h-auto object-cover aspect-[3/2]" 
                    data-ai-hint={art.hint} 
                  />
                  <CardContent className="p-4">
                    <p className="text-muted-foreground text-sm text-center">{art.alt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/create-animation" passHref>
                <Button size="lg" className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-shadow bg-accent text-accent-foreground hover:bg-accent/90">
                  <Palette className="mr-2 h-5 w-5" />
                  Animez Votre Propre Œuvre
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
