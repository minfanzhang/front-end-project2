import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({apiKey: process.env.OPENAI_SECRET}));

export default async function (req, res) {
  const completion = await openai.createCompletion(req.body.aiEngine, {
    prompt: req.body.prompttext,
    temperature: 0.5,
    max_tokens: 8,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

