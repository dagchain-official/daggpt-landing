import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/ui/tubelight-navbar';
import { Logo } from './components/Logo';
import { BackgroundVideo } from './components/BackgroundVideo';
import { HeroSection } from './components/HeroSection';
import { ChatboxContainer } from './components/ChatboxContainer';
import { ChatPage } from './components/ChatPage';
import { ImageGenerationPage } from './components/ImageGenerationPage';
import { ModelPerformance } from './components/ModelPerformance';
import { CommunityShowcase } from './components/CommunityShowcase';

function HomePage() {
  const navItems = [
    { name: 'Solutions', url: '#solutions' },
    { name: 'Enterprise', url: '#enterprise' },
    { name: 'Pricing', url: '#pricing' },
    { name: 'Community', url: '#community' },
    { name: 'Discover', url: '#discover' }
  ];

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Background Video */}
      <BackgroundVideo />
      
      {/* Logo */}
      <div className="fixed top-6 left-8 z-50">
        <Logo />
      </div>
      
        {/* Navbar */}
        <NavBar items={navItems} />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Main Content - Chatbox Container */}
        <ChatboxContainer />
        
        {/* Model Performance Section */}
      <ModelPerformance />
      
      {/* Community Showcase Section */}
      <CommunityShowcase />
    </div>
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
