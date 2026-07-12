import React from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {servicesData} from '../../data/services';
import {useScrollFrameSequence} from '../../hooks/useScrollFrameSequence';

export const Services: React.FC<{onReady?: () => void}> = ({onReady}) => {
  // All scroll-scrubbed frame preloading, canvas painting, and slide-state logic
  // lives in the hook; this component is purely presentational.
  const {containerRef, canvasRef, activeSlide, progressBarWidth} =
    useScrollFrameSequence({onReady});

  return (
    <section id="services" ref={containerRef} className="relative h-[200vh] bg-brand-bg">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center">
        {/* Background Frame Sequence - Tuned to match Hero's cinematic tone */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.95) contrast(1.10) saturate(1.05)'
            }}
            width={1920}
            height={1080}
          />
          {/* Top and Bottom gradient blending for seamless transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg opacity-100"></div>
          {/* Mobile-specific text protection gradient (darkens the center on small screens) */}
          <div className="absolute inset-0 bg-brand-bg/40 md:hidden pointer-events-none"></div>
          {/* Hero-like bottom vignette, slightly reduced to not overpower the seamless edge */}
          <div className="hero-overlay-gradient opacity-60"></div>
        </div>

        {/* Unified Cinematic Grain Texture */}
        <div className="bg-grain pointer-events-none z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col h-full justify-center py-16 md:py-20">
          <div className="relative h-[50dvh] flex items-center mt-8 md:mt-0">
            <AnimatePresence mode="wait">
              {activeSlide === 0 ? (
                /* Slide 1: Enterprise (Text Right on Desktop, Center on Mobile) */
                <motion.div
                  key="enterprise"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center md:justify-end px-2 sm:px-6 md:px-12"
                >
                  <div className="max-w-xl text-center md:text-right flex flex-col items-center md:items-end">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-widest mb-4 md:mb-6 w-fit">
                      {servicesData[0].tag}
                    </div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight tracking-tight">
                      {servicesData[0].title}
                    </h3>
                    <p className="text-brand-gray text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 md:mb-8 max-w-lg">
                      {servicesData[0].description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-4 mb-8 md:mb-10 w-full md:w-auto">
                      {servicesData[0].features.map((feature) => (
                        <div key={feature} className="flex items-center justify-center md:justify-end gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-white/70 font-light">
                          {feature}
                          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                        </div>
                      ))}
                    </div>
                    <button
                      className="flex items-center gap-2 text-brand-accent text-sm md:text-base font-semibold group w-fit hover:text-white transition-colors"
                      aria-label={`Explore ${servicesData[0].title} solution`}
                    >
                      Explore Solution <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Slide 2: AI (Text Left on Desktop, Center on Mobile) */
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center md:justify-start px-2 sm:px-6 md:px-12"
                >
                  <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-widest mb-4 md:mb-6 w-fit">
                      {servicesData[1].tag}
                    </div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight tracking-tight">
                      {servicesData[1].title}
                    </h3>
                    <p className="text-brand-gray text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 md:mb-8 max-w-lg">
                      {servicesData[1].description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-4 mb-8 md:mb-10 w-full md:w-auto">
                      {servicesData[1].features.map((feature) => (
                        <div key={feature} className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-white/70 font-light">
                          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <button
                      className="flex items-center gap-2 text-brand-accent text-sm md:text-base font-semibold group w-fit hover:text-white transition-colors"
                      aria-label={`Explore ${servicesData[1].title} solution`}
                    >
                      Explore Solution <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Responsive Scroll Progress & Indicator */}
          <div className="absolute bottom-8 md:bottom-12 left-0 right-0 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 md:gap-6">
            <div className="w-full max-w-[200px] md:max-w-xs h-px bg-white/10 relative overflow-hidden">
              <motion.div
                style={{ width: progressBarWidth }}
                className="absolute inset-y-0 left-0 bg-brand-accent shadow-[0_0_10px_rgba(14,165,233,0.5)]"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-6 md:h-8 bg-gradient-to-b from-brand-accent to-transparent"></div>
              <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30 md:text-white/30">Scroll to Explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
