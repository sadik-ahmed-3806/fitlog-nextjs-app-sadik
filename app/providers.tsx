'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Workout } from './types';
import { fallbackWorkouts } from './data';

type Context = { workouts: Workout[]; plan: Workout[]; saved: Workout[]; loading: boolean; toast: string; addToPlan:(w:Workout)=>void; save:(w:Workout)=>void; removeFromPlan:(id:string)=>void; markDone:(id:string)=>void; showToast:(m:string)=>void; };
const AppContext = createContext<Context | null>(null);
const key = (name:string) => `fitlog-${name}`;
export function AppProvider({ children }:{children:React.ReactNode}) {
  const [workouts,setWorkouts] = useState<Workout[]>([]); const [loading,setLoading] = useState(true);
  const [plan,setPlan] = useState<Workout[]>([]); const [saved,setSaved] = useState<Workout[]>([]); const [toast,setToast] = useState('');
  useEffect(()=>{ const load=async()=>{ try { const r=await fetch('https://api.abcz.workers.dev/api/fitlog'); if(!r.ok) throw new Error('API unavailable'); const data=await r.json(); const list=Array.isArray(data)?data:(data.data||data.workouts); if(Array.isArray(list)&&list.length) setWorkouts(list.map((item):Workout=>({...item, id:String(item.id), category:item.category||item.muscleGroups||[], calories:item.calories??item.caloriesBurned??0}))); else setWorkouts(fallbackWorkouts); } catch { setWorkouts(fallbackWorkouts); } finally { setLoading(false); } }; load(); try { setPlan(JSON.parse(localStorage.getItem(key('plan'))||'[]')); setSaved(JSON.parse(localStorage.getItem(key('saved'))||'[]')); } catch { /* browser storage may be unavailable */ } },[]);
  useEffect(()=>{ if(!loading) localStorage.setItem(key('plan'),JSON.stringify(plan)); },[plan,loading]);
  useEffect(()=>{ if(!loading) localStorage.setItem(key('saved'),JSON.stringify(saved)); },[saved,loading]);
  const showToast=(m:string)=>{setToast(m); window.setTimeout(()=>setToast(''),2600);};
  const addToPlan=(w:Workout)=>{ if(plan.some(x=>x.id===w.id)){showToast('Already in today’s plan');return;} if(plan.length>=5){showToast('Today’s plan is full');return;} setPlan(x=>[...x,w]);showToast('Added to today’s plan'); };
  const save=(w:Workout)=>{ if(saved.some(x=>x.id===w.id)){showToast('Already saved for later');return;} setSaved(x=>[...x,w]);showToast('Saved for later'); };
  const removeFromPlan=(id:string)=>{setPlan(x=>x.filter(w=>w.id!==id));showToast('Removed from today’s plan');};
  const markDone=(id:string)=>{setPlan(x=>x.filter(w=>w.id!==id));showToast('Workout marked as done');};
  const value=useMemo(()=>({workouts,plan,saved,loading,toast,addToPlan,save,removeFromPlan,markDone,showToast}),[workouts,plan,saved,loading,toast]);
  return <AppContext.Provider value={value}>{children}{toast&&<div className="toast">{toast}</div>}</AppContext.Provider>;
}
export const useApp=()=>{const c=useContext(AppContext);if(!c)throw new Error('useApp must be used inside AppProvider');return c;};
