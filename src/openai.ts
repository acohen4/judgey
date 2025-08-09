import OpenAI from 'openai';
import { config } from 'dotenv';

config();

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export interface OpenAIInit {
  apiKey?: string;
  baseURL?: string;
  organization?: string;
  project?: string;
  maxRetries?: number;
}

export const DEFAULT_CHAT_MODEL = 'gpt-4o-mini';
export const DEFAULT_EMBEDDING_MODEL = 'text-embedding-3-small';

export function createOpenAI(opts: OpenAIInit = {}): OpenAI {
  const apiKey = opts.apiKey ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key. Set OPENAI_API_KEY or pass apiKey to createOpenAI().');
  }
  return new OpenAI({
    apiKey,
    baseURL: opts.baseURL,
    organization: opts.organization,
    project: opts.project,
    maxRetries: opts.maxRetries,
  });
}

export async function chatText(params: {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  client?: OpenAI;
  signal?: AbortSignal;
}): Promise<string> {
  const { messages, model = DEFAULT_CHAT_MODEL, temperature, maxTokens, signal } = params;
  const client = params.client ?? createOpenAI();

  const completion = await client.chat.completions.create(
    {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    },
    signal ? { signal } : undefined,
  );

  return completion.choices[0]?.message?.content ?? '';
}

export async function* chatStream(params: {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  client?: OpenAI;
  signal?: AbortSignal;
}): AsyncGenerator<string> {
  const { messages, model = DEFAULT_CHAT_MODEL, temperature, maxTokens, signal } = params;
  const client = params.client ?? createOpenAI();

  const stream = await client.chat.completions.create(
    {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    },
    signal ? { signal } : undefined,
  );

  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta?.content;
    if (typeof delta === 'string' && delta.length) {
      yield delta;
    }
  }
}

export async function embed(params: {
  input: string;
  model?: string;
  client?: OpenAI;
  signal?: AbortSignal;
}): Promise<number[]> {
  const { input, model = DEFAULT_EMBEDDING_MODEL, signal } = params;
  const client = params.client ?? createOpenAI();

  const res = await client.embeddings.create({ model, input }, signal ? { signal } : undefined);

  return res.data[0].embedding;
}

export async function embedBatch(params: {
  input: string[];
  model?: string;
  client?: OpenAI;
  signal?: AbortSignal;
}): Promise<number[][]> {
  const { input, model = DEFAULT_EMBEDDING_MODEL, signal } = params;
  const client = params.client ?? createOpenAI();

  const res = await client.embeddings.create({ model, input }, signal ? { signal } : undefined);

  return res.data.map((d) => d.embedding);
}
