
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'; // Added XCircle
import type { Icon } from 'lucide-react'; // Import Icon type

export interface ProcessStep {
  id: number;
  name: string;
  statusText: string; // This can be the default text
  icon: Icon; // Use the Icon type from lucide-react
  stage: 'initial' | 'processing' | 'done' | 'error';
}

interface ProcessVisualizerProps {
  currentStepId: number;
  stepsConfig: ProcessStep[];
  progressPercentage: number;
  errorMessage?: string | null;
  failedStepId?: number | null;
  originalImageDataUri?: string | null;
  isolatedCharacterUri?: string | null;
  completedBackgroundUri?: string | null;
  scenario?: string | null;
}

export function ProcessVisualizer({
  currentStepId,
  stepsConfig,
  progressPercentage,
  errorMessage,
  failedStepId,
  originalImageDataUri,
  isolatedCharacterUri,
  completedBackgroundUri,
  scenario,
}: ProcessVisualizerProps) {
  
  const activeStepDetails = stepsConfig.find(s => s.id === currentStepId);
  const processingDisplaySteps = stepsConfig.filter(s => s.stage === 'processing'); // Steps 2, 3, 4, 5

  const getStepStatusInfo = (step: ProcessStep) => {
    let IconToRender = step.icon;
    let iconColorClass = "text-muted-foreground";
    let textStyleClass = "text-muted-foreground";
    let bgColorClass = "bg-card hover:bg-muted/50"; // Subtle background for steps
    let statusText = "En attente";
    let isSpinning = false;

    const isErrorState = currentStepId === stepsConfig.find(s => s.stage === 'error')?.id;
    const isSuccessState = currentStepId === stepsConfig.find(s => s.stage === 'done')?.id;

    if (isErrorState && failedStepId !== null) {
      if (step.id < failedStepId) {
        IconToRender = CheckCircle2;
        iconColorClass = "text-green-500";
        textStyleClass = "text-green-600 dark:text-green-400";
        bgColorClass = "bg-green-500/10";
        statusText = "Terminé";
      } else if (step.id === failedStepId) {
        IconToRender = AlertTriangle;
        iconColorClass = "text-destructive";
        textStyleClass = "text-destructive font-semibold";
        bgColorClass = "bg-destructive/10";
        statusText = "Échec";
      } else { // Steps after failure
        IconToRender = step.icon;
        iconColorClass = "text-muted-foreground opacity-50";
        textStyleClass = "text-muted-foreground opacity-50";
        bgColorClass = "bg-muted/10 opacity-50";
        statusText = "Non atteint";
      }
    } else if (isSuccessState) {
      IconToRender = CheckCircle2;
      iconColorClass = "text-green-500";
      textStyleClass = "text-green-600 dark:text-green-500";
      bgColorClass = "bg-green-500/10";
      statusText = "Terminé";
    } else { // Actively processing (currentStepId is 2, 3, 4, or 5)
      if (step.id < currentStepId) { // Completed steps
        IconToRender = CheckCircle2;
        iconColorClass = "text-green-500";
        textStyleClass = "text-green-600 dark:text-green-500";
        bgColorClass = "bg-green-500/10";
        statusText = "Terminé";
      } else if (step.id === currentStepId) { // Active step
        IconToRender = Loader2;
        iconColorClass = "text-primary";
        isSpinning = true;
        textStyleClass = "text-primary font-semibold";
        bgColorClass = "bg-primary/10 ring-1 ring-primary/30 shadow-sm";
        statusText = activeStepDetails?.statusText || "En cours...";
      } else { // Pending steps
        IconToRender = step.icon;
        iconColorClass = "text-muted-foreground opacity-70";
        textStyleClass = "text-muted-foreground opacity-80";
        bgColorClass = "bg-muted/20 hover:bg-muted/30";
        statusText = "En attente";
      }
    }

    return { IconToRender, iconColorClass, textStyleClass, bgColorClass, statusText, isSpinning };
  };

  let TitleIcon = Loader2;
  let titleIconClass = "animate-spin text-primary";
  let titleText = activeStepDetails?.name || "Traitement en cours...";
  let descriptionText = activeStepDetails?.statusText || "Préparation de votre animation...";

  if (currentStepId === stepsConfig.find(s => s.stage === 'done')?.id) {
    TitleIcon = CheckCircle2;
    titleIconClass = "text-green-500";
    titleText = "Animation Prête !";
    descriptionText = "Votre animation est terminée et prête à être visualisée.";
  } else if (errorMessage) {
    TitleIcon = AlertTriangle;
    titleIconClass = "text-destructive";
    titleText = "Erreur de Traitement";
    descriptionText = errorMessage;
  }


  return (
    <Card className="w-full shadow-xl transition-all duration-500 ease-in-out">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TitleIcon className={`w-7 h-7 mr-2 ${titleIconClass}`} />
          {titleText}
        </CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={progressPercentage} className="w-full h-3 [&>div]:transition-all [&>div]:duration-500" />

        <div className="space-y-3">
          {processingDisplaySteps.map((step) => {
            const { IconToRender, iconColorClass, textStyleClass, bgColorClass, statusText: stepStatusText, isSpinning } = getStepStatusInfo(step);
            return (
              <div
                key={step.id}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out ${bgColorClass} ${textStyleClass}`}
              >
                <IconToRender className={`w-5 h-5 mr-3 shrink-0 ${iconColorClass} ${isSpinning ? 'animate-spin' : ''}`} />
                <div className="flex flex-col flex-grow">
                  <span className="font-medium">{step.name}</span>
                  <span className="text-xs opacity-90">{stepStatusText}</span>
                </div>
              </div>
            );
          })}
        </div>

        {errorMessage && currentStepId === stepsConfig.find(s => s.stage === 'error')?.id && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Une erreur est survenue</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {(originalImageDataUri || isolatedCharacterUri || completedBackgroundUri || scenario) && !errorMessage && currentStepId < (stepsConfig.find(s => s.stage === 'done')?.id || Infinity) && (
          <div className="pt-4 mt-4 border-t">
            <h3 className="text-lg font-semibold mb-3 text-center text-foreground">Aperçus du Processus</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {originalImageDataUri && currentStepId >=1 && (
                <div className="flex flex-col items-center p-2 border rounded-md bg-background/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Image Originale</p>
                  <Image src={originalImageDataUri} alt="Original" width={120} height={120} className="rounded-md shadow-sm object-contain" data-ai-hint="uploaded art" />
                </div>
              )}
              {isolatedCharacterUri && currentStepId >= 3 && (
                <div className="flex flex-col items-center p-2 border rounded-md bg-background/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Personnage Isolé</p>
                  <Image src={isolatedCharacterUri} alt="Personnage Isolé" width={120} height={120} className="rounded-md shadow-sm object-contain" data-ai-hint="isolated character" />
                </div>
              )}
              {completedBackgroundUri && currentStepId >= 3 && (
                <div className="flex flex-col items-center p-2 border rounded-md bg-background/50">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Arrière-plan</p>
                  <Image src={completedBackgroundUri} alt="Arrière-plan Complété" width={120} height={120} className="rounded-md shadow-sm object-contain" data-ai-hint="completed background" />
                </div>
              )}
            </div>
            {scenario && currentStepId >= 4 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-muted-foreground">Scénario Proposé:</h4>
                <p className="text-sm italic p-3 bg-muted/50 rounded-md">{scenario}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
