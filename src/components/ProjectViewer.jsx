import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { workflowSteps } from '../data';

const tagColor = {
  Human: 'bg-emerald-400/15 text-emerald-300',
  AI: 'bg-lav/15 text-lav',
  Audit: 'bg-amber-400/15 text-amber-300',
};

function Workflow() {
  return (
    <div className="grid h-full grid-cols-2 gap-3 p-4 sm:grid-cols-4 md:p-8">
      {workflowSteps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex flex-col justify-between rounded-xl border border-white/10 bg-night-3/60 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, '0')}</span>
            <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${tagColor[s.tag] || 'bg-white/10 text-white/60'}`}>
              {s.tag}
            </span>
          </div>
          <div className="mt-6">
            <p className="font-wide text-sm font-semibold text-white md:text-base">{s.title}</p>
            <p className="mt-1 text-xs text-white/50">{s.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Media({ project }) {
  const [shot, setShot] = useState(0);
  const n = project.images.length;

  if (project.kind === 'workflow') return <Frame><Workflow /></Frame>;

  if (project.kind === 'phone') {
    return (
      <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.title} screen ${i + 1}`}
            loading="lazy"
            className="h-[440px] w-auto shrink-0 snap-start rounded-[22px] border-4 border-night-3 object-cover md:h-[520px]"
          />
        ))}
      </div>
    );
  }

  const go = (d) => setShot((s) => (s + d + n) % n);
  const doc = project.kind === 'document';

  return (
    <div>
      <Frame tall={doc}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={shot}
            src={project.images[shot]}
            alt={`${project.title} screenshot ${shot + 1} of ${n}`}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`h-full w-full ${doc ? 'object-contain object-top' : 'object-contain'}`}
          />
        </AnimatePresence>
        {n > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous screenshot" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/80">
              <FiChevronLeft />
            </button>
            <button onClick={() => go(1)} aria-label="Next screenshot" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/80">
              <FiChevronRight />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/80">
              {shot + 1} / {n}
            </span>
          </>
        )}
      </Frame>
      {n > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {project.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setShot(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 transition ${i === shot ? 'ring-lav' : 'opacity-50 ring-transparent hover:opacity-90'}`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Frame({ children, tall }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-night-2 ${tall ? 'aspect-[4/5] sm:aspect-[4/3]' : 'aspect-[16/10]'}`}>
      {children}
    </div>
  );
}

export default function ProjectViewer({ projects, active, setActive }) {
  const p = projects[active];

  return (
    <section id="projects" className="relative bg-night text-white">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-5 py-20 md:px-10 lg:grid-cols-[240px_1fr] lg:gap-14 lg:py-28">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Index</p>
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:block lg:space-y-0.5 lg:px-0">
            {projects.map((proj, i) => (
              <li key={proj.id} className="shrink-0">
                <button
                  onClick={() => setActive(i)}
                  className={`flex w-full items-baseline gap-3 rounded-full border px-3 py-1.5 text-left text-sm transition lg:rounded-md lg:border-0 lg:px-2 ${
                    i === active ? 'border-lav bg-lav/10 text-lav' : 'border-white/10 text-white/45 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="whitespace-nowrap">{proj.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <AnimatePresence mode="wait">
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            className="min-w-0"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/45">{p.kicker}</p>
            <h2 className="font-wide mt-3 text-5xl font-medium leading-none md:text-7xl">{p.title}</h2>
            <p className="mt-3 text-lg md:text-xl" style={{ color: p.accent }}>
              {p.tagline}
            </p>

            <div className="mt-8">
              <Media project={p} />
            </div>

            <div className="mt-10 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">About the project</h3>
                <p className="text-sm leading-relaxed text-white/75">{p.description}</p>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">Core capabilities</h3>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: p.accent }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">Technology stack</h3>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/80">
                      {s}
                    </span>
                  ))}
                </div>
                {p.links && (
                  <div className="mt-6 flex flex-col gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm text-lav hover:text-white"
                      >
                        {l.label}
                        <FiArrowUpRight className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 flex justify-between border-t border-white/10 pt-6 text-sm">
              <button onClick={() => setActive((active - 1 + projects.length) % projects.length)} className="inline-flex items-center gap-2 text-white/50 hover:text-white">
                <FiChevronLeft /> {projects[(active - 1 + projects.length) % projects.length].title}
              </button>
              <button onClick={() => setActive((active + 1) % projects.length)} className="inline-flex items-center gap-2 text-white/50 hover:text-white">
                {projects[(active + 1) % projects.length].title} <FiChevronRight />
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
