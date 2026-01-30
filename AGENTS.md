## Project Summary
A high-end AI creative ecosystem featuring advanced chat, image generation, and model performance benchmarks. The platform focuses on premium aesthetics, featuring a "million-dollar" light-themed UI with glassmorphism and interactive hexagon backgrounds.

## Tech Stack
- **Frontend**: React (Create React App), Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Express (Proxy server for external APIs)
- **Services**: Vertex AI integration (Gemini models)
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Routing**: React Router DOM

## Architecture
- `src/components`: UI components (Hero, Chat, Leaderboard, Gallery)
- `src/components/ui`: Reusable design elements (Backgrounds, Navbar)
- `src/services`: API interaction logic (Leaderboard fetching)
- `server/`: Backend proxy for handling API requests and bypassing CORS

## User Preferences
- **Theme**: Light theme preferred (premium white/slate aesthetic).
- **Background**: Hexagon/Honeycomb design with hover effects and high visibility.
- **Design Quality**: "10/10" million-dollar aesthetic, avoiding "AI slop".
- **Interactivity**: High-end motion and glassmorphic elements.

## Project Guidelines
- Use PascalCase for React components and file names.
- Maintain a clean, premium light-mode aesthetic.
- Use Framer Motion for sophisticated animations.
- No comments unless requested.

## Common Patterns
- Glassmorphism: `bg-white/60 backdrop-blur-[40px] border border-slate-200/50`.
- Hexagon Backgrounds: Interactive, responsive grid with parallax effects.
- Typography: Bold, high-impact headings (black weight) with tracking-tighter.
- Buttons: Rounded-2xl with subtle shadows and scaling transitions.
