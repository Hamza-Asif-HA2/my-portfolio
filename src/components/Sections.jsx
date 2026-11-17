import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { profile, services, process, stack, journey } from '../data';
import Badge from './Badge';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
};

function Label({ children, dark }) {
  return (
    <p className={`mb-6 font-mono text-[10px] uppercase tracking-widest ${dark ? 'text-white/40' : 'text-muted'}`}>{children}</p>
  );
}

export function Intro() {
  return (
    <section id="about" className="bg-paper-2 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Label>Introduction</Label>
        <motion.p {...reveal} className="font-wide max-w-5xl text-3xl font-medium leading-[1.15] md:text-5xl">
          I help businesses turn ideas into <span className="text-lav-deep">working digital systems</span>: AI backends, automation, RAG apps and
          full-stack products, built by one engineer from brief to hand-over.
        </motion.p>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-black/10 md:grid-cols-3">
          {profile.facts.map((f, i) => (
            <motion.div key={f.label} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="bg-paper-2 p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{f.label}</p>
              <p className="font-wide mt-6 text-2xl font-semibold">{f.value}</p>
              <p className="mt-1 text-sm text-muted">{f.sub}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.tags.map((t) => (
            <span key={t} className="rounded-full border border-black/10 bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-paper px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-wide extrude text-6xl font-medium leading-none md:text-8xl">Services</h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            AI backends, automation and full-stack products for startups, agencies and growing businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(60,60,140,0.35)]"
            >
              <span className="font-mono text-xs text-lav-deep">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-wide mt-8 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-28">
          <Label>How I work</Label>
          <div className="grid gap-8 md:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="border-t border-ink pt-5">
                <p className="font-wide text-4xl font-medium text-lav-deep">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-28">
          <Label>Technologies</Label>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {stack.map((g) => (
              <div key={g.group} className="grid grid-cols-1 gap-3 py-5 md:grid-cols-[220px_1fr] md:gap-8">
                <p className="font-semibold">{g.group}</p>
                <p className="text-sm leading-relaxed text-muted">
                  {g.items.map((it, i) => (
                    <span key={it}>
                      <span className="text-ink">{it}</span>
                      {i < g.items.length - 1 && <span className="mx-2 text-black/20">/</span>}{' '}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="bg-paper-2 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-wide extrude text-6xl font-medium leading-none md:text-8xl">Journey</h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Experience, education and research, from teaching computer science to shipping AI products.
          </p>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-lav-deep hover:text-ink">
            Full profile on LinkedIn <FiArrowUpRight />
          </a>
        </div>
        <ol className="border-t border-ink">
          {journey.map((j, i) => (
            <motion.li
              key={j.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.05 }}
              className="group grid grid-cols-[72px_1fr] gap-4 border-b border-black/10 py-7 md:grid-cols-[120px_1fr_1.2fr] md:gap-8"
            >
              <span className="font-mono text-sm text-muted transition group-hover:text-lav-deep">{j.when}</span>
              <div>
                <p className="font-wide text-xl font-semibold leading-tight md:text-2xl">{j.title}</p>
                <p className="mt-1 text-sm text-lav-deep">{j.org}</p>
              </div>
              <p className="col-start-2 text-sm leading-relaxed text-muted md:col-start-3">{j.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Contact() {
  const links = [
    { icon: FiMail, label: profile.email, url: `mailto:${profile.email}` },
    { icon: FiGithub, label: `github / ${profile.githubHandle}`, url: profile.github },
    { icon: FiLinkedin, label: 'linkedin / hamza-asif', url: profile.linkedin },
  ];
  return (
    <footer id="contact" className="relative overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,173,245,0.22),transparent_60%)]" />
      <div className="relative h-[300px] md:h-[340px]">
        <Badge strap={70} scale={0.72} dropIn={false} />
      </div>
      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 md:px-10">
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-white/40">Available for new projects</p>
        <motion.h2 {...reveal} className="font-wide extrude-dark mt-4 text-center text-[13vw] font-medium leading-[0.95] md:text-[9vw]">
          Let&rsquo;s build
          <br />
          something.
        </motion.h2>
        <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-white/60">
          Need an AI backend, an automation workflow or a full-stack product? Tell me what it has to achieve and I&rsquo;ll get back to you with a plan.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-lav px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Start a conversation <FiArrowUpRight className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-20 grid gap-6 border-t border-white/10 pt-8 text-sm md:grid-cols-4">
          {links.map(({ icon, label, url }) => {
            const Icon = icon;
            return (
              <a key={url} href={url} target={url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-2.5 text-white/70 hover:text-lav">
                <Icon /> <span className="truncate">{label}</span>
              </a>
            );
          })}
          <span className="flex items-center gap-2.5 text-white/70">
            <FiMapPin /> Based in {profile.location}
          </span>
        </div>
        <p className="mt-10 font-mono text-[10px] text-white/30">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
