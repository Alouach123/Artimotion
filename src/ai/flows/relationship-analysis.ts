// src/ai/flows/relationship-analysis.ts
'use server';
/**
 * @fileOverview Analyzes the relationship between a character and background image to create a coherent animation scenario.
 *
 * - analyzeRelationship - A function that analyzes the character and background relationship.
 * - AnalyzeRelationshipInput - The input type for the analyzeRelationship function.
 * - AnalyzeRelationshipOutput - The return type for the analyzeRelationship function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRelationshipInputSchema = z.object({
  characterDataUri: z
    .string()
    .describe(
      "A photo of the isolated character, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  backgroundDataUri: z
    .string()
    .describe(
      "A photo of the completed background, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type AnalyzeRelationshipInput = z.infer<typeof AnalyzeRelationshipInputSchema>;

const AnalyzeRelationshipOutputSchema = z.object({
  scenario: z
    .string()
    .describe(
      'A short description of a logical interaction between the character and background for a 5-second animation.'
    ),
});

export type AnalyzeRelationshipOutput = z.infer<typeof AnalyzeRelationshipOutputSchema>;

export async function analyzeRelationship(
  input: AnalyzeRelationshipInput
): Promise<AnalyzeRelationshipOutput> {
  return analyzeRelationshipFlow(input);
}

const analyzeRelationshipPrompt = ai.definePrompt({
  name: 'analyzeRelationshipPrompt',
  input: {schema: AnalyzeRelationshipInputSchema},
  output: {schema: AnalyzeRelationshipOutputSchema},
  prompt: `You are a creative storyteller who specializes in creating scenarios for short animations.

You are given an isolated character and a background image. Your task is to devise a logical and engaging interaction between the character and the background that can be depicted in a 5-second animation.

Character: {{media url=characterDataUri}}
Background: {{media url=backgroundDataUri}}

Based on the character and the background, describe a scenario for a 5-second animation. Be creative and make the scenario engaging.`,
});

const analyzeRelationshipFlow = ai.defineFlow(
  {name: 'analyzeRelationshipFlow', inputSchema: AnalyzeRelationshipInputSchema, outputSchema: AnalyzeRelationshipOutputSchema},
  async input => {
    const {output} = await analyzeRelationshipPrompt(input);
    return output!;
  }
);
