// Vertex AI Service - Frontend API Client
// Calls the backend proxy server for secure authentication

class VertexAIService {
  constructor() {
    // Backend API base URL (uses proxy configured in package.json)
    this.baseURL = '/api';
  }

  /**
   * Send a chat message to Vertex AI via backend proxy
   */
  async sendMessage(message, modelName = "Gemini 3 Flash", conversationHistory = []) {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, modelName, conversationHistory })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'AI request failed');

      return {
        text: data.response,
        modelUsed: data.modelUsed,
        modelId: data.modelId
      };
    } catch (error) {
      console.error('Error calling Vertex AI Chat:', error);
      throw error;
    }
  }

  /**
   * Generate an image using Vertex AI
   */
  async generateImage(prompt, modelName = "Imagen 4 Standard", aspectRatio = "Square (1:1)") {
    try {
      const response = await fetch(`${this.baseURL}/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, modelName, aspectRatio })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Image generation failed');

      return data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }

  /**
   * Generate a video using Vertex AI (Long-running)
   */
  async generateVideo(prompt, modelName = "Veo 3.1 Cinematic", aspectRatio = "16:9") {
    try {
      const response = await fetch(`${this.baseURL}/generate-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, modelName, aspectRatio })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start video generation');
      }

      const data = await response.json();
      return data; // returns operationName
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  /**
   * Generate music using Vertex AI
   */
  async generateMusic(prompt, modelName = "Lyria 2 High-Fidelity") {
    try {
      const response = await fetch(`${this.baseURL}/generate-music`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, modelName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate music');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating music:', error);
      throw error;
    }
  }

  /**
   * Build a website using Vertex AI
   */
  async generateWebsite(prompt) {
    try {
      const response = await fetch(`${this.baseURL}/generate-website`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to build website');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error building website:', error);
      throw error;
    }
  }

  /**
   * Check operation status (polling)
   */
  async checkOperationStatus(operationName) {
    try {
      const response = await fetch(`${this.baseURL}/operation/${encodeURIComponent(operationName)}`);
      if (!response.ok) throw new Error('Failed to check operation status');
      return await response.json();
    } catch (error) {
      console.error('Error checking operation:', error);
      throw error;
    }
  }

  /**
   * Get available models
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
}

const vertexAIService = new VertexAIService();
export default vertexAIService;
