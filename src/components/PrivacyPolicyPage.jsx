import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, Shield, Globe, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export function PrivacyPolicyPage() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1a1a1a] font-serif selection:bg-slate-200 selection:text-slate-900">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200 h-16 print:hidden">
        <div className="max-w-4xl mx-auto h-full px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans font-bold text-xs uppercase tracking-widest">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-sans font-bold text-xs hover:bg-slate-200 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.02)] border border-slate-100 rounded-sm"
        >
          {/* Header Info */}
          <div className="text-center mb-16 space-y-4">
            <div className="flex justify-center mb-8">
              <div className="scale-125">
                <Logo />
              </div>
            </div>
            <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Privacy Policy
            </h1>
            <div className="h-1 w-20 bg-slate-900 mx-auto rounded-full" />
            <div className="font-sans text-xs font-bold text-slate-400 uppercase tracking-[0.3em] pt-4">
              Official Document — DAGGPT
            </div>
          </div>

          {/* Meta Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-slate-100 mb-12 font-sans text-sm">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <Globe className="w-3 h-3" /> Entity
              </p>
              <p className="font-black text-slate-900">QHTECH SOLUTIONS L.L.C</p>
            </div>
            <div className="space-y-2 md:text-right">
              <p className="flex items-center gap-2 md:justify-end text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Last Updated & Effective
              </p>
              <p className="font-black text-slate-900">January 30, 2026</p>
            </div>
          </div>

          {/* Document Content */}
          <div className="space-y-12 text-[17px] leading-[1.8] text-slate-800 antialiased">
            
            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">1.</span> OVERVIEW AND CORPORATE MISSION
              </h2>
              <p>
                QHTECH SOLUTIONS L.L.C (“the Company,” “we,” “us,” or “our”) operates the DAGGPT platform
                (https://daggpt.network). We recognize that privacy is a fundamental right, especially in the era of
                Generative Artificial Intelligence. This comprehensive Privacy Policy describes our rigorous standards for
                collecting, processing, and protecting your data.
              </p>
              <p className="mt-4">
                This document is designed to meet the requirements of global data protection frameworks, including the
                EU General Data Protection Regulation (GDPR) and the UAE Data Protection Law.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">2.</span> SCOPE AND APPLICABILITY
              </h2>
              <p>This policy applies to all users globally. It covers:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>The Platform:</strong> All interactions on https://daggpt.network.</li>
                <li><strong>AI Services:</strong> Text, image, video, and music generation powered by DAGGPT.</li>
                <li><strong>Support Channels:</strong> Any data provided via support@daggpt.network.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">3.</span> DETAILED CATEGORIES OF DATA COLLECTED
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-bold text-slate-900 mb-2">3.1. User-Provided Data</h3>
                  <p>
                    We strictly minimize data collection. We do not collect professional credentials, government IDs, or
                    sensitive biometric data. We collect:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Identity Data:</strong> Full Name and Email Address.</li>
                    <li><strong>User Prompts (Input):</strong> The text, descriptions, or parameters you provide to generate AI outputs.</li>
                    <li><strong>Support Data:</strong> Records of correspondence if you contact our support team.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-900 mb-2">3.2. Automated Technical Data</h3>
                  <p>To ensure platform stability and prevent DDoS attacks, our servers log:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Network Identifiers:</strong> IP addresses and approximate geolocation.</li>
                    <li><strong>Device Metadata:</strong> Browser type/version, operating system, and screen resolution.</li>
                    <li><strong>Interaction Telemetry:</strong> Clickstream data, time spent on features, and error logs.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">4.</span> THE GENERATIVE AI DATA LIFECYCLE
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-bold text-slate-900 mb-2">4.1. Prompt Processing</h3>
                  <p>
                    When you enter a prompt, it is sent to our processing engine (integrated via Google Vertex AI or other
                    secure LLM providers). Your input is used to generate the response and is not permanently stored as
                    "training data" for our foundational models unless you provide explicit, separate consent.
                  </p>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-900 mb-2">4.2. Output Ownership</h3>
                  <p>
                    While we facilitate the generation of text, images, and video, we do not claim ownership of the outputs
                    created by users. However, we retain metadata about the generation (e.g., "Image generated at 10:00
                    AM") for billing and security audits.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">5.</span> GDPR COMPLIANCE (EUROPEAN UNION & EEA)
              </h2>
              <div className="space-y-6">
                <p>For users residing in the European Economic Area (EEA), we act as the Data Controller.</p>
                
                <div>
                  <h3 className="font-sans font-bold text-slate-900 mb-2">5.1. Legal Bases for Processing (Article 6 GDPR)</h3>
                  <p>We process your data under the following legal grounds:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Contractual Necessity:</strong> To provide the AI services you requested.</li>
                    <li><strong>Legitimate Interests:</strong> To improve our AI models, detect fraud, and ensure network security.</li>
                    <li><strong>Consent:</strong> For marketing communications (which you may withdraw at any time).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-slate-900 mb-2">5.2. International Data Transfers (Article 46 GDPR)</h3>
                  <p>
                    As QHTECH SOLUTIONS L.L.C is based in Dubai, UAE, data from EU users is transferred outside the EEA.
                    We ensure a high level of protection by:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Using Standard Contractual Clauses (SCCs) approved by the European Commission.</li>
                    <li>Ensuring our cloud providers (e.g., Google Cloud/Vertex AI) adhere to the EU-U.S. Data Privacy Framework where applicable.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-slate-900 mb-2">5.3. Your Rights Under GDPR</h3>
                  <p>EU users possess the following rights:</p>
                  <ol className="list-decimal pl-6 mt-2 space-y-4">
                    <li><strong>Right to Access:</strong> Request a copy of all data we hold about you.</li>
                    <li><strong>Right to Rectification:</strong> Correct inaccurate names or email addresses.</li>
                    <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request the permanent deletion of your account and prompt history.</li>
                    <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                    <li><strong>Right to Object:</strong> Object to processing based on our legitimate interests.</li>
                  </ol>
                  <p className="mt-4 italic">To exercise these rights, email support@daggpt.network. We will respond within 30 days.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">6.</span> DATA SHARING AND SUB-PROCESSORS
              </h2>
              <p className="mb-6">We do not sell your data. We share it only with "Sub-processors" necessary for platform operation:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-900">
                      <th className="py-3 px-4 font-black uppercase tracking-wider">Sub-processor</th>
                      <th className="py-3 px-4 font-black uppercase tracking-wider">Purpose</th>
                      <th className="py-3 px-4 font-black uppercase tracking-wider">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-4 px-4 font-bold">Google Vertex AI</td>
                      <td className="py-4 px-4">Generative AI Processing</td>
                      <td className="py-4 px-4">USA / Global</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-bold">Stripe/Payment Gateway</td>
                      <td className="py-4 px-4">Subscription Billing</td>
                      <td className="py-4 px-4">USA / Global</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-bold">Cloudflare</td>
                      <td className="py-4 px-4">DDoS Protection & CDN</td>
                      <td className="py-4 px-4">Global</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">7.</span> DATA RETENTION AND ARCHIVAL
              </h2>
              <p>We retain data only as long as your account is active:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Active Accounts:</strong> Prompt history is saved for your convenience within the platform.</li>
                <li><strong>Deleted Accounts:</strong> Upon account deletion, all personal identifiers are purged within 60 days.</li>
                <li><strong>Financial Records:</strong> Transaction data is kept for 7 years to comply with UAE tax and audit laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">8.</span> TECHNICAL AND ORGANIZATIONAL SECURITY
              </h2>
              <p>We employ "Privacy by Design" principles:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Encryption:</strong> All data in transit is protected via TLS 1.3; data at rest is encrypted using AES-256.</li>
                <li><strong>Access Control:</strong> We use Role-Based Access Control (RBAC) to ensure only authorized personnel can view technical logs.</li>
                <li><strong>Anonymization:</strong> We attempt to strip PII from prompts before they are used for model fine-tuning (if applicable).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">9.</span> COOKIES AND TRACKING TECHNOLOGIES
              </h2>
              <p>DAGGPT uses cookies for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Essential Tasks:</strong> Keeping you logged in.</li>
                <li><strong>Analytics:</strong> Understanding which AI models (text vs. image) are most popular.</li>
                <li><strong>Preferences:</strong> Saving your UI theme (Light/Dark mode).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">10.</span> CHILDREN’S PRIVACY (COPPA/GDPR-K)
              </h2>
              <p>
                The Platform is intended for users aged 18 and older. We do not knowingly collect data from minors. If
                we discover a user is under 18, we will terminate the account and delete the data immediately.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">11.</span> AMENDMENTS TO THIS POLICY
              </h2>
              <p>
                We reserve the right to update this policy as AI regulations evolve. Significant changes (e.g., changes in
                how prompts are used) will be notified via the email address on your account.
              </p>
            </section>

            <section className="pt-12 border-t border-slate-100">
              <h2 className="font-sans text-xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-baseline gap-4">
                <span className="text-slate-300">12.</span> CONTACT INFORMATION
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <MapPin className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Headquarters</span>
                  </div>
                  <p className="font-bold text-slate-900 leading-relaxed">
                    QHTECH SOLUTIONS L.L.C<br />
                    Meydan Grandstand, 6th floor,<br />
                    Meydan Road, Nad Al Sheba,<br />
                    Dubai, U.A.E.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Mail className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Legal & Support</span>
                  </div>
                  <a 
                    href="mailto:support@daggpt.network" 
                    className="block font-black text-slate-900 text-xl hover:text-blue-600 transition-colors"
                  >
                    support@daggpt.network
                  </a>
                </div>
              </div>
            </section>

          </div>

          {/* Footer of Document */}
          <div className="mt-24 pt-12 border-t border-slate-100 text-center font-sans">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              End of Document — DAGGPT Proprietary
            </p>
          </div>
        </motion.div>
      </main>

      {/* Decorative background for web view */}
      <div className="fixed inset-0 -z-10 bg-[#F8FAFC] print:hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-200/20 to-transparent" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        body {
          -webkit-print-color-adjust: exact;
        }

        .font-serif {
          font-family: 'Crimson Pro', 'Georgia', serif;
        }

        @media print {
          .print\\:hidden { display: none !important; }
          main { 
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            max-width: 100% !important;
          }
          .bg-white { 
            border: none !important; 
            box-shadow: none !important;
            padding: 2cm !important;
          }
          body { background: white !important; }
          @page { margin: 2cm; }
        }
      `}} />
    </div>
  );
}
