const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

exports.handler = async (event, context) => {
  console.log('=== getRecipe function called ===');
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { ingredients } = JSON.parse(event.body || '{}');

    if (!ingredients || !Array.isArray(ingredients)) {
      console.log('Invalid ingredients:', ingredients);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request: ingredients array required' }),
      };
    }

    const ingredientsString = ingredients.join(', ');
    console.log('Ingredients:', ingredientsString);

    // Get token from environment
    const hfToken = process.env.VITE_HF_ACCESS_TOKEN;
    console.log('Token exists:', !!hfToken);
    
    if (!hfToken) {
      console.error('❌ HuggingFace token not found');
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('HF') || k.includes('VITE')));
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: Missing HF token' }),
      };
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
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'HuggingFace API error',
          details: errorData 
        }),
      };
    }

    const data = await response.json();
    console.log('✅ Recipe generated successfully');
    
    const recipe = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ recipe }),
    };
  } catch (error) {
    console.error('❌ Error in getRecipe function:', error);
    console.error('Stack:', error.stack);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to generate recipe',
        details: error.message,
      }),
    };
  }
};
