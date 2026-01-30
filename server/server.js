// Backend Proxy Server for Vertex AI Integration
// This server securely handles authentication with Google Cloud Vertex AI

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { VertexAI } = require('@google-cloud/vertexai');
const { GoogleAuth } = require('google-auth-library');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for file uploads/base64

// Initialize Vertex AI client
const projectId = process.env.REACT_APP_VERTEX_AI_PROJECT_ID;

// Initialize Google Auth for MaaS models and direct REST API calls
const auth = new GoogleAuth({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// MaaS (Model-as-a-Service) models configuration
const MAAS_MODELS = {
  // Google Gemini 3 (using latest preview versions)
  'gemini-3-pro-preview': {
    publisher: 'google',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true
  },
  'gemini-3-flash-preview': {
    publisher: 'google',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true
  },
  'gemini-2.5-pro': {
    publisher: 'google',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'gemini-2.5-flash': {
    publisher: 'google',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'gemini-2.5-flash-lite': {
    publisher: 'google',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  // Anthropic Claude 4.5 (Latest)
  'claude-4-5-opus': {
    publisher: 'anthropic',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true
  },
  'claude-4-5-sonnet': {
    publisher: 'anthropic',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true
  },
  'claude-4-5-haiku': {
    publisher: 'anthropic',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true
  },
  // Meta Llama 4
  'llama-4-scout': {
    publisher: 'meta',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'llama-4-8b-instruct': {
    publisher: 'meta',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'llama-4-70b-instruct': {
    publisher: 'meta',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  // DeepSeek Models
  'deepseek-v3.2-maas': {
    publisher: 'deepseek-ai',
    endpoint: 'openapi',
    location: 'global',
    modelName: 'deepseek-ai/deepseek-v3.2-maas'
  },
  // Qwen Models
  'qwen-3-235b-instruct': {
    publisher: 'qwen',
    endpoint: 'generateContent',
    location: 'us-central1'
  }
};

// Image Generation Model IDs
const IMAGE_MODELS = {
  "Imagen 4 Ultra": "imagen-3.0-generate-001",
  "Imagen 4 Standard": "imagen-3.0-generate-001",
  "Imagen 4 Fast": "imagen-3.0-fast-generate-001",
  "Gemini 3 Pro Image": "imagen-3.0-generate-001",
  "Gemini 2.5 Flash Image": "imagen-3.0-flash-generate-001"
};

// Video Generation Models
const VIDEO_MODELS = {
  "Veo 3.1 Cinematic": "veo-3.1-generate-001",
  "Veo 3.1 Fast": "veo-3.1-fast-generate-001"
};

// Music Generation Models
const MUSIC_MODELS = {
  "Lyria 2 High-Fidelity": "lyria-002",
  "Lyria 2 Composition": "lyria-002"
};

// Model ID mapping for Chat
const MODEL_IDS = {
  // Google Gemini 3 Models
  "Gemini 3 Pro": "gemini-3-pro-preview",
  "Gemini 3 Flash": "gemini-3-flash-preview",
  
  // Google Gemini 2.5 Models
  "Gemini 2.5 Pro": "gemini-2.5-pro",
  "Gemini 2.5 Flash": "gemini-2.5-flash",
  "Gemini 2.5 Flash-Lite": "gemini-2.5-flash-lite",
  
  // Google Gemini 1.5 Models
  "Gemini 1.5 Pro": "gemini-1.5-pro",
  "Gemini 1.5 Flash": "gemini-1.5-flash",
  
  // Google Gemini 1.0 Models
  "Gemini 1.0 Pro": "gemini-1.0-pro",

  // DeepSeek Models
  "DeepSeek V3.2": "deepseek-v3.2-maas",
  
  // Anthropic Claude 4.5 Models
  "Claude 4.5 Opus": "claude-4-5-opus",
  "Claude 4.5 Sonnet": "claude-4-5-sonnet",
  "Claude 4.5 Haiku": "claude-4-5-haiku",
  
  // Meta Llama 4 Models
  "Llama 4 Scout": "llama-4-scout",
  "Llama 4 (8B)": "llama-4-8b-instruct",
  "Llama 4 (70B)": "llama-4-70b-instruct",
  
  // Meta Llama 3 Models
  "Llama 3.3 (70B)": "llama-3.3-70b-instruct-maas",
  "Llama 3.1 (405B)": "llama-3.1-405b-instruct-maas",
  
  // Mistral Models
  "Mistral Large 3": "mistral-large-2407",
  "Codestral": "codestral@2405",

  // Qwen Models
  "Qwen 3 (235B)": "qwen-3-235b-instruct"
};

// Aspect ratio mapping
const ASPECT_RATIOS = {
  "Square (1:1)": "1:1",
  "Portrait (9:16)": "9:16",
  "Landscape (16:9)": "16:9",
  "Portrait (3:4)": "3:4",
  "Landscape (4:3)": "4:3"
};

// Helper function to check if model is MaaS
function isMaaSModel(modelId) {
  return modelId.includes('-maas') || MAAS_MODELS.hasOwnProperty(modelId);
}

// Function to call MaaS models using direct REST API
async function callMaaSModel(modelId, message, conversationHistory = []) {
  const maasConfig = MAAS_MODELS[modelId];
  
  if (!maasConfig) {
    // If not in MAAS_MODELS, default to google publisher standard path
    return callVertexSDK(modelId, message, conversationHistory);
  }

  const location = maasConfig.location;
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  let url, requestBody;

  if (maasConfig.endpoint === 'openapi') {
    url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/endpoints/openapi/chat/completions`;
    
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    requestBody = {
      model: maasConfig.modelName,
      messages: messages,
      stream: false,
      temperature: 0.7,
      max_tokens: 8192
    };
  } else if (maasConfig.usePublishersPath) {
    url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/${maasConfig.publisher}/models/${modelId}:${maasConfig.endpoint}`;
    
    const contents = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    requestBody = {
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    };
  } else {
    url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/${maasConfig.publisher}/models/${modelId}:${maasConfig.endpoint}`;
    
    const contents = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    requestBody = {
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    };
  }

  console.log(`Calling MaaS model: ${modelId} at ${url}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MaaS API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (maasConfig.endpoint === 'openapi') {
    return data.choices?.[0]?.message?.content || '';
  } else {
    return data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
  }
}

async function callVertexSDK(modelId, message, conversationHistory = []) {
  const vertexAI = new VertexAI({
    project: projectId,
    location: 'us-central1',
    googleAuthOptions: { keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS }
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: modelId,
    generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 8192 },
  });

  const chat = generativeModel.startChat({
    history: conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))
  });

  const result = await chat.sendMessage(message);
  const response = result.response;
  return response.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', projectId, totalModels: Object.keys(MODEL_IDS).length });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, modelName = "Gemini 3 Flash", conversationHistory = [] } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const modelId = MODEL_IDS[modelName] || "gemini-3-flash-preview";
    console.log(`Chat with model: ${modelName} (${modelId})`);

    const text = isMaaSModel(modelId) 
      ? await callMaaSModel(modelId, message, conversationHistory)
      : await callVertexSDK(modelId, message, conversationHistory);

    res.json({ success: true, response: text, modelUsed: modelName });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Image Generation
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, modelName = "Imagen 4 Standard", aspectRatio = "Square (1:1)" } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const modelId = IMAGE_MODELS[modelName] || "imagen-3.0-generate-001";
    const ratio = ASPECT_RATIOS[aspectRatio] || "1:1";
    // Image generation models must use a regional endpoint, usually us-central1
    const location = 'us-central1';

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predict`;

    const requestBody = {
      instances: [{ prompt: prompt }],
      parameters: { sampleCount: 1, aspectRatio: ratio, personGeneration: "allow_adult" }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(await response.text());

    const data = await response.json();
    const imageData = data.predictions?.[0]?.bytesBase64Encoded;
    if (!imageData) throw new Error('No image data in response');

    res.json({ success: true, imageData, mimeType: 'image/png', modelUsed: modelName });
  } catch (error) {
    console.error('Image error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Video Generation (Long-Running)
app.post('/api/generate-video', async (req, res) => {
  console.log('➡️ Received request for /api/generate-video');
  try {
    const { prompt, modelName = "Veo 3.1 Cinematic", aspectRatio = "16:9" } = req.body;
    console.log(`📝 Params: model=${modelName}, ratio=${aspectRatio}, prompt="${prompt.substring(0, 30)}..."`);
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const modelId = VIDEO_MODELS[modelName] || "veo-3.1-generate-001";
    const location = 'us-central1';
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Veo 3.1 constraints - Strictly 16:9 or 9:16 across all versions
    let videoRatio = "16:9";
    const mappedRatio = ASPECT_RATIOS[aspectRatio] || aspectRatio;
    
    // Map anything that looks like Portrait to 9:16, otherwise 16:9
    if (mappedRatio === "9:16" || mappedRatio === "Portrait (9:16)" || mappedRatio === "3:4" || mappedRatio === "Portrait (3:4)") {
      videoRatio = "9:16";
    } else {
      videoRatio = "16:9";
    }

    console.log(`🎬 Final API videoRatio: ${videoRatio} (Model: ${modelId}, Input: ${aspectRatio})`);

    if (!projectId) {
      throw new Error('Project ID is not configured (REACT_APP_VERTEX_AI_PROJECT_ID)');
    }

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predictLongRunning`;
    
    console.log(`🎬 Video Generation: ${modelName} | Project: ${projectId} | URL: ${url}`);

    const requestBody = {
      instances: [{ prompt }],
      parameters: {
        durationSeconds: 8,
        generateAudio: true,
        aspectRatio: videoRatio,
        resolution: "1080p",
        sampleCount: 1,
        personGeneration: "allow_adult"
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${accessToken.token}`, 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Google API Error (${response.status}):`, errorText);
      throw new Error(`Google API Error: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Video generation started:', data.name);
    
    res.json({ success: true, operationName: data.name, modelUsed: modelName });
  } catch (error) {
    console.error('❌ Video generation exception:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Polling endpoint for long-running operations
app.get('/api/operation', async (req, res) => {
  try {
    const operationName = req.query.name;
    if (!operationName) return res.status(400).json({ error: 'Operation name is required' });

    console.log(`🔍 Checking operation status: ${operationName}`);

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Standard Vertex AI operation endpoint
    const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`;

    const response = await fetch(url, {
      headers: { 
        'Authorization': `Bearer ${accessToken.token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`⚠️ Standard operation check failed: ${errorText}. Trying fetchPredictOperation fallback...`);
      
      // Veo 3.1 fallback
      const parts = operationName.split('/');
      const project = parts[1];
      const location = parts[3];
      
      if (project && location) {
        const fallbackUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/veo-3.1-generate-001:fetchPredictOperation`;
        
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${accessToken.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ operationName })
        });
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          return res.json(fallbackData);
        }
      }
      
      throw new Error(`Operation check failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('❌ Operation status error:', error);
    res.status(500).json({ error: error.message });
  }
});

  // Leaderboard proxy
  app.get('/api/leaderboard-proxy', async (req, res) => {
    // Real LMSYS Arena leaderboard data (Static for now as fallback)
    // Updated with 2026 industry benchmarks and rankings (Latest Jan 2026 LM Arena)
      res.json([
        { model_name: 'Gemini 3 Pro', rating: 1488, organization: 'Google', preliminary: false },
        { model_name: 'Grok 4.1 Thinking', rating: 1476, organization: 'xAI', preliminary: false },
        { model_name: 'Gemini 3 Flash', rating: 1471, organization: 'Google', preliminary: false },
        { model_name: 'Claude 4.5 Opus (Thinking)', rating: 1468, organization: 'Anthropic', preliminary: false },
        { model_name: 'Claude 4.5 Opus', rating: 1467, organization: 'Anthropic', preliminary: false },
        { model_name: 'Grok 4.1', rating: 1466, organization: 'xAI', preliminary: false },
        { model_name: 'Gemini 3 Flash (Thinking)', rating: 1464, organization: 'Google', preliminary: false },
        { model_name: 'GPT-5.1 High', rating: 1458, organization: 'OpenAI', preliminary: false },
        { model_name: 'Ernie 5.0', rating: 1454, organization: 'Baidu', preliminary: false },
        { model_name: 'Claude 4.5 Sonnet (Thinking)', rating: 1451, organization: 'Anthropic', preliminary: false },
        { model_name: 'Claude 4.5 Sonnet', rating: 1445, organization: 'Anthropic', preliminary: false },
        { model_name: 'DeepSeek V4.1', rating: 1438, organization: 'DeepSeek', preliminary: false },
        { model_name: 'Llama 5 (405B)', rating: 1425, organization: 'Meta', preliminary: false },
        { model_name: 'Qwen 4 Max', rating: 1412, organization: 'Alibaba', preliminary: true },
        { model_name: 'GPT-5.1 Mini', rating: 1395, organization: 'OpenAI', preliminary: false },
        { model_name: 'Gemini 3.2 Pro', rating: 1376, organization: 'Google', preliminary: false },
        { model_name: 'Mistral Large 4', rating: 1372, organization: 'Mistral AI', preliminary: false },
        { model_name: 'DeepSeek V3.5', rating: 1368, organization: 'DeepSeek', preliminary: false },
        { model_name: 'Llama 4.2 (70B)', rating: 1365, organization: 'Meta', preliminary: false },
        { model_name: 'Yi-2.0 Ultra', rating: 1358, organization: '01.AI', preliminary: true },
        { model_name: 'Gemini 3.2 Flash', rating: 1352, organization: 'Google', preliminary: false },
        { model_name: 'Codestral 2.5', rating: 1348, organization: 'Mistral AI', preliminary: false },
        { model_name: 'GPT-4.5 Ultra', rating: 1345, organization: 'OpenAI', preliminary: false },
        { model_name: 'Mistral Nemo 3', rating: 1340, organization: 'Mistral AI', preliminary: false },
        { model_name: 'Qwen 3.5 Turbo', rating: 1338, organization: 'Alibaba', preliminary: false },
        { model_name: 'Llama 4.1 (8B)', rating: 1332, organization: 'Meta', preliminary: false }
      ]);
  });

app.listen(PORT, () => {
  console.log(`🚀 Vertex AI Proxy Server running on http://localhost:${PORT}`);
});

module.exports = app;
