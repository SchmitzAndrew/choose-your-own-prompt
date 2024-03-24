import MistralClient from '@mistralai/mistralai';
import {
  MistralStream,
  StreamingTextResponse,

} from 'ai';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');

export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  console.log("prompt: ", prompt);

  // Ask Mistral for a streaming completion given the prompt
  const response = mistral.chatStream({
    model: 'mistral-large',
    maxTokens: 10000,
    messages: [{ role: 'user', content: prompt }],
  });

  console.log("response: ", response);
  // Convert the response into a friendly text-stream
  const stream = MistralStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}