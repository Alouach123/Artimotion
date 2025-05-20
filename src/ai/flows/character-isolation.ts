// The directive tells the Next.js runtime that it should be run on the server.
'use server';

/**
 * @fileOverview AI flow to isolate the main character from the background of an image,
 * filling gaps in the background for seamless animation.
 *
 * - isolateCharacter - Function to initiate character isolation and background completion.
 * - IsolateCharacterInput - Input type for the isolateCharacter function.
 * - IsolateCharacterOutput - Output type for the isolateCharacter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define Zod schema for the input
const IsolateCharacterInputSchema = z.object({
  artworkDataUri: z
    .string()
    .describe(
      `The artwork image as a data URI, including MIME type and Base64 encoding (data:<mimetype>;base64,<encoded_data>).
      The image should contain a character and a background.`
    ),
});
export type IsolateCharacterInput = z.infer<typeof IsolateCharacterInputSchema>;

// Define Zod schema for the output
const IsolateCharacterOutputSchema = z.object({
  isolatedCharacterDataUri: z
    .string()
    .describe(
      'The isolated character image as a data URI with MIME type and Base64 encoding.'
    ),
  completedBackgroundDataUri: z
    .string()
    .describe(
      'The completed background image (character removed, gaps filled) as a data URI with MIME type and Base64 encoding.'
    ),
});
export type IsolateCharacterOutput = z.infer<typeof IsolateCharacterOutputSchema>;

// Exported function to initiate the character isolation flow
export async function isolateCharacter(input: IsolateCharacterInput): Promise<IsolateCharacterOutput> {
  return isolateCharacterFlow(input);
}

// Define the prompt for character isolation and background completion
const characterIsolationPrompt = ai.definePrompt({
  name: 'characterIsolationPrompt',
  model: 'googleai/gemini-2.0-flash-exp', // Specify the model for image generation capabilities
  input: {schema: IsolateCharacterInputSchema},
  output: {schema: IsolateCharacterOutputSchema},
  prompt: `You are an AI that isolates the main character from an artwork and fills the background.

  Given the artwork, identify the main character and create two versions:
  1.  A version with only the isolated character, as a data URI.
  2.  A version of the background with the character removed and any resulting gaps filled, as a data URI.

  Artwork: {{media url=artworkDataUri}}

  Return both the isolated character and the completed background as data URIs.
  Ensure that the isolated character and completed background preserve the style of the original artwork.
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

// Define the Genkit flow for isolating the character and completing the background
const isolateCharacterFlow = ai.defineFlow(
  {
    name: 'isolateCharacterFlow',
    inputSchema: IsolateCharacterInputSchema,
    outputSchema: IsolateCharacterOutputSchema,
  },
  async input => {
    const {output} = await characterIsolationPrompt(input);
    if (!output) {
      throw new Error("Failed to get a valid output from characterIsolationPrompt. The model might have failed to generate the required data.");
    }
    return output;
  }
);

