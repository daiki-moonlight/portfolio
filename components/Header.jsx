import Link from 'next/link'

export default function Header(){
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="font-semibold">Daiki Moonlight</Link>
        <nav className="flex gap-4 items-center">
          <Link href="/projects">Projects</Link>
          <Link href="/todo">To‑Do</Link>
          <Link href="/resume">Resume</Link>
          <a href="https://www.linkedin.com/in/aikit0846" target="_blank" rel="noreferrer" className="text-slate-600">LinkedIn</a>
          <a href="https://github.com/daiki-moonlight" target="_blank" rel="noreferrer" className="text-slate-600">GitHub</a>
        </nav>
      </div>
    </header>
  )
}
