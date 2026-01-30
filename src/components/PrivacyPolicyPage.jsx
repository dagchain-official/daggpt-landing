import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, Mail, MapPin } from 'lucide-react';
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
            className="group flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans font-bold text-xs uppercase tracking-widest">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white font-sans font-bold text-xs hover:bg-slate-800 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print Document
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 md:p-20 shadow-[0_0_80px_rgba(0,0,0,0.03)] border border-slate-100 rounded-sm"
        >
          {/* Header Info */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-10">
              <div className="scale-125">
                <Logo />
              </div>
            </div>
            <h1 className="font-sans text-5xl font-black tracking-tight text-black uppercase mb-4">
              Privacy Policy
            </h1>
            <div className="h-[2px] w-24 bg-black mx-auto mb-6" />
            <p className="font-sans text-xs font-bold text-black uppercase tracking-[0.4em]">
              Official Document — DAGGPT
            </p>
          </div>

          {/* Meta Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-black mb-16 font-sans text-[13px]">
            <div className="space-y-4">
              <div>
                <p className="text-black font-bold uppercase tracking-widest text-[10px] mb-1">Entity</p>
                <p className="font-bold text-black text-base">QHTECH SOLUTIONS L.L.C</p>
              </div>
              <div>
                <p className="text-black font-bold uppercase tracking-widest text-[10px] mb-1">Jurisdiction</p>
                <p className="text-black">Dubai, United Arab Emirates</p>
              </div>
            </div>
            <div className="md:text-right space-y-4">
              <div>
                <p className="text-black font-bold uppercase tracking-widest text-[10px] mb-1">Last Updated & Effective</p>
                <p className="font-bold text-black text-base">January 30, 2026</p>
              </div>
              <div>
                <p className="text-black font-bold uppercase tracking-widest text-[10px] mb-1">Document ID</p>
                <p className="text-black uppercase">DAG-PP-2026-V2</p>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="space-y-16 text-[18px] leading-[1.8] text-black antialiased">
            
            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                1. OVERVIEW AND CORPORATE MISSION
              </h2>
              <div className="space-y-6">
                <p>
                  QHTECH SOLUTIONS L.L.C (“the Company,” “we,” “us,” or “our”) operates the DAGGPT platform 
                  accessible via <a href="https://daggpt.network" className="text-blue-600 hover:underline">https://daggpt.network</a>. 
                  As a leading innovator in Generative Artificial Intelligence, we recognize that privacy is not merely a 
                  regulatory requirement but a fundamental human right. Our mission is to democratize access to advanced 
                  AI models while maintaining the highest possible standards of data sovereignty and user anonymity.
                </p>
                <p>
                  This comprehensive Privacy Policy (the "Policy") outlines our rigorous procedures for the collection, 
                  processing, encryption, and protection of your data. By using our services, you acknowledge that you 
                  have read and understood the terms described herein.
                </p>
                <p>
                  Our architecture is built on the principle of "Privacy by Design." Every feature we deploy undergoes a 
                  rigorous Privacy Impact Assessment (PIA) to ensure that data minimization is enforced at the code level. 
                  This document is designed to meet and exceed the requirements of global data protection frameworks, 
                  including the EU General Data Protection Regulation (GDPR), the UAE Federal Decree-Law No. 45 of 2021 
                  on the Protection of Personal Data, and the California Consumer Privacy Act (CCPA).
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                2. SCOPE AND APPLICABILITY
              </h2>
              <div className="space-y-6">
                <p>
                  This policy applies to all individuals, corporations, and entities accessing our services worldwide. 
                  The scope of this policy includes, but is not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-4">
                  <li>
                    The Platform: All digital interactions occurring on the 
                    <a href="https://daggpt.network" className="text-blue-600 hover:underline mx-1">https://daggpt.network</a> 
                    domain and its subdomains.
                  </li>
                  <li>
                    AI Generation Services: Processing of prompts for text, image, video, music, and software code generation.
                  </li>
                  <li>
                    API Integrations: Any third-party applications utilizing the DAGGPT API keys or enterprise endpoints.
                  </li>
                  <li>
                    Support & Communications: Data provided through our official support channel 
                    <a href="mailto:support@daggpt.network" className="text-blue-600 hover:underline mx-1">support@daggpt.network</a>.
                  </li>
                </ul>
                <p>
                  If you do not agree with the practices described in this policy, you must immediately discontinue use 
                  of the platform and request the deletion of any previously collected data.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                3. DETAILED CATEGORIES OF DATA COLLECTED
              </h2>
              <div className="space-y-10">
                <div>
                  <h3 className="font-sans text-lg font-black text-black mb-4 uppercase">3.1. User-Provided Information</h3>
                  <p className="mb-4">
                    We adhere to a strict policy of data minimization. We do not require professional credentials, 
                    government-issued identification, or sensitive biometric data for standard usage. We collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Identity Data: Legal name and verified email address used for account authentication.</li>
                    <li>User Prompts (Input Data): The specific text, descriptions, parameters, or uploaded files 
                    provided to generate AI outputs.</li>
                    <li>Billing Information: For premium subscriptions, we process transaction IDs and last four 
                    digits of payment methods through our secure sub-processors. We do not store full credit card numbers.</li>
                    <li>Support Data: Detailed records of correspondence, including troubleshooting logs and feedback.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-sans text-lg font-black text-black mb-4 uppercase">3.2. Automated Technical Metadata</h3>
                  <p className="mb-4">
                    To maintain the integrity of our infrastructure and defend against sophisticated cyber threats (such as 
                    distributed denial-of-service attacks), our systems automatically log:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Network Identifiers: IP addresses (partially anonymized where possible) and approximate geographic location.</li>
                    <li>Device Metadata: Browser engine version, operating system architecture, and hardware specifications.</li>
                    <li>Telemetry: Clickstream patterns, feature utilization rates, and detailed error stack traces for performance optimization.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                4. THE GENERATIVE AI DATA LIFECYCLE
              </h2>
              <div className="space-y-6">
                <p>
                  Unlike legacy software, DAGGPT operates using transient processing through Large Language Models (LLMs). 
                  Understanding the lifecycle of your data is critical to understanding your privacy.
                </p>
                <div>
                  <h3 className="font-sans text-lg font-black text-black mb-4 uppercase">4.1. Processing vs. Training</h3>
                  <p>
                    When you submit a prompt, it is transmitted via encrypted tunnels to our high-performance inference 
                    engines (integrated with Google Vertex AI and other tier-1 providers). By default:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-3">
                    <li>Your inputs are used solely to generate the requested output in real-time.</li>
                    <li>We do NOT use your private prompts to train or fine-tune our foundational models without 
                    explicit, affirmative consent.</li>
                    <li>Enterprise users benefit from "Zero-Retention" processing where inputs are purged from 
                    volatile memory immediately after response delivery.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-sans text-lg font-black text-black mb-4 uppercase">4.2. Ownership and IP Rights</h3>
                  <p>
                    Subject to our Terms of Service, QHTECH SOLUTIONS L.L.C does not claim ownership of the outputs 
                    (text, images, video) generated by you. However, we retain technical metadata (e.g., timestamps, 
                    model versions, and token counts) for the purposes of billing, auditing, and compliance with 
                    international safety guidelines.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                5. GDPR COMPLIANCE (EUROPEAN UNION & EEA)
              </h2>
              <div className="space-y-8">
                <p>
                  For users residing in the European Economic Area (EEA), the United Kingdom, or Switzerland, 
                  QHTECH SOLUTIONS L.L.C acts as the "Data Controller" under the General Data Protection Regulation (GDPR).
                </p>
                
                <div>
                  <h3 className="font-sans text-lg font-black text-black mb-4 uppercase">5.1. Legal Grounds for Processing</h3>
                  <p>We process your personal data under the following legal bases as defined in Article 6 of the GDPR:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-3">
                    <li>Contractual Necessity: To provide the specific AI services and account functionality you have requested.</li>
                    <li>Legitimate Interests: To monitor platform health, prevent fraudulent activities, and optimize our 
                    user interface for better accessibility.</li>
                    <li>Legal Obligation: When required by law to retain certain financial or interaction records.</li>
                    <li>Consent: For discretionary activities such as marketing newsletters or participation in beta research programs.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-lg font-black text-black mb-4 uppercase">5.2. International Data Transfers</h3>
                  <p>
                    Since our headquarters are located in Dubai, UAE, and our cloud infrastructure is distributed globally, 
                    your data may be transferred outside the EEA. We ensure a "Level of Adequacy" by:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-3">
                    <li>Utilizing Standard Contractual Clauses (SCCs) as approved by the European Commission.</li>
                    <li>Requiring all sub-processors to maintain SOC2 Type II compliance and ISO 27001 certification.</li>
                    <li>Implementing data residency options for Enterprise clients allowing storage exclusively within EEA borders.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-lg font-black text-black mb-4 uppercase">5.3. Exercise of Data Subject Rights</h3>
                  <p>Under the GDPR, you possess comprehensive rights regarding your personal data:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 border border-black space-y-2">
                      <p className="font-black uppercase text-xs tracking-widest">Right to Access</p>
                      <p className="text-sm">Request a full export of all personal information and prompt history associated with your identity.</p>
                    </div>
                    <div className="p-6 border border-black space-y-2">
                      <p className="font-black uppercase text-xs tracking-widest">Right to Erasure</p>
                      <p className="text-sm">The "Right to be Forgotten" allows you to request the permanent deletion of your account and all associated data.</p>
                    </div>
                    <div className="p-6 border border-black space-y-2">
                      <p className="font-black uppercase text-xs tracking-widest">Right to Rectification</p>
                      <p className="text-sm">Update or correct inaccurate personal details to ensure the integrity of your account.</p>
                    </div>
                    <div className="p-6 border border-black space-y-2">
                      <p className="font-black uppercase text-xs tracking-widest">Right to Restriction</p>
                      <p className="text-sm">Request that we limit the processing of your data under specific contested circumstances.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                6. CALIFORNIA CONSUMER PRIVACY ACT (CCPA/CPRA)
              </h2>
              <div className="space-y-6">
                <p>
                  This section applies exclusively to residents of California. Under the CCPA/CPRA, you have the right to 
                  know what personal information we collect, the right to delete that information, and the right to opt-out 
                  of the "sale" or "sharing" of your personal information.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Notice of Collection:</strong> We collect the categories of information listed in Section 3.</li>
                  <li><strong>Right to Know:</strong> You may request disclosure of the specific pieces of personal info 
                  collected over the past 12 months.</li>
                  <li><strong>No Sale of Data:</strong> DAGGPT does NOT sell your personal information to third parties for 
                  monetary compensation.</li>
                  <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising any of your 
                  CCPA rights, including denying service or providing a different quality of service.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                7. DATA SHARING AND SUB-PROCESSORS
              </h2>
              <div className="space-y-6">
                <p>
                  To provide a seamless AI experience, we partner with a select group of world-class infrastructure 
                  providers. Each partner is contractually bound to process your data only as directed by us.
                </p>
                <div className="overflow-x-auto border border-black">
                  <table className="w-full text-left font-sans text-sm border-collapse">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="py-4 px-6 font-black uppercase tracking-widest">Sub-processor</th>
                        <th className="py-4 px-6 font-black uppercase tracking-widest">Service Provided</th>
                        <th className="py-4 px-6 font-black uppercase tracking-widest">Data Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      <tr>
                        <td className="py-5 px-6 font-bold">Google Vertex AI</td>
                        <td className="py-5 px-6">Generative Inference & Compute</td>
                        <td className="py-5 px-6">USA / Global Clusters</td>
                      </tr>
                      <tr>
                        <td className="py-5 px-6 font-bold">Stripe, Inc.</td>
                        <td className="py-5 px-6">Payment Processing & Fraud Detection</td>
                        <td className="py-5 px-6">Global (PCI-DSS Compliant)</td>
                      </tr>
                      <tr>
                        <td className="py-5 px-6 font-bold">Cloudflare, Inc.</td>
                        <td className="py-5 px-6">WAF, DDoS Protection & Edge Caching</td>
                        <td className="py-5 px-6">250+ Global Data Centers</td>
                      </tr>
                      <tr>
                        <td className="py-5 px-6 font-bold">Vercel, Inc.</td>
                        <td className="py-5 px-6">Frontend Hosting & Deployment</td>
                        <td className="py-5 px-6">AWS US-East Region</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                8. DATA RETENTION AND SECURE ARCHIVAL
              </h2>
              <div className="space-y-6">
                <p>
                  We retain your data only for the duration necessary to fulfill the purposes outlined in this Policy, 
                  unless a longer retention period is mandated by law.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-50 border-t-4 border-black">
                    <p className="font-black text-xs uppercase mb-2">Active Profiles</p>
                    <p className="text-sm">Retained for the duration of your account activity to provide history features.</p>
                  </div>
                  <div className="p-6 bg-slate-50 border-t-4 border-black">
                    <p className="font-black text-xs uppercase mb-2">Technical Logs</p>
                    <p className="text-sm">Automatically purged or anonymized after 90 days of generation.</p>
                  </div>
                  <div className="p-6 bg-slate-50 border-t-4 border-black">
                    <p className="font-black text-xs uppercase mb-2">Financial Records</p>
                    <p className="text-sm">Stored for 7 years to comply with UAE Ministry of Finance audit requirements.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                9. TECHNICAL SECURITY AND ENCRYPTION
              </h2>
              <div className="space-y-6">
                <p>
                  Our security posture is modeled after military-grade standards to ensure that your intellectual 
                  property and personal identity remain shielded from unauthorized access.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1 bg-black shrink-0" />
                    <div>
                      <h4 className="font-sans font-black uppercase text-sm mb-1">Advanced Encryption</h4>
                      <p className="text-base">All data in transit is protected via TLS 1.3 with Perfect Forward Secrecy. 
                      Data at rest is secured using AES-256-GCM encryption.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-black shrink-0" />
                    <div>
                      <h4 className="font-sans font-black uppercase text-sm mb-1">Access Control</h4>
                      <p className="text-base">We enforce strictly partitioned Role-Based Access Control (RBAC). 
                      No single employee has access to raw user prompt databases.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-black shrink-0" />
                    <div>
                      <h4 className="font-sans font-black uppercase text-sm mb-1">Continuous Monitoring</h4>
                      <p className="text-base">Automated vulnerability scanning and 24/7 Security Operations Center 
                      (SOC) monitoring to detect and neutralize threats in real-time.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                10. COOKIES AND TRACKING TECHNOLOGIES
              </h2>
              <div className="space-y-6">
                <p>
                  We use cookies and similar technologies to enhance your experience and analyze platform performance. 
                  You can manage your preferences through your browser settings.
                </p>
                <ul className="list-disc pl-6 space-y-4">
                  <li><strong>Essential Cookies:</strong> Required for authentication, security, and session management.</li>
                  <li><strong>Functional Cookies:</strong> Used to remember your UI preferences, such as Dark Mode or 
                  preferred AI model selectors.</li>
                  <li><strong>Performance Analytics:</strong> Aggregated, anonymous data used to understand which 
                  generation tools (e.g., Video vs. Image) are most utilized to optimize resource allocation.</li>
                </ul>
                <p className="italic">
                  We do not use tracking cookies for third-party advertising or cross-site behavioral targeting.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                11. CHILDREN’S PRIVACY PROTECTION
              </h2>
              <div className="space-y-6">
                <p>
                  The DAGGPT platform is a professional tool intended for users aged 18 and older. We do not 
                  knowingly collect or solicit personal information from individuals under the age of 18. If you are 
                  a parent or guardian and believe your child has provided us with personal data, please contact 
                  <a href="mailto:support@daggpt.network" className="text-blue-600 hover:underline mx-1">support@daggpt.network</a> 
                  immediately for data removal.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                12. DATA BREACH NOTIFICATION PROTOCOL
              </h2>
              <div className="space-y-6">
                <p>
                  In the highly unlikely event of a security breach that compromises your personal data, we commit 
                  to notifying the relevant supervisory authorities within 72 hours of discovery. Affected users will 
                  be notified via their registered email address with a detailed summary of the incident and recommended 
                  protective measures.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-black text-black mb-8 uppercase tracking-tight">
                13. AMENDMENTS TO THIS POLICY
              </h2>
              <div className="space-y-6">
                <p>
                  As AI technology and global regulations evolve, we may update this Policy from time to time. 
                  The "Last Updated" date at the top of this document will reflect the most recent changes. 
                  For material changes that significantly impact your rights, we will provide a prominent notice 
                  within the platform or via direct email communication.
                </p>
              </div>
            </section>

            <section className="pt-16 border-t-2 border-black">
              <h2 className="font-sans text-2xl font-black text-black mb-10 uppercase tracking-tight">
                14. CONTACT AND LEGAL INQUIRIES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-sans">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-black text-white">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">Global Headquarters</span>
                    </div>
                    <p className="font-bold text-black text-lg leading-relaxed">
                      QHTECH SOLUTIONS L.L.C<br />
                      Meydan Grandstand, 6th Floor,<br />
                      Meydan Road, Nad Al Sheba,<br />
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-black text-white">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">Legal & Data Protection</span>
                    </div>
                    <p className="mb-4 text-sm font-bold text-black uppercase tracking-tight">Direct Inquiries to:</p>
                    <a 
                      href="mailto:support@daggpt.network" 
                      className="block font-black text-black text-2xl hover:text-blue-600 transition-colors underline decoration-2 underline-offset-8"
                    >
                      support@daggpt.network
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Footer of Document */}
          <div className="mt-32 pt-12 border-t border-slate-200 text-center font-sans">
            <p className="text-[11px] font-black text-black uppercase tracking-[0.5em]">
              End of Document — QHTECH SOLUTIONS L.L.C Proprietary
            </p>
            <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
              Generated by DAGGPT Legal Compliance Engine
            </p>
          </div>
        </motion.div>
      </main>

      {/* Decorative background for web view */}
      <div className="fixed inset-0 -z-10 bg-[#F5F7F9] print:hidden">
        <div className="absolute top-0 left-0 w-full h-screen opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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
            padding: 2.5cm !important;
          }
          body { background: white !important; }
          @page { margin: 2.5cm; }
          section { page-break-inside: avoid; }
        }
      `}} />
    </div>
  );
}
