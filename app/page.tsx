'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import WorkoutCard from './components/WorkoutCard';
import { useApp } from './providers';
export default function Home() {
  const {workouts,loading}=useApp(); const [sort,setSort]=useState('duration');
  const sorted=useMemo(()=>[...workouts].sort((a,b)=>(a[sort as 'duration'|'calories'|'rating'] as number)-(b[sort as 'duration'|'calories'|'rating'] as number)),[workouts,sort]);
  return <main><section className="container hero"><div><span className="eyebrow">Workout library</span><h1>Train with intent.<br/>Log every set.</h1><p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p><a className="button primary" href="#library">Browse workouts <span>↘</span></a></div><div className="hero-art"><Image src="/banner.png" alt="Athlete training" width={600} height={500} priority/></div></section>
  <section className="container section" id="library"><div className="section-head"><div><h2>The library</h2><p>Twelve lifts covering every major muscle group.</p></div><label className="sort">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select></label></div>{loading?<div className="loading"><div><div className="spinner"/><div>Loading workouts...</div></div></div>:<div className="grid">{sorted.map(w=><WorkoutCard key={w.id} workout={w}/>)}</div>}</section></main>;
}
