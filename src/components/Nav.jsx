import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { profile } from '../data';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'journey', label: 'Journey' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10">
          <a href="#top" className="font-wide text-sm font-semibold">
            {profile.name}
            <span className="ml-2 hidden font-mono text-[10px] font-normal opacity-60 sm:inline">/ {profile.role}</span>
          </a>
          <div className="hidden items-center gap-7 text-xs md:flex">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="opacity-70 transition hover:opacity-100">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="rounded-full border border-white px-4 py-1.5 transition hover:bg-white hover:text-black">
              Let&rsquo;s talk
            </a>
          </div>
          <button className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <FiMenu size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-night p-5 text-white"
          >
            <button className="self-end" aria-label="Close menu" onClick={() => setOpen(false)}>
              <FiX size={22} />
            </button>
            <div className="mt-16 flex flex-col gap-4">
              {[...links, { id: 'contact', label: 'Contact' }].map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-wide text-5xl font-medium text-lav"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
