import type { ChatMessage } from '../openai.js';

export const badConvo: ChatMessage[] = [
  { role: 'user', content: 'Hi there, I am a user' },
  {
    role: 'assistant',
    content: 'What are you doing here?',
  },
  {
    role: 'user',
    content: 'I am here to buy a product',
  },
  {
    role: 'assistant',
    content: 'What product are you looking for?',
  },
  {
    role: 'user',
    content: 'I am looking for a product',
  },
];
