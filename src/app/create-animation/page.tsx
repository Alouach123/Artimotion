
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
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

export interface ExtendedProcessStep extends ProcessStep {
  stage: 'initial' | 'processing' | 'done' | 'error';
}

// Simplified PROCESS_STEPS_CONFIG
const PROCESS_STEPS_CONFIG: ExtendedProcessStep[] = [
  { id: 0, name: "Téléversement", statusText: "En attente du téléversement de l'œuvre...", icon: UploadCloud, stage: 'initial' },
  { id: 1, name: "Prêt à animer", statusText: "Œuvre téléversée. Prêt à démarrer.", icon: ImageIconLucide, stage: 'initial' },
  { id: 2, name: "Traitement en cours", statusText: "L'IA transforme votre image...", icon: Wand2, stage: 'processing' },
  { id: 3, name: "Animation Prête !", statusText: "Votre animation est terminée !", icon: CheckCircle2, stage: 'done' },
  { id: 4, name: "Erreur", statusText: "Une erreur est survenue.", icon: AlertTriangle, stage: 'error' },
];

// Simpler step IDs
const INITIAL_UPLOAD_STEP_ID = 0;
const READY_TO_ANIMATE_STEP_ID = 1;
const PROCESSING_STEP_ID = 2;
const DONE_STEP_ID = 3;
const ERROR_STEP_ID = 4;


export default function CreateAnimationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalImageDataUri, setOriginalImageDataUri] = useState<string | null>(null);
  
  const [isolatedCharacterUri, setIsolatedCharacterUri] = useState<string | null>(null);
  const [completedBackgroundUri, setCompletedBackgroundUri] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [animationUri, setAnimationUri] = useState<string | null>(null);

  const [currentStepId, setCurrentStepId] = useState<number>(INITIAL_UPLOAD_STEP_ID);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [fileUploadKey, setFileUploadKey] = useState(0);

  const { toast } = useToast();

  const resetState = useCallback(() => {
    setUploadedFile(null);
    setOriginalImageDataUri(null);
    setIsolatedCharacterUri(null);
    setCompletedBackgroundUri(null);
    setScenario(null);
    setAnimationUri(null);
    setCurrentStepId(INITIAL_UPLOAD_STEP_ID);
    setIsLoading(false);
    setErrorMessage(null);
    setProgress(0);
    setFileUploadKey(prevKey => prevKey + 1);
  }, []);

  const handleFileSelect = (file: File, dataUri: string) => {
    resetState();
    setUploadedFile(file);
    setOriginalImageDataUri(dataUri);
    setCurrentStepId(READY_TO_ANIMATE_STEP_ID); 
  };
  
  const startProcessing = async () => {
    if (!originalImageDataUri) {
      toast({ title: "Aucune image sélectionnée", description: "Veuillez d'abord télécharger une image.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setAnimationUri(null);
    setProgress(0);
    setCurrentStepId(PROCESSING_STEP_ID);

    try {
      // Simulate Enhancement
      toast({ title: "Étape 1/3: Amélioration IA", description: "Amélioration de la qualité de l'image..." });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate work
      setProgress(33);

      // Isolate Character
      toast({ title: "Étape 2/3: Isolation du Personnage", description: "Isolation du personnage et de l'arrière-plan..." });
      const isolateInput: IsolateCharacterInput = { artworkDataUri: originalImageDataUri };
      const isolateOutput: IsolateCharacterOutput = await isolateCharacter(isolateInput);
      setIsolatedCharacterUri(isolateOutput.isolatedCharacterDataUri);
      setCompletedBackgroundUri(isolateOutput.completedBackgroundDataUri);
      setProgress(66);

      // Analyze Relationship
      toast({ title: "Étape 3/3: Analyse de la Scène", description: "Analyse de la scène pour l'animation..." });
      const analyzeInput: AnalyzeRelationshipInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
      };
      const analyzeOutput: AnalyzeRelationshipOutput = await analyzeRelationship(analyzeInput);
      setScenario(analyzeOutput.scenario);
      setProgress(80); // Slightly more for this step before final animation

      // Create Animation
      toast({ title: "Création de l'Animation", description: "L'IA confectionne votre animation..." });
      const animationInput: CreateAnimationInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
        sceneDescription: analyzeOutput.scenario,
      };
      const animationOutput: CreateAnimationOutput = await createAnimation(animationInput);
      setAnimationUri(animationOutput.animationDataUri);
      setProgress(100);
      
      setCurrentStepId(DONE_STEP_ID); 
      toast({ title: "Animation Créée !", description: "Votre œuvre d'art est maintenant animée.", variant: "default" });

    } catch (error: any) {
      console.error("Erreur durant le processus d'animation:", error);
      const message = error.message || "Une erreur inconnue est survenue.";
      setErrorMessage(message);
      setCurrentStepId(ERROR_STEP_ID); 
      toast({
        title: "Erreur de Traitement",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showProcessVisualizer = isLoading || (currentStepId === ERROR_STEP_ID && errorMessage !== null);
  const showAnimationResult = currentStepId === DONE_STEP_ID && animationUri && !errorMessage;
  const showFileUpload = !isLoading && !animationUri && currentStepId !== ERROR_STEP_ID;


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
              <FileUpload 
                key={fileUploadKey}
                onFileSelect={handleFileSelect} 
                disabled={isLoading} 
              />
              {currentStepId === READY_TO_ANIMATE_STEP_ID && originalImageDataUri && !isLoading && (
                <div className="text-center space-y-4">
                   <div className="relative w-48 h-48 mx-auto">
                    <Image 
                      src={originalImageDataUri} 
                      alt="Aperçu de l'image téléversée" 
                      fill 
                      style={{ objectFit: 'contain' }}
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
                    originalImageDataUri={originalImageDataUri}
                    // No longer passing intermediate URIs to the simplified visualizer
                    // isolatedCharacterUri={isolatedCharacterUri} 
                    // completedBackgroundUri={completedBackgroundUri}
                    // scenario={scenario}
                    // failedStepId is not needed in this simplified version, or can be derived if errorMessage is present
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

          {(currentStepId === ERROR_STEP_ID && errorMessage) && ( 
             <div className="w-full max-w-2xl flex flex-col items-center space-y-4 mt-6">
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
