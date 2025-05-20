
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
import { Wand2, Loader2, RotateCcw, UploadCloud, ImageIcon as ImageIconLucide, Scissors, Sparkles, Film, CheckCircle2, AlertTriangle } from 'lucide-react';

// Added stage property to better manage visualization
export interface ExtendedProcessStep extends ProcessStep {
  stage: 'initial' | 'processing' | 'done' | 'error';
}

const PROCESS_STEPS_CONFIG: ExtendedProcessStep[] = [
  { id: 0, name: "Téléversement", statusText: "En attente du téléversement de l'œuvre...", icon: UploadCloud, stage: 'initial' },
  { id: 1, name: "Prêt à animer", statusText: "Œuvre téléversée. Prêt à démarrer.", icon: ImageIconLucide, stage: 'initial' },
  { id: 2, name: "Amélioration IA", statusText: "L'IA améliore la qualité de votre image...", icon: Wand2, stage: 'processing' },
  { id: 3, name: "Isolation du Personnage", statusText: "L'IA isole le personnage et l'arrière-plan...", icon: Scissors, stage: 'processing' },
  { id: 4, name: "Analyse de la Scène", statusText: "L'IA analyse la scène pour une histoire captivante...", icon: Sparkles, stage: 'processing' },
  { id: 5, name: "Création de l'Animation", statusText: "L'IA confectionne votre animation...", icon: Film, stage: 'processing' },
  { id: 6, name: "Animation Prête !", statusText: "Votre animation est terminée !", icon: CheckCircle2, stage: 'done' },
  { id: 7, name: "Erreur", statusText: "Une erreur est survenue.", icon: AlertTriangle, stage: 'error' },
];

export default function CreateAnimationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalImageDataUri, setOriginalImageDataUri] = useState<string | null>(null);
  
  const [isolatedCharacterUri, setIsolatedCharacterUri] = useState<string | null>(null);
  const [completedBackgroundUri, setCompletedBackgroundUri] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [animationUri, setAnimationUri] = useState<string | null>(null);

  const [currentStepId, setCurrentStepId] = useState<number>(0);
  const [failedStepId, setFailedStepId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetFileUpload, setResetFileUpload] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();

  const resetState = useCallback(() => {
    setUploadedFile(null);
    setOriginalImageDataUri(null);
    setIsolatedCharacterUri(null);
    setCompletedBackgroundUri(null);
    setScenario(null);
    setAnimationUri(null);
    setCurrentStepId(0);
    setFailedStepId(null);
    setIsLoading(false);
    setErrorMessage(null);
    setProgress(0);
    setResetFileUpload(true); 
    setTimeout(() => setResetFileUpload(false), 0);
  }, []);

  const handleFileSelect = (file: File, dataUri: string) => {
    resetState();
    setUploadedFile(file);
    setOriginalImageDataUri(dataUri);
    setCurrentStepId(1); // Ready to animate
    setResetFileUpload(false);
  };
  
  const startProcessing = async () => {
    if (!originalImageDataUri) {
      toast({ title: "Aucune image sélectionnée", description: "Veuillez d'abord télécharger une image.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setAnimationUri(null);
    setFailedStepId(null);
    setProgress(0);

    try {
      // Step 2: Amélioration IA (Placeholder)
      setCurrentStepId(2);
      setProgress(10); // Start of step 2
      // TODO: Implement actual AI call for image enhancement
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing time
      toast({ title: "Image Améliorée", description: "La qualité de l'image a été améliorée (simulation)." });
      setProgress(25); // End of step 2

      // Step 3: Isolate Character
      setCurrentStepId(3);
      const isolateInput: IsolateCharacterInput = { artworkDataUri: originalImageDataUri };
      const isolateOutput: IsolateCharacterOutput = await isolateCharacter(isolateInput);
      setIsolatedCharacterUri(isolateOutput.isolatedCharacterDataUri);
      setCompletedBackgroundUri(isolateOutput.completedBackgroundDataUri);
      toast({ title: "Personnage Isolé", description: "Le personnage et l'arrière-plan ont été séparés." });
      setProgress(50); // End of step 3

      // Step 4: Analyze Relationship
      setCurrentStepId(4);
      const analyzeInput: AnalyzeRelationshipInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
      };
      const analyzeOutput: AnalyzeRelationshipOutput = await analyzeRelationship(analyzeInput);
      setScenario(analyzeOutput.scenario);
      toast({ title: "Scénario Analysé", description: "Un scénario a été généré pour votre animation." });
      setProgress(75); // End of step 4
      
      // Step 5: Create Animation
      setCurrentStepId(5);
      const animationInput: CreateAnimationInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
        sceneDescription: analyzeOutput.scenario,
      };
      const animationOutput: CreateAnimationOutput = await createAnimation(animationInput);
      setAnimationUri(animationOutput.animationDataUri);
      setProgress(100); // End of step 5
      
      setCurrentStepId(6); // Done
      toast({ title: "Animation Créée !", description: "Votre œuvre d'art est maintenant animée.", variant: "default" });

    } catch (error: any) {
      console.error("Erreur durant le processus d'animation:", error);
      const message = error.message || "Une erreur inconnue est survenue.";
      setErrorMessage(message);
      setFailedStepId(currentStepId); // Record which step failed
      setCurrentStepId(7); // Error step
      setProgress(100); // Keep progress at 100 or at the point of failure if desired
      toast({
        title: "Erreur de Traitement",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showProcessVisualizer = (currentStepId >= 2 && currentStepId <= 5 && !animationUri && !errorMessage) || (currentStepId === 7 && errorMessage);
  const showAnimationResult = currentStepId === 6 && animationUri && !errorMessage;
  const showFileUpload = currentStepId < 2 || (currentStepId === 7 && errorMessage); // Show uploader if error and user wants to retry

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
          {showFileUpload && (
            <div className="w-full max-w-lg flex flex-col items-center space-y-6">
              <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} reset={resetFileUpload} />
              {currentStepId === 1 && originalImageDataUri && !isLoading && (
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
                    <Wand2 className="mr-2 h-5 w-5" />
                    Lancer l'Animation
                  </Button>
                </div>
              )}
            </div>
          )}

          {showProcessVisualizer && (
             <div className="w-full max-w-2xl">
                <ProcessVisualizer
                    currentStepId={currentStepId}
                    stepsConfig={PROCESS_STEPS_CONFIG}
                    progressPercentage={progress}
                    errorMessage={errorMessage}
                    failedStepId={failedStepId}
                    originalImageDataUri={originalImageDataUri}
                    isolatedCharacterUri={isolatedCharacterUri}
                    completedBackgroundUri={completedBackgroundUri}
                    scenario={scenario}
                />
            </div>
          )}
          
          {showAnimationResult && scenario && (
            <AnimationResult
              animationUri={animationUri!}
              scenario={scenario}
              onStartOver={resetState}
            />
          )}

          {currentStepId === 7 && errorMessage && ( 
             <div className="w-full max-w-2xl flex flex-col items-center space-y-4 mt-6">
              {/* ProcessVisualizer already shown above if currentStepId is 7 */}
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
