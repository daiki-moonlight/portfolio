import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LS_KEY = 'todo.tasks.v1'

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8)
}

export default function TodoPage(){
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const inputRef = useRef(null)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(LS_KEY)
      setTasks(raw ? JSON.parse(raw) : [])
    }catch(e){ setTasks([]) }
  },[])

  useEffect(()=>{
    try{ localStorage.setItem(LS_KEY, JSON.stringify(tasks)) }catch(e){}
  },[tasks])

  function addTask(text){
    if (!text) return
    const t = { id: uid(), text, completed:false, createdAt: new Date().toISOString() }
    setTasks(prev => [t, ...prev])
  }

  function toggle(id){ setTasks(prev => prev.map(t=> t.id===id?{...t,completed:!t.completed}:t)) }
  function remove(id){ setTasks(prev => prev.filter(t=>t.id!==id)) }
  function clearCompleted(){ setTasks(prev=>prev.filter(t=>!t.completed)) }
  function updateText(id, text){ setTasks(prev=>prev.map(t=>t.id===id?{...t,text}:t)) }

  function exportJSON(){
    const data = JSON.stringify(tasks, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='todo-tasks.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
  }

  async function importFile(e){
    const f = e.target.files && e.target.files[0]
    if (!f) return
    try{
      const txt = await f.text(); const parsed = JSON.parse(txt)
      if (Array.isArray(parsed)){
        const mapped = parsed.map(p=>({ id: uid(), text: String(p.text||p), completed: !!p.completed, createdAt: p.createdAt||new Date().toISOString() }))
        setTasks(prev=>mapped.concat(prev))
      } else { alert('Invalid file (expected array)') }
    }catch(err){ alert('Import failed: '+err.message) }
    e.target.value=''
  }

  const filtered = tasks.filter(t => filter==='all' ? true : filter==='active' ? !t.completed : t.completed)

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Head><title>To‑Do — Daiki Moonlight</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold">To‑Do</h1>
        <p className="text-slate-600 mt-1">Simple tasks saved locally in your browser (localStorage)</p>

        <div className="mt-4">
          <form onSubmit={(e)=>{ e.preventDefault(); addTask(inputRef.current.value.trim()); inputRef.current.value=''; }} className="flex gap-2">
            <input ref={inputRef} className="flex-1 border p-2 rounded" placeholder="Add a new task..." />
            <button className="px-4 py-2 bg-sky-600 text-white rounded">Add</button>
          </form>

          <div className="mt-3 flex gap-2">
            <button onClick={()=>setFilter('all')} className={`px-3 py-1 rounded ${filter==='all'?'bg-sky-100':''}`}>All</button>
            <button onClick={()=>setFilter('active')} className={`px-3 py-1 rounded ${filter==='active'?'bg-sky-100':''}`}>Active</button>
            <button onClick={()=>setFilter('completed')} className={`px-3 py-1 rounded ${filter==='completed'?'bg-sky-100':''}`}>Completed</button>
            <button onClick={clearCompleted} className="ml-auto px-3 py-1 border rounded">Clear completed</button>
          </div>

          <ul className="mt-4 space-y-2">
            {filtered.length===0 && <li className="text-slate-500">No tasks</li>}
            {filtered.map(t => (
              <li key={t.id} className="p-3 bg-white rounded flex items-center gap-3">
                <button onClick={()=>toggle(t.id)} className={`w-6 h-6 rounded ${t.completed? 'bg-green-200':''}`}>{t.completed? '✓' : ''}</button>
                <EditableText text={t.text} onSave={(v)=>updateText(t.id, v)} completed={t.completed} />
                <div className="ml-auto flex gap-2">
                  <button onClick={()=>remove(t.id)} className="text-red-500">Delete</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-3 items-center text-slate-600">
            <div>{tasks.filter(t=>!t.completed).length} items left</div>
            <button onClick={exportJSON} className="px-3 py-1 border rounded">Export</button>
            <label className="px-3 py-1 border rounded cursor-pointer">Import
              <input type="file" accept="application/json" onChange={importFile} className="hidden" />
            </label>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function EditableText({ text, onSave, completed }){
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(text)
  const ref = useRef(null)

  useEffect(()=> setValue(text),[text])
  useEffect(()=> { if (editing) ref.current?.focus() },[editing])

  return editing ? (
    <input ref={ref} className="flex-1 border p-1 rounded" value={value} onChange={e=>setValue(e.target.value)} onBlur={()=>{ setEditing(false); onSave(value.trim()||text) }} onKeyDown={(e)=>{ if(e.key==='Enter'){ setEditing(false); onSave(value.trim()||text) } if(e.key==='Escape'){ setEditing(false); setValue(text) } }} />
  ) : (
    <div onDoubleClick={()=>setEditing(true)} tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') setEditing(true)}} className={`flex-1 ${completed? 'line-through text-slate-500':''}`}>{text}</div>
  )
}
