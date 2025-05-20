"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { FileUpload } from '@/components/FileUpload';
import { ProcessVisualizer, type ProcessStep } from '@/components/ProcessVisualizer';
import { AnimationResult } from '@/components/AnimationResult';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { isolateCharacter, type IsolateCharacterInput, type IsolateCharacterOutput } from '@/ai/flows/character-isolation';
import { analyzeRelationship, type AnalyzeRelationshipInput, type AnalyzeRelationshipOutput } from '@/ai/flows/relationship-analysis';
import { createAnimation, type CreateAnimationInput, type CreateAnimationOutput } from '@/ai/flows/animation-creation';
import { Lightbulb, Palette, Wand2, HelpCircle, Target, Loader2, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Sparkles, Scissors, Users, Film, UploadCloud, Image as ImageIcon } from 'lucide-react';


const PROCESS_STEPS_CONFIG: ProcessStep[] = [
  { id: 0, name: "Téléversement", statusText: "En attente du téléversement de l'œuvre...", icon: UploadCloud },
  { id: 1, name: "Prêt à animer", statusText: "Œuvre téléversée. Prêt à démarrer.", icon: ImageIcon },
  { id: 2, name: "Isolation du Personnage", statusText: "L'IA isole le personnage et l'arrière-plan...", icon: Scissors },
  { id: 3, name: "Analyse de la Scène", statusText: "L'IA analyse la scène pour une histoire captivante...", icon: Sparkles },
  { id: 4, name: "Création de l'Animation", statusText: "L'IA confectionne votre animation...", icon: Film },
  { id: 5, name: "Animation Prête !", statusText: "Votre animation est terminée !", icon: CheckCircle2 },
  { id: 6, name: "Erreur", statusText: "Une erreur est survenue.", icon: AlertTriangle },
];

export default function HomePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalImageDataUri, setOriginalImageDataUri] = useState<string | null>(null);
  
  const [isolatedCharacterUri, setIsolatedCharacterUri] = useState<string | null>(null);
  const [completedBackgroundUri, setCompletedBackgroundUri] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [animationUri, setAnimationUri] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(0); // Matches ProcessStep id
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetFileUpload, setResetFileUpload] = useState<boolean>(false);

  const { toast } = useToast();

  const resetState = useCallback(() => {
    setUploadedFile(null);
    setOriginalImageDataUri(null);
    setIsolatedCharacterUri(null);
    setCompletedBackgroundUri(null);
    setScenario(null);
    setAnimationUri(null);
    setCurrentStep(0);
    setIsLoading(false);
    setErrorMessage(null);
    setResetFileUpload(true); 
    // After triggering reset, set it back to false for next upload cycle
    setTimeout(() => setResetFileUpload(false), 0);
  }, []);

  const handleFileSelect = (file: File, dataUri: string) => {
    resetState(); // Reset previous state before new file upload
    setUploadedFile(file);
    setOriginalImageDataUri(dataUri);
    setCurrentStep(1); // Ready to animate
    setResetFileUpload(false); // Ensure reset is false for the current upload
  };
  
  const startProcessing = async () => {
    if (!originalImageDataUri) {
      toast({ title: "Aucune image sélectionnée", description: "Veuillez d'abord télécharger une image.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Step 2: Isolate Character
      setCurrentStep(2);
      const isolateInput: IsolateCharacterInput = { artworkDataUri: originalImageDataUri };
      const isolateOutput: IsolateCharacterOutput = await isolateCharacter(isolateInput);
      setIsolatedCharacterUri(isolateOutput.isolatedCharacterDataUri);
      setCompletedBackgroundUri(isolateOutput.completedBackgroundDataUri);
      toast({ title: "Personnage Isolé", description: "Le personnage et l'arrière-plan ont été séparés." });

      // Step 3: Analyze Relationship
      setCurrentStep(3);
      const analyzeInput: AnalyzeRelationshipInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
      };
      const analyzeOutput: AnalyzeRelationshipOutput = await analyzeRelationship(analyzeInput);
      setScenario(analyzeOutput.scenario);
      toast({ title: "Scénario Analysé", description: "Un scénario a été généré pour votre animation." });
      
      // Step 4: Create Animation
      setCurrentStep(4);
      const animationInput: CreateAnimationInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
        sceneDescription: analyzeOutput.scenario,
      };
      const animationOutput: CreateAnimationOutput = await createAnimation(animationInput);
      setAnimationUri(animationOutput.animationDataUri);
      
      setCurrentStep(5); // Done
      toast({ title: "Animation Créée !", description: "Votre œuvre d'art est maintenant animée.", variant: "default" });

    } catch (error: any) {
      console.error("Erreur durant le processus d'animation:", error);
      const message = error.message || "Une erreur inconnue est survenue.";
      setErrorMessage(message);
      setCurrentStep(6); // Error step
      toast({
        title: "Erreur de Traitement",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progressValue = currentStep > 1 && currentStep < 5 ? ((currentStep - 1) / 3) * 100 : (currentStep === 5 || currentStep === 6 ? 100 : 0);

  return (
    <>
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Transformez vos œuvres d'art en animations captivantes !
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Artimotion donne vie à votre art. Téléchargez une image, et laissez notre IA créer une animation unique en quelques instants.
          </p>
        </section>

        <Card className="mb-12 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Commencez Votre Animation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {currentStep < 2 && (
              <>
                <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} reset={resetFileUpload} />
                {currentStep === 1 && originalImageDataUri && (
                  <div className="text-center space-y-4">
                     <Image src={originalImageDataUri} alt="Aperçu de l'image téléversée" width={200} height={200} className="rounded-md object-contain mx-auto border shadow-sm" data-ai-hint="art piece" />
                    <Button onClick={startProcessing} disabled={isLoading} size="lg">
                      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                      Lancer l'Animation
                    </Button>
                  </div>
                )}
              </>
            )}

            {(currentStep >= 2 && currentStep < 5 && !animationUri) && (
              <ProcessVisualizer
                currentStep={currentStep}
                steps={PROCESS_STEPS_CONFIG}
                progressValue={progressValue}
                errorMessage={errorMessage}
                originalImageDataUri={originalImageDataUri}
                isolatedCharacterUri={isolatedCharacterUri}
                completedBackgroundUri={completedBackgroundUri}
                scenario={scenario}
              />
            )}
            
            {currentStep === 5 && animationUri && scenario && (
              <AnimationResult
                animationUri={animationUri}
                scenario={scenario}
                onStartOver={resetState}
              />
            )}

            {currentStep === 6 && ( // Error state display
               <div className="w-full flex flex-col items-center space-y-4">
                <ProcessVisualizer
                    currentStep={currentStep}
                    steps={PROCESS_STEPS_CONFIG}
                    progressValue={100} // Progress is complete but with error
                    errorMessage={errorMessage}
                    originalImageDataUri={originalImageDataUri}
                    isolatedCharacterUri={isolatedCharacterUri}
                    completedBackgroundUri={completedBackgroundUri}
                 />
                <Button onClick={resetState} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Réessayer avec une nouvelle image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Comment ça fonctionne ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: UploadCloud, title: "1. Téléchargez votre image", description: "Importez une image artistique contenant un personnage et son arrière-plan." },
              { icon: Scissors, title: "2. Séparation Magique", description: "Notre IA isole le personnage et complète l'arrière-plan." },
              { icon: Sparkles, title: "3. Analyse Créative", description: "Un scénario logique est créé pour lier personnage et décor." },
              { icon: Film, title: "4. Animation Instantanée", description: "Une animation de 5 secondes prend vie, fusionnant tous les éléments." },
            ].map((step, idx) => (
              <Card key={idx} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-accent/20 p-3 rounded-full w-fit mb-2">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">Pourquoi choisir Artimotion ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
             {[
              { icon: Lightbulb, title: "Expérience Intuitive", description: "Interface conviviale pour une transformation d'art sans effort." },
              { icon: Target, title: "Technologie de Pointe", description: "Modèles de Computer Vision avancés pour des résultats de haute qualité." },
              { icon: Palette, title: "Créativité Sans Limites", description: "Explorez de nouvelles dimensions artistiques et partagez vos créations." },
            ].map((feature, idx) => (
              <Card key={idx} className="shadow-lg hover:shadow-xl transition-shadow">
                 <CardHeader className="flex flex-row items-center gap-3">
                   <div className="bg-primary/10 p-2 rounded-md">
                    <feature.icon className="w-6 h-6 text-primary" />
                   </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
