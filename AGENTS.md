## Project Summary
A multi-modal AI creative ecosystem utilizing Google Vertex AI for advanced text, image, video, music, and website generation. The platform features a "million-dollar" light-themed UI with high-end glassmorphism, dynamic intelligence selectors, and a professional dual-pane workspace.

## Tech Stack
- **Frontend**: React (CRA), Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Express (Node.js) with Google Vertex AI SDK & Auth
- **AI Models**: Gemini 3, Gemini 2.5, Claude 4.5, DeepSeek 3.2, Llama 4, Imagen 4, Veo 3.1, Lyria 2
- **Routing**: React Router DOM (v6)

## Architecture
- `src/components/ChatboxContainer.jsx`: The "Floating Glass Island" Hero chatbox with multi-function tabs.
- `src/components/ChatPage.jsx`: Professional 20/80 split workspace for AI responses and generation previews.
- `src/services/vertexAIService.js`: Centralized service layer for multi-modal generation and polling.
- `server/server.js`: Secure backend proxy for Vertex AI, handling MaaS REST API calls and long-running operations.

## User Preferences
- **Aesthetic**: "Million-dollar" premium design language (Light Mode).
- **Layout**: Floating components, glassmorphic panels, and spacious dual-pane workspaces.
- **Interactivity**: Fluid transitions via Framer Motion, dynamic model filtering, and real-time generation polling.

## Project Guidelines
- **UI Design**: 10/10 quality; avoid "AI slop" by using distinctive typography and sharp accents.
- **Redirection**: Initial Hero interactions must redirect to the dedicated Workspace page with full state context.
- **Multi-modality**: Support for Chat, Image (Imagen 4), Video (Veo 3.1), Music (Lyria 2), and Website Builder.

## Common Patterns
- **Glassmorphism**: `bg-white/60 backdrop-blur-[40px] border border-slate-200/50 shadow-xl`.
- **Workspace Layout**: 20% Sidebar (History) / 80% Main (Generation Area).
- **Long-Running Ops**: Backend pooling with operation status polling for heavy tasks like video generation.
- **Dynamic Selectors**: Model dropdowns that automatically filter based on the active function tab.
