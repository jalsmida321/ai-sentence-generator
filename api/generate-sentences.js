import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { topic, style, count, language } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Generate ${count} ${style} sentence(s) about ${topic} in ${language}.`,
      max_tokens: 100 * count,
    });

    const sentences = completion.data.choices[0].text
      .split('.')
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0)
      .map(sentence => sentence + '.');

    res.status(200).json({ sentences });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'An error occurred while generating sentences.' });
  }
}