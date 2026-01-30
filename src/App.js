import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/ui/TubelightNavbar.jsx';
import { Logo } from './components/Logo';
import { HexagonBackground } from './components/ui/hexagon-background.jsx';
import { HeroSection } from './components/HeroSection';
import { ChatboxContainer } from './components/ChatboxContainer';
import { ChatPage } from './components/ChatPage';
import { ImageGenerationPage } from './components/ImageGenerationPage';
import { ModelPerformance } from './components/ModelPerformance';
import { CommunityShowcase } from './components/CommunityShowcase';
import { Footer } from './components/ui/Footer';

function HomePage() {
  const navItems = [
    { name: 'Solutions', url: '#solutions' },
    { name: 'Enterprise', url: '#enterprise' },
    { name: 'Pricing', url: '#pricing' },
    { name: 'Community', url: '#community' },
    { name: 'Discover', url: '#discover' }
  ];

  return (
    <HexagonBackground>
      <div className="min-h-screen w-full relative text-slate-900 selection:bg-purple-500/10 pointer-events-none">
        {/* Logo */}
        <div className="fixed top-6 left-8 z-50 pointer-events-auto">
          <Logo />
        </div>
        
        {/* Navbar */}
        <div className="pointer-events-auto">
          <NavBar items={navItems} />
        </div>
        
        {/* Hero Section */}
        <div className="pointer-events-auto">
          <HeroSection />
        </div>
        
        {/* Main Content - Chatbox Container */}
        <div className="pointer-events-auto">
          <ChatboxContainer />
        </div>
        
        {/* Model Performance Section */}
        <div className="pointer-events-auto">
          <ModelPerformance />
        </div>
        
        {/* Community Showcase Section */}
        <div className="pointer-events-auto">
          <CommunityShowcase />
        </div>
        
        {/* Premium Footer */}
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </HexagonBackground>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/image-generation" element={<ImageGenerationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
