import { workflowSteps } from '../data';

/** Thumbnail artwork for a project card. */
export default function Cover({ project }) {
  if (project.kind === 'workflow') {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-1.5 bg-night p-[8%]">
        <p className="font-mono text-[8px] uppercase tracking-widest text-white/40">publish workflow</p>
        <div className="grid grid-cols-4 gap-1">
          {workflowSteps.map((s, i) => (
            <div
              key={i}
              className="rounded-[4px] p-1"
              style={{ background: s.tag === 'Human' ? '#3fb67b33' : s.tag === 'AI' ? '#a9adf533' : '#ffffff12' }}
            >
              <div className="h-1 w-3/4 rounded bg-white/50" />
              <div className="mt-1 h-1 w-1/2 rounded bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.kind === 'phone') {
    return (
      <div className="flex h-full w-full items-center justify-center gap-[4%] bg-gradient-to-br from-[#0b2a18] to-night">
        {project.images.slice(0, 3).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable="false"
            className="h-[84%] w-auto rounded-[6px] object-cover shadow-lg"
            style={{ transform: `translateY(${i === 1 ? -4 : 4}%)` }}
          />
        ))}
      </div>
    );
  }

  return (
    <img
      src={project.images[0]}
      alt=""
      draggable="false"
      className={`h-full w-full ${project.kind === 'document' ? 'bg-white object-cover object-top' : 'object-cover object-top'}`}
    />
  );
}
