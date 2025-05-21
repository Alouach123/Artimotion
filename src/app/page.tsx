
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Palette, Wand2, BrainCircuit, Sparkles, UploadCloud, Scissors, Film, Info, CheckCircle2 } from 'lucide-react';

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
      icon: Sparkles,
      title: "Animation IA Unique",
      description: "Notre processus innovant d'isolation de personnage et d'animation par IA donne vie à vos œuvres d'une manière totalement nouvelle.",
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
    { name: "Girl with a Pearl Earring", src: "https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg", alt: "Girl with a Pearl Earring par Johannes Vermeer", hint: "girl portrait" },
    { name: "Napoleon Crossing the Alps", src: "https://upload.wikimedia.org/wikipedia/commons/f/fd/David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg", alt: "Napoleon Crossing the Alps par Jacques-Louis David", hint: "napoleon horse" },
    { name: "George Washington", src: "https://upload.wikimedia.org/wikipedia/commons/1/12/Gilbert_Stuart%2C_George_Washington_%28Lansdowne_portrait%2C_1796%29.jpg", alt: "Portrait de George Washington par Gilbert Stuart", hint: "president portrait" },
    { name: "LOUIS XIV", src: "https://hyacinthe-rigaud.com/media/djcatalog2/images/item/16/louis-xivc_f.jpg", alt: "Portrait de Louis XIV par Hyacinthe Rigaud", hint: "king portrait" },
    { name: "La reine Marie-Antoinette", src: "https://fr.muzeo.com/sites/default/files/styles/image_basse_def/public/oeuvres/peinture/classique/la_reine_marieantoinette_dit_46976.jpg?itok=JFTcCunz", alt: "La reine Marie-Antoinette par Élisabeth Vigée Le Brun", hint: "queen portrait" },
    { name: "The Arnolfini Portrait", src: "https://i.guim.co.uk/img/media/90c361caa6a48d2e45fe2204923c74c17866b835/0_31_3286_4430/master/3286.jpg?width=700&quality=85&auto=format&fit=max&s=9ee8c90d9827d5c17edc15889413f6ce", alt: "The Arnolfini Portrait par Jan van Eyck", hint: "portrait couple" },
    { name: "The Scream", src: "https://i.guim.co.uk/img/media/8a840f693b91fe67d42555b24c6334e9298f4680/0_1476_2429_1456/master/2429.jpg?width=1900&dpr=2&s=none&crop=none", alt: "The Scream par Edvard Munch", hint: "scream painting" },
    { name: "Washington Crossing the Delaware", src: "https://www.wga.hu/art/l/leutze/delaware.jpg", alt: "Washington Crossing the Delaware par Emanuel Leutze", hint: "historical painting" },
    { name: "The Death of Socrates", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/David_-_The_Death_of_Socrates.jpg/1200px-David_-_The_Death_of_Socrates.jpg", alt: "The Death of Socrates par Jacques-Louis David", hint: "philosophy painting" },
    { name: "The School of Athens", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXPV6Fg4K83hspavmd5VaTiDBRyCcwGe2YTedYAD5C2Im6Sn82WfnLQQn1cOZEQOdI8ydUJa3AHZKyRVN-3__rFTweS5cZswmoaNXNRd2n0MsuXU7G_1872VXh_QkJgrDWTml8Reu1Uqvk/w1200-h630-p-k-no-nu/School_of_Athens.jpg", alt: "The School of Athens par Raphael", hint: "renaissance fresco" },
    { name: "The Last Supper", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1200px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg", alt: "The Last Supper par Leonardo da Vinci", hint: "religious painting" },
    { name: "Ludwig van Beethoven", src: "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/images/1FBGLJLA1mTEKyeDMEvTeZ.jpeg", alt: "Portrait de Ludwig van Beethoven par Joseph Karl Stieler", hint: "beethoven portrait" },
  ];

  const artExamplesRow1 = artExamples.slice(0, 6);
  const artExamplesRow2 = artExamples.slice(6, 12);

  const CarouselRow = ({ images, aspectRatioClass, animationDuration }: { images: typeof artExamplesRow1, aspectRatioClass: string, animationDuration: string }) => (
    <div className="carousel-container my-4">
      <div className="carousel-strip" style={{ animationDuration: animationDuration }}>
        {[...images, ...images].map((art, index) => ( // Duplicate for seamless loop
          <div key={`${art.name}-${index}`} className="carousel-image-wrapper w-64 md:w-72 lg:w-80"> {/* Adjust width as needed */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full">
              <div className={`relative w-full ${aspectRatioClass}`}>
                <Image
                  src={art.src}
                  alt={art.alt}
                  fill // Replaced layout="fill"
                  style={{objectFit:"cover"}} // Replaced objectFit="cover"
                  className="rounded-t-lg"
                  data-ai-hint={art.hint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{art.name}</h3>
                  <p className="text-muted-foreground text-sm">{art.alt}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
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
            <Button size="lg" variant="default" className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-shadow bg-accent text-accent-foreground hover:bg-accent/90">
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
                  src="https://youvecottmail.com/wp-content/uploads/2025/05/mvgwrjtfad-1200x686.jpg"
                  alt="Concept d'art fusionnant IA et techniques classiques"
                  width={1200}
                  height={686}
                  className="rounded-lg shadow-xl object-cover"
                  data-ai-hint="AI art"
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
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
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
            {artExamplesRow1.length > 0 && (
              <CarouselRow images={artExamplesRow1} aspectRatioClass="aspect-[4/5]" animationDuration="48s" />
            )}
            {artExamplesRow2.length > 0 && (
              <CarouselRow images={artExamplesRow2} aspectRatioClass="aspect-[3/2]" animationDuration="48s" />
            )}
            <div className="text-center mt-12">
              <Link href="/create-animation" passHref>
                <Button size="lg" variant="default" className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-shadow bg-accent text-accent-foreground hover:bg-accent/90">
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
