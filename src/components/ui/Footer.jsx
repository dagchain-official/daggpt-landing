import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../Logo';
import { Twitter, Github, Linkedin, Mail, ArrowRight, Heart } from 'lucide-react';

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
    <footer className="relative z-10 w-full pt-32 pb-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-sm">
              The world's most advanced creative AI ecosystem. Built for teams who design the future.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-200 shadow-sm transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href="#" 
                      className="text-slate-500 hover:text-purple-600 transition-colors flex items-center group text-sm font-medium"
                    >
                      {link}
                      <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-400 text-sm font-medium">
            © 2026 DAG GPT. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>by the Creative Team</span>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </footer>
  );
}
