import { generateText } from 'ai';
import { xai } from '@ai-sdk/xai';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const { text } = await generateText({
    model: xai('grok-3'),
    system: 'You are a helpful assistant.',
    prompt,
  });

  return Response.json({ text });
}