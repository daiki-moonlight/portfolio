import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import projects from '../data/projects.json'
import Link from 'next/link'

export default function Projects(){
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Head><title>Projects — Daiki Moonlight</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="mt-6 grid gap-4">
          {projects.map(p => (
            <article key={p.slug} className="p-4 bg-white rounded shadow-sm">
              <h3 className="text-lg font-medium"><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3>
              <p className="text-slate-600 mt-1">{p.short}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
