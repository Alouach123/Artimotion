
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
import { Wand2, Loader2, RotateCcw, UploadCloud, ImageIcon as ImageIconLucide, Scissors, Sparkles, Film, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

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
  { id: 6, name: "Finalisation", statusText: "Finalisation de l'animation...", icon: Wand2, stage: 'processing' }, // Nouvelle étape de finalisation
  { id: 7, name: "Animation Prête !", statusText: "Votre animation est terminée !", icon: CheckCircle2, stage: 'done' },
  { id: 8, name: "Erreur", statusText: "Une erreur est survenue.", icon: AlertTriangle, stage: 'error' },
];

// IDs pour une meilleure lisibilité
const INITIAL_UPLOAD_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Téléversement")!.id;
const READY_TO_ANIMATE_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Prêt à animer")!.id;
const ENHANCEMENT_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Amélioration IA")!.id;
const ISOLATION_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Isolation du Personnage")!.id;
const ANALYSIS_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Analyse de la Scène")!.id;
const CREATION_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Création de l'Animation")!.id;
const FINALIZATION_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Finalisation")!.id;
const DONE_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Animation Prête !")!.id;
const ERROR_STEP_ID = PROCESS_STEPS_CONFIG.find(step => step.name === "Erreur")!.id;


export default function CreateAnimationPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalImageDataUri, setOriginalImageDataUri] = useState<string | null>(null);
  
  const [isolatedCharacterUri, setIsolatedCharacterUri] = useState<string | null>(null);
  const [completedBackgroundUri, setCompletedBackgroundUri] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [animationUri, setAnimationUri] = useState<string | null>(null);

  const [currentStepId, setCurrentStepId] = useState<number>(INITIAL_UPLOAD_STEP_ID);
  const [failedStepId, setFailedStepId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetFileUpload, setResetFileUpload] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();
  // Using a ref for AbortController as it doesn't need to trigger re-renders
  const abortControllerRef = useRef<AbortController | null>(null);


  const resetState = useCallback(() => {
    setUploadedFile(null);
    setOriginalImageDataUri(null);
    setIsolatedCharacterUri(null);
    setCompletedBackgroundUri(null);
    setScenario(null);
    setAnimationUri(null);
    setCurrentStepId(INITIAL_UPLOAD_STEP_ID);
    setFailedStepId(null);
    setIsLoading(false);
    setErrorMessage(null);
    setProgress(0);
    setResetFileUpload(true); 
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort any ongoing request
      abortControllerRef.current = null;
    }
    setTimeout(() => setResetFileUpload(false), 0);
  }, []);

  const handleFileSelect = (file: File, dataUri: string) => {
    resetState();
    setUploadedFile(file);
    setOriginalImageDataUri(dataUri);
    setCurrentStepId(READY_TO_ANIMATE_STEP_ID); 
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
    // abortControllerRef.current = new AbortController(); // For potential future use with Genkit cancellation
    // const signal = abortControllerRef.current.signal;

    try {
      // Step 1 of processing: Amélioration IA
      setCurrentStepId(ENHANCEMENT_STEP_ID);
      // TODO: Implement actual AI call for image enhancement
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing time
      // if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
      toast({ title: "Image Améliorée", description: "La qualité de l'image a été améliorée (simulation)." });
      setProgress(20);

      // Step 2 of processing: Isolate Character
      setCurrentStepId(ISOLATION_STEP_ID);
      const isolateInput: IsolateCharacterInput = { artworkDataUri: originalImageDataUri };
      const isolateOutput: IsolateCharacterOutput = await isolateCharacter(isolateInput); // TODO: Pass signal if supported
      // if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
      setIsolatedCharacterUri(isolateOutput.isolatedCharacterDataUri);
      setCompletedBackgroundUri(isolateOutput.completedBackgroundDataUri);
      toast({ title: "Personnage Isolé", description: "Le personnage et l'arrière-plan ont été séparés." });
      setProgress(40);

      // Step 3 of processing: Analyze Relationship
      setCurrentStepId(ANALYSIS_STEP_ID);
      const analyzeInput: AnalyzeRelationshipInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
      };
      const analyzeOutput: AnalyzeRelationshipOutput = await analyzeRelationship(analyzeInput); // TODO: Pass signal if supported
      // if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
      setScenario(analyzeOutput.scenario);
      toast({ title: "Scénario Analysé", description: "Un scénario a été généré pour votre animation." });
      setProgress(60);
      
      // Step 4 of processing: Create Animation
      setCurrentStepId(CREATION_STEP_ID);
      const animationInput: CreateAnimationInput = {
        characterDataUri: isolateOutput.isolatedCharacterDataUri,
        backgroundDataUri: isolateOutput.completedBackgroundDataUri,
        sceneDescription: analyzeOutput.scenario,
      };
      const animationOutput: CreateAnimationOutput = await createAnimation(animationInput); // TODO: Pass signal if supported
      // if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
      // Defer setting animationUri until after finalization
      setProgress(80); 
      
      // Step 5 of processing: Finalisation
      setCurrentStepId(FINALIZATION_STEP_ID);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate finalization
      // if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
      setAnimationUri(animationOutput.animationDataUri); // Set URI now
      toast({ title: "Finalisation", description: "L'animation est en cours de finalisation." });
      setProgress(100);
      
      setCurrentStepId(DONE_STEP_ID); 
      toast({ title: "Animation Créée !", description: "Votre œuvre d'art est maintenant animée.", variant: "default" });

    } catch (error: any) {
      console.error("Erreur durant le processus d'animation:", error);
      if (error.name === 'AbortError') {
        setErrorMessage("Processus annulé par l'utilisateur.");
        setFailedStepId(currentStepId);
        setCurrentStepId(ERROR_STEP_ID);
        toast({
          title: "Processus Annulé",
          description: "L'opération a été annulée.",
          variant: "destructive",
        });
      } else {
        const message = error.message || "Une erreur inconnue est survenue.";
        setErrorMessage(message);
        setFailedStepId(currentStepId); 
        setCurrentStepId(ERROR_STEP_ID); 
        toast({
          title: "Erreur de Traitement",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null; // Clear the controller
    }
  };

  const handleStopProcessing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // This would signal Genkit flows if they supported it
    }
    // For a "soft stop" that immediately reflects in UI:
    setIsLoading(false);
    setErrorMessage("Processus arrêté par l'utilisateur.");
    setFailedStepId(currentStepId); 
    setCurrentStepId(ERROR_STEP_ID);
    toast({
      title: "Processus Arrêté",
      description: "L'animation a été annulée par l'utilisateur.",
      variant: "destructive",
    });
  }, [currentStepId, toast]);

  const showProcessVisualizer = (isLoading && !animationUri && !errorMessage) || (currentStepId === ERROR_STEP_ID && errorMessage !== null);
  const showAnimationResult = currentStepId === DONE_STEP_ID && animationUri && !errorMessage;
  const showFileUpload = currentStepId < ENHANCEMENT_STEP_ID || (currentStepId === ERROR_STEP_ID && errorMessage !== null);


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
              {currentStepId === READY_TO_ANIMATE_STEP_ID && originalImageDataUri && !isLoading && (
                <div className="text-center space-y-4">
                   <div className="relative w-48 h-48 mx-auto">
                    <Image 
                      src={originalImageDataUri} 
                      alt="Aperçu de l'image téléversée" 
                      fill // Changed from layout="fill"
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
                {isLoading && !animationUri && !errorMessage && (
                  <Button onClick={handleStopProcessing} variant="destructive" size="lg" className="mt-6 w-full sm:w-auto">
                    <XCircle className="mr-2 h-5 w-5" />
                    Arrêter le processus
                  </Button>
                )}
            </div>
          )}
          
          {showAnimationResult && scenario && (
            <AnimationResult
              animationUri={animationUri!}
              scenario={scenario}
              onStartOver={resetState}
            />
          )}

          {currentStepId === ERROR_STEP_ID && errorMessage && ( 
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

    