const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

export default {
  async fetch(request, env, ctx) {
    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { ingredients } = await request.json();

      if (!ingredients || !Array.isArray(ingredients)) {
        return new Response(
          JSON.stringify({ error: 'Invalid request: ingredients array required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const ingredientsString = ingredients.join(', ');
      console.log('getRecipe called with ingredients:', ingredientsString);

      // Get token from Cloudflare environment
      const hfToken = env.VITE_HF_ACCESS_TOKEN;
      if (!hfToken) {
        console.error('❌ HuggingFace token not found in environment');
        return new Response(
          JSON.stringify({ error: 'Server configuration error: Missing HF token' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      console.log('Calling HuggingFace API...');

      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hfToken}`,
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              {
                role: 'user',
                content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
              },
            ],
            max_tokens: 1024,
            temperature: 0.7,
          }),
        }
      );

      console.log('HF Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('HF API Error:', response.status, errorData);
        return new Response(
          JSON.stringify({
            error: 'HuggingFace API error',
            details: errorData
          }),
          { status: response.status, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      console.log('✅ Recipe generated successfully');

      const recipe = data.choices[0].message.content;

      return new Response(JSON.stringify({ recipe }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('❌ Error in getRecipe function:', error);
      console.error('Stack:', error.stack);
      return new Response(
        JSON.stringify({
          error: 'Failed to generate recipe',
          details: error.message,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};