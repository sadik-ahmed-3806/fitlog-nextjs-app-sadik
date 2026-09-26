import Link from 'next/link';
import Image from 'next/image';
import { Workout } from '../types';
export default function WorkoutCard({workout}:{workout:Workout}) {
  return <Link href={`/workouts/${workout.id}`} className="card"><div className="card-media"><Image src={workout.image||'/banner.png'} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, 33vw"/></div><div className="card-body"><div className="tags">{workout.category.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div><h3 className="card-title">{workout.name}</h3><div className="equipment">{workout.equipment}</div><div className="stats"><span className="stat"><b>◷</b>{workout.duration} min</span><span className="stat"><b>◉</b>{workout.calories} kcal</span><span className="stat"><b>★</b>{workout.rating}</span></div></div></Link>;
}
