import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const LINKS = {
  github: "https://github.com/Pratik-Ptl",
  linkedin: "https://www.linkedin.com/in/PratikK-Patel",
  email: "pratik040105@gmail.com",
  subtrackLive: "https://subscription-tracker-delta-virid.vercel.app/",
  subtrackCode: "https://github.com/Pratik-Ptl/Subscription-Tracker",
  portfolioLive: "https://pratik-ptl.github.io/Pratik-Portfolio/",
  portfolioCode: "https://github.com/Pratik-Ptl/Pratik-Portfolio",
};

const PROJECTS = [
  {
    id: "subtrack",
    title: "SubTrack",
    subtitle: "Subscription Tracker Web App",
    category: "Web App",
    thumb: "subtrack-preview.jpg",
    blurb:
      "Track subscriptions with due dates, monthly/yearly spend estimates, CSV export, guest mode, and cloud sync via Supabase.",
    tech: ["React", "Vite", "Supabase", "Auth", "Vercel"],
    links: { live: LINKS.subtrackLive, code: LINKS.subtrackCode },
    bullets: [
      "Guest mode + optional cloud sync",
      "Renewal reminders + spend estimates",
      "CSV export for budgeting",
    ],
    stats: [
      { k: "Auth", v: "Supabase" },
      { k: "Deploy", v: "Vercel" },
      { k: "Focus", v: "UX polish" },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "Personal Website",
    category: "Website",
    thumb: "portfolio-preview.jpg",
    blurb: "A fast, responsive portfolio built with React + Vite and deployed with GitHub Pages.",
    tech: ["React", "Vite", "CSS", "GitHub Pages"],
    links: { live: LINKS.portfolioLive, code: LINKS.portfolioCode },
    bullets: ["Responsive layout", "Interactive project modal", "Modern UI + animations"],
    stats: [
      { k: "Build", v: "Vite" },
      { k: "Deploy", v: "GitHub Pages" },
      { k: "Goal", v: "Clean + memorable" },
    ],
  },
];

const SKILLS = [
  { name: "HTML", hint: "Semantic" },
  { name: "CSS", hint: "Modern layout" },
  { name: "JavaScript", hint: "ES6+" },
  { name: "React", hint: "Components" },
  { name: "Supabase", hint: "Auth + DB" },
  { name: "SQL", hint: "Queries" },
  { name: "GitHub", hint: "Workflow" },
  { name: "Vercel", hint: "Deploy" },
];

const SERVICES = [
  {
    title: "Frontend Development",
    desc: "Responsive, interactive web apps with clean UI states and thoughtful UX.",
  },
  {
    title: "Product UI Polish",
    desc: "Details that make projects feel finished: empty states, micro-interactions, accessibility.",
  },
  {
    title: "Deployment & Demos",
    desc: "Live links, readable code, and simple architecture that recruiters can verify fast.",
  },
];

const TESTIMONIALS = [
  {
    name: "(Your client / teammate)",
    role: "Role / Company",
    quote:
      "Add a short testimonial here later. Keep it 1–2 lines and focused on results or collaboration.",
  },
  {
    name: "(Professor / manager)",
    role: "Role / Organization",
    quote:
      "Another short review. This section makes the site feel more premium even with placeholders.",
  },
];

function spaced(label) {
  return label
    .trim()
    .split("")
    .map((c) => (c === " " ? "" : c))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function useScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const top = window.scrollY || doc.scrollTop || 0;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        setP(Math.min(1, Math.max(0, top / max)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return p;
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds?.[0] ?? "home");

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin: "-35% 0px -55% 0px", threshold: [0.08, 0.14, 0.22, 0.35, 0.5] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.dataset.visible = "true";
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useHeaderHeightVar(headerRef) {
  useEffect(() => {
    const el = headerRef?.current;
    if (!el) return;

    const root = document.documentElement;
    const set = () => root.style.setProperty("--headerH", `${el.offsetHeight}px`);
    set();

    const ro = new ResizeObserver(() => set());
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, [headerRef]);
}

const MAGNETIC_SELECTOR =
  ".btn, .navLink, .brand, .footLink, .pill, .tag, .iconBtn";

const SECTION_COLORS = {
  home:     { dot: "#c7ff3d", glow: "rgba(199,255,61,0.42)", ring: "rgba(199,255,61,0.18)" },
  portfolio:{ dot: "#7b5cff", glow: "rgba(123,92,255,0.42)", ring: "rgba(123,92,255,0.18)" },
  about:    { dot: "#a1ae7e", glow: "rgba(161,174,126,0.42)", ring: "rgba(161,174,126,0.18)" },
  skills:   { dot: "#c7ff3d", glow: "rgba(199,255,61,0.42)", ring: "rgba(199,255,61,0.18)" },
  services: { dot: "#c7ff3d", glow: "rgba(199,255,61,0.42)", ring: "rgba(199,255,61,0.18)" },
  contact:  { dot: "#ff4d8d", glow: "rgba(255,77,141,0.42)", ring: "rgba(255,77,141,0.18)" },
};

const ACCENT_COLORS = ["#c7ff3d", "#7b5cff", "#ff4d8d"];

function CursorFx({ activeSection }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const particlesRef = useRef(null);
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)")?.matches;
    if (!fine) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const root = document.documentElement;
    root.classList.add("hasCursorFx");
    if (!reduce) root.classList.add("hasCursorMotion");
    setEnabled(true);

    /* ---- position tracking ---- */
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx, ry = ty;
    let prevTx = tx, prevTy = ty;
    let raf = 0;

    /* ---- ring dimensions (JS-interpolated) ---- */
    let ringW = 40, ringH = 40;
    const DEFAULT_RING = 40;

    /* ---- magnetic morph state ---- */
    let currentMagnetTarget = null;
    let magnetRect = null;
    let magnetRadius = "999px";
    let isMagnetic = false;
    let isDown = false;

    /* ---- section color ---- */
    let lastSection = "";

    /* ---- particles ---- */
    let lastSpawnX = tx, lastSpawnY = ty;
    let particleCount = 0;
    const MAX_PARTICLES = 20;
    const SPAWN_DIST_SQ = 100; // 10px squared
    const PARTICLE_LIFE = 480;

    const spawnParticle = (x, y, vx, vy) => {
      if (particleCount >= MAX_PARTICLES) return;
      const container = particlesRef.current;
      if (!container) return;

      const p = document.createElement("div");
      p.className = "cursorParticle";
      const color = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
      // Shooting star: gradient tail (transparent) → bright head (accent + white tip)
      const len   = 22 + Math.random() * 20;
      const thick = 1.5 + Math.random() * 0.8;
      const angle    = Math.atan2(vy, vx) * (180 / Math.PI) + (Math.random() - 0.5) * 25;
      const angleRad = angle * Math.PI / 180;
      p.style.cssText = `left:0;top:0;width:${len}px;height:${thick}px;`
        + `background:linear-gradient(to right,transparent 0%,${color}55 30%,${color} 80%,#ffffff 100%);`
        + `opacity:0.9;border-radius:999px;`
        + `box-shadow:0 0 5px 1px ${color}99,0 0 2px #ffffff66;`
        + `transform:translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${angle}deg)`;
      container.appendChild(p);
      particleCount++;

      requestAnimationFrame(() => {
        const shoot = 18 + Math.random() * 18;
        const ex = x + Math.cos(angleRad) * shoot;
        const ey = y + Math.sin(angleRad) * shoot;
        p.style.transition = `transform ${PARTICLE_LIFE}ms cubic-bezier(.1,.5,.2,1), opacity ${Math.round(PARTICLE_LIFE * 0.6)}ms ease-out`;
        p.style.transform = `translate3d(${ex}px,${ey}px,0) translate(-50%,-50%) rotate(${angle}deg) scaleX(0.2)`;
        p.style.opacity = "0";
      });

      setTimeout(() => { p.remove(); particleCount--; }, PARTICLE_LIFE);
    };

    /* ---- helpers ---- */
    const setPos = (x, y) => {
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y + window.scrollY}px`);
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    /* ---- event handlers ---- */
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      setPos(tx, ty);
      root.classList.remove("isCursorOut");

      // Magnetic target detection
      const el = document.elementFromPoint(tx, ty);
      const target = el?.closest(MAGNETIC_SELECTOR) || null;

      if (target !== currentMagnetTarget) {
        currentMagnetTarget = target;
        if (target) {
          magnetRect = target.getBoundingClientRect();
          magnetRadius = getComputedStyle(target).borderRadius || "999px";
          isMagnetic = true;
          root.classList.add("isMagnetic");
        } else {
          isMagnetic = false;
          root.classList.remove("isMagnetic");
        }
      } else if (target && isMagnetic) {
        magnetRect = target.getBoundingClientRect();
      }

      // Stardust spawning (only when NOT magnetic & motion OK)
      if (!isMagnetic && !reduce) {
        const dx = tx - lastSpawnX;
        const dy = ty - lastSpawnY;
        if (dx * dx + dy * dy > SPAWN_DIST_SQ) {
          spawnParticle(tx, ty, dx, dy);
          lastSpawnX = tx;
          lastSpawnY = ty;
        }
      }
    };

    const onScrollGlow = () => {
      root.style.setProperty("--my", `${ty + window.scrollY}px`);
      if (currentMagnetTarget && isMagnetic) {
        magnetRect = currentMagnetTarget.getBoundingClientRect();
      }
    };

    const onDown = () => { root.classList.add("isCursorDown"); isDown = true; };
    const onUp = () => { root.classList.remove("isCursorDown"); isDown = false; };
    const onLeave = () => root.classList.add("isCursorOut");
    const onEnter = () => root.classList.remove("isCursorOut");

    /* ---- RAF loop ---- */
    const loop = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;

      // Velocity
      const dvx = tx - prevTx;
      const dvy = ty - prevTy;
      prevTx = tx;
      prevTy = ty;
      const speed = Math.sqrt(dvx * dvx + dvy * dvy);

      if (ring) {
        if (isMagnetic && magnetRect && currentMagnetTarget?.isConnected) {
          // ---- Magnetic morph: ease ring toward element ----
          const pad = 8;
          let targetW = magnetRect.width + pad * 2;
          let targetH = magnetRect.height + pad * 2;
          const targetX = magnetRect.left + magnetRect.width / 2;
          const targetY = magnetRect.top + magnetRect.height / 2;

          // Shrink slightly on click
          if (isDown) { targetW *= 0.95; targetH *= 0.95; }

          ringW += (targetW - ringW) * 0.18;
          ringH += (targetH - ringH) * 0.18;
          rx += (targetX - rx) * 0.18;
          ry += (targetY - ry) * 0.18;

          ring.style.width = `${ringW}px`;
          ring.style.height = `${ringH}px`;
          ring.style.borderRadius = magnetRadius;
          ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        } else {
          // ---- Normal follow with velocity stretch ----
          if (isMagnetic) {
            isMagnetic = false;
            currentMagnetTarget = null;
            root.classList.remove("isMagnetic");
          }

          rx += (tx - rx) * 0.14;
          ry += (ty - ry) * 0.14;
          ringW += ((isDown ? 30 : DEFAULT_RING) - ringW) * 0.14;
          ringH += ((isDown ? 30 : DEFAULT_RING) - ringH) * 0.14;

          let scaleX = 1, scaleY = 1;
          if (speed > 2) {
            const angle = Math.atan2(dvy, dvx);
            const stretch = Math.min(speed * 0.008, 0.3);
            scaleX = 1 + Math.abs(Math.cos(angle)) * stretch;
            scaleY = 1 + Math.abs(Math.sin(angle)) * stretch;
          }

          ring.style.width = `${ringW}px`;
          ring.style.height = `${ringH}px`;
          ring.style.borderRadius = "999px";
          ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;
        }
      }

      // ---- Section-reactive colors ----
      const section = activeSectionRef.current;
      if (section !== lastSection) {
        lastSection = section;
        const c = SECTION_COLORS[section] || SECTION_COLORS.home;
        if (dot) {
          dot.style.background = c.dot;
          dot.style.boxShadow = `0 0 18px ${c.glow}, 0 0 40px rgba(123,92,255,0.16)`;
        }
        root.style.setProperty("--cursor-accent", c.dot);
        root.style.setProperty("--cursor-glow", c.glow);
        root.style.setProperty("--cursor-ring-tint", c.ring);
      }

      raf = window.requestAnimationFrame(loop);
    };

    setPos(tx, ty);
    raf = window.requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScrollGlow, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScrollGlow);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      root.classList.remove("hasCursorFx", "hasCursorMotion", "isCursorDown", "isCursorOut", "isMagnetic");
      root.style.removeProperty("--cursor-accent");
      root.style.removeProperty("--cursor-glow");
      root.style.removeProperty("--cursor-ring-tint");
      if (particlesRef.current) particlesRef.current.innerHTML = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="cursorLayer" aria-hidden="true">
      <div className="cursorParticles" ref={particlesRef} />
      <div className="cursorRing" ref={ringRef} />
      <div className="cursorDot" ref={dotRef} />
    </div>
  );
}

function IntroScreen({ onDone }) {
  const [phase, setPhase] = useState("in");
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // Letters finish animating ~1250ms; show subtitle after that
    const t1 = window.setTimeout(() => setPhase("hold"), 1450);
    // Start the slide-up exit
    const t2 = window.setTimeout(() => setPhase("out"), 2200);
    // Remove from DOM after transition completes
    const t3 = window.setTimeout(() => onDoneRef.current(), 2980);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const name = "Pratik Patel";

  return (
    <div className={`introScreen${phase === "out" ? " isOut" : ""}`} aria-label="Loading portfolio">
      <div className="introInner">
        <div className="introNameWrap" aria-label={name}>
          {name.split("").map((char, i) =>
            char === " " ? (
              <span key={i} className="introGap" aria-hidden="true" />
            ) : (
              <span
                key={i}
                className="introChar"
                aria-hidden="true"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                {char}
              </span>
            )
          )}
        </div>
        <div className={`introRole${phase !== "in" ? " isVisible" : ""}`} aria-hidden="true">
          Frontend Developer
        </div>
      </div>
    </div>
  );
}

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function Modal({ open, title, onClose, children }) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modalBackdrop" onClick={onClose} aria-label="Close" />
      <div className="modal">
        <div className="modalTop">
          <div>
            <div className="modalKicker">Details</div>
            <h3 className="modalTitle">{title}</h3>
          </div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 950);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button className={`btn tiny ${copied ? "isOk" : ""}`} onClick={onCopy} type="button">
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ContactCard({ label, value, href, copyValue }) {
  const isMail = href.startsWith("mailto:");
  return (
    <div className="contactCard">
      <div className="contactLabel">{label}</div>
      <div className="contactValue">{value}</div>
      <div className="contactActions">
        <a
          className="btn tiny"
          href={href}
          target={isMail ? undefined : "_blank"}
          rel={isMail ? undefined : "noreferrer"}
        >
          Open
        </a>
        <CopyButton value={copyValue ?? value} />
      </div>
    </div>
  );
}

function Marquee({ text }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marqueeTrack">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

function NavLink({ label, id, active, onGo }) {
  const chars = label.split("");
  return (
    <a
      className={`navLink ${active === id ? "isActive" : ""}`}
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        onGo(id);
      }}
    >
      <span className="navLinkInner" aria-hidden="true">
        <span className="navLinkRow">
          {chars.map((ch, i) => (
            <span key={i} className="navLinkChar" style={{ transitionDelay: `${i * 14}ms` }}>{ch}</span>
          ))}
        </span>
        <span className="navLinkRow navLinkRowClone">
          {chars.map((ch, i) => (
            <span key={i} className="navLinkChar" style={{ transitionDelay: `${i * 14}ms` }}>{ch}</span>
          ))}
        </span>
      </span>
      <span className="srOnly">{label}</span>
    </a>
  );
}

export default function App() {
  const progress = useScrollProgress();

  const sectionIds = useMemo(
    () => ["home", "portfolio", "about", "skills", "services", "contact"],
    []
  );
  const active = useActiveSection(sectionIds);
  useRevealOnScroll();

  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const skipIntro = new URLSearchParams(window.location.search).has("noIntro");
  const [introVisible, setIntroVisible] = useState(!skipIntro);
  useLockBodyScroll(introVisible);

  const headerRef = useRef(null);
  useHeaderHeightVar(headerRef);

  // Section flash highlight (for a couple seconds)
  const [flash, setFlash] = useState(null);
  const flashTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
  }, []);

  const triggerFlash = (id) => {
    if (!id) return;
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    setFlash(id);
    flashTimer.current = window.setTimeout(() => setFlash(null), 3000);
  };

  const go = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const headerH = headerRef.current?.offsetHeight ?? 0;
      const y = el.getBoundingClientRect().top + window.scrollY - headerH - 14;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      window.setTimeout(() => triggerFlash(id), 400);
    }
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="page">
      <CursorFx activeSection={active} />
      {introVisible && <IntroScreen onDone={() => setIntroVisible(false)} />}

      <header className="header" ref={headerRef}>
        <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

        <div className="nav">
          <a
            className="brand"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
          >
            <span className="brandInner" aria-hidden="true">
              <span className="brandRow">
                {"Pratik".split("").map((ch, i) => (
                  <span key={i} className="brandChar" style={{ transitionDelay: `${i * 14}ms` }}>{ch}</span>
                ))}
              </span>
              <span className="brandRow brandRowClone">
                {"Pratik".split("").map((ch, i) => (
                  <span key={i} className="brandChar" style={{ transitionDelay: `${i * 14}ms` }}>{ch}</span>
                ))}
              </span>
            </span>
            <span className="srOnly">Pratik Patel</span>
          </a>

          <nav className="navLinks" aria-label="Primary">
            <NavLink label="Home" id="home" active={active} onGo={go} />
            <NavLink label="Portfolio" id="portfolio" active={active} onGo={go} />
            <NavLink label="About" id="about" active={active} onGo={go} />
            <NavLink label="Skills" id="skills" active={active} onGo={go} />
            <NavLink label="Contact" id="contact" active={active} onGo={go} />
          </nav>

          <button
            className={`menuBtn ${menuOpen ? "isOn" : ""}`}
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobileNav" role="navigation" aria-label="Mobile">
            {[
              ["Home", "home"],
              ["Portfolio", "portfolio"],
              ["About", "about"],
              ["Skills", "skills"],
              ["Services", "services"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
              >
                {label}
              </a>
            ))}

            <div className="mobileRow">
              <a className="pill" href={LINKS.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="pill" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="pill" href={`mailto:${LINKS.email}`}>
                Email
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="container">
        <section
          id="home"
          className={`hero ${flash === "home" ? "flash" : ""}`}
          data-reveal
        >
          <div className="heroLeft">
            <div className="kicker">Hi There,</div>
            <h1 className="heroTitle">
              I am <span className="accent">Pratik</span>
            </h1>
            <div className="heroRole">Frontend Developer</div>
            <p className="heroSub">
              My passion for design, code, and web interaction fuels my journey in building polished web applications.
            </p>

            <div className="ctaRow">
              <button className="btn primary" type="button" onClick={() => go("portfolio")}>
                See Work
              </button>
              <a className="btn" href={LINKS.subtrackLive} target="_blank" rel="noreferrer">
                Open SubTrack
              </a>
            </div>

            <div className="heroMeta">
              <div className="metaItem">
                <div className="metaK">Based</div>
                <div className="metaV">Regina, SK</div>
              </div>
              <div className="metaItem">
                <div className="metaK">Focus</div>
                <div className="metaV">UI polish + demos</div>
              </div>
              <div className="metaItem">
                <div className="metaK">Links</div>
                <div className="metaV">GitHub + LinkedIn</div>
              </div>
            </div>
          </div>

          <div className="heroRight" data-reveal>
            <div className="portrait" aria-hidden="true">
              <img
                className="portraitImg"
                src={`${import.meta.env.BASE_URL}pratik-profile.jpg`}
                alt=""
                loading="eager"
                draggable="false"
              />
              <div className="portraitInner">
                <div className="portraitBadge">Available for Co‑op</div>
                <div className="portraitName">Pratik Patel</div>
                <div className="portraitLine">React • Supabase • Vite</div>
              </div>
            </div>
          </div>
        </section>

        <Marquee text="CREATIVE FRONTEND DEVELOPER • CREATIVE FRONTEND DEVELOPER • " />

        <section
          id="portfolio"
          className={`section ${flash === "portfolio" ? "flash" : ""}`}
          data-reveal
        >
          <div className="sectionTop">
            <h2>Portfolio</h2>
            <div className="sectionSub">Latest Projects</div>
          </div>

          <div className="projGrid">
            {PROJECTS.map((p) => (
              <article
                key={p.id}
                className={`projCard ${p.id}`}
                tabIndex={0}
                role="button"
                onClick={() => setSelected(p)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(p)}
              >
                <div className="projThumb" aria-hidden="true">
                  {p.thumb && (
                    <img
                      className="projThumbImg"
                      src={`${import.meta.env.BASE_URL}${p.thumb}`}
                      alt=""
                      loading="lazy"
                      draggable="false"
                    />
                  )}
                </div>
                <div className="projBody">
                  <div className="projKicker">{p.category}</div>
                  <h3 className="projTitle">{p.title}</h3>
                  <div className="projSubtitle">{p.subtitle}</div>

                  <div className="projTags">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="projActions" onClick={(e) => e.stopPropagation()}>
                    <a className="btn tiny" href={p.links.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                    <a className="btn tiny" href={p.links.code} target="_blank" rel="noreferrer">
                      Code
                    </a>
                    <button className="btn tiny ghost" type="button" onClick={() => setSelected(p)}>
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="moreRow">
            <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">
              More Projects
            </a>
          </div>

          <Modal open={!!selected} title={selected?.title ?? ""} onClose={() => setSelected(null)}>
            {selected && (
              <>
                <p className="modalLead">{selected.blurb}</p>

                <div className="modalRow">
                  <a className="btn primary" href={selected.links.live} target="_blank" rel="noreferrer">
                    Open live demo
                  </a>
                  <a className="btn" href={selected.links.code} target="_blank" rel="noreferrer">
                    View source
                  </a>
                </div>

                <div className="modalGrid">
                  <div className="modalBlock">
                    <div className="modalKicker">Highlights</div>
                    <ul>
                      {selected.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="modalBlock">
                    <div className="modalKicker">Tech</div>
                    <div className="tagRow">
                      {selected.tech.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="modalKicker" style={{ marginTop: 14 }}>
                      Notes
                    </div>
                    <div className="kv">
                      {selected.stats.map((s) => (
                        <div key={s.k} className="kvRow">
                          <div className="kvK">{s.k}</div>
                          <div className="kvV">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal>
        </section>

        <Marquee text="NAVIGATING THE LANDSCAPE OF MY ABILITIES • NAVIGATING THE LANDSCAPE OF MY ABILITIES • " />

        <section
          id="about"
          className={`section ${flash === "about" ? "flash" : ""}`}
          data-reveal
        >
          <div className="sectionTop">
            <h2>About Me</h2>
            <div className="sectionSub">Unveiling the layers of my story</div>
          </div>

          <div className="aboutGrid">
            <div className="aboutMedia" aria-hidden="true">
              <img
                className="aboutMediaImg"
                src={`${import.meta.env.BASE_URL}pratik-profile.jpg`}
                alt=""
                loading="lazy"
                draggable="false"
              />
              <div className="aboutMediaInner" />
            </div>

            <div className="aboutText">
              <p className="lead">
                I’ve grown from enjoying problem-solving to blending design with function — crafting interfaces that are
                both beautiful and intuitive. Each project is a chance to exceed expectations and bring ideas to life
                with care.
              </p>

              <div className="aboutStats">
                <div className="stat">
                  <div className="statN">01+</div>
                  <div className="statL">Years building</div>
                </div>
                <div className="stat">
                  <div className="statN">02</div>
                  <div className="statL">Live demos</div>
                </div>
                <div className="stat">
                  <div className="statN">∞</div>
                  <div className="statL">Curiosity</div>
                </div>
              </div>

              <div className="aboutInfo">
                <div className="infoRow">
                  <div className="infoK">Email:</div>
                  <div className="infoV">{LINKS.email}</div>
                </div>
                <div className="infoRow">
                  <div className="infoK">Location:</div>
                  <div className="infoV">Regina, Saskatchewan</div>
                </div>
                <div className="infoRow">
                  <div className="infoK">Focus:</div>
                  <div className="infoV">Frontend + product UI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className={`section ${flash === "skills" ? "flash" : ""}`}
          data-reveal
        >
          <div className="sectionTop">
            <h2>Skills</h2>
            <div className="sectionSub">Tools I use</div>
          </div>

          <div className="skillsRow">
            {SKILLS.map((s) => (
              <div key={s.name} className="skillChip">
                <div className="chipIcon" aria-hidden="true">
                  {s.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="chipName">{s.name}</div>
                  <div className="chipHint">{s.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="services"
          className={`section ${flash === "services" ? "flash" : ""}`}
          data-reveal
        >
          <div className="sectionTop">
            <h2>Services</h2>
            <div className="sectionSub">Crafting solutions tailored to your needs</div>
          </div>

          <div className="serviceGrid">
            {SERVICES.map((s) => (
              <div key={s.title} className="serviceCard">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={`section ${flash === "contact" ? "flash" : ""}`}
          data-reveal
        >
          <div className="sectionTop">
            <h2>Contact</h2>
            <div className="sectionSub">Let’s build something</div>
          </div>

          <div className="contactWrap">
            <p className="lead">Fastest way to reach me is email. You can also connect on LinkedIn.</p>

            <div className="contactGrid">
              <ContactCard label="Email" value={LINKS.email} href={`mailto:${LINKS.email}`} copyValue={LINKS.email} />
              <ContactCard label="GitHub" value="github.com/Pratik-Ptl" href={LINKS.github} copyValue={LINKS.github} />
              <ContactCard
                label="LinkedIn"
                value="linkedin.com/in/PratikK-Patel"
                href={LINKS.linkedin}
                copyValue={LINKS.linkedin}
              />
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footLeft">© {new Date().getFullYear()} Pratik Patel</div>
          <div className="footRight">
            <a className="footLink" href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="footLink" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a
              className="footLink"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                go("home");
              }}
            >
              Back to top ↑
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
