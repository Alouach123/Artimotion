
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertTriangle, Image as ImageIcon, Sparkles, Users, Film } from 'lucide-react';

export interface ProcessStep {
  id: number;
  name: string;
  statusText: string;
  icon: React.ElementType;
}

interface ProcessVisualizerProps {
  currentStep: number;
  steps: ProcessStep[];
  progressValue: number;
  errorMessage?: string | null;
  originalImageDataUri?: string | null;
  isolatedCharacterUri?: string | null;
  completedBackgroundUri?: string | null;
  scenario?: string | null;
}

const StepIcon = ({ icon: Icon, isActive, isCompleted, isError }: { icon: React.ElementType, isActive: boolean, isCompleted: boolean, isError: boolean }) => {
  const iconColor = isError ? "text-destructive" : (isCompleted ? "text-green-500" : (isActive ? "text-primary" : "text-muted-foreground"));
  return <Icon className={`w-6 h-6 mr-2 shrink-0 ${iconColor}`} />;
};

export function ProcessVisualizer({
  currentStep,
  steps,
  progressValue,
  errorMessage,
  originalImageDataUri,
  isolatedCharacterUri,
  completedBackgroundUri,
  scenario,
}: ProcessVisualizerProps) {
  
  const activeStepDetails = steps.find(s => s.id === currentStep);
  const processingSteps = steps.filter(s => s.id >= 2 && s.id < (steps.length - 2)); // Adjusted to dynamically get processing steps

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          {currentStep === (steps.length - 1) ? <AlertTriangle className="w-6 h-6 mr-2 text-destructive" /> : // Error step is now the last one
           currentStep === (steps.length - 2) ? <CheckCircle2 className="w-6 h-6 mr-2 text-green-500" /> : // Done step is second to last
           <Loader2 className="w-6 h-6 mr-2 animate-spin text-primary" />}
          Progression de l'animation
        </CardTitle>
        {activeStepDetails && <CardDescription>{activeStepDetails.statusText}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={progressValue} className="w-full h-3" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
          {processingSteps.map((step) => (
            <div key={step.id} className={`flex items-center p-2 rounded-md ${currentStep === step.id ? 'bg-primary/10 font-semibold' : currentStep > step.id ? 'opacity-70' : 'opacity-50'}`}>
                <StepIcon 
                    icon={step.icon} 
                    isActive={currentStep === step.id && !errorMessage}
                    isCompleted={currentStep > step.id && !errorMessage}
                    isError={currentStep === step.id && !!errorMessage && step.id !== (steps.length - 1)} // Don't show error icon for the actual error step text
                />
              <span>{step.name}</span>
            </div>
          ))}
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {(isolatedCharacterUri || completedBackgroundUri || scenario) && !errorMessage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            {isolatedCharacterUri && (
              <div className="space-y-2">
                <h4 className="font-semibold text-center text-muted-foreground">Personnage Isolé</h4>
                <Image src={isolatedCharacterUri} alt="Personnage isolé" width={200} height={200} className="rounded-md object-contain mx-auto bg-slate-200 p-1 shadow-sm" data-ai-hint="character portrait" />
              </div>
            )}
            {completedBackgroundUri && (
              <div className="space-y-2">
                <h4 className="font-semibold text-center text-muted-foreground">Arrière-plan Complété</h4>
                <Image src={completedBackgroundUri} alt="Arrière-plan complété" width={200} height={200} className="rounded-md object-contain mx-auto bg-slate-200 p-1 shadow-sm" data-ai-hint="landscape background" />
              </div>
            )}
          </div>
        )}
         {scenario && !errorMessage && (
            <div className="pt-4 border-t">
                <h4 className="font-semibold text-muted-foreground">Scénario Proposé:</h4>
                <p className="text-sm italic p-2 bg-muted rounded-md">{scenario}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
