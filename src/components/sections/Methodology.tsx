import React, {useState, useRef} from 'react';
import {motion, AnimatePresence, useMotionValueEvent} from 'motion/react';
import {methodologyPoints} from '../../data/methodology';
import {ParallaxParticles} from '../ui/ParallaxParticles';
import {useSmoothScrollProgress} from '../../hooks/useSmoothScrollProgress';
import {EASE_CINEMATIC} from '../../lib/animation';

export const Methodology: React.FC = () => {
  const methodologyRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress for animations
  const smoothScroll = useSmoothScrollProgress(methodologyRef);

  const [methodologyStage, setMethodologyStage] = useState(0);
  const methodologyStageRef = useRef(0);

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    let stage = 0;
    if (latest < 0.08) stage = 0;      // Title centered
    else if (latest < 0.20) stage = 1; // Title minimizing
    else if (latest < 0.40) stage = 2; // Card 1
    else if (latest < 0.60) stage = 3; // Card 2
    else if (latest < 0.80) stage = 4; // Card 3
    else stage = 5;                    // Card 4

    if (stage !== methodologyStageRef.current) {
      methodologyStageRef.current = stage;
      setMethodologyStage(stage);
    }
  });

  const isTitleMinimized = methodologyStage > 0;

  return (
    <section id="methodology" ref={methodologyRef} className="h-[400vh] relative z-10 bg-brand-bg">
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden">

        {/* Base Layer: Parallax Particles */}
        <ParallaxParticles scrollProgress={smoothScroll} />

        {/* Technical Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
        </div>

        {/*
          SEAMLESS BRIDGE TO SERVICES:
          Ultra-long gradient at the top to perfectly dissolve the hard edge
          as the Services sticky container scrolls upwards.
        */}
        <div className="absolute top-0 inset-x-0 h-[35vh] bg-gradient-to-b from-brand-bg via-brand-bg/90 to-transparent pointer-events-none z-10" />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg/40 pointer-events-none z-10"></div>
        <div className="hero-overlay-gradient pointer-events-none opacity-40 z-10"></div>

        {/* Unified Cinematic Grain Texture */}
        <div className="bg-grain pointer-events-none z-10 opacity-[0.15]"></div>

        {/* Brand Ambient Glows */}
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vh] bg-brand-accent/[0.03] rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vh] bg-brand-accent/[0.03] rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full h-full flex flex-col justify-center z-20">

          {/* Intro Title Layer */}
          <div className="text-center max-w-4xl mx-auto relative z-10 flex flex-col items-center">

            {/* Main Title: Scales down and moves to a balanced top header position */}
            <motion.h2
              initial={false}
              animate={{
                y: isTitleMinimized ? "-15dvh" : "0dvh",
                scale: isTitleMinimized ? 0.6 : 1,
                opacity: 1
              }}
              style={{ willChange: "transform" }}
              transition={{ type: "spring", stiffness: 90, damping: 25 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-6 md:mb-8 tracking-tight leading-[1.1] origin-top text-balance"
            >
              Beyond Prompting: <br className="hidden md:block"/>
              <span className="italic text-white/80">The Graph-Centric Production Engine.</span>
            </motion.h2>

            {/* Description: Fades out entirely */}
            <motion.p
              initial={false}
              animate={{
                opacity: isTitleMinimized ? 0 : 1,
                y: isTitleMinimized ? -20 : 0
              }}
              transition={{ type: "spring", stiffness: 90, damping: 25 }}
              className="text-brand-gray text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto text-pretty px-4"
            >
              We don't just use AI to write code. We deploy an autonomous Virtual IT Division that understands, reasons, and builds through persistent Project Intelligence.
            </motion.p>
          </div>

          {/* Points Container - Orchestrated Cinematic Stagger */}
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-[32dvh] md:pt-[35dvh]">
            <AnimatePresence mode="wait">
              {methodologyPoints.map((point, index) => {
                const stage = index + 2;
                const isLastPoint = index === methodologyPoints.length - 1;

                if (methodologyStage === stage || (isLastPoint && methodologyStage > stage)) {

                  const containerVariants = {
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                    },
                    exit: {
                      opacity: 0,
                      y: -40,
                      transition: { duration: 0.6, ease: EASE_CINEMATIC }
                    }
                  };

                  const itemVariants = {
                    hidden: { opacity: 0, y: 40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: EASE_CINEMATIC }
                    }
                  };

                  return (
                    <motion.div
                      key={index}
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      exit={isLastPoint && methodologyStage > stage ? "show" : "exit"}
                      className="flex flex-col items-center text-center max-w-4xl px-4 mt-8 md:mt-12"
                    >
                      <motion.span variants={itemVariants} className="text-[10px] md:text-sm font-bold font-mono uppercase tracking-[0.3em] text-brand-accent mb-4 md:mb-6">
                        {point.index}
                      </motion.span>

                      <motion.h3 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-6 md:mb-8 tracking-tight leading-[1.1] md:leading-[1.05] text-balance px-4">
                        {point.punchline}
                      </motion.h3>

                      <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-brand-gray font-light leading-relaxed mb-10 md:mb-14 max-w-2xl mx-auto text-pretty px-2">
                        {point.narrative}
                      </motion.p>

                      <motion.div variants={itemVariants} className="px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.1em] md:tracking-[0.2em] text-brand-accent/90 text-center leading-snug">
                          {point.technical}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                }
                return null;
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
