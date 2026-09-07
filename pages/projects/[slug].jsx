import fs from 'fs'
import path from 'path'
import projects from '../../data/projects.json'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ProjectPage({ project }){
  if (!project) return <div className="min-h-screen"><Header /><main className="max-w-4xl mx-auto p-6">Project not found</main><Footer/></div>
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Head>
        <title>{project.title} — Daiki Moonlight</title>
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="mt-2 text-slate-700">{project.short}</p>
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Role & Contributions</h2>
          <p className="text-slate-600 mt-2">Designed and implemented the core system, led integration, and productionized the service.</p>
        </section>
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Tech</h2>
          <div className="mt-2 flex gap-2 flex-wrap">
            {project.tech.map(t => <span key={t} className="px-2 py-1 bg-white border rounded text-sm">{t}</span>)}
          </div>
        </section>
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Outcome</h2>
          <p className="text-slate-700 mt-2">{project.outcome}</p>
        </section>
        <div className="mt-6 flex gap-3">
          <a className="text-sky-600" href={project.demo || '#'}>Live demo</a>
          <a className="text-slate-600" href={project.repo || '#'}>Source</a>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticPaths(){
  const paths = projects.map(p => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }){
  const project = projects.find(p => p.slug === params.slug) || null
  return { props: { project } }
}
