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
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
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
        <div className="min-h-screen w-full relative text-slate-900 selection:bg-purple-500/10">
          {/* Logo */}
          <div className="fixed top-6 left-8 z-50">
            <Logo />
          </div>
          
          {/* Navbar */}
          <div className="">
            <NavBar items={navItems} />
          </div>
          
          {/* Hero Section */}
          <div className="">
            <HeroSection />
          </div>
          
          {/* Main Content - Chatbox Container */}
          <div className="">
            <ChatboxContainer />
          </div>
          
          {/* Model Performance Section */}
          <div className="">
            <ModelPerformance />
          </div>
          
          {/* Community Showcase Section */}
          <div className="">
            <CommunityShowcase />
          </div>
          
          {/* Premium Footer */}
          <div className="">
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
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
