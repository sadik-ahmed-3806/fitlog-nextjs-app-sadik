'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '../providers';
export default function Header() {
  const path=usePathname(); const {plan,saved}=useApp();
  return <header className="site-header"><div className="container nav">
    <Link href="/" className="brand"><Image src="/logo.png" alt="" width={30} height={30}/><span>FITLOG</span></Link>
    <nav className="nav-links"><Link className={path==='/'?'active':''} href="/">Workout</Link><Link className={path==='/my-plan'?'active':''} href="/my-plan">My Plan</Link></nav>
    <div className="badges"><Link href="/my-plan" className="badge"><span>Plan</span><strong>{plan.length}</strong></Link><Link href="/my-plan" className="badge saved"><span>Saved</span><strong>{saved.length}</strong></Link></div>
  </div></header>;
}
