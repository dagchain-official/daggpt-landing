# Vertex AI Integration Setup Guide

## Overview
This project integrates Google Cloud Vertex AI for AI Chat functionality, supporting 13 different AI models including Gemini, Claude, Llama, Mistral, DeepSeek, and Qwen.

## Prerequisites
1. Google Cloud Project with Vertex AI API enabled
2. Service Account with Vertex AI permissions
3. API Key or Service Account credentials

## Setup Instructions

### 1. Enable Vertex AI API
```bash
gcloud services enable aiplatform.googleapis.com
```

### 2. Create Service Account (if needed)
```bash
gcloud iam service-accounts create vertex-ai-service \
    --display-name="Vertex AI Service Account"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:vertex-ai-service@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"
```

### 3. Generate API Key or Download Service Account Key
```bash
# For service account key
gcloud iam service-accounts keys create vertex-ai-key.json \
    --iam-account=vertex-ai-service@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:

```env
REACT_APP_VERTEX_AI_PROJECT_ID=your-project-id
REACT_APP_VERTEX_AI_LOCATION=us-central1
REACT_APP_VERTEX_AI_API_KEY=your-api-key
```

### 5. Install Dependencies (if needed)
```bash
npm install
```

## Available Models

### Google Gemini Models
- **Gemini 3 Flash** (`gemini-3-flash-preview`) - Standard, Default for Speed
- **Gemini 3 Pro** (`gemini-3-pro-preview`) - Ultra-Premium, Best for Logic/Code
- **Gemini 2.5 Pro** (`gemini-2.5-pro`) - Production Stable
- **Gemini 2.5 Flash** (`gemini-2.5-flash`) - Fast
- **Gemini 2.5 Flash-Lite** (`gemini-2.5-flash-lite`) - Budget

### Anthropic Claude Models
- **Claude 4.5 Opus** (`claude-4-5-opus`) - Ultra-Premium, Top-tier creative writing
- **Claude 4.5 Sonnet** (`claude-4-5-sonnet`) - Premium, Highly popular for coding
- **Claude 4.5 Haiku** (`claude-4-5-haiku`) - Standard, Human-like fast chat

### Meta Llama Models
- **Llama 4 Scout** (`llama-4-scout-17b-instruct-maas`) - Open Model, Fast & Smart
- **Llama 3.3 (70B)** (`llama-3.3-70b-instruct-maas`) - Open Model, Reliable

### Other Models
- **Mistral Large 3** (`mistral-large-24-11`) - Premium, High logic
- **DeepSeek V3.2** (`deepseek-v3.2-maas`) - Specialist, Best for math and logic
- **Qwen 3 (235B)** (`qwen3-235b-instruct-maas`) - Premium, Strongest from Alibaba

## Usage

### Basic Chat Request
```javascript
import vertexAIService from './services/vertexAIService';

const response = await vertexAIService.sendMessage(
  "Hello, how are you?",
  "Gemini 3 Flash"
);
console.log(response);
```

### Streaming Chat Request
```javascript
import vertexAIService from './services/vertexAIService';

await vertexAIService.streamMessage(
  "Tell me a story",
  "Gemini 3 Pro",
  (chunk) => {
    console.log('Received chunk:', chunk);
    // Update UI with chunk
  }
);
```

### With Conversation History
```javascript
const history = [
  { role: "user", content: "What is AI?" },
  { role: "model", content: "AI stands for Artificial Intelligence..." }
];

const response = await vertexAIService.sendMessage(
  "Tell me more",
  "Claude 4.5 Sonnet",
  history
);
```

## API Service Structure

The `vertexAIService.js` provides:
- **sendMessage()** - Single request/response
- **streamMessage()** - Streaming responses for real-time updates
- **getModelId()** - Maps display names to model IDs
- Automatic error handling
- Safety settings configuration
- Generation parameters (temperature, topP, topK, maxTokens)

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **For production**, use backend proxy to hide API keys
4. **Rotate keys regularly** for security
5. **Set up proper IAM roles** with least privilege

## Troubleshooting

### Common Issues

**Issue: "API Key Invalid"**
- Verify your API key in Google Cloud Console
- Check if Vertex AI API is enabled
- Ensure service account has correct permissions

**Issue: "Model not found"**
- Verify model ID matches Vertex AI documentation
- Check if model is available in your region
- Some models may require special access

**Issue: "Quota exceeded"**
- Check your Vertex AI quotas in Google Cloud Console
- Consider upgrading your quota limits
- Implement rate limiting in your application

## Cost Optimization

- Use **Gemini 2.5 Flash-Lite** for high-volume, low-cost scenarios
- Use **Gemini 3 Flash** as default for balanced performance
- Reserve **Ultra-Premium models** for complex tasks
- Implement caching for repeated queries
- Set appropriate `maxOutputTokens` limits

## Next Steps

1. ✅ Models configured in frontend
2. ✅ Vertex AI service created
3. ⏳ Connect Send button to API
4. ⏳ Add conversation history management
5. ⏳ Implement streaming UI updates
6. ⏳ Add error handling UI
7. ⏳ Test with all 13 models

## Support

For issues or questions:
- Google Cloud Vertex AI Documentation: https://cloud.google.com/vertex-ai/docs
- Model Garden: https://cloud.google.com/model-garden
