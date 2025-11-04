import { Helmet } from 'react-helmet-async';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { NetworkBackground } from '../../components/common/NetworkBackground';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#121826] text-[#E5E7EB] overflow-x-hidden">
      <Helmet>
        <title>Products & Services | Logia Initiative</title>
        <meta
          name="description"
          content="We build autonomous systems and provide expert guidance to solve your most complex enterprise data challenges."
        />
        <link rel="canonical" href="https://logia-initiative.com/products" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Logia Initiative" />
        <meta property="og:title" content="Products & Services | Logia Initiative" />
        <meta property="og:description" content="AI Enterprise Audit and Enterprise System Consulting for your organization." />
        <meta property="og:url" content="https://logia-initiative.com/products" />
        <meta property="og:image" content="https://logia-initiative.com/images/Logo-Logia.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Products & Services | Logia Initiative" />
        <meta name="twitter:description" content="AI Enterprise Audit and Enterprise System Consulting for your organization." />
        <meta name="twitter:image" content="https://logia-initiative.com/images/Logo-Logia.png" />
      </Helmet>

      <Header />
      <main>
        <div style={{ height: 76 }} />
        
        <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
          <NetworkBackground />
          
          <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8 ">
            {/* Header Section */}
            <section className="mb-16 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Our Products & Services
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                We build autonomous systems and provide expert guidance to solve your most complex enterprise data challenges.
              </p>
            </section>

            {/* Grid Produk & Layanan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 justify-items-center max-w-6xl mx-auto">
              
              {/* PRODUK 1: AI ENTERPRISE AUDIT */}
              <div className="bg-[#1a2332] rounded-2xl shadow-2xl p-8 transform transition duration-500 hover:scale-[1.02] w-full" style={{maxWidth: '480px', textAlign: 'left'}}>
                {/* Ikon */}
                <div className="mb-5">
                  <svg 
                    className="w-12 h-12 text-[#3B82F6]" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.75a11.959 11.959 0 01-2.102-3.036m-7.294 0M12 4.5A1.5 1.5 0 0113.5 6v.75a.75.75 0 01-1.5 0V6A1.5 1.5 0 0112 4.5z" 
                    />
                  </svg>
                </div>
                
                {/* Judul Produk */}
                <h2 className="text-3xl font-bold text-white mb-3">AI Enterprise Audit</h2>
                <p className="text-lg font-semibold text-[#3B82F6] mb-4">
                  Agentic AI ERP Auditing & Policy Compliance
                </p>
                
                {/* Deskripsi Produk */}
                <p className="text-slate-300 mb-6">
                  Traditional auditing is broken. ERP database complexity, manual data collection, and slow validation processes create risk and drain resources. 
                  Our <strong>Agentic AI</strong> autonomously audits your entire ERP database, using your company's policy documents as its guide.
                </p>
                
                {/* Fitur Utama */}
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>Dynamic Semantic Layer:</strong> Automatically understands your complex ERP structure.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>Policy-to-Database Validation:</strong> Audits transactions directly against your SOP documents.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>Eliminates Manual Collection:</strong> Frees up your team from manual data gathering and reconciliation.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>Proactive, Continuous Assurance:</strong> Move from reactive sampling to 100% continuous monitoring.
                    </span>
                  </li>
                </ul>
              </div>

              {/* LAYANAN 2: KONSULTASI */}
              <div className="bg-[#1a2332] rounded-2xl shadow-2xl p-8 transform transition duration-500 hover:scale-[1.02] w-full" style={{maxWidth: '480px', textAlign: 'left'}}>
                {/* Ikon */}
                <div className="mb-5">
                  <svg 
                    className="w-12 h-12 text-[#3B82F6]" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M18 18.72a9.094 9.094 0 00-3.72-.93m-3.72.93a9.094 9.094 0 01-3.72-.93m3.72.93c1.243 0 2.417-.383 3.439-1.037a8.97 8.97 0 00-6.878 0c1.022.654 2.196 1.037 3.439 1.037zM12 12c1.933 0 3.5-1.567 3.5-3.5S13.933 5 12 5 8.5 6.567 8.5 8.5 10.067 12 12 12zM12 12v3.75m0 3.75a9.094 9.094 0 01-3.72-.93M15.72 14.814a9.094 9.094 0 01-3.72.93m3.72-.93c1.243 0 2.417-.383 3.439-1.037a8.97 8.97 0 00-6.878 0c1.022.654 2.196 1.037 3.439 1.037z" 
                    />
                  </svg>
                </div>

                {/* Judul Layanan */}
                <h2 className="text-3xl font-bold text-white mb-3">Enterprise System Consultant</h2>
                <p className="text-lg font-semibold text-[#3B82F6] mb-4">
                  Expert Guidance for a Data-Driven Foundation
                </p>
                
                {/* Deskripsi Layanan */}
                <p className="text-slate-300 mb-6">
                  AI is only as good as the data it's built on. Our expert consultants address the root cause of data chaos. We partner with you to standardize workflows, map critical business processes, and optimize your ERP data structure.
                </p>
                
                {/* Cakupan Layanan */}
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>Business Process Standardization:</strong> Define and implement unified data input processes.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>ERP Data Integrity Audits:</strong> Identify and resolve systemic data inconsistencies.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>AI-Readiness Strategy:</strong> Build the stable, reliable data foundation required for AI.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span>
                      <strong>Change Management Support:</strong> Ensure smooth adoption of new processes and technologies.
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Request Demo Section */}
        <section className="px-4 sm:px-6 py-8 md:py-12 lg:py-16 flex items-center justify-center my-8 md:my-12 lg:my-16" style={{margin: '22px 0 62px 0'}}>
          <div className="bg-[#1a2332] rounded-2xl shadow-2xl w-full max-w-4xl mx-auto text-center p-6 sm:p-8 md:p-10 lg:p-12" style={{padding: '30px'}}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              Ready to End Data Chaos?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              See how Logia Initiative can bring autonomous assurance and clarity to your enterprise. Let's talk about your specific challenges.
            </p>
            <a 
              href={`mailto:sales@logia-initiative.com?subject=${encodeURIComponent('Request Demo Logia Initiative')}&body=${encodeURIComponent(`Hello Logia Initiative Team,

I am interested in scheduling a demo consultation to learn more about your AI Enterprise Audit and Enterprise System Consulting solutions.

Company Details:
Company Name: 
Industry: 
Company Size: 

Contact Information:
Name: 
Email: 
Phone: 

Areas of Interest:
☐ AI Enterprise Audit - Agentic AI ERP Auditing & Policy Compliance
☐ Enterprise System Consultant - Data Foundation & Process Standardization

Current Challenges:
[Please describe your current enterprise data challenges or compliance needs]


Preferred Demo Date/Time:
[Please provide 2-3 preferred time slots]


Additional Information:
[Any additional details you'd like to share]


Best regards,`)}`}
              className="inline-block bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold transition-colors duration-300"
            >
              Schedule a Demo
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

