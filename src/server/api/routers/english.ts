import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';

import { createTRPCRouter, publicProcedure } from '../trpc';

const configuration = new Configuration({
  apiKey: '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',
  // apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const mistakeOptions = [
  'Spelling mistakes',
  'Grammar mistakes',
  'Usage mistakes',
  'Capitalization and punctuation mistakes',
  'Typos',
  'Verb tense errors',
  'Subject-verb agreement errors',
  'Word choice errors',
  'Sentence structure errors',
  'Pronoun errors',
  'Parallelism errors',
  'Apostrophe errors',
  'Agreement errors',
  'Preposition errors',
  'Article errors',
  'Confusing homophones',
  'Misuse of idioms or expressions',
  'Overuse or misuse of passive voice',
  'Lack of clarity or coherence in writing',
  'Incorrect word order',
];

const chatGenerator = (prompt: string) => {
  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.3,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
};

export const englishRouter = createTRPCRouter({
  convert: publicProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async function ({ input }) {
      const mistakes = mistakeOptions.map((mistakeType) => {
        const prompt = ` "${input.value}" Can you point out any ${mistakeType} in this sentence? If it is then explained it why. Provide some idea how can I solve this mistake.`;
        return chatGenerator(prompt);
      });
      const response = await Promise.all(mistakes);

      const data = response.map(({ data }, index) => {
        console.log(data, mistakeOptions[index]);
        return {
          type: mistakeOptions[index] as string,
          error: data.choices[0]?.text,
        };
      });

      return data;
    }),
  explanation: publicProcedure
    .input(z.object({ word: z.string() }))
    .mutation(async ({ input }) => {
      const prompt = `
      I have a word/phrase which is "${input.word}". Now your task is to follow those instructions step by step and Explained them as much as you can.
      1) Explained ${input.word} in details
      2) list all related words/phrase of ${input.word}
      3) Make some sentences using the related word/phrase of ${input.word} and list them one by one in numeric order.
      4) Explain each related word/phrase one by one and tell me when to use which one and list them one by one in numeric order.
      5) Give me some context where each word/phrase is more suitable with some example.
      `;
      const response = await chatGenerator(prompt);

      return response.data.choices[0]?.text;
    }),
  correction: publicProcedure
    .input(z.object({ word: z.string() }))
    .mutation(async ({ input }) => {
      const prompt = `
      I have a sentence which is "${input.word}". now your task is to follow those instructions step by step.
      1) Find the mistake and tell me what is wrong with this sentence. no need to correct this sentence.
      2) Correct "${input.word}" and explain why your sentence correct but my sentence is wrong.
      3) Make some similar sentences from ${input.word}.
      4) Provide me more explanation about each sentences and when should I use which sentence? 
      `;
      const response = await chatGenerator(prompt);

      return response.data.choices[0]?.text;
    }),
  difference: publicProcedure
    .input(z.object({ wordsPhrasesOrSentences: z.string().array() }))
    .mutation(async ({ input }) => {
      const values = input.wordsPhrasesOrSentences.join(', ');
      const prompt = `
      I am providing you "${values}". Now your task is to follow those instructions step by step.
      1) I want to know what the differences are between ${values}.
      2) If there are any interchangeable found, then make some sentences using them
      3) Can you provide me with more explanation about ${values}.
      4) Give some examples using them with explanations in dash list style.
      `;
      const response = await chatGenerator(prompt);

      return response.data.choices[0]?.text;
    }),
  translation: publicProcedure
    .input(z.object({ sentence: z.string() }))
    .mutation(async ({ input }) => {
      const prompt = `
      I am providing you "${input.sentence}". Now your task is to follow those instructions step by step.
      1) Translate this sentence into english.
      2) Explained this sentence.
      3) Make a list of some similar sentences.
      4) Explain the grammar structure of this sentence.
      `;
      const response = await chatGenerator(prompt);

      return response.data.choices[0]?.text;
    }),
});
