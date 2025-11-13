import { NetworkBackground } from '../../components/common/NetworkBackground';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Brain, Code, Linkedin, Github, Globe } from 'lucide-react';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { Helmet } from 'react-helmet-async';

const founders = [
  {
    name: 'Fareza Yuza',
    role: 'AI Systems Architect',
    expertise: 'System Inovation',
    image: '/images/pasfoto_reza.png',
    bio: 'Fareza is the architect behind our cognitive framework. Specializing in Knowledge Graphs, he leads the innovation of our core technology to understand data at its most fundamental level.',
    social: {
      linkedin: 'https://www.linkedin.com/in/fareza-yuza-963314240/',
      github: 'https://github.com/kodox45',
    },
  },
  {
    name: 'Ghany Widito Baskoro',
    role: 'Product & Business Strategist',
    expertise: 'Product Strategy',
    image: '/images/pasfoto_ghany.png',
    bio: 'Ghany bridges our advanced technology with real-world market needs. With a background as a Product Owner and ERP Specialist, he ensures our solution solves critical business problems.',
    social: {
      linkedin: 'https://www.linkedin.com/in/ghany-widito-baskoro-462221191/',
      website: 'https://www.ghanywiditobaskoro.web.id/',
    },
  },
  {
    name: 'Muhammad Salman Al Hafizh',
    role: 'Lead Software Engineer',
    expertise: 'Technical Leadership',
    image: '/images/pasfoto_hafizh.png',
    bio: 'Salman is the technical execution force turning complex architecture into a robust, scalable product. His experience as a Lead Developer ensures our vision is realized as an enterprise-ready platform.',
    social: {
      linkedin: 'https://www.linkedin.com/in/msalmanalhafizh/',
      github: 'https://github.com/piztanza',
    },
  },
];

const expertise = [
  {
    icon: Building2,
    title: 'Product Strategy & Business Acumen',
    description:
      'Every line of code is driven by a clear strategy to solve real business problems and deliver measurable ROI.',
  },
  {
    icon: Brain,
    title: 'AI Research & Innovation',
    description:
      "We don't just use AI, we design its foundation. Our expertise in Knowledge Graphs allows us to build systems that truly 'understand' your data.",
  },
  {
    icon: Code,
    title: 'Engineering Excellence',
    description:
      'We build secure, scalable, and reliable platforms ready for the most demanding enterprise environments.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121826] text-[#E5E7EB] overflow-x-hidden">
      <Helmet>
        <title>Logia Initiative | AI Enterprise Solutions, Knowledge Graphs, Product Strategy</title>
        <meta
          name="description"
          content="We build AI enterprise solutions powered by Knowledge Graphs—bridging product strategy and software engineering to deliver measurable ROI."
        />
        <link rel="canonical" href="https://logia-initiative.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Logia Initiative" />
        <meta property="og:title" content="AI Enterprise Solutions | Logia Initiative" />
        <meta property="og:description" content="Knowledge Graphs, Product Strategy, and Software Engineering for enterprises." />
        <meta property="og:url" content="https://logia-initiative.com/" />
        <meta property="og:image" content="https://logia-initiative.com/images/Logo-Logia.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Enterprise Solutions | Logia Initiative" />
        <meta name="twitter:description" content="Knowledge Graphs, Product Strategy, and Software Engineering for enterprises." />
        <meta name="twitter:image" content="https://logia-initiative.com/images/Logo-Logia.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Logia Initiative',
            url: 'https://logia-initiative.com/',
            logo: 'https://logia-initiative.com/images/Logo-Logia.png',
            sameAs: [
              'https://www.linkedin.com/company/logia-initiative/',
              'https://github.com/piztanza',
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'sales',
                email: 'sales@logia-initiative.com',
                telephone: '+62 813-1873-2870',
                areaServed: 'ID',
              },
            ],
          })}
        </script>
      </Helmet>

      <Header />
      <main>
        <div style={{ height: 76 }} />
        <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <NetworkBackground />
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl tracking-tight">Clarity in Complexity.</h1>
            <p className="text-xl md:text-2xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
            {/* We build Agentic AI to turn complex enterprise data into actionable assurance. */}
            Our Agentic AI uses a Knowledge Graph semantic layer to understand your data and provide actionable insights.
            </p>
          </div>
          {/*
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/schedule">
              <button 
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-6 text-lg rounded-md inline-flex items-center group"
              >
                Schedule a Research Interview
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
          */}

          <div className="max-w-5xl mx-auto bg-brand-light rounded-2xl p-6 border border-slate-700 shadow-xl">
            {/* <div className="border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center" style={{ height: 413 }}> */}
            <div className="mt-6 flex justify-center">
              <img
                src="/images/gif/LogiaDemo.gif"
                alt="Logia Demo"
                style={{ maxHeight: 413 }}
                className="rounded-md border border-slate-700"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* </div> */}
          </div>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#3B82F6] rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#3B82F6] rounded-full"></div>
          </div>
        </div> */}
      </section>

      <section id="about" className="px-6">
        <div className="max-w-4xl mx-auto text-[#9CA3AF] space-y-16">
          <div style={{ marginTop: 80 }}>
            <h2 className="about-heading text-2xl md:text-4xl text-[#3B82F6] text-center" style={{ fontWeight: 700 }}>The Enterprise Audit Black Hole</h2>
            <div className="text-lg space-y-4">
              <p style={{ textAlign: 'justify' }}>
                Logia Initiative was born from a problem we’ve seen firsthand for decades. Enterprises run on massive, complex ERP databases. Yet, when it comes to the most critical function of auditing for policy compliance the process is fundamentally broken. Auditors, who understand policy, are disconnected from IT, who understand the database. This gap creates a 'black hole' of manual work.
              </p>
              <p style={{ textAlign: 'justify' }}>
                This isn't just inefficient; it's dangerous. Critical compliance validation, which demands speed and accuracy, becomes a slow, resource-draining, and error-prone process. Teams spend weeks manually collecting data instead of minutes. By the time an issue is found, it's often too late. We knew there had to be a better way.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 80 }}>
            <h2 className="about-heading text-2xl md:text-4xl text-white text-center" style={{ fontWeight: 700 }}>Building the Bridge: From Policy to Database</h2>
            <div className="text-lg space-y-4">
              <p style={{ textAlign: 'justify' }}>
                We didn't just want to build another dashboard. We set out to solve the root problem: <strong>translation</strong>. We believe the only way to achieve real-time assurance is to build a system that understand <strong>both</strong> the policy documents and the database schema.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Our solution is an <strong>Agentic AI</strong> built on a revolutionary foundation: an <strong>Autonomous Semantic Layer</strong>. This layer acts as a universal translator, dynamically mapping your complex ERP structure. Our AI uses this 'map' to read your policy documents and then execute autonomous, end-to-end audits directly against your data. No manual queries, no reconciliation, no 'black hole'.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto bg-[#1a2332] rounded-2xl p-8 border border-[#2a3444]" style={{ marginTop: 80 }}>
          <h2 className="about-heading text-2xl md:text-4xl text-white text-center" style={{ fontWeight: 800 }}>Founded by Experts in the Trenches</h2>
          <div className="text-lg text-[#9CA3AF] flex flex-col sm:flex-row gap-12">
            <p style={{ textAlign: 'justify', flex: 1 }}>
              Logia Initiative isn't run by theorists; we are a team of veteran enterprise architects, ERP specialists, DevSecOps, and AI researchers. We have spent our careers navigating the complex systems we now seek to automate. We’ve managed the databases, written the policies, and felt the pain of the audit process.
            </p>
            <p style={{ textAlign: 'justify', flex: 1 }}>
              Our mission is to give enterprises true control over their own data. We are building the autonomous systems that finally close the loop between operations, data, and policy, turning your ERP from a complex liability into your greatest source of assurance.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="py-32 px-6 bg-gradient-to-b from-[#121826] to-[#0f1419]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl">Meet The Team</h2>
            <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">A proven track record of building transformative technology at scale</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {founders.map((founder, index) => (
              <div key={index} className="space-y-6 group">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#1a2332]">
                  <ImageWithFallback
                    src={founder.image}
                    alt={`Photo of ${founder.name}, ${founder.role} at Logia Initiative`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-2xl">{founder.name}</h3>
                    <p className="text-[#3B82F6]">{founder.role}</p>
                  </div>
                  <div className="flex gap-4 pt-2">
                    {founder.social.linkedin && (
                      <a href={founder.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn profile of ${founder.name}`} className="w-9 h-9 rounded-full bg-[#1a2332] flex items-center justify-center hover:bg-[#3B82F6] transition-colors group">
                        <Linkedin className="w-5 h-5 text-[#9CA3AF] group-hover:text-white transition-colors" />
                      </a>
                    )}
                    {founder.social.github && (
                      <a href={founder.social.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub profile of ${founder.name}`} className="w-9 h-9 rounded-full bg-[#1a2332] flex items-center justify-center hover:bg-[#3B82F6] transition-colors group">
                        <Github className="w-5 h-5 text-[#9CA3AF] group-hover:text-white transition-colors" />
                      </a>
                    )}
                    {founder.social.website && (
                      <a href={founder.social.website} target="_blank" rel="noopener noreferrer" aria-label={`Website of ${founder.name}`} className="w-9 h-9 rounded-full bg-[#1a2332] flex items-center justify-center hover:bg-[#3B82F6] transition-colors group">
                        <Globe className="w-5 h-5 text-[#9CA3AF] group-hover:text-white transition-colors" />
                      </a>
                    )}
                  </div>
                  <div className="pt-2 space-y-2">
                    <div className="inline-block px-3 py-1 bg-[#1a2332] rounded-full">
                      <span className="text-sm text-[#9CA3AF]">{founder.expertise}</span>
                    </div>
                    <p className="text-[#9CA3AF] leading-relaxed">{founder.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl">Collective Expertise</h2>
            <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">Combining deep technical knowledge with strategic business acumen</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {expertise.map((item, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-[#1a2332] to-[#121826] border border-[#2a3444] hover:border-[#3B82F6] transition-all duration-300 group">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                    <item.icon className="w-8 h-8 text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="text-[#9CA3AF] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 bg-gradient-to-t from-[#121826] to-[#0f1419]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl">Let's Shape the Future Together</h2>
            <p className="text-xl text-[#9CA3AF] leading-relaxed">
              We're conducting research interviews with industry leaders to understand 
              the challenges in enterprise knowledge management. Share your insights 
              and get early access to our platform.
            </p>
          </div>
          <Link to="/schedule">
            <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-10 py-6 text-lg rounded-md inline-flex items-center group">
              Book Your Research Session
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <p className="text-sm text-[#9CA3AF] pt-4">30-minute sessions · No commitment required · Early access opportunity</p>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}


