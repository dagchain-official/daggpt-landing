# 🚀 Vertex AI Setup Instructions

## Step 1: Place Your Service Account JSON File

You have received a service account JSON file from Google Cloud. Follow these steps:

1. **Locate your downloaded JSON file** (it should be named something like `gen-lang-client-0510232212-xxxxx.json`)

2. **Rename it to:** `vertex-ai-credentials.json`

3. **Move it to the project root directory:**
   ```
   E:\projects\gptwebsite-temp2\vertex-ai-credentials.json
   ```

4. **Verify the file location:**
   ```
   gptwebsite-temp2/
   ├── src/
   ├── public/
   ├── .env
   ├── vertex-ai-credentials.json  ← Should be here
   ├── package.json
   └── ...
   ```

## Step 2: Verify Your Configuration

Your `.env` file has been configured with:

```env
REACT_APP_VERTEX_AI_PROJECT_ID=gen-lang-client-0510232212
REACT_APP_VERTEX_AI_LOCATION=us-central1
REACT_APP_SERVICE_ACCOUNT_EMAIL=vertex-express@gen-lang-client-0510232212.iam.gserviceaccount.com
GOOGLE_APPLICATION_CREDENTIALS=./vertex-ai-credentials.json
```

## Step 3: Security Check ✅

The following files are protected in `.gitignore`:
- ✅ `.env` - Your environment variables
- ✅ `vertex-ai-credentials.json` - Your service account key
- ✅ `*-credentials.json` - Any credentials files
- ✅ `*.json.key` - Any key files

**These files will NEVER be committed to git!**

## Step 4: Install Required Dependencies

Since we're using service account authentication in a React app, we need a backend proxy for security.

### Option A: Simple Backend Proxy (Recommended)

Install Express.js for a simple backend:

```bash
npm install express cors dotenv @google-cloud/aiplatform
```

### Option B: Use Existing Backend

If you already have a backend, integrate the Vertex AI service there.

## Step 5: Test Your Setup

Once you place the JSON file, we can:

1. ✅ Test authentication with Vertex AI
2. ✅ Connect the Send button to make API calls
3. ✅ Display AI responses in the chat
4. ✅ Test all 13 AI models

## Your Service Account Details

- **Email:** `vertex-express@gen-lang-client-0510232212.iam.gserviceaccount.com`
- **Unique ID:** `115053394968092875975`
- **Project ID:** `gen-lang-client-0510232212`

## Available AI Models (13 Total)

### Google Gemini (5 models)
1. Gemini 3 Flash - Default, Fast
2. Gemini 3 Pro - Best for Logic/Code
3. Gemini 2.5 Pro - Production Stable
4. Gemini 2.5 Flash - Fast Chat
5. Gemini 2.5 Flash-Lite - Budget

### Anthropic Claude (3 models)
6. Claude 4.5 Opus - Top-tier Creative
7. Claude 4.5 Sonnet - Popular for Coding
8. Claude 4.5 Haiku - Fast Chat

### Meta Llama (2 models)
9. Llama 4 Scout - Fast & Smart
10. Llama 3.3 (70B) - Reliable Open-source

### Other Models (3 models)
11. Mistral Large 3 - High Logic
12. DeepSeek V3.2 - Math & Logic
13. Qwen 3 (235B) - Alibaba's Strongest

## Next Steps

After placing the JSON file:

1. **Restart your development server** (if running)
2. **Let me know** and I'll connect the Send button
3. **Test the integration** with a simple message
4. **Try different models** to see the differences

## Troubleshooting

### "Cannot find credentials file"
- Check the file is named exactly: `vertex-ai-credentials.json`
- Check it's in the root directory (same level as `package.json`)
- Check the file path in `.env` matches: `./vertex-ai-credentials.json`

### "Authentication failed"
- Verify the JSON file is valid (open it in a text editor)
- Ensure the service account has Vertex AI permissions
- Check your Google Cloud project has Vertex AI API enabled

### "Model not found"
- Some models may not be available in all regions
- Try changing `REACT_APP_VERTEX_AI_LOCATION` to `us-central1` or `us-east1`
- Verify the model ID in the service file

## Security Best Practices ⚠️

1. ✅ **NEVER commit** `vertex-ai-credentials.json` to git
2. ✅ **NEVER share** your credentials file publicly
3. ✅ **Use backend proxy** for production (don't expose credentials in frontend)
4. ✅ **Rotate credentials** regularly
5. ✅ **Set up proper IAM roles** with least privilege
6. ✅ **Monitor usage** in Google Cloud Console

## Ready to Test?

Once you've placed the `vertex-ai-credentials.json` file in the root directory, let me know and I'll:

1. Create a backend proxy server (if needed)
2. Connect the Send button to Vertex AI
3. Add conversation history display
4. Implement streaming responses
5. Test all 13 AI models

---

**Current Status:** ⏳ Waiting for `vertex-ai-credentials.json` file to be placed in root directory
