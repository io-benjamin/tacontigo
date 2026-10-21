// src/HeroSection.jsx
// Scroll-scrubbed hero: the onion, cilantro and avocado-tomatillo salsa fall onto three tacos as you scroll.
// Frames are pre-rendered stills (public/hero/d for desktop, public/hero/m pre-cropped for phones) drawn to a
// canvas, so scrubbing works both ways and stays sharp. Reduced motion gets the finished tacos as a still.
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const FRAMES = 92;
const PHONE = 760; // px; matches the CSS breakpoint
const src = (set, i) => `/hero/${set}/${String(i + 1).padStart(3, "0")}.webp`;
// Stamp order is the slam order. Positions and tilt live in the CSS.
const STAMPS = [
  { id: "a", text: "¡PASELE PASELE!" },
  { id: "b", text: "AQUI ESTA LO BUENO" },
];
const clamp = (v, a, b) => Math.min(1, Math.max(0, (v - a) / (b - a)));

const HeroSection = () => {
  const scrollerRef = useRef(null);
  const canvasRef = useRef(null);
  const stampsRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = () => window.innerWidth <= PHONE;
    const set = phone() ? "m" : "d";
    const imgs = new Array(FRAMES);
    let raf = 0;

    const load = (i) => {
      const im = new Image();
      im.decoding = "async";
      im.src = src(set, i);
      im.onload = () => i === 0 || i === FRAMES - 1 ? draw() : undefined;
      imgs[i] = im;
    };
    // First frame first, then coarse-to-fine so any scroll position has a near frame early.
    if (reduced) load(FRAMES - 1);
    else {
      load(0);
      for (let step = 8; step >= 1; step >>= 1) for (let i = 0; i < FRAMES; i += step) if (!imgs[i]) load(i);
    }
    const ready = (im) => im && im.complete && im.naturalWidth > 0;
    const nearest = (k) => {
      for (let d = 0; d < FRAMES; d++) {
        if (ready(imgs[k - d])) return imgs[k - d];
        if (ready(imgs[k + d])) return imgs[k + d];
      }
      return null;
    };

    const size = () => {
      const r = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * r;
      canvas.height = canvas.clientHeight * r;
    };

    const paint = (im, alpha) => {
      const W = canvas.width, H = canvas.height;
      ctx.globalAlpha = alpha;
      if (phone()) {
        // Phone frames are already cropped to the basket: fit the width, sit near the top.
        const s = (W / im.width) * 1.08, w = im.width * s, h = im.height * s;
        ctx.drawImage(im, (W - w) / 2, H * 0.09, w, h);
      } else {
        const s = Math.max(W / im.width, H / im.height), w = im.width * s, h = im.height * s;
        ctx.drawImage(im, (W - w) * 0.6, (H - h) * 0.5, w, h);
      }
    };

    const fadePhoneEdge = (im) => {
      if (!phone()) return;
      const W = canvas.width, H = canvas.height, h = im.height * (W / im.width) * 1.08, y = H * 0.09;
      const g = ctx.createLinearGradient(0, y + h * 0.72, 0, y + h);
      g.addColorStop(0, "rgba(10,35,66,0)");
      g.addColorStop(1, "#0A2342");
      ctx.globalAlpha = 1;
      ctx.fillStyle = g;
      ctx.fillRect(0, y + h * 0.72, W, h * 0.29);
      const top = ctx.createLinearGradient(0, y, 0, y + h * 0.12); // soften the photo's top edge under the header
      top.addColorStop(0, "#0A2342");
      top.addColorStop(1, "rgba(10,35,66,0)");
      ctx.fillStyle = top;
      ctx.fillRect(0, y - 1, W, h * 0.12 + 1);
    };

    function draw() {
      const box = scroller.getBoundingClientRect();
      const p = reduced ? 1 : clamp(-box.top, 0, scroller.offsetHeight - window.innerHeight);
      const f = clamp(p, 0.03, 0.85) * (FRAMES - 1);
      const k = Math.floor(f), t = f - k;
      const a = nearest(k), b = imgs[k + 1];
      if (a) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#0A2342";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        paint(a, 1);
        if (t > 0 && ready(b)) paint(b, t); // blend neighbours: smooth scrub with half the frames
        fadePhoneEdge(a);
        ctx.globalAlpha = 1;
      }
      // The payoff: once the salsa lands, each stamp slams down in turn (big and faint → set, with a small overshoot).
      stampsRef.current.querySelectorAll(".stamp").forEach((el, i) => {
        const t = clamp(p, 0.8 + i * 0.035, 0.84 + i * 0.035);
        const bounce = t < 1 ? 1 + (1 - t) * 0.9 - Math.sin(t * Math.PI) * 0.06 : 1;
        el.style.setProperty("--k", bounce.toFixed(3));
        el.style.setProperty("--o", t.toFixed(3));
      });
      hintRef.current.style.opacity = 1 - clamp(p, 0, 0.12);
      // Light header text only while it sits over the navy hero.
      const header = document.querySelector(".site-header");
      document.body.classList.toggle("on-dark-hero", box.bottom > (header ? header.offsetHeight / 2 : 40));
    }

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const onResize = () => {
      size();
      draw();
    };
    size();
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("on-dark-hero");
    };
  }, []);

  return (
    <section className="hero" ref={scrollerRef}>
      <div className="hero-stage">
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          role="img"
          aria-label="Three tacos — asada, al pastor and pollo — topped with onion, cilantro and avocado-tomatillo salsa in a checkered basket"
        />
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-copy">
          <p className="hero-eyebrow">Taquería · Chester, VA</p>
          <h1 className="hero-title">Tacos that go where you go.</h1>
          <p className="hero-sub">
            Family recipes from Guadalajara: tacos, tortas, burritos and more, made fresh every day. Order ahead, or let
            us cater your party.
          </p>
          <div className="hero-ctas">
            <a href="https://tinyurl.com/yckyxzuy" target="_blank" rel="noopener noreferrer" className="hero-btn primary">
              Order now
            </a>
            <Link to="/Catering" className="hero-btn ghost">
              Plan catering →
            </Link>
          </div>
        </div>

        {/* Rubber stamps on the wall, slammed in one by one once the salsa lands. Blanka has no accented
            capitals or comma, so the shown text drops them; screen readers get the real phrase once. */}
        <div className="hero-stamps" ref={stampsRef} role="img" aria-label="¡Pásele, pásele! Aquí está lo bueno.">
          {STAMPS.map((st) => (
            <span key={st.id} className={`stamp stamp-${st.id}`} aria-hidden="true">
              {st.text}
            </span>
          ))}
        </div>

        <div className="hero-meta">
          <span><b>Tue–Sat</b> 11:30–8:30</span>
          <span><b>Sun</b> 12–8</span>
          <span><b>13900 US-1</b>, Chester</span>
        </div>
        <div className="hero-hint" ref={hintRef} aria-hidden="true">Scroll ↓</div>
      </div>
    </section>
  );
};

export default HeroSection;
