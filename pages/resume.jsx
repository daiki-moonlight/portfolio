import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Resume(){
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Head><title>Resume — Daiki Suzuki</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Resume</h1>
        <p className="mt-4">Download the PDF:</p>
        <a href="/Taiki_Suzuki_Resume.pdf" className="mt-4 inline-block px-4 py-2 bg-sky-600 text-white rounded">Download PDF</a>
      </main>
      <Footer />
    </div>
  )
}
