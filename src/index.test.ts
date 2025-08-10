import { describe, expect, it } from 'vitest';
import { sum, subtract } from './index.js';
import { chatText } from './openai.js';
import { badConvo } from './data/badConvo.js';

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });
});

describe('subtract', () => {
  it('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});

describe('badConvo', () => {
  it('should be a valid conversation', async () => {
    const result = await chatText({ messages: badConvo });
    console.log(result);
  });
});
