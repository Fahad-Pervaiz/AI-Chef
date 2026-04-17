// API is now called through Netlify serverless function for security
// This keeps API keys private on the backend

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    console.log("getRecipeFromMistral called with:", ingredientsString)
    try {
        console.log("Calling serverless function...")
        
        // Determine the API endpoint based on environment
        const apiEndpoint = import.meta.env.PROD 
            ? "/.netlify/functions/getRecipe"
            : "http://localhost:8888/.netlify/functions/getRecipe"
        
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        })

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        console.log("Recipe received:", data.recipe)
        return data.recipe
    } catch (err) {
        console.error("Error in getRecipeFromMistral:", err)
        throw err
    }
}
