import { motion } from 'framer-motion';
import Badge from './Badge';
import useViewport from '../useViewport';
import { profile } from '../data';

export default function Hero() {
  const { w, h } = useViewport();
  const mobile = w < 768;
  // keep the badge clear of the giant name on short screens
  const strap = mobile ? Math.max(200, h * 0.27) : Math.max(120, Math.min(250, h * 0.24));
  const scale = mobile ? 0.82 : h < 760 ? 0.85 : 1;

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      {/* soft light */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] items-start justify-between gap-6 px-5 pt-24 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-wide text-2xl font-semibold leading-[1.05] md:text-4xl"
        >
          Meet the engineer
          <br />
          <span className="text-lav-deep">behind the work.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="hidden max-w-xs text-sm leading-relaxed text-muted md:block"
        >
          AI &amp; full-stack engineer in Lahore. I build AI backends, n8n automation, RAG applications and web &amp; mobile apps for startups, agencies and growing businesses.
        </motion.p>
      </div>

      {/* on phones the lanyard hangs right of the headline instead of through it */}
      <Badge strap={strap} scale={scale} anchor={mobile ? '70%' : '50%'} />

      <div className="relative z-10 mt-auto">
        <div className="mx-auto flex max-w-[1500px] items-end justify-between px-5 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted md:px-10 md:text-xs">
          <span>{profile.role}</span>
          <span className="hidden sm:inline">Drag or tap the badge</span>
          <span>{profile.location}</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-wide extrude select-none whitespace-nowrap pb-[3vw] text-center text-[14.5vw] font-medium leading-[0.9]"
        >
          {profile.name}
        </motion.h1>
      </div>
    </section>
  );
}
