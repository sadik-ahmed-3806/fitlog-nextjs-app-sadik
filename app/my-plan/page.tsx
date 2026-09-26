'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import { useApp } from '../providers';
export default function MyPlan() {
  const {plan,saved,removeFromPlan,markDone}=useApp(); const [tab,setTab]=useState<'plan'|'saved'>('plan'); const list=tab==='plan'?plan:saved;
  const minutes=plan.reduce((n,w)=>n+w.duration,0), calories=plan.reduce((n,w)=>n+w.calories,0);
  return <main className="container"><section className="page-hero"><span className="eyebrow">Your training log</span><h1>My plan</h1><p>Cap of five lifts for today. Finish them, then load more.</p></section><div className="metrics"><div className="metric"><strong>{plan.length}</strong><span>Exercises</span></div><div className="metric"><strong>{minutes}</strong><span>Minutes</span></div><div className="metric"><strong>{calories}</strong><span>Calories</span></div></div><div className="tabs"><button className={`tab ${tab==='plan'?'active':''}`} onClick={()=>setTab('plan')}>Today&apos;s plan ({plan.length})</button><button className={`tab ${tab==='saved'?'active':''}`} onClick={()=>setTab('saved')}>Saved ({saved.length})</button></div>{list.length===0?<div className="empty"><h2>Nothing here yet</h2><p>Browse the library and add a lift to get today moving.</p><Link href="/" className="button primary">Go to workouts</Link></div>:<div className="plan-list">{list.map(w=><div className="plan-card" key={w.id}><Image src={w.image||'/banner.png'} alt="" width={120} height={90}/><div><h3>{w.name}</h3><div className="equipment">{w.equipment}</div><div className="stats"><span className="stat"><b>◷</b>{w.duration} min</span><span className="stat"><b>◉</b>{w.calories} kcal</span><span className="stat"><b>★</b>{w.rating}</span></div></div><div className="plan-actions"><Link className="button secondary" href={`/workouts/${w.id}`}>View details</Link>{tab==='plan'&&<><button className="button primary" onClick={()=>markDone(w.id)}>✓ Done</button><button className="icon-button" aria-label="Remove" onClick={()=>removeFromPlan(w.id)}>×</button></>}</div></div>)}</div>}</main>;
}
