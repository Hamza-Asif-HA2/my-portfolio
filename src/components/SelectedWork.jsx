import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Cover from './Cover';

// small deterministic pseudo-random so the scatter is the same on every visit
const rand = (i, salt) => {
  const s = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function useStageSize(ref) {
  const [size, setSize] = useState({ w: 1200, h: 800 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function layout({ w, h }, n) {
  const mobile = w < 768;
  const cols = mobile ? 2 : w < 1100 ? 4 : 5;
  const rows = Math.ceil(n / cols);
  const gap = mobile ? 10 : 18;
  const leftPad = mobile ? 0 : 150; // room for the vertical title
  const availW = w - leftPad - (mobile ? 32 : 140);
  const availH = h * (mobile ? 0.66 : 0.72);
  const ratio = 0.68;
  const cardW = Math.min((availW - gap * (cols - 1)) / cols, (availH - gap * (rows - 1)) / rows / ratio);
  const cardH = cardW * ratio;
  const gridW = cols * cardW + (cols - 1) * gap;
  const gridH = rows * cardH + (rows - 1) * gap;
  const shiftX = leftPad / 2;
  const shiftY = mobile ? 30 : 20;

  const grid = (i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return {
      x: shiftX - gridW / 2 + c * (cardW + gap) + cardW / 2,
      y: shiftY - gridH / 2 + r * (cardH + gap) + cardH / 2,
    };
  };
  const scatter = (i) => ({
    x: (rand(i, 1) - 0.5) * w * (mobile ? 0.55 : 0.7) + shiftX,
    y: (rand(i, 2) - 0.5) * h * 0.55,
    r: (rand(i, 3) - 0.5) * 50,
    s: 0.8 + rand(i, 4) * 0.45,
  });
  return { cardW, cardH, grid, scatter, mobile };
}

function Card({ project, i, n, progress, L, onOpen }) {
  const g = L.grid(i);
  const s = L.scatter(i);
  const stack = { x: L.mobile ? 0 : 75, y: 0, r: (i - n / 2) * 2.2 };
  const steps = [0, 0.12 + i * 0.012, 0.45, 0.78];
  const x = useTransform(progress, steps, [stack.x, stack.x, s.x, g.x]);
  const y = useTransform(progress, steps, [stack.y - i * 2, stack.y - i * 2, s.y, g.y]);
  const rotate = useTransform(progress, steps, [stack.r, stack.r, s.r, 0]);
  const scale = useTransform(progress, steps, [0.9, 0.9, s.s, 1]);
  const labelOpacity = useTransform(progress, [0.74, 0.84], [0, 1]);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(i)}
      className="group absolute left-1/2 top-1/2 text-left outline-none"
      style={{ x, y, rotate, scale, width: L.cardW, height: L.cardH, marginLeft: -L.cardW / 2, marginTop: -L.cardH / 2, zIndex: i }}
      aria-label={`Open ${project.title}`}
    >
      <div className="h-full w-full overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-18px_rgba(30,30,70,0.55)] ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-lav-deep">
        <Cover project={project} />
      </div>
      <motion.div style={{ opacity: labelOpacity }} className="absolute inset-x-0 top-full mt-1.5 flex items-baseline justify-between gap-2">
        <span className="truncate text-[11px] font-medium text-ink md:text-xs">{project.title}</span>
        <span className="font-mono text-[9px] text-muted">{String(i + 1).padStart(2, '0')}</span>
      </motion.div>
    </motion.button>
  );
}

export default function SelectedWork({ projects, onOpen }) {
  const section = useRef(null);
  const stage = useRef(null);
  const size = useStageSize(stage);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const L = layout(size, projects.length);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  if (reduce) {
    return (
      <section id="work" className="bg-paper px-5 py-24 md:px-10">
        <h2 className="font-wide extrude mb-10 text-6xl font-medium md:text-8xl">Selected Work</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {projects.map((p, i) => (
            <button key={p.id} onClick={() => onOpen(i)} className="text-left">
              <div className="aspect-[3/2] overflow-hidden rounded-xl bg-white shadow">
                <Cover project={p} />
              </div>
              <p className="mt-2 text-xs font-medium">{p.title}</p>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={section} className="relative h-[330vh] bg-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-gradient-to-b from-paper to-paper-2">
        <h2 className="font-wide extrude absolute left-5 top-20 z-0 text-5xl font-medium md:vertical md:bottom-10 md:left-8 md:top-auto md:text-[9vh] lg:text-[11vh]">
          Selected Work
        </h2>
        <p className="absolute right-5 top-24 z-0 hidden max-w-[220px] text-right text-xs leading-relaxed text-muted md:right-10 md:block">
          {projects.length} projects across AI, web, mobile and ML research. Scroll to sort them, click any to open.
        </p>
        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-0 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted"
        >
          keep scrolling
        </motion.p>
        <div ref={stage} className="absolute inset-0">
          {projects.map((p, i) => (
            <Card key={p.id} project={p} i={i} n={projects.length} progress={scrollYProgress} L={L} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
