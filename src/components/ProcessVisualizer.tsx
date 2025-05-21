
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { Icon } from 'lucide-react';

export interface ProcessStep {
  id: number;
  name: string;
  statusText: string;
  icon: Icon;
  stage: 'initial' | 'processing' | 'done' | 'error';
}

interface ProcessVisualizerProps {
  currentStepId: number;
  stepsConfig: ProcessStep[];
  progressPercentage: number;
  errorMessage?: string | null;
  originalImageDataUri?: string | null;
  // failedStepId prop is not strictly needed if we derive error state from errorMessage and currentStepId
}

export function ProcessVisualizer({
  currentStepId,
  stepsConfig,
  progressPercentage,
  errorMessage,
  originalImageDataUri,
}: ProcessVisualizerProps) {
  
  const activeStepDetails = stepsConfig.find(s => s.id === currentStepId);

  let TitleIcon = Loader2;
  let titleIconClass = "animate-spin text-primary";
  let titleText = "Traitement en cours...";
  let descriptionText = "Votre animation est en cours de création...";

  if (activeStepDetails) {
    titleText = activeStepDetails.name;
    descriptionText = activeStepDetails.statusText;
    if (activeStepDetails.stage === 'done') {
      TitleIcon = CheckCircle2;
      titleIconClass = "text-green-500";
    } else if (activeStepDetails.stage === 'error') {
      TitleIcon = AlertTriangle;
      titleIconClass = "text-destructive";
      if (errorMessage) {
        descriptionText = errorMessage;
      }
    } else if (activeStepDetails.stage === 'processing') {
      TitleIcon = Loader2; // Or activeStepDetails.icon if you prefer static icon during processing
      titleIconClass = "animate-spin text-primary";
    } else {
      TitleIcon = activeStepDetails.icon; // For initial states if ever shown here
      titleIconClass = "text-muted-foreground";
    }
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

        {errorMessage && currentStepId === stepsConfig.find(s => s.stage === 'error')?.id && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Une erreur est survenue</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {originalImageDataUri && (currentStepId === stepsConfig.find(s => s.stage === 'processing')?.id) && !errorMessage && (
          <div className="pt-4 mt-4 border-t">
            <h3 className="text-lg font-semibold mb-3 text-center text-foreground">Image en cours de traitement</h3>
            <div className="flex justify-center">
              <Image src={originalImageDataUri} alt="Image en traitement" width={150} height={150} className="rounded-md shadow-sm object-contain" data-ai-hint="uploaded art processing" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
