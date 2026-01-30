// Vertex AI Service - Frontend API Client
// Calls the backend proxy server for secure authentication

class VertexAIService {
  constructor() {
    // Backend API base URL (uses proxy configured in package.json)
    this.baseURL = '/api';
  }

  /**
   * Safe JSON fetch helper
   */
  async safeFetch(url, options = {}) {
    const defaultHeaders = {
      'Accept': 'application/json',
    };

    if (options.body && !options.headers?.['Content-Type']) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const mergedOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
      const response = await fetch(url, {
        ...mergedOptions,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      console.log(`🌐 Fetch ${options.method || 'GET'} ${url} | Status: ${response.status}`);
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text.substring(0, 100) || errorMessage;
        }
        throw new Error(errorMessage);
      }

      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      throw new Error(`Expected JSON response but received ${contentType || 'unknown content'}`);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out after 60 seconds');
      }
      throw error;
    }
  }

  /**
   * Send a chat message to Vertex AI via backend proxy
   */
  async sendMessage(message, modelName = "Gemini 3 Flash", conversationHistory = []) {
    try {
      const data = await this.safeFetch(`${this.baseURL}/chat`, {
        method: 'POST',
        body: JSON.stringify({ message, modelName, conversationHistory })
      });

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
      const data = await this.safeFetch(`${this.baseURL}/generate-image`, {
        method: 'POST',
        body: JSON.stringify({ prompt, modelName, aspectRatio })
      });

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
      const data = await this.safeFetch(`${this.baseURL}/generate-video`, {
        method: 'POST',
        body: JSON.stringify({ prompt, modelName, aspectRatio })
      });
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
      const data = await this.safeFetch(`${this.baseURL}/generate-music`, {
        method: 'POST',
        body: JSON.stringify({ prompt, modelName })
      });
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
      const data = await this.safeFetch(`${this.baseURL}/generate-website`, {
        method: 'POST',
        body: JSON.stringify({ prompt })
      });
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
      // Use query parameter to avoid path regex issues in Express 5
      return await this.safeFetch(`${this.baseURL}/operation?name=${encodeURIComponent(operationName)}`);
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
