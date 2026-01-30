import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Printer, 
  ChevronRight,
  CheckCircle2,
  Clock,
  Globe
} from 'lucide-react';
import { Logo } from './Logo';

export function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const sections = useMemo(() => [
    { id: 'overview', title: 'Overview', icon: Globe },
    { id: 'scope', title: 'Scope & Applicability', icon: Shield },
    { id: 'data-collection', title: 'Data Collection', icon: Eye },
    { id: 'ai-lifecycle', title: 'AI Data Lifecycle', icon: Lock },
    { id: 'gdpr', title: 'GDPR Compliance', icon: CheckCircle2 },
    { id: 'sharing', title: 'Data Sharing', icon: FileText },
    { id: 'security', title: 'Security Measures', icon: Lock },
    { id: 'contact', title: 'Contact Us', icon: Mail },
  ], []);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionElements = sections.map(s => document.getElementById(s.id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition + 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-[20px] border-b border-slate-200/60 h-20">
        <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:-translate-x-1">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm uppercase tracking-widest hidden sm:inline">Return</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />
            <div className="scale-90 hidden md:block">
              <Logo />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Document</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-24 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                        activeSection === section.id 
                          ? 'bg-purple-50 text-purple-600' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${activeSection === section.id ? 'text-purple-600' : 'text-slate-400'}`} />
                      {section.title}
                      {activeSection === section.id && (
                        <motion.div layoutId="active-indicator" className="ml-auto">
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-200 relative overflow-hidden group">
              <div className="relative z-10">
                <Shield className="w-10 h-10 mb-4 text-white/80" />
                <h4 className="text-xl font-black mb-2 leading-tight">Your privacy is our priority.</h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed mb-6">
                  We implement military-grade encryption and strict data minimization policies.
                </p>
                <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/30 transition-all">
                  Security Whitepaper
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-16 relative overflow-hidden"
          >
            {/* Document Watermark */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none">
              <Logo />
            </div>

            {/* Document Header */}
            <header className="mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Official Legal Document
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                Privacy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Policy.</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-bold border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last Updated: January 30, 2026</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Effective Globally</span>
                </div>
              </div>
            </header>

            {/* Content Body */}
            <div className="space-y-24">
              {/* Overview Section */}
              <section id="overview" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">01</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Overview and Mission</h2>
                </div>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6 font-medium">
                  <p>
                    QHTECH SOLUTIONS L.L.C ("the Company," "we," "us," or "our") operates the DAGGPT platform. 
                    In an era where Artificial Intelligence is transforming every aspect of human creativity, 
                    we believe that <span className="text-slate-900 font-black">privacy is not a luxury—it is a fundamental right.</span>
                  </p>
                  <p>
                    This comprehensive Privacy Policy outlines our rigorous standards for data collection, processing, 
                    and multi-layered protection. We are committed to transparency and ensuring that your creative 
                    intellectual property remains yours.
                  </p>
                </div>
              </section>

              {/* Scope Section */}
              <section id="scope" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-purple-200">02</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Scope and Applicability</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'The Platform', desc: 'All interactions occurring on https://daggpt.network' },
                    { title: 'AI Services', desc: 'Text, image, video, and music generation powered by DAGGPT' },
                    { title: 'Support Channels', desc: 'Correspondence via support@daggpt.network' },
                    { title: 'API Ecosystem', desc: 'Integrations with third-party tools via our secure API' }
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                      <h4 className="font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Collection Section */}
              <section id="data-collection" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">03</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Data Collection</h2>
                </div>
                <div className="space-y-8">
                  <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
                    <div className="p-8 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-black text-xl text-slate-900 tracking-tight">User-Provided Data</h3>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-wider">Minimal Collection</div>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex-shrink-0 flex items-center justify-center font-black">A</div>
                        <div>
                          <p className="font-bold text-slate-900 mb-1">Identity Data</p>
                          <p className="text-slate-500 text-sm leading-relaxed">Full name and encrypted email address used for account verification.</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex-shrink-0 flex items-center justify-center font-black">B</div>
                        <div>
                          <p className="font-bold text-slate-900 mb-1">Creative Inputs</p>
                          <p className="text-slate-500 text-sm leading-relaxed">Text prompts, source images, or audio files provided for AI generation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AI Lifecycle Section */}
              <section id="ai-lifecycle" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-200">04</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">The AI Data Lifecycle</h2>
                </div>
                <div className="p-10 rounded-[32px] bg-slate-900 text-white relative overflow-hidden">
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xl font-black mb-4">Prompt Processing</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                        When you interact with our LLMs, your data is processed through secure, enterprise-grade channels. 
                        We do not use your private prompts to train public foundational models.
                      </p>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                        <Lock className="w-4 h-4" />
                        Zero-Retention Processing
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-4">Creative Ownership</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                        All generated outputs (Images, Videos, Music) belong to you under our Terms of Service. 
                        We maintain only technical metadata for security and billing audits.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
                </div>
              </section>

              {/* GDPR Section */}
              <section id="gdpr" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-amber-200">05</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">GDPR Compliance</h2>
                </div>
                <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-12">
                  <p className="text-slate-600 font-medium mb-10 leading-relaxed">
                    For users residing in the European Economic Area (EEA), we strictly adhere to the General Data Protection Regulation (GDPR). 
                    Your rights include:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: 'Access', desc: 'Request a full copy of your data history.' },
                      { title: 'Erasure', desc: 'The "Right to be Forgotten" - permanent account deletion.' },
                      { title: 'Portability', desc: 'Export your data in machine-readable formats.' }
                    ].map((right, i) => (
                      <div key={i} className="space-y-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-slate-900">{right.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">{right.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-rose-200">08</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm">
                    <MapPin className="w-8 h-8 text-rose-600 mb-6" />
                    <h4 className="font-black text-xl text-slate-900 mb-4">Corporate Office</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      QHTECH SOLUTIONS L.L.C<br />
                      Meydan Grandstand, 6th floor,<br />
                      Meydan Road, Nad Al Sheba,<br />
                      Dubai, U.A.E.
                    </p>
                  </div>
                  <div className="p-8 rounded-[32px] bg-slate-900 text-white shadow-xl shadow-slate-200">
                    <Mail className="w-8 h-8 text-purple-400 mb-6" />
                    <h4 className="font-black text-xl mb-4">Legal Inquiry</h4>
                    <p className="text-slate-400 font-medium leading-relaxed mb-8">
                      For data requests or security reports, please reach out to our DPO.
                    </p>
                    <a 
                      href="mailto:support@daggpt.network" 
                      className="inline-flex items-center gap-3 text-purple-400 font-black text-lg hover:text-purple-300 transition-colors"
                    >
                      support@daggpt.network
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* Document Footer */}
            <footer className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Logo />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">QHTECH SOLUTIONS L.L.C</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 All Rights Reserved</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Back to Top
                </button>
              </div>
            </footer>
          </motion.div>
        </main>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[150px]" />
      </div>

      {/* Mobile Floating Contents Button */}
      <div className="lg:hidden fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/40">
          <FileText className="w-6 h-6" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          nav, aside, footer, .fixed, .bg-purple-200\\/20, .bg-blue-200\\/20 {
            display: none !important;
          }
          main {
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .bg-white {
            border: none !important;
            shadow: none !important;
          }
          body {
            background: white !important;
          }
          .rounded-\\[40px\\] {
            border-radius: 0 !important;
          }
          .shadow-xl {
            box-shadow: none !important;
          }
          .p-8, .md\\:p-16 {
            padding: 2cm !important;
          }
        }
      `}} />
    </div>
  );
}
