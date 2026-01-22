// Vertex AI Service - Frontend API Client
// Calls the backend proxy server for secure authentication

class VertexAIService {
  constructor() {
    // Backend API base URL (uses proxy configured in package.json)
    this.baseURL = '/api';
  }

  /**
   * Send a chat message to Vertex AI via backend proxy
   * @param {string} message - The user's message
   * @param {string} modelName - The selected model name
   * @param {Array} conversationHistory - Previous messages in the conversation
   * @returns {Promise<Object>} - The AI's response with metadata
   */
  async sendMessage(message, modelName = "Gemini 3 Flash", conversationHistory = []) {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          modelName,
          conversationHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'AI request failed');
      }

      return {
        text: data.response,
        modelUsed: data.modelUsed,
        modelId: data.modelId
      };
    } catch (error) {
      console.error('Error calling Vertex AI:', error);
      throw error;
    }
  }

  /**
   * Stream a chat message to Vertex AI (for real-time responses)
   * @param {string} message - The user's message
   * @param {string} modelName - The selected model name
   * @param {Function} onChunk - Callback for each chunk of the response
   * @param {Array} conversationHistory - Previous messages in the conversation
   * @returns {Promise<string>} - The full response text
   */
  async streamMessage(message, modelName = "Gemini 3 Flash", onChunk, conversationHistory = []) {
    try {
      const response = await fetch(`${this.baseURL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          modelName,
          conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error('Failed to start streaming');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              return fullResponse;
            }

            try {
              const jsonData = JSON.parse(data);
              if (jsonData.text) {
                fullResponse += jsonData.text;
                onChunk(jsonData.text);
              } else if (jsonData.error) {
                throw new Error(jsonData.error);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      return fullResponse;
    } catch (error) {
      console.error('Error streaming from Vertex AI:', error);
      throw error;
    }
  }

  /**
   * Get available models from backend
   * @returns {Promise<Array>} - List of available models
   */
  async getAvailableModels() {
    try {
      const response = await fetch(`${this.baseURL}/models`);
      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  }

  /**
   * Generate an image using Vertex AI image generation models
   * @param {string} prompt - The image generation prompt
   * @param {string} modelName - The selected image model name
   * @param {string} aspectRatio - The aspect ratio for the image
   * @returns {Promise<Object>} - The generated image data
   */
  async generateImage(prompt, modelName = "Imagen 4 Standard", aspectRatio = "Square (1:1)") {
    try {
      const response = await fetch(`${this.baseURL}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          modelName,
          aspectRatio
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Image generation failed');
      }

      return {
        imageData: data.imageData,
        mimeType: data.mimeType,
        modelUsed: data.modelUsed,
        modelId: data.modelId,
        aspectRatio: data.aspectRatio
      };
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }

  /**
   * Health check for backend server
   * @returns {Promise<Object>} - Server status
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Backend server not responding:', error);
      throw new Error('Backend server is not running. Please start it with: npm run server');
    }
  }
}

const vertexAIService = new VertexAIService();

export default vertexAIService;
