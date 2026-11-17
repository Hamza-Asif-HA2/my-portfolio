import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiRefreshCw } from 'react-icons/fi';
import { profile } from '../data';

// Deterministic "barcode" stripes for the back of the card (decorative only).
const bars = Array.from({ length: 34 }, (_, i) => ((i * 37) % 7) + 1);

/**
 * An ID badge hanging from a lanyard. Drag it and it swings back;
 * click it to flip the card over.
 */
export default function Badge({ strap = 230, scale = 1, dropIn = true, anchor = '50%' }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(dropIn && !reduce ? -strap - 360 : 0);
  const rotate = useTransform([x, y], ([a, b]) => (-Math.atan2(a, strap + b) * 180) / Math.PI);
  const path = useTransform([x, y], ([a, b]) => `M 0 -60 L ${a} ${strap + b}`);
  const [flipped, setFlipped] = useState(false);
  const moved = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const ctrls = [];
    if (dropIn) {
      ctrls.push(animate(y, 0, { type: 'spring', stiffness: 90, damping: 9, delay: 0.25 }));
    }
    ctrls.push(animate(x, [0, -70, 46, -22, 10, 0], { duration: 3.2, ease: 'easeOut', delay: dropIn ? 0.5 : 0 }));
    return () => ctrls.forEach((c) => c.stop());
  }, [reduce, dropIn, x, y]);

  const release = () => {
    animate(x, 0, { type: 'spring', stiffness: 110, damping: 5.5 });
    animate(y, 0, { type: 'spring', stiffness: 220, damping: 10 });
  };

  const W = 228;
  const H = 318;

  return (
    <div className="pointer-events-none absolute top-0 z-20" style={{ left: anchor, transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1" aria-hidden="true">
        <motion.path d={path} stroke="#191922" strokeWidth="18" fill="none" />
        <motion.path d={path} stroke="#a9adf5" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="10 7" fill="none" />
      </svg>

      <motion.div
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Flip badge to the front' : 'Flip badge to see contact details'}
        drag
        dragMomentum={false}
        dragElastic={0.35}
        onPointerDown={() => (moved.current = false)}
        onDragStart={() => (moved.current = true)}
        onDragEnd={release}
        onClick={() => !moved.current && setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setFlipped((f) => !f))}
        className="pointer-events-auto absolute cursor-grab touch-none select-none outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-lav-deep rounded-2xl"
        style={{ x, y, rotate, top: strap, left: -W / 2, width: W, height: H, transformOrigin: '50% 0%', perspective: 1000 }}
      >
        {/* metal clip */}
        <div className="absolute -top-7 left-1/2 h-9 w-6 -translate-x-1/2 rounded-md border-[3px] border-zinc-400 bg-gradient-to-b from-zinc-200 to-zinc-500 shadow" />

        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          {/* front */}
          <div className="backface-hidden absolute inset-0 flex flex-col rounded-2xl bg-white p-3 text-ink shadow-[0_30px_60px_-20px_rgba(40,40,90,0.45),0_2px_0_rgba(255,255,255,0.9)_inset] ring-1 ring-black/5">
            <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-paper" />
            <img
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              draggable="false"
              className="h-[178px] w-full rounded-xl object-cover object-top"
            />
            <div className="mt-3 flex-1 px-1">
              <p className="font-wide text-[17px] font-semibold leading-tight">{profile.name}</p>
              <p className="text-[11px] text-muted">{profile.role}</p>
            </div>
            <div className="flex items-end justify-between px-1">
              <p className="font-mono text-[9px] leading-tight text-muted">
                ID 0726 · LHR
                <br />
                AI / FULL-STACK
              </p>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white">
                <FiArrowUpRight size={14} />
              </span>
            </div>
          </div>

          {/* back */}
          <div
            className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-2xl bg-night p-5 text-white shadow-[0_30px_60px_-20px_rgba(40,40,90,0.55)]"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div>
              <p className="font-mono text-[10px] tracking-widest text-lav">AVAILABLE FOR PROJECTS</p>
              <p className="font-wide mt-3 text-xl font-semibold leading-tight">{profile.name}</p>
              <p className="mt-1 text-xs text-white/60">{profile.role}</p>
            </div>
            <ul className="space-y-1.5 font-mono text-[10px] text-white/80">
              <li>{profile.email}</li>
              <li>github / {profile.githubHandle}</li>
              <li>{profile.location}</li>
            </ul>
            <div>
              <div className="flex h-9 items-stretch gap-[2px]" aria-hidden="true">
                {bars.map((w, i) => (
                  <span key={i} className="bg-white/85" style={{ width: w, opacity: i % 5 === 0 ? 0.35 : 1 }} />
                ))}
              </div>
              <p className="mt-2 flex items-center gap-1 font-mono text-[9px] text-white/40">
                <FiRefreshCw size={9} /> tap to flip back
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
