# 🚀 Deployment Guide - AI Chef

## ✅ Fixed Issues

This deployment setup fixes the following security and CORS issues:
- ✅ **API Token Protection**: Token is now kept private on serverless backend
- ✅ **CORS Error Resolution**: Using serverless functions to proxy API calls
- ✅ **Security**: No sensitive data exposed in frontend code

## 📋 Prerequisites

- Netlify account (free at netlify.com)
- HuggingFace API token
- GitHub account with your AI-Chef repository

## 🔧 Setup Instructions

### 1. Add Environment Variables to Netlify

1. Go to your Netlify site dashboard: https://app.netlify.com
2. Navigate to **Site settings** → **Build & deploy** → **Environment**
3. Click **Add environment variables**
4. Add the following variable:
   ```
   Key: VITE_HF_ACCESS_TOKEN
   Value: [Your HuggingFace API token]
   ```
5. Save and redeploy

### 2. Redeploy Your Site

After adding the environment variable:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete

### 3. Test the Application

1. Visit your site: `https://youraichef.netlify.app/`
2. Enter ingredients
3. Click "Get Recipe"
4. You should now see recipes without CORS errors!

## 🧪 Local Development with Serverless Functions

To test the serverless functions locally:

### Install Dependencies
```bash
npm install
npx netlify-cli@latest install
```

### Run Locally
```bash
npm run dev:netlify
```

This will:
- Start Vite dev server on `http://localhost:5173`
- Run Netlify functions locally
- Proxy API calls through your local backend

## 📁 New Project Structure

```
netlify/
└── functions/
    └── getRecipe.js        # Serverless function for recipe generation
```

## 🔒 Security Checklist

- ✅ `.env` file in `.gitignore` (never commit real tokens)
- ✅ API token stored only in Netlify UI
- ✅ Frontend makes requests to serverless function
- ✅ Serverless function makes requests to HuggingFace
- ✅ API calls are secure and CORS-compatible

## 🐛 Troubleshooting

### Still Getting CORS Errors?
1. Check that `VITE_HF_ACCESS_TOKEN` is set in Netlify UI
2. Redeploy after adding the environment variable
3. Clear browser cache (Ctrl+Shift+Del)
4. Wait 5 minutes for cache to clear

### Serverless Function Not Working
1. Check Netlify logs: **Site** → **Deploys** → **Deploy logs**
2. Look for errors in **Functions** section
3. Ensure `netlify/functions/getRecipe.js` exists

### Local Development Issues
```bash
# Clear netlify cache
rm -rf .netlify

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev:netlify
```

## 📞 Next Steps

1. Update any social links pointing to old version
2. Test on mobile devices
3. Monitor site performance in Netlify Analytics
4. Consider adding more features!

---

**Your app is now secure and production-ready! 🎉**
