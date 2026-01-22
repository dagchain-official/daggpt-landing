import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, RefreshCw, Sparkles } from 'lucide-react';
import vertexAIService from '../services/vertexAIService';

export function ImageGenerationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialPrompt, selectedModel, aspectRatio } = location.state || {};
  
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState(null);
  const [imageMetadata, setImageMetadata] = useState(null);

  // Loading stage animation effect
  React.useEffect(() => {
    if (isGenerating) {
      setLoadingStage(0);
      setLoadingText('');
      const timer1 = setTimeout(() => setLoadingStage(1), 2000);
      const timer2 = setTimeout(() => setLoadingStage(2), 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setLoadingText('');
    }
  }, [isGenerating]);

  // Letter-by-letter typing animation
  React.useEffect(() => {
    if (!isGenerating) return;
    
    const texts = ['Initializing...', 'Generating image...', 'Finalizing artwork...'];
    const currentText = texts[loadingStage];
    let currentIndex = 0;
    
    setLoadingText('');
    
    const typingInterval = setInterval(() => {
      if (currentIndex < currentText.length) {
        setLoadingText(currentText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [loadingStage, isGenerating]);

  React.useEffect(() => {
    if (initialPrompt) {
      handleGenerateImage(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateImage = async (promptText = prompt) => {
    if (!promptText.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await vertexAIService.generateImage(
        promptText.trim(),
        selectedModel || 'Imagen 4 Standard',
        aspectRatio || 'Square (1:1)'
      );

      setGeneratedImage(`data:${response.mimeType};base64,${response.imageData}`);
      setImageMetadata({
        modelUsed: response.modelUsed,
        modelId: response.modelId,
        aspectRatio: response.aspectRatio,
        prompt: promptText.trim()
      });
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    try {
      // Convert base64 to blob
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], 'generated-image.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Generated Image',
          text: imageMetadata?.prompt || 'Check out this AI-generated image!'
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        alert('Image copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing image:', err);
      alert('Failed to share image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-500">Model:</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {selectedModel || 'Imagen 4 Standard'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Display */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Image Container */}
              <div className="relative bg-gray-100 aspect-square flex items-center justify-center min-h-[400px]">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-sm text-gray-500 italic">{loadingText}</p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated artwork"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm">Your generated image will appear here</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {generatedImage && !isGenerating && (
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border border-gray-200 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border border-gray-200 text-sm font-medium"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                  <button
                    onClick={() => handleGenerateImage()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                </div>
              )}
            </div>

            {/* Image Metadata */}
            {imageMetadata && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Image Details</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Model:</span>
                    <span className="text-gray-900 font-medium">{imageMetadata.modelUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Aspect Ratio:</span>
                    <span className="text-gray-900 font-medium">{imageMetadata.aspectRatio}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-500 block mb-1">Prompt:</span>
                    <p className="text-gray-900 text-xs leading-relaxed">{imageMetadata.prompt}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Prompt Input & Tips */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Generate New Image</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              />
              <button
                onClick={() => handleGenerateImage()}
                disabled={!prompt.trim() || isGenerating}
                className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  !prompt.trim() || isGenerating
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Tips & Guidelines */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">💡 Tips for Better Results</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Be descriptive and specific about what you want</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Include details about style, colors, and mood</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Avoid requesting real places or people</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Use artistic styles instead of "realistic" or "photorealistic"</span>
                </li>
              </ul>
            </div>

            {/* Example Prompts */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">✨ Example Prompts</h3>
              <div className="space-y-2">
                {[
                  "A serene mountain valley with waterfalls and pine forests in watercolor style",
                  "A futuristic cityscape at sunset with flying vehicles, digital art",
                  "A cozy coffee shop interior with warm lighting, illustrated style",
                  "An enchanted forest with glowing mushrooms and fireflies, fantasy art"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-gray-100 hover:border-primary/20"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
