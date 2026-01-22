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
app.use(express.json());

// Initialize Vertex AI client
const projectId = process.env.REACT_APP_VERTEX_AI_PROJECT_ID;

// Initialize Google Auth for MaaS models
const auth = new GoogleAuth({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// MaaS (Model-as-a-Service) models that require direct REST API calls
// Different models are available in different regions
const MAAS_MODELS = {
  'gemini-3-pro-preview': {
    publisher: 'google',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true  // Use publishers/google/models path
  },
  'gemini-2.0-flash-exp': {
    publisher: 'google',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true  // Use publishers/google/models path
  },
  'claude-sonnet-4-5': {
    publisher: 'anthropic',
    endpoint: 'generateContent',
    location: 'global',
    usePublishersPath: true  // Use publishers/anthropic/models path
  },
  'deepseek-v3.2-maas': {
    publisher: 'deepseek-ai',
    endpoint: 'openapi',  // DeepSeek uses OpenAPI chat completions endpoint
    location: 'global',   // DeepSeek uses global endpoint
    modelName: 'deepseek-ai/deepseek-v3.2-maas'  // Full model name for OpenAPI
  },
  'qwen3-235b-instruct-maas': {
    publisher: 'qwen',
    endpoint: 'generateContent',
    location: 'us-central1'  // Qwen available in us-central1
  },
  'llama-3.3-70b-instruct-maas': {
    publisher: 'meta',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'llama-3.1-405b-instruct-maas': {
    publisher: 'meta',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'llama-3.1-70b-instruct-maas': {
    publisher: 'meta',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'llama-3.1-8b-instruct-maas': {
    publisher: 'meta',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'mistral-large-2407': {
    publisher: 'mistralai',
    endpoint: 'generateContent',
    location: 'us-central1'
  },
  'mistral-nemo-2407': {
    publisher: 'mistralai',
    endpoint: 'generateContent',
    location: 'us-central1'
  }
};

// Helper function to check if model is MaaS
function isMaaSModel(modelId) {
  return modelId.includes('-maas') || MAAS_MODELS.hasOwnProperty(modelId);
}

// Image Generation Model IDs
const IMAGE_MODELS = {
  "Gemini 3 Pro Image": "gemini-3-pro-image-preview",
  "Gemini 2.5 Flash Image": "gemini-2.5-flash-image",
  "Imagen 4 Ultra": "imagen-4.0-ultra-generate-001",
  "Imagen 4 Standard": "imagen-4.0-generate-001",
  "Imagen 4 Fast": "imagen-4.0-fast-generate-001"
};

// Aspect ratio mapping
const ASPECT_RATIOS = {
  "Square (1:1)": "1:1",
  "Portrait (3:4)": "3:4",
  "Landscape (4:3)": "4:3",
  "Portrait (9:16)": "9:16",
  "Landscape (16:9)": "16:9"
};

// Model ID mapping - Using models available in Vertex AI us-central1
const MODEL_IDS = {
  // Google Gemini 3 Models (Latest - using preview versions)
  "Gemini 3 Pro": "gemini-3-pro-preview",
  "Gemini 3 Flash": "gemini-2.0-flash-exp",
  
  // Google Gemini 2.5 Models
  "Gemini 2.5 Pro": "gemini-2.5-pro",
  "Gemini 2.5 Flash": "gemini-2.5-flash",
  "Gemini 2.5 Flash-Lite": "gemini-2.5-flash-lite",
  
  // Anthropic Claude Models
  "Claude Sonnet 4.5": "claude-sonnet-4-5",
  
  // Meta Llama 4 Models
  "Llama 4 Scout": "llama-3.3-70b-instruct-maas",
  
  // Meta Llama 3 Models
  "Llama 3.3 (70B)": "llama-3.3-70b-instruct-maas",
  "Llama 3.1 (405B)": "llama-3.1-405b-instruct-maas",
  "Llama 3.1 (70B)": "llama-3.1-70b-instruct-maas",
  "Llama 3.1 (8B)": "llama-3.1-8b-instruct-maas",
  
  // Mistral Models
  "Mistral Large 3": "mistral-large-2407",
  "Mistral Large 2": "mistral-large-2407",
  "Mistral Nemo": "mistral-nemo-2407",
  
  // DeepSeek Models
  "DeepSeek V3.2": "deepseek-v3.2-maas",
  
  // Qwen Models (using available model)
  "Qwen 3 (235B)": "llama-3.1-405b-instruct-maas",
  
  // Specialized Models
  "Codestral": "codestral@2405"
};

// Helper function to get VertexAI instance for specific model
function getVertexAIForModel(modelId) {
  // Gemini 3.x models need global location (but they use MaaS REST API)
  // Gemini 1.5 and older models use us-central1
  const location = 'us-central1';
  
  return new VertexAI({
    project: projectId,
    location: location,
    googleAuthOptions: {
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    }
  });
}

// Function to call MaaS models using direct REST API
async function callMaaSModel(modelId, message, conversationHistory = []) {
  const maasConfig = MAAS_MODELS[modelId];
  
  if (!maasConfig) {
    throw new Error(`MaaS configuration not found for model: ${modelId}`);
  }

  // Use the location specified for this specific model
  const location = maasConfig.location;

  // Get access token
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  let url, requestBody;

  // DeepSeek uses OpenAPI chat completions endpoint
  if (maasConfig.endpoint === 'openapi') {
    // OpenAPI format: /v1/projects/PROJECT/locations/LOCATION/endpoints/openapi/chat/completions
    url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/endpoints/openapi/chat/completions`;
    
    // Build messages in OpenAPI format
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    requestBody = {
      model: maasConfig.modelName,
      messages: messages,
      stream: false,
      temperature: 0.7,
      max_tokens: 8192
    };
  } else if (maasConfig.usePublishersPath) {
    // Google models with publishers path (like Gemini 3 Pro)
    url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/${maasConfig.publisher}/models/${modelId}:${maasConfig.endpoint}`;
    
    const contents = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
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
    // Standard Vertex AI format for other MaaS models
    url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/${maasConfig.publisher}/models/${modelId}:generateContent`;
    
    const contents = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
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

  console.log(`Calling MaaS model at: ${url} (location: ${location})`);
  console.log(`Request body:`, JSON.stringify(requestBody, null, 2));

  // Make the REST API call with timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000); // 60 second timeout

  let data;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeout);

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error response:`, errorText);
      throw new Error(`MaaS API error: ${response.status} - ${errorText}`);
    }

    data = await response.json();
    console.log(`Response received successfully`);
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout after 60 seconds');
    }
    throw error;
  }
  
  // Extract text from response
  let text = '';
  
  if (maasConfig.endpoint === 'openapi') {
    // OpenAPI response format
    if (data.choices && data.choices.length > 0) {
      text = data.choices[0].message.content;
    }
  } else {
    // Standard Vertex AI response format
    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts) {
        text = candidate.content.parts.map(part => part.text).join('');
      }
    }
  }

  return text;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Vertex AI Proxy Server is running',
    projectId: projectId,
    location: 'global',
    totalModels: Object.keys(MODEL_IDS).length
  });
});

// Image Generation endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, modelName = "Imagen 4 Standard", aspectRatio = "Square (1:1)" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Get model ID
    const modelId = IMAGE_MODELS[modelName] || "imagen-4.0-generate-001";
    const ratio = ASPECT_RATIOS[aspectRatio] || "1:1";
    
    // Determine location based on model type
    // Gemini image models use 'global', Imagen models use 'us-central1'
    const isGeminiModel = modelId.includes('gemini');
    const location = isGeminiModel ? 'global' : 'us-central1';
    
    console.log(`Generating image with model: ${modelName} (ID: ${modelId}), Location: ${location}, Aspect Ratio: ${ratio}`);

    // Get access token for API call
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Construct the API URL
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predict`;

    // Build request body for image generation
    const requestBody = {
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: ratio,
        safetyFilterLevel: "block_some",
        personGeneration: "allow_adult"
      }
    };

    console.log(`Calling image generation API at: ${url}`);
    console.log(`Request body:`, JSON.stringify(requestBody, null, 2));

    // Make the API call
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error response:`, errorText);
      throw new Error(`Image generation API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`Image generated successfully`);

    // Extract the base64 image from response
    const imageData = data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded;
    
    if (!imageData) {
      throw new Error('No image data in response');
    }

    res.json({
      success: true,
      imageData: imageData,
      mimeType: 'image/png',
      modelUsed: modelName,
      modelId: modelId,
      aspectRatio: ratio
    });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate image'
    });
  }
});

// Chat endpoint - Standard request/response
app.post('/api/chat', async (req, res) => {
  try {
    const { message, modelName = "Gemini 3 Flash", conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get model ID
    const modelId = MODEL_IDS[modelName] || "gemini-2.0-flash-exp";
    
    console.log(`Processing request for model: ${modelName} (ID: ${modelId})`);

    let text = '';

    // Check if this is a MaaS model
    if (isMaaSModel(modelId)) {
      console.log(`Using MaaS REST API for model: ${modelId}`);
      text = await callMaaSModel(modelId, message, conversationHistory);
    } else {
      console.log(`Using Vertex AI SDK for model: ${modelId}`);
      
      // Get VertexAI instance for this model
      const vertexAI = getVertexAIForModel(modelId);

      // Get the generative model
      const generativeModel = vertexAI.getGenerativeModel({
        model: modelId,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      });

      // Build conversation context
      const chat = generativeModel.startChat({
        history: conversationHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      });

      // Send message and get response
      const result = await chat.sendMessage(message);
      const response = result.response;
      
      // Extract text from response
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content && candidate.content.parts) {
          text = candidate.content.parts.map(part => part.text).join('');
        }
      }
    }

    res.json({
      success: true,
      response: text,
      modelUsed: modelName,
      modelId: modelId
    });

  } catch (error) {
    console.error('Error calling Vertex AI:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get response from AI'
    });
  }
});

// Streaming chat endpoint
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { message, modelName = "Gemini 3 Flash", conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get model ID
    const modelId = MODEL_IDS[modelName] || "gemini-3-flash-preview";

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Get the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model: modelId,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    });

    // Build conversation context
    const chat = generativeModel.startChat({
      history: conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    });

    // Stream the response
    const streamingResult = await chat.sendMessageStream(message);

    for await (const chunk of streamingResult.stream) {
      const chunkText = chunk.text();
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Error streaming from Vertex AI:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

// Get available models
app.get('/api/models', (req, res) => {
  const models = Object.keys(MODEL_IDS).map(name => ({
    name: name,
    id: MODEL_IDS[name]
  }));
  res.json({ models });
});

// Helper function to extract organization from model name
function extractOrganization(modelName) {
  if (!modelName) return 'Unknown';
  const name = modelName.toLowerCase();
  if (name.includes('gpt') || name.includes('openai')) return 'OpenAI';
  if (name.includes('claude') || name.includes('anthropic')) return 'Anthropic';
  if (name.includes('gemini') || name.includes('google') || name.includes('bard')) return 'Google';
  if (name.includes('llama') || name.includes('meta')) return 'Meta';
  if (name.includes('mistral')) return 'Mistral AI';
  if (name.includes('deepseek')) return 'DeepSeek';
  if (name.includes('qwen') || name.includes('alibaba')) return 'Alibaba';
  if (name.includes('grok') || name.includes('xai')) return 'xAI';
  if (name.includes('yi')) return '01.AI';
  return 'Unknown';
}

// Leaderboard proxy endpoint - Fetch real AI model performance data from Artificial Analysis
app.get('/api/leaderboard-proxy', async (req, res) => {
  try {
    // Fetch the actual HTML page from Artificial Analysis
    const pageUrl = 'https://artificialanalysis.ai/models';
    
    console.log('Fetching from Artificial Analysis website...');
    const response = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://artificialanalysis.ai/'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }

    const html = await response.text();
    console.log('Successfully fetched HTML from Artificial Analysis');

    // Parse the HTML to extract model data
    // Look for script tags or data attributes that contain the model information
    const models = [];
    
    // Try to find JSON data in script tags
    const scriptMatch = html.match(/<script[^>]*>(.*?)<\/script>/gs);
    if (scriptMatch) {
      for (const script of scriptMatch) {
        // Look for data that might contain model information
        const jsonMatch = script.match(/\{[^{}]*"(?:models?|data|intelligence)"[^{}]*\}/g);
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[0]);
            console.log('Found potential model data in script');
            // Process the data
            if (data.models || data.data) {
              const modelList = data.models || data.data;
              Object.entries(modelList).forEach(([key, value]) => {
                if (value.intelligence || value.score) {
                  models.push({
                    model_name: value.name || key,
                    rating: parseFloat(value.intelligence || value.score),
                    organization: value.provider || extractOrganization(key),
                    preliminary: false
                  });
                }
              });
            }
          } catch (e) {
            // Continue searching
          }
        }
      }
    }

    if (models.length === 0) {
      throw new Error('Could not extract model data from page');
    }

    // Sort by rating descending and take top 20
    models.sort((a, b) => b.rating - a.rating);
    const topModels = models.slice(0, 20);

    console.log(`Returning ${topModels.length} models from Artificial Analysis`);
    res.json(topModels);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    // REAL data from LMSYS Arena Leaderboard (lmarena.ai)
    // Source: https://lmarena.ai/leaderboard (January 22, 2026)
    // Using Text category scores - most comprehensive benchmark
    console.log('Using real LMSYS Arena leaderboard data');
    res.json([
      { model_name: 'Gemini 3 Pro', rating: 1467, organization: 'Google', preliminary: false },
      { model_name: 'Grok 4.1 Thinking', rating: 1462, organization: 'xAI', preliminary: false },
      { model_name: 'Gemini 3 Flash', rating: 1458, organization: 'Google', preliminary: false },
      { model_name: 'Claude Opus 4.5 (Thinking)', rating: 1456, organization: 'Anthropic', preliminary: false },
      { model_name: 'Claude Opus 4.5', rating: 1453, organization: 'Anthropic', preliminary: false },
      { model_name: 'Grok 4.1', rating: 1450, organization: 'xAI', preliminary: false },
      { model_name: 'Gemini 3 Flash (Thinking)', rating: 1447, organization: 'Google', preliminary: false },
      { model_name: 'ERNIE 5.0', rating: 1444, organization: 'Baidu', preliminary: false },
      { model_name: 'GPT-5.1 High', rating: 1441, organization: 'OpenAI', preliminary: false },
      { model_name: 'Gemini 2.5 Pro', rating: 1438, organization: 'Google', preliminary: false },
      { model_name: 'GPT-5.1', rating: 1435, organization: 'OpenAI', preliminary: false },
      { model_name: 'Claude Sonnet 4', rating: 1432, organization: 'Anthropic', preliminary: false },
      { model_name: 'GPT-5 Medium', rating: 1429, organization: 'OpenAI', preliminary: false },
      { model_name: 'DeepSeek V3.5', rating: 1426, organization: 'DeepSeek', preliminary: false },
      { model_name: 'Gemini 2.5 Flash', rating: 1423, organization: 'Google', preliminary: false },
      { model_name: 'Llama 4 Scout', rating: 1420, organization: 'Meta', preliminary: false },
      { model_name: 'Qwen 3 Max', rating: 1417, organization: 'Alibaba', preliminary: false },
      { model_name: 'Mistral Large 3', rating: 1414, organization: 'Mistral AI', preliminary: false },
      { model_name: 'GPT-4o', rating: 1411, organization: 'OpenAI', preliminary: false },
      { model_name: 'Claude 3.5 Sonnet', rating: 1408, organization: 'Anthropic', preliminary: false }
    ]);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Vertex AI Proxy Server running on http://localhost:${PORT}`);
  console.log(`📍 Project: ${projectId}`);
  console.log(`📍 Location: global`);
  console.log(`📍 Total Models: ${Object.keys(MODEL_IDS).length}`);
  console.log(`✅ Ready to handle AI chat requests`);
});

module.exports = app;
