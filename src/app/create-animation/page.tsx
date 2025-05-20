
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FileUpload } from '@/components/FileUpload';
import { ProcessVisualizer, type ProcessStep } from '@/components/ProcessVisualizer';
import { AnimationResult } from '@/components/AnimationResult';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { isolateCharacter, type IsolateCharacterInput, type IsolateCharacterOutput } from '@/ai/flows/character-isolation';
import { analyzeRelationship, type AnalyzeRelationshipInput, type AnalyzeRelationshipOutput } from '@/ai/flows/relationship-analysis';
import { createAnimation, type CreateAnimationInput, type CreateAnimationOutput } from '@/ai/flows/animation-creation';
import { Wand2, Loader2, RotateCcw, UploadCloud, ImageIcon as ImageIconLucide, Scissors, Sparkles, Film, CheckCircle2, AlertTriangle } from 'lucide-react'; // Renamed ImageIcon to avoid conflict

const PROCESS_STEPS_CONFIG: ProcessStep[] = [
  { id: 0, name: "Téléversement", statusText: "En attente du téléversement de l'œuvre...", icon: UploadCloud },
  { id: 1, name: "Prêt à animer", statusText: "Œuvre téléversée. Prêt à démarrer.", icon: ImageIconLucide },
  { id: 2, name: "Amélioration IA", statusText: "L'IA améliore la qualité de votre image...", icon: Wand2 },
  { id: 3, name: "Isolation du Personnage", statusText: "L'IA isole le personnage et l'arrière-plan...", icon: Scissors },
  { id: 4, name: "Analyse de la Scène", statusText: "L'IA analyse la scène pour une histoire captivante...", icon: Sparkles },
  { id: 5, name: "Création de l'Animation", statusText: "L'IA confectionne votre animation...", icon: Film },
  { id: 6, name: "Animation Prête !", statusText: "Votre animation est terminée !", icon: CheckCircle2 },
  { id: 7, name: "Erreur", statusText: "Une erreur est survenue.", icon: AlertTriangle },
];

export default function CreateAnimationPage() {
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
  }, [toast]); // Added toast to dependency array as it's used in resetState indirectly (via startProcessing)

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
    setAnimationUri(null); // Reset previous animation

    try {
      // Step 2: Amélioration IA (Placeholder)
      setCurrentStep(2);
      // TODO: Implement actual AI call for image enhancement
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing time
      toast({ title: "Image Améliorée", description: "La qualité de l'image a été améliorée (simulation)." });

      // Step 3: Isolate Character
      setCurrentStep(3);
      const isolateInput: IsolateCharacterInput = { artworkDataUri: originalImageDataUri };
      const isolateOutput: IsolateCharacterOutput = await isolateCharacter(isolateInput);
      setIsolatedCharacterUri(isolateOutput.isolatedCharacterDataUri);
      setCompletedBackgroundUri(isolateOutput.completedBackgroundDataUri);
      toast({ title: "Personnage Isolé", description: "Le personnage et l'arrière-plan ont été séparés." });

      // Step 4: Analyze Relationship
      setCurrentStep(4);
      const analyzeInput: AnalyzeRelationshipInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
      };
      const analyzeOutput: AnalyzeRelationshipOutput = await analyzeRelationship(analyzeInput);
      setScenario(analyzeOutput.scenario);
      toast({ title: "Scénario Analysé", description: "Un scénario a été généré pour votre animation." });
      
      // Step 5: Create Animation
      setCurrentStep(5);
      const animationInput: CreateAnimationInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
        sceneDescription: analyzeOutput.scenario,
      };
      const animationOutput: CreateAnimationOutput = await createAnimation(animationInput);
      setAnimationUri(animationOutput.animationDataUri);
      
      setCurrentStep(6); // Done
      toast({ title: "Animation Créée !", description: "Votre œuvre d'art est maintenant animée.", variant: "default" });

    } catch (error: any) {
      console.error("Erreur durant le processus d'animation:", error);
      const message = error.message || "Une erreur inconnue est survenue.";
      setErrorMessage(message);
      setCurrentStep(7); // Error step
      toast({
        title: "Erreur de Traitement",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progressValue = currentStep > 1 && currentStep < 6 ? ((currentStep - 1) / (PROCESS_STEPS_CONFIG.length - 3)) * 100 : (currentStep === 6 || currentStep === 7 ? 100 : (currentStep === 1 ? 0 : 0));


  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Donnez Vie à Votre Art
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Téléversez votre image, laissez notre IA opérer sa magie, et regardez votre création s'animer.
        </p>
      </section>

      <Card className="mb-12 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Votre Espace Créatif</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Suivez les étapes pour transformer votre image en une animation unique.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          {currentStep < 2 && (
            <div className="w-full max-w-lg flex flex-col items-center space-y-6">
              <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} reset={resetFileUpload} />
              {currentStep === 1 && originalImageDataUri && (
                <div className="text-center space-y-4">
                   <div className="relative w-48 h-48 mx-auto">
                    <Image 
                      src={originalImageDataUri} 
                      alt="Aperçu de l'image téléversée" 
                      layout="fill" 
                      objectFit="contain" 
                      className="rounded-md border shadow-sm" 
                      data-ai-hint="art piece"
                    />
                   </div>
                  <Button onClick={startProcessing} disabled={isLoading || !originalImageDataUri} size="lg" className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                    Lancer l'Animation
                  </Button>
                </div>
              )}
            </div>
          )}

          {(currentStep >= 2 && currentStep < 6 && !animationUri) && (
             <div className="w-full max-w-2xl">
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
            </div>
          )}
          
          {currentStep === 6 && animationUri && scenario && (
            <AnimationResult
              animationUri={animationUri}
              scenario={scenario}
              onStartOver={resetState}
            />
          )}

          {currentStep === 7 && ( 
             <div className="w-full max-w-2xl flex flex-col items-center space-y-4">
              <ProcessVisualizer
                  currentStep={currentStep}
                  steps={PROCESS_STEPS_CONFIG}
                  progressValue={100}
                  errorMessage={errorMessage}
                  originalImageDataUri={originalImageDataUri}
                  isolatedCharacterUri={isolatedCharacterUri}
                  completedBackgroundUri={completedBackgroundUri}
               />
              <Button onClick={resetState} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Réessayer avec une nouvelle image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
