'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useApp } from '../../providers';
export default function DetailPage() {
  const {id}=useParams<{id:string}>(); const {workouts,loading,addToPlan,save}=useApp(); const workout=workouts.find(w=>w.id===id);
  if(loading) return <main className="container loading"><div><div className="spinner"/><div>Loading workout...</div></div></main>;
  if(!workout) return notFound();
  return <main className="container detail"><div className="detail-image"><Image src={workout.image||'/banner.png'} alt={workout.name} width={650} height={700}/></div><div><span className="eyebrow">Workout details</span><h1>{workout.name}</h1><p className="detail-description">{workout.description}</p><div className="tags">{workout.category.map(x=><span className="tag" key={x}>{x}</span>)}</div><div className="specs">{[['Equipment',workout.equipment],['Difficulty',workout.difficulty],['Sets',workout.sets],['Reps',workout.reps],['Duration',`${workout.duration} min`],['Calories',`${workout.calories} kcal`],['Rating',workout.rating]].map(([k,v])=><div className="spec-row" key={String(k)}><span>{String(k).toUpperCase()}</span><strong>{v}</strong></div>)}</div><div className="instructions"><h3>INSTRUCTIONS</h3><ol>{workout.instructions.map(x=><li key={x}>{x}</li>)}</ol></div><div className="actions"><button className="button primary" onClick={()=>addToPlan(workout)}>＋ Add to today&apos;s plan</button><button className="button secondary" onClick={()=>save(workout)}>♡ Save for later</button><Link href="/my-plan" className="button secondary">View my plan</Link></div></div></main>;
}
