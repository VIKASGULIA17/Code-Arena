import React, { useEffect, useRef, useState } from "react";

/**
 * RobotLoader – premium aesthetic full-page loading screen.
 * Automatically adapts to light/dark mode via prefers-color-scheme.
 *
 * Props:
 *   message  {string}  – status text
 *   progress {number}  – 0–100; auto-animates when omitted
 */
const RobotLoader = ({ message = "Initialising systems", progress }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [internalProgress, setInternalProgress] = useState(0);
  const [dots, setDots] = useState("");
  const [tick, setTick] = useState(0);

  /* ─── detect color scheme (JS side, kept in sync with CSS media query) ─── */
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMq = (e) => setIsDark(e.matches);
    mq.addEventListener("change", onMq);
    // Also watch the html element class
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { mq.removeEventListener("change", onMq); observer.disconnect(); };
  }, []);

  /* ─── animated dots ─── */
  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 500);
    return () => clearInterval(id);
  }, []);

  /* ─── hex ticker ─── */
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 120);
    return () => clearInterval(id);
  }, []);

  /* ─── auto-progress ─── */
  useEffect(() => {
    if (progress !== undefined) return;
    const id = setInterval(() => {
      setInternalProgress(p => {
        if (p >= 100) return 100;
        return Math.min(100, p + Math.max(0.3, (100 - p) * 0.016));
      });
    }, 50);
    return () => clearInterval(id);
  }, [progress]);

  const displayProgress = progress !== undefined ? progress : internalProgress;

  /* ─── canvas particle network ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    const count = 100;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      hue: 220 + Math.random() * 80,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const maxDist = 130;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      const dark = document.documentElement.classList.contains("dark");
      const particleAlphaScale = dark ? 1 : 0.55;
      const lineAlphaScale = dark ? 1 : 0.4;

      for (const p of particles) {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, ${dark ? 75 : 55}%, ${p.alpha * particleAlphaScale})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15 * lineAlphaScale;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(230, 70%, ${dark ? 75 : 50}%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };
    draw();

    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  const hex = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0").toUpperCase();

  /* ─── dynamic style values based on theme ─── */
  // Root carries the solid base colour so nothing bleeds through
  const rootBg   = isDark ? "#060c1e" : "#fafafa";
  // Backdrop is a soft veil over the canvas — transparent in light so blobs show
  const backdrop = isDark
    ? "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(10,14,40,0.78) 0%, rgba(4,6,20,0.94) 100%)"
    : "rgba(250,250,250,0.55)"; // semi-transparent so blobs bleed through

  const cardBg = isDark ? "rgba(8,12,36,0.62)" : "rgba(255,255,255,0.72)";
  const cardBorder = isDark ? "rgba(120,140,255,0.18)" : "rgba(99,102,241,0.22)";
  const cardShadow = isDark
    ? "0 0 0 1px rgba(100,120,255,0.08), 0 0 80px rgba(80,100,255,0.12), 0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
    : "0 0 0 1px rgba(99,102,241,0.10), 0 0 60px rgba(99,102,241,0.08), 0 20px 60px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)";

  const statusColor = isDark ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.85)";
  const hexColor = isDark ? "rgba(99,120,255,0.35)" : "rgba(79,82,200,0.28)";
  const hexColorHi = isDark ? "rgba(120,190,255,0.85)" : "rgba(79,82,200,0.75)";
  const pctColor = isDark ? "rgba(165,180,252,0.8)" : "rgba(79,82,200,0.8)";
  const cornerColor = isDark ? "rgba(130,160,255,0.5)" : "rgba(99,102,241,0.45)";
  const cornerColorHi = isDark ? "rgba(180,200,255,0.9)" : "rgba(99,102,241,0.85)";

  // Light blobs are more visible because they now sit ABOVE the backdrop
  const blob1 = isDark ? "rgba(99,60,255,0.45)"   : "rgba(99,102,241,0.18)";
  const blob2 = isDark ? "rgba(30,160,255,0.40)"   : "rgba(139,92,246,0.14)";
  const blob3 = isDark ? "rgba(200,60,255,0.28)"   : "rgba(59,130,246,0.12)";

  return (
    <div className="rl-root" aria-busy="true" aria-label="Loading"
      style={{ background: rootBg }}>
      <canvas ref={canvasRef} className="rl-canvas" />

      {/* backdrop veil — sits above canvas, below blobs */}
      <div className="rl-backdrop" style={{ background: backdrop }} />

      {/* plasma blobs — z-index 2 so they show ABOVE the backdrop in light mode */}
      <div className="rl-blob rl-blob-1" style={{ background: `radial-gradient(circle, ${blob1} 0%, transparent 70%)` }} />
      <div className="rl-blob rl-blob-2" style={{ background: `radial-gradient(circle, ${blob2} 0%, transparent 70%)` }} />
      <div className="rl-blob rl-blob-3" style={{ background: `radial-gradient(circle, ${blob3} 0%, transparent 70%)` }} />

      {/* card */}
      <div className="rl-card" style={{ background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
        {/* corner brackets */}
        <span className="rl-corner rl-tl" style={{ borderColor: cornerColor, "--hi": cornerColorHi }} />
        <span className="rl-corner rl-tr" style={{ borderColor: cornerColor, "--hi": cornerColorHi }} />
        <span className="rl-corner rl-bl" style={{ borderColor: cornerColor, "--hi": cornerColorHi }} />
        <span className="rl-corner rl-br" style={{ borderColor: cornerColor, "--hi": cornerColorHi }} />

        {/* orbital rings */}
        <div className="rl-rings">
          <div className="rl-ring rl-ring-1" />
          <div className="rl-ring rl-ring-2" />
          <div className="rl-ring rl-ring-3" />
          <div className="rl-orb">
            <div className="rl-orb-inner" />
            <div className="rl-orb-pulse" />
          </div>
          <div className="rl-orbit-dot rl-od-1" />
          <div className="rl-orbit-dot rl-od-2" />
          <div className="rl-orbit-dot rl-od-3" />
        </div>

        {/* brand */}
        <h1 className="rl-brand">
          <span className="rl-brand-code">Code</span>
          <span className="rl-brand-arena">Arena</span>
        </h1>

        {/* progress bar */}
        <div className="rl-prog-wrap">
          <div className="rl-prog-track">
            <div className="rl-prog-fill" style={{ width: `${displayProgress}%` }}>
              <div className="rl-prog-shimmer" />
            </div>
            <div className="rl-prog-tip" style={{ left: `${displayProgress}%` }} />
          </div>
          <span className="rl-prog-pct" style={{ color: pctColor }}>{Math.round(displayProgress)}%</span>
        </div>

        {/* status */}
        <p className="rl-status" style={{ color: statusColor }}>{message}{dots}</p>

        {/* hex strip */}
        <div className="rl-hex-row" aria-hidden="true">
          {[0,1,2,3,4,5].map(i => (
            <span
              key={`${tick}-${i}`}
              className="rl-hex-cell"
              style={{ "--di": i, "--hc": hexColor, "--hhi": hexColorHi }}
            >
              {hex()}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .rl-root {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono','Fira Code',monospace;
          overflow: hidden;
        }
        .rl-canvas   { position: absolute; inset: 0; z-index: 0; }
        /* backdrop is a soft veil above the canvas */
        .rl-backdrop  { position: absolute; inset: 0; z-index: 1; }
        /* blobs float above the veil so card's backdrop-filter has colour to blur */
        .rl-blob      { position: absolute; border-radius: 50%; filter: blur(90px); z-index: 2; animation: blobDrift 14s ease-in-out infinite; will-change: transform; }
        .rl-blob-1 { width: 560px; height: 560px; top: -140px; left: -180px; animation-duration: 13s; }
        .rl-blob-2 { width: 480px; height: 480px; bottom: -120px; right: -120px; animation-duration: 16s; animation-delay: -5s; }
        .rl-blob-3 { width: 380px; height: 380px; top: 40%; left: 55%; animation-duration: 19s; animation-delay: -9s; }
        @keyframes blobDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(40px,-60px) scale(1.08); }
          66%      { transform: translate(-30px,40px) scale(0.94); }
        }

        .rl-card {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center; gap: 22px;
          padding: 44px 52px 36px; border-radius: 24px;
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          min-width: 340px;
          animation: cardIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
          overflow: hidden;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* corner brackets */
        .rl-corner { position: absolute; width: 16px; height: 16px; border-style: solid; animation: cornerPulse 3s ease-in-out infinite; }
        .rl-tl { top: 12px; left: 12px;     border-width: 2px 0 0 2px; }
        .rl-tr { top: 12px; right: 12px;    border-width: 2px 2px 0 0; animation-delay: 0.75s; }
        .rl-bl { bottom: 12px; left: 12px;  border-width: 0 0 2px 2px; animation-delay: 1.5s; }
        .rl-br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; animation-delay: 2.25s; }
        @keyframes cornerPulse {
          0%,100% { border-color: var(--current-corner, rgba(130,160,255,0.5)); }
          50%      { border-color: var(--hi, rgba(180,200,255,0.9)); }
        }

        /* orbital rings */
        .rl-rings { position: relative; width: 160px; height: 160px; display: flex; align-items: center; justify-content: center; }
        .rl-ring { position: absolute; border-radius: 50%; border: 1.5px solid transparent; }
        .rl-ring-1 { width: 160px; height: 160px; border-color: rgba(99,102,241,0.55); border-top-color: rgba(139,92,246,0.9); animation: spin 3s linear infinite; box-shadow: 0 0 18px rgba(99,102,241,0.25); }
        .rl-ring-2 { width: 120px; height: 120px; border-color: rgba(59,130,246,0.4);  border-bottom-color: rgba(99,220,255,0.85); animation: spin 2s linear infinite reverse; box-shadow: 0 0 14px rgba(59,130,246,0.2); }
        .rl-ring-3 { width: 82px;  height: 82px;  border-color: rgba(168,85,247,0.35); border-right-color: rgba(236,72,153,0.8);  animation: spin 1.4s linear infinite; box-shadow: 0 0 10px rgba(168,85,247,0.2); }
        @keyframes spin { to { transform: rotate(360deg); } }

        .rl-orb { position: absolute; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .rl-orb-inner { width: 36px; height: 36px; border-radius: 50%; background: conic-gradient(from 0deg, #6366f1, #8b5cf6, #3b82f6, #6366f1); animation: orbSpin 4s linear infinite; box-shadow: 0 0 0 2px rgba(99,102,241,0.3), 0 0 24px rgba(99,102,241,0.7), 0 0 50px rgba(139,92,246,0.4); }
        @keyframes orbSpin { to { transform: rotate(360deg); } }
        .rl-orb-pulse { position: absolute; width: 52px; height: 52px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%); animation: pulsate 2s ease-in-out infinite; }
        @keyframes pulsate { 0%,100% { transform: scale(0.85); opacity: 0.5; } 50% { transform: scale(1.25); opacity: 1; } }

        .rl-orbit-dot { position: absolute; width: 7px; height: 7px; border-radius: 50%; left: 50%; top: 50%; margin: -3.5px 0 0 -3.5px; }
        .rl-od-1 { background: #a78bfa; box-shadow: 0 0 8px 3px #a78bfa; transform-origin: 80px 80px; animation: odSpin1 3s linear infinite; }
        .rl-od-2 { background: #38bdf8; box-shadow: 0 0 8px 3px #38bdf8; transform-origin: 60px 60px; animation: odSpin2 2s linear infinite; }
        .rl-od-3 { background: #f472b6; box-shadow: 0 0 8px 3px #f472b6; transform-origin: 41px 41px; animation: odSpin3 1.4s linear infinite; }
        @keyframes odSpin1 { to { transform: rotate(360deg) translateX(80px); } }
        @keyframes odSpin2 { to { transform: rotate(360deg) translateX(60px); } }
        @keyframes odSpin3 { to { transform: rotate(360deg) translateX(41px); } }

        .rl-brand { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.04em; line-height: 1; font-family: 'Inter', system-ui, sans-serif; }
        .rl-brand-code  { background: linear-gradient(135deg, #a78bfa 0%, #6366f1 50%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .rl-brand-arena { background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .rl-prog-wrap { width: 100%; display: flex; align-items: center; gap: 10px; }
        .rl-prog-track { flex: 1; position: relative; height: 5px; border-radius: 999px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.18); overflow: visible; }
        .rl-prog-fill  { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #6366f1, #8b5cf6, #38bdf8); transition: width 0.25s ease; position: relative; overflow: hidden; }
        .rl-prog-shimmer { position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%); background-size: 200% 100%; animation: shimmer 1.4s linear infinite; }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        .rl-prog-tip { position: absolute; top: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; border-radius: 50%; background: white; box-shadow: 0 0 0 2px rgba(99,102,241,0.4), 0 0 12px 4px rgba(139,92,246,0.8); transition: left 0.25s ease; }
        .rl-prog-pct { font-size: 11px; min-width: 32px; text-align: right; letter-spacing: 0.03em; }

        .rl-status { margin: 0; font-size: 12.5px; letter-spacing: 0.10em; text-align: center; min-height: 18px; text-transform: uppercase; }

        .rl-hex-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
        .rl-hex-cell { font-size: 9.5px; letter-spacing: 0.08em; color: var(--hc, rgba(99,120,255,0.35)); animation: hexFlick 1s ease-in-out infinite; animation-delay: calc(var(--di) * 0.14s); }
        @keyframes hexFlick {
          0%,100% { opacity: 0.4; color: var(--hc,  rgba(99,120,255,0.35)); }
          50%      { opacity: 1;   color: var(--hhi, rgba(120,190,255,0.85)); }
        }
      `}</style>
    </div>
  );
};

export default RobotLoader;
