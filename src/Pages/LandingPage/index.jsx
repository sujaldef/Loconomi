import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { 
  FaBolt, FaShieldAlt, FaMapMarkedAlt, 
  FaArrowRight, FaNetworkWired, FaCheck 
} from 'react-icons/fa';

/**
 * 1. THE HERO SECTION
 * High impact, split-screen layout with interactive motion
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Network Live in your Area</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
            LOCAL LABOR.<br />
            <span className="text-blue-600">DECENTRALIZED.</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-lg mb-10 leading-relaxed">
            Loconomi connects you to local service nodes in real-time using WebSocket protocols. Fast, secure, and purely peer-to-peer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/hire" className="bg-slate-900 text-white px-10 py-5 rounded-sm font-bold flex items-center justify-center group hover:bg-blue-600 transition-all">
              FIND A PROFESSIONAL
              <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/joinasworker" className="border-2 border-slate-900 text-slate-900 px-10 py-5 rounded-sm font-bold flex items-center justify-center hover:bg-slate-50 transition-all">
              JOIN AS A NODE
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative z-10 border-[12px] border-slate-900 rounded-2xl bg-white p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <div className="h-3 w-32 bg-slate-100 rounded-full" />
              <div className="h-8 w-8 bg-blue-600 rounded-full" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="h-16 bg-slate-50 border border-slate-100 rounded-lg flex items-center px-4"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 mr-4" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-24 bg-slate-200 rounded" />
                    <div className="h-2 w-16 bg-slate-100 rounded" />
                  </div>
                  <div className="text-blue-600 text-xs font-bold">LIVE</div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Abstract background shapes */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </motion.div>
      </div>
    </section>
  );
};

/**
 * 2. CORE PROTOCOL (Features)
 * Explaining how the system works
 */
const ProtocolSection = () => {
  const features = [
    { icon: <FaBolt />, title: "Instant Sync", desc: "Real-time service discovery powered by modern WebSocket connectivity." },
    { icon: <FaShieldAlt />, title: "Escrow Protection", desc: "Payments are secured in our decentralized vault until job completion." },
    { icon: <FaMapMarkedAlt />, title: "Geo-Fencing", desc: "Precisely locate available professionals within your immediate vicinity." },
    { icon: <FaNetworkWired />, title: "P2P Matching", desc: "No middleman. Direct connection between you and the service node." }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">THE PROTOCOL.</h2>
          <div className="h-2 w-20 bg-blue-600" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="text-4xl text-blue-500 mb-6 group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



/**
 * 4. CALL TO ACTION
 */
const CTASection = () => (
  <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
    <div className="container mx-auto px-6 text-center relative z-10">
      <h2 className="text-5xl md:text-7xl font-black mb-10 leading-none">READY TO DECENTRALIZE YOUR SERVICE SEARCH?</h2>
      <button className="bg-white text-blue-600 px-12 py-5 rounded-full font-black text-xl hover:bg-slate-900 hover:text-white transition-all shadow-xl">
        GET STARTED NOW
      </button>
    </div>
    {/* Large decorative background text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black opacity-10 select-none pointer-events-none">
      LOCO
    </div>
  </section>
);

const LandingPage = () => {
  return (
    <div className="font-sans text-slate-900 antialiased">
     

      <HeroSection />
      <ProtocolSection />
      <ProcessSection />
      <CTASection />

      <footer className="py-12 bg-white border-t border-slate-100 text-center">
        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
          Loconomi Protocol &copy; 2026. Decentralized Workforce Infrastructure.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;