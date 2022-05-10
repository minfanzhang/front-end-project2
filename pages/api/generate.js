import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({apiKey: process.env.OPENAI_SECRET}));

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.animal),
    temperature: 0.5,
    max_tokens: 16,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  return `write a poem about dinousaurs in the snow`;
}
