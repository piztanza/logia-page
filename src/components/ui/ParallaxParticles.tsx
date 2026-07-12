import React, {useRef, useEffect, useMemo} from 'react';
import {useInView, type MotionValue} from 'motion/react';

// ── Layer particle counts ────────────────────────────────────────────────────────
const LAYER_BG_COUNT    = 50;  // tiny sharp pinpoints (distant dust)
const LAYER_MID_COUNT   = 38;  // medium particles with soft glow
const LAYER_FG_COUNT    = 12;  // bright foreground specks
const LAYER_BOKEH_COUNT = 10;  // large soft out-of-focus blobs (depth-of-field effect)

// ── Per-layer colour palettes ────────────────────────────────────────────────────
// Strictly Tailwind sky palette — same hue family as brand-accent (#0ea5e9 = sky-500).
// No white (#ffffff) or sky-200 (#bae6fd) — both can read as warm/yellow-green
// on dark backgrounds due to their high red/green channel values.
// Lighter layers use sky-300/400; foreground uses sky-400/500; bokeh uses 500/600.
const COLORS_BG:    string[] = ['#7dd3fc', '#38bdf8', '#0ea5e9'];  // sky-300, sky-400, sky-500
const COLORS_MID:   string[] = ['#38bdf8', '#0ea5e9', '#7dd3fc'];  // sky-400, sky-500, sky-300
const COLORS_FG:    string[] = ['#0ea5e9', '#38bdf8', '#7dd3fc'];  // sky-500, sky-400, sky-300
const COLORS_BOKEH: string[] = ['#0ea5e9', '#38bdf8', '#0284c7'];  // sky-500, sky-400, sky-600

// Converts a 6-char hex colour to rgba() — used only for gradient stop construction
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

interface ParticleData {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  driftSpeed: number;
  driftPhase: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: 0 | 1 | 2 | 3;  // 3 = bokeh soft blob
}

interface NebulaBlob {
  x: number;
  y: number;
  radius: number;       // fraction of min(width, height)
  opacity: number;
  parallaxSpeed: number;
  driftSpeed: number;
  driftPhase: number;
  colorIdx: number;     // 0 = brand-accent blue, 1 = darker blue
}

// Static nebula definitions — module-scope, no component deps
const NEBULA_BLOBS: NebulaBlob[] = [
  { x: 12, y: 18, radius: 0.55, opacity: 0.040, parallaxSpeed: 0.012, driftSpeed: 0.0018, driftPhase: 0,             colorIdx: 0 },
  { x: 78, y: 35, radius: 0.50, opacity: 0.032, parallaxSpeed: 0.020, driftSpeed: 0.0014, driftPhase: Math.PI,        colorIdx: 1 },
  { x: 45, y: 72, radius: 0.60, opacity: 0.028, parallaxSpeed: 0.016, driftSpeed: 0.0020, driftPhase: Math.PI / 2,    colorIdx: 0 },
  { x: 88, y: 10, radius: 0.45, opacity: 0.022, parallaxSpeed: 0.008, driftSpeed: 0.0012, driftPhase: Math.PI * 1.5,  colorIdx: 1 },
];

/**
 * Full-bleed canvas of parallax dust/bokeh/nebula layers that drift with scroll
 * progress and (on pointer devices) the cursor. Extracted verbatim from the
 * Methodology section so the section stays presentational; the heavy per-frame
 * canvas render loop lives here.
 */
export const ParallaxParticles: React.FC<{scrollProgress: MotionValue<number>}> = ({ scrollProgress }) => {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const mousePosRef    = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

  const isInView = useInView(canvasRef, { margin: "100px" });

  const particles = useMemo<ParticleData[]>(() => {
    const all: ParticleData[] = [];

    // Layer 0 — background: sharp pinpoints replicating the video's fine dust field
    for (let i = 0; i < LAYER_BG_COUNT; i++) {
      all.push({
        layer:        0,
        x:            Math.random() * 100,
        y:            Math.random() * 100,
        size:         0.5  + Math.random() * 1.0,    // 0.5–1.5px (above sub-pixel threshold)
        speed:        0.02 + Math.random() * 0.08,
        opacity:      0.15 + Math.random() * 0.30,   // 0.15–0.45 (clearly visible)
        color:        COLORS_BG[Math.floor(Math.random() * COLORS_BG.length)],
        driftSpeed:   0.003 + Math.random() * 0.007,
        driftPhase:   Math.random() * Math.PI * 2,
        twinkleSpeed: 0.5  + Math.random() * 1.5,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Layer 1 — midground: medium particles with soft glow halo
    for (let i = 0; i < LAYER_MID_COUNT; i++) {
      all.push({
        layer:        1,
        x:            Math.random() * 100,
        y:            Math.random() * 100,
        size:         1.0  + Math.random() * 1.5,    // 1.0–2.5px
        speed:        0.15 + Math.random() * 0.20,
        opacity:      0.30 + Math.random() * 0.30,   // 0.30–0.60
        color:        COLORS_MID[Math.floor(Math.random() * COLORS_MID.length)],
        driftSpeed:   0.005 + Math.random() * 0.010,
        driftPhase:   Math.random() * Math.PI * 2,
        twinkleSpeed: 0.3  + Math.random() * 0.8,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Layer 2 — foreground: bright specks with strong glow
    for (let i = 0; i < LAYER_FG_COUNT; i++) {
      all.push({
        layer:        2,
        x:            Math.random() * 100,
        y:            Math.random() * 100,
        size:         2.0  + Math.random() * 2.0,    // 2.0–4.0px
        speed:        0.50 + Math.random() * 0.50,
        opacity:      0.50 + Math.random() * 0.30,   // 0.50–0.80
        color:        COLORS_FG[Math.floor(Math.random() * COLORS_FG.length)],
        driftSpeed:   0.008 + Math.random() * 0.012,
        driftPhase:   Math.random() * Math.PI * 2,
        twinkleSpeed: 0.15 + Math.random() * 0.50,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Layer 3 — bokeh: large soft blobs replicating the video's depth-of-field effect.
    // These are physical particles rendered "out of focus" by the 3D camera in the video.
    for (let i = 0; i < LAYER_BOKEH_COUNT; i++) {
      all.push({
        layer:        3,
        x:            Math.random() * 100,
        y:            Math.random() * 100,
        size:         8   + Math.random() * 22,      // 8–30px drawn diameter
        speed:        0.08 + Math.random() * 0.17,   // 0.08–0.25
        opacity:      0.05 + Math.random() * 0.10,   // 0.05–0.15 (large but subtle)
        color:        COLORS_BOKEH[Math.floor(Math.random() * COLORS_BOKEH.length)],
        driftSpeed:   0.004 + Math.random() * 0.008,
        driftPhase:   Math.random() * Math.PI * 2,
        twinkleSpeed: 0.1  + Math.random() * 0.3,   // slow, gentle pulse
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    return all;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // ── Glow cache builder ─────────────────────────────────────────────────────
    // Pre-renders a circle + shadowBlur once per colour to avoid per-frame GPU cost.
    const buildGlowCanvas = (
      color: string,
      canvasSize: number,
      baseSize: number,
      blurMult: number,
    ): HTMLCanvasElement => {
      const gc = document.createElement('canvas');
      gc.width  = canvasSize;
      gc.height = canvasSize;
      const gCtx = gc.getContext('2d');
      if (gCtx) {
        const c = canvasSize / 2;
        gCtx.beginPath();
        gCtx.arc(c, c, baseSize, 0, Math.PI * 2);
        gCtx.fillStyle   = color;
        gCtx.shadowBlur  = baseSize * blurMult;
        gCtx.shadowColor = color.substring(0, 7);
        gCtx.fill();
        gCtx.shadowBlur  = 0;
      }
      return gc;
    };

    // ── Bokeh template builder ─────────────────────────────────────────────────
    // A soft radial gradient circle with no hard edge — drawn at large sizes
    // with low globalAlpha to simulate physical particles out of camera focus.
    // No shadowBlur used here; the gradient itself provides the soft falloff.
    const buildBokehCanvas = (color: string): HTMLCanvasElement => {
      const bc = document.createElement('canvas');
      bc.width  = 60;
      bc.height = 60;
      const bCtx = bc.getContext('2d');
      if (bCtx) {
        const grad = bCtx.createRadialGradient(30, 30, 0, 30, 30, 30);
        grad.addColorStop(0,   hexToRgba(color, 1.0));
        grad.addColorStop(0.5, hexToRgba(color, 0.45));
        grad.addColorStop(1,   hexToRgba(color, 0));
        bCtx.fillStyle = grad;
        bCtx.fillRect(0, 0, 60, 60);
      }
      return bc;
    };

    // Mid: 40×40 canvas, baseSize=2 — proportional glow for 1–2.5px particles
    // Fg:  64×64 canvas, baseSize=4 — larger halo for 2–4px foreground orbs
    const glowCacheMid: Record<string, HTMLCanvasElement> = {};
    const glowCacheFg:  Record<string, HTMLCanvasElement> = {};
    const bokehCache:   Record<string, HTMLCanvasElement> = {};

    COLORS_MID.forEach(c   => { glowCacheMid[c]  = buildGlowCanvas(c, 40, 2, 3); });
    COLORS_FG.forEach(c    => { glowCacheFg[c]   = buildGlowCanvas(c, 64, 4, 4); });
    COLORS_BOKEH.forEach(c => { bokehCache[c]    = buildBokehCanvas(c); });

    // ── Nebula template canvases ───────────────────────────────────────────────
    // Two large radial gradient templates drawn once and reused per blob via drawImage.
    const nebulaColorStops: string[][] = [
      ['rgba(14,165,233,0.7)', 'rgba(14,165,233,0.25)', 'rgba(14,165,233,0)'],
      ['rgba(2,132,199,0.7)',  'rgba(2,132,199,0.25)',  'rgba(2,132,199,0)'],
    ];
    const nebulaTemplates: HTMLCanvasElement[] = nebulaColorStops.map(stops => {
      const nc = document.createElement('canvas');
      nc.width  = 300;
      nc.height = 300;
      const nCtx = nc.getContext('2d');
      if (nCtx) {
        const grad = nCtx.createRadialGradient(150, 150, 0, 150, 150, 150);
        grad.addColorStop(0,   stops[0]);
        grad.addColorStop(0.4, stops[1]);
        grad.addColorStop(1,   stops[2]);
        nCtx.fillStyle = grad;
        nCtx.fillRect(0, 0, 300, 300);
      }
      return nc;
    });

    // ── Mouse tracking ─────────────────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX / window.innerWidth;
      mousePosRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Render loop ────────────────────────────────────────────────────────────
    let rafId: number;
    let time = 0;

    const render = () => {
      // Exit without re-queuing RAF when canvas is off-screen.
      // isInView dep causes effect to re-run and restart the loop when visible again.
      if (!isInView) return;

      const progress = scrollProgress.get();
      const { width, height } = canvas;
      time += 0.01;

      // Lerp mouse: lags behind real cursor for a natural, heavy depth response.
      // On touch devices mousemove never fires, so smoothMouse stays at {0.5,0.5}
      // and offsets remain zero — no impact on mobile.
      const LERP = 0.04;
      smoothMouseRef.current.x += (mousePosRef.current.x - smoothMouseRef.current.x) * LERP;
      smoothMouseRef.current.y += (mousePosRef.current.y - smoothMouseRef.current.y) * LERP;
      const mxOff = smoothMouseRef.current.x - 0.5; // −0.5 … +0.5
      const myOff = smoothMouseRef.current.y - 0.5;

      ctx.clearRect(0, 0, width, height);

      // ── 1. Nebula blobs — drawn first so all particles sit above the atmosphere
      const minDim = Math.min(width, height);
      NEBULA_BLOBS.forEach(n => {
        const nx   = (n.x / 100) * width
                   + Math.cos(time * n.driftSpeed + n.driftPhase) * 40;
        const ny   = (n.y / 100) * height
                   - 1000 * n.parallaxSpeed * progress
                   + Math.sin(time * n.driftSpeed + n.driftPhase) * 30;
        const size = minDim * n.radius;
        ctx.globalAlpha = n.opacity;
        ctx.drawImage(nebulaTemplates[n.colorIdx], nx - size / 2, ny - size / 2, size, size);
      });

      // ── 2. Particles ──────────────────────────────────────────────────────
      particles.forEach(p => {
        const parallaxYOffset = -1000 * p.speed * progress;

        const driftY = Math.sin(time * p.driftSpeed + p.driftPhase) * 20;
        const driftX = Math.cos(time * p.driftSpeed * 0.8 + p.driftPhase) * 15;

        // Mouse parallax: scales with p.speed so faster (foreground) particles
        // respond more to the cursor, naturally reinforcing the depth illusion.
        const mouseX = mxOff * width  * p.speed * 0.15;
        const mouseY = myOff * height * p.speed * 0.08;

        const xPos = (p.x / 100) * width  + driftX + mouseX;
        const yPos = (p.y / 100) * height + parallaxYOffset + driftY + mouseY;

        // Vertical wrapping — same formula as original, handles foreground particles
        // that travel up to −1000px at full scroll progress without visible seams.
        const wrapHeight = height + 200;
        const finalY     = ((yPos % wrapHeight) + wrapHeight) % wrapHeight - 100;

        // Twinkling: each particle's opacity pulses between 10% and 100% of its base
        const twinkleFactor = 0.55 + 0.45 * Math.sin(time * p.twinkleSpeed + p.twinklePhase);
        ctx.globalAlpha = p.opacity * twinkleFactor;

        if (p.layer === 0) {
          // Background: plain filled circle — glow on sub-2px dots is imperceptible
          ctx.beginPath();
          ctx.arc(xPos, finalY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

        } else if (p.layer === 1) {
          // Midground: pre-rendered glow circle (40×40, baseSize=2)
          const cached = glowCacheMid[p.color];
          if (cached && p.size > 1.0) {
            const drawSize = 40 * (p.size / 2);
            ctx.drawImage(cached, xPos - drawSize / 2, finalY - drawSize / 2, drawSize, drawSize);
          } else {
            ctx.beginPath();
            ctx.arc(xPos, finalY, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          }

        } else if (p.layer === 2) {
          // Foreground: pre-rendered stronger glow circle (64×64, baseSize=4)
          const cached = glowCacheFg[p.color];
          if (cached) {
            const drawSize = 64 * (p.size / 4);
            ctx.drawImage(cached, xPos - drawSize / 2, finalY - drawSize / 2, drawSize, drawSize);
          }

        } else {
          // Bokeh: radial gradient blob drawn at large size — simulates an out-of-focus
          // particle in front of the 3D scene, matching the video's depth-of-field look.
          const cached = bokehCache[p.color];
          if (cached) {
            ctx.drawImage(cached, xPos - p.size / 2, finalY - p.size / 2, p.size, p.size);
          }
        }
      });

      rafId = requestAnimationFrame(render);
    };

    // Debounced resize — prevents 50+ canvas clears/sec when dragging the window edge
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
    };
  }, [particles, scrollProgress, isInView]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};
