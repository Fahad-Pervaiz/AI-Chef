# 🍳 AI Chef - Recipe Generator

An intelligent recipe suggestion application powered by AI. Simply enter the ingredients you have on hand, and AI Chef will suggest delicious recipes you can make!

## ✨ Features

- **AI-Powered Recipe Suggestions**: Uses Claude (Anthropic) and Mistral AI to generate creative recipe recommendations
- **Ingredient-Based Search**: Input any ingredients you have, and get tailored recipe suggestions
- **Markdown Formatted Recipes**: Recipes are beautifully formatted with markdown for easy reading
- **Real-Time Processing**: Quick API responses with detailed recipe instructions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with Vite
- **AI Models**: 
  - Anthropic Claude (via @anthropic-ai/sdk)
  - HuggingFace Mistral AI (via @huggingface/inference)
- **Styling**: CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API Keys:
  - [Anthropic API Key](https://console.anthropic.com/)
  - [HuggingFace API Token](https://huggingface.co/settings/tokens)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AI Chef-bk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   VITE_HF_ACCESS_TOKEN=your_huggingface_token_here
   VITE_CLAUDE_API_KEY=your_anthropic_api_key_here
   ```

   ⚠️ **Important**: Never commit `.env.local` to version control. Add it to `.gitignore`

## 📖 Usage

### Development Mode

```bash
npm run dev
```
The application will start at `http://localhost:5173`

### Local Development with Serverless Functions

```bash
npm run dev:netlify
```
This runs the dev server with Netlify functions enabled for testing the full backend integration.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

### Running Backend Server

```bash
npm run server
```

### Running Development with Backend

```bash
npm run dev:all
```
This runs both the Vite dev server and the Node backend concurrently.

## 🎯 How to Use

1. Open the application in your browser
2. Enter ingredients you have (e.g., "chicken, tomatoes, garlic, basil")
3. Click the "Get Recipe" button
4. AI Chef will generate a recipe using those ingredients
5. Read the formatted recipe and follow the instructions

## 🔒 Security & Deployment Notes

⚠️ **Important**: This project now uses **Cloudflare Workers** to keep API keys private and secure.

### Architecture:
```
Frontend (React) → Cloudflare Worker → HuggingFace API
      (Public)        (Private)        (Private)
```

### Why This Approach:
- ✅ API tokens never exposed to client
- ✅ CORS issues resolved through backend proxy
- ✅ Secure authentication
- ✅ Scales automatically with Cloudflare

### Deployment Instructions:

👉 **See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup guide**

Quick steps:
1. Add `VITE_HF_ACCESS_TOKEN` to Cloudflare environment variables
2. Deploy to Cloudflare Pages
3. Done! Your app now works securely

## 📁 Project Structure

```
AI Chef-bk/
├── functions/
│   └── getRecipe.js        # Cloudflare Worker function for recipe generation
├── ai.js                   # AI API integration functions
├── App.jsx                # Main app component
├── Header.jsx             # Header component
├── Main.jsx               # Main content component
├── index.jsx              # React entry point
├── index.html             # HTML template
├── index.css              # Global styles
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies & scripts
├── components/
│   ├── ClaudeRecipe.jsx   # Claude recipe component
│   └── IngredientsList.jsx # Ingredients list component
├── images/                # Image assets
└── public/                # Static files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source. Feel free to use and modify as needed.

## 🐛 Troubleshooting

**Missing API Token**
- Ensure your `.env.local` file is in the root directory
- Check that token names match: `VITE_HF_ACCESS_TOKEN`
- Restart dev server after adding environment variables

**CORS Issues**
- If deploying to production, set up a backend proxy for API calls
- Never expose API keys on the frontend

**Build Errors**
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `rm -rf .vite` (or delete manually on Windows)

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Happy Cooking! 🍽️**
