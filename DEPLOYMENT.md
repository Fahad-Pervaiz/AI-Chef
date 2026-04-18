# 🚀 Deployment Guide - AI Chef

## ✅ Fixed Issues

This deployment setup fixes the following security and CORS issues:
- ✅ **API Token Protection**: Token is now kept private on Cloudflare Workers
- ✅ **CORS Error Resolution**: Using Cloudflare Workers to proxy API calls
- ✅ **Security**: No sensitive data exposed in frontend code

## 📋 Prerequisites

- Cloudflare account (free at cloudflare.com)
- HuggingFace API token
- GitHub account with your AI-Chef repository

## 🔧 Setup Instructions

### 1. Add Environment Variables to Cloudflare

1. Go to your Cloudflare dashboard: https://dash.cloudflare.com
2. Select your **AI Chef** project
3. Go to **Settings** → **Environment variables**
4. Click **Add variable**
5. Add:
   ```
   Key: VITE_HF_ACCESS_TOKEN
   Value: [Your HuggingFace API token]
   ```
6. Click **Save**

### 2. Trigger Redeploy

1. Go to **Deployments** tab
2. Click **Create deployment** or wait for auto-deployment
3. Wait for build to complete (usually 1-2 min)

### 3. Test the Application

1. Visit your site: `https://your-project-name.pages.dev/`
2. Enter some ingredients (e.g., "chicken, garlic, tomatoes")
3. Click "Get Recipe"
4. You should see a recipe without any CORS errors! ✅

## 🧪 Local Development with Cloudflare Workers

To test the Cloudflare Workers locally:

### Install Wrangler CLI
```bash
npm install -g wrangler
```

### Run Locally
```bash
wrangler dev
```

This will:
- Start Vite dev server on `http://localhost:5173`
- Run Cloudflare Workers locally
- Proxy API calls through your local backend

## 📁 New Project Structure

```
functions/
└── getRecipe.js        # Cloudflare Worker function for recipe generation
```

## 🔒 Security Checklist

- ✅ `.env` file in `.gitignore` (never commit real tokens)
- ✅ API token stored only in Cloudflare UI
- ✅ Frontend makes requests to Cloudflare Worker
- ✅ Worker makes requests to HuggingFace
- ✅ API calls are secure and CORS-compatible

## 🐛 Troubleshooting

### Still Getting CORS Errors?
1. Check that `VITE_HF_ACCESS_TOKEN` is set in Cloudflare UI
2. Redeploy after adding the environment variable
3. Clear browser cache (Ctrl+Shift+Del)
4. Wait 5 minutes for cache to clear

### Worker Function Not Working
1. Check Cloudflare logs: **Functions** → **Logs**
2. Look for errors in the function execution
3. Ensure `functions/getRecipe.js` exists

### Local Development Issues
```bash
# Clear wrangler cache
rm -rf .wrangler

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
wrangler dev
```

## 📞 Next Steps

1. Update any social links pointing to old version
2. Test on mobile devices
3. Monitor site performance in Cloudflare Analytics
4. Consider adding more features!

---

**Your app is now secure and production-ready! 🎉**
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
