import Link from 'next/link'

export default function ProjectCard({ project }){
  return (
    <article className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-medium"><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p className="text-slate-600 mt-1">{project.short}</p>
      <div className="mt-3 flex gap-3">
        <a href={project.demo || '#'} target="_blank" rel="noreferrer" className="text-sky-600">Live</a>
        <a href={project.repo || '#'} target="_blank" rel="noreferrer" className="text-slate-600">Repo</a>
      </div>
    </article>
  )
}
