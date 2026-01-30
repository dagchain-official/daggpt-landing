import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../Logo';
import { Twitter, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    {
      title: 'Platform',
      links: ['Showcase', 'Model Hub', 'Pricing', 'API Access', 'Enterprise']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'Community', 'Status', 'Change Log']
    },
    {
      title: 'Legal',
      links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Security']
    }
  ];

    return (
      <footer className="relative z-10 w-full pt-40 pb-16 px-6 overflow-hidden bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          {/* Top Section with Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 pb-32 border-b border-slate-200/60">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
                Stay at the edge <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">of AI Innovation.</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-lg font-medium leading-relaxed">
                Join 50,000+ creators receiving our weekly digest on model updates and creative workflows.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="relative group max-w-md lg:ml-auto w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full h-16 pl-8 pr-40 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-xl shadow-slate-200/50"
                />
                <button className="absolute right-2 top-2 bottom-2 px-8 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-purple-500/20 active:scale-95">
                  Subscribe
                </button>
              </div>
              <p className="mt-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest lg:text-right">No spam. Just pure inspiration.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-10 scale-125 origin-left">
                <Logo />
              </div>
              <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-sm font-medium">
                The world's most advanced creative AI ecosystem. Built for teams who design the future with precision and style.
              </p>
              <div className="flex items-center gap-4">
                {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="/"
                    whileHover={{ y: -6, scale: 1.1, backgroundColor: '#f8fafc' }}
                    className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-300 shadow-xl shadow-slate-200/40 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section, i) => (
              <div key={i} className="lg:col-span-1">
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-10">
                  {section.title}
                </h4>
                <ul className="space-y-5">
                  {section.links.map((link, j) => (
                      <li key={j}>
                        <a 
                          href={link === 'Privacy Policy' ? '/privacy-policy' : '/'} 
                          target={link === 'Privacy Policy' ? '_blank' : undefined}
                          rel={link === 'Privacy Policy' ? 'noopener noreferrer' : undefined}
                          className="text-slate-500 hover:text-purple-600 transition-all flex items-center group text-[15px] font-semibold tracking-tight"
                        >
                          {link}
                          <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50/30 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-50/30 to-transparent pointer-events-none" />
      </footer>
    );
}
