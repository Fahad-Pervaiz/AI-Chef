import { HfInference } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { ingredients } = await req.json();

    if (!ingredients || !Array.isArray(ingredients)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: ingredients array required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ingredientsString = ingredients.join(', ');
    console.log('Calling Mistral API with ingredients:', ingredientsString);

    // Use environment variable from Netlify - check both possible names
    const hfToken = process.env.VITE_HF_ACCESS_TOKEN || process.env.HF_ACCESS_TOKEN;
    console.log('Token check - exists:', !!hfToken, 'length:', hfToken?.length);
    
    if (!hfToken) {
      console.error('HuggingFace token not found in environment variables');
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('HF') || k.includes('VITE')));
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing API token' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const hf = new HfInference(hfToken);

    const response = await hf.chatCompletion({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });

    const recipe = response.choices[0].message.content;

    return new Response(JSON.stringify({ recipe }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error in getRecipe function:', error);
    console.error('Error details:', error.message, error.stack);
    return new Response(
      JSON.stringify({ error: 'Failed to generate recipe', details: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};
