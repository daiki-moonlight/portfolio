import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import projects from '../data/projects.json'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Daiki Moonlight — Full Stack & AI Engineer</title>
        <meta name="description" content="Full Stack & AI Engineer — building reliable AI systems, LLM integrations, and production-grade services." />
      </Head>
      <div className="min-h-screen bg-gray-50 text-slate-900">
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <section className="py-8">
            <h1 className="text-4xl font-bold">Daiki Suzuki — Full Stack & AI Engineer</h1>
            <p className="mt-4 text-lg text-slate-700">決して諦めない。命の果てまで、心を捧げて進み続ける。 それが、私が存在している理由だ。</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/resume" className="px-4 py-2 bg-sky-600 text-white rounded">Download Resume</a>
              <a href="#projects" className="px-4 py-2 border rounded">View work</a>
            </div>
          </section>

          <section id="projects" className="py-8">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <p className="text-slate-600 mt-2">Selected projects that showcase AI systems, full-stack architectures, and production deployments.</p>
            <div className="mt-6 grid gap-4">
              {projects.slice(0,3).map(p => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="mt-6">
              <a href="/projects" className="text-sky-600">See all projects →</a>
            </div>
          </section>

          <section id="skills" className="py-8">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {['AI/ML','LLMs','React','Next.js','Node.js','Python','C/C#','Postgres','Docker','Kubernetes'].map(s => (
                <span key={s} className="px-3 py-1 bg-white border rounded shadow-sm text-sm">{s}</span>
              ))}
            </div>
          </section>

          <section id="projects-list" className="py-8">
            <h2 className="text-2xl font-semibold">Other Projects</h2>
            <ul className="mt-4 list-disc list-inside text-slate-700">
              {projects.map(p => (
                <li key={p.slug}><a className="text-sky-600" href={`/projects/${p.slug}`}>{p.title}</a> — {p.short}</li>
              ))}
            </ul>
          </section>

          <section className="py-8">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-2 text-slate-700">Email: <a className="text-sky-600" href="mailto:daikisuzuki.moonlight@gmail.com">daikisuzuki.moonlight@gmail.com</a></p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
