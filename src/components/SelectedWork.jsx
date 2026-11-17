import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
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

// Bento tiles for the final grid: [col, row, colSpan, rowSpan] per project, in order.
const BENTO = {
  desktop: { cols: 6, rows: 3, tiles: [[0, 0, 2, 2], [2, 0, 1, 1], [3, 0, 1, 1], [4, 0, 2, 2], [2, 1, 1, 1], [3, 1, 1, 1], [0, 2, 2, 1], [2, 2, 1, 1], [3, 2, 1, 1], [4, 2, 2, 1]] },
  tablet: { cols: 4, rows: 4, tiles: [[0, 0, 2, 2], [2, 0, 1, 1], [3, 0, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [0, 2, 1, 1], [1, 2, 1, 1], [2, 2, 2, 2], [0, 3, 1, 1], [1, 3, 1, 1]] },
  mobile: { cols: 2, rows: 6, tiles: [[0, 0, 2, 1], [0, 1, 1, 1], [1, 1, 1, 1], [0, 2, 1, 1], [1, 2, 1, 1], [0, 3, 1, 1], [1, 3, 1, 1], [0, 4, 1, 1], [1, 4, 1, 1], [0, 5, 2, 1]] },
};

function layout({ w, h }, n) {
  const mobile = w < 768;
  const preset = BENTO[mobile ? 'mobile' : w < 1100 ? 'tablet' : 'desktop'];
  // fall back to a uniform grid if the project count changes
  const cols = preset.tiles.length === n ? preset.cols : mobile ? 2 : 5;
  const rows = preset.tiles.length === n ? preset.rows : Math.ceil(n / cols);
  const tiles = preset.tiles.length === n ? preset.tiles : Array.from({ length: n }, (_, i) => [i % cols, Math.floor(i / cols), 1, 1]);

  const gap = mobile ? 10 : 16;
  const leftPad = mobile ? 0 : 150; // room for the vertical title
  const top = mobile ? 176 : 112; // room for the header row
  const availW = w - leftPad - (mobile ? 32 : 100);
  const availH = h - top - (mobile ? 40 : 56);
  const unitW = (availW - gap * (cols - 1)) / cols;
  const unitH = Math.min((availH - gap * (rows - 1)) / rows, unitW * (mobile ? 0.8 : 1));
  const gridW = availW;
  const gridH = rows * unitH + (rows - 1) * gap;
  const originX = -w / 2 + (mobile ? 16 : leftPad + 40);
  const originY = -h / 2 + top + Math.max(0, (availH - gridH) / 2);
  const base = Math.min(unitW * 1.25, mobile ? 200 : 280); // card width while stacked / scattered

  const tile = (i) => {
    const [c, r, cs, rs] = tiles[i];
    const tw = cs * unitW + (cs - 1) * gap;
    const th = rs * unitH + (rs - 1) * gap;
    return {
      w: tw,
      h: th,
      x: originX + c * (unitW + gap) + tw / 2,
      y: originY + r * (unitH + gap) + th / 2,
      norm: base / tw,
      big: cs * rs > 1,
    };
  };
  const scatter = (i) => ({
    x: (rand(i, 1) - 0.5) * w * (mobile ? 0.5 : 0.62) + leftPad / 2,
    y: (rand(i, 2) - 0.5) * h * 0.5 + 20,
    r: (rand(i, 3) - 0.5) * 44,
    s: 0.8 + rand(i, 4) * 0.4,
  });
  return { tile, scatter, mobile, gridW };
}

function Card({ project, i, n, progress, L, onOpen }) {
  const t = L.tile(i);
  const s = L.scatter(i);
  const stack = { x: L.mobile ? 0 : 75, y: 20 - i * 2, r: (i - n / 2) * 2.2 };
  const steps = [0, 0.12 + i * 0.012, 0.45, 0.78];
  const x = useTransform(progress, steps, [stack.x, stack.x, s.x, t.x]);
  const y = useTransform(progress, steps, [stack.y, stack.y, s.y, t.y]);
  const rotate = useTransform(progress, steps, [stack.r, stack.r, s.r, 0]);
  const scale = useTransform(progress, steps, [t.norm * 0.9, t.norm * 0.9, t.norm * s.s, 1]);
  const labelOpacity = useTransform(progress, [0.72, 0.82], [0, 1]);
  const num = String(i + 1).padStart(2, '0');

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(i)}
      className="group absolute left-1/2 top-1/2 text-left outline-none"
      style={{ x, y, rotate, scale, width: t.w, height: t.h, marginLeft: -t.w / 2, marginTop: -t.h / 2, zIndex: i }}
      aria-label={`Open ${project.title}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-18px_rgba(30,30,70,0.55)] ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_50px_-20px_rgba(60,60,160,0.6)] group-focus-visible:ring-2 group-focus-visible:ring-lav-deep">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <Cover project={project} />
        </div>
        <motion.div
          style={{ opacity: labelOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-10 text-white md:p-4 md:pt-14"
        >
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-white/60 md:text-[10px]">{num}</p>
            <p className={`font-wide line-clamp-2 font-semibold leading-tight ${t.big ? 'text-base md:text-2xl' : 'text-xs md:text-sm'}`}>
              {project.title}
            </p>
            {t.big && !L.mobile && <p className="mt-0.5 truncate text-xs text-white/70">{project.tagline}</p>}
          </div>
          <span className="grid h-7 w-7 shrink-0 translate-y-1 place-items-center rounded-full bg-white text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <FiArrowUpRight size={14} />
          </span>
        </motion.div>
      </div>
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
        <div className="absolute inset-x-5 top-[136px] z-0 flex items-end justify-between gap-6 border-b border-black/10 pb-3 md:left-[190px] md:right-[60px] md:top-[68px]">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            ({String(projects.length).padStart(2, '0')}) Projects
            <span className="hidden sm:inline"> · AI · Web · Mobile · ML research</span>
          </p>
          <p className="hidden text-right text-xs text-muted md:block">Scroll to sort, click any project to open it.</p>
        </div>
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
