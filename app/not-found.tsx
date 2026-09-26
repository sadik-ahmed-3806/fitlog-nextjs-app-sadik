import Link from 'next/link';
export default function NotFound(){return <main className="not-found"><div><span className="eyebrow">404 / Lost rep</span><h1>Page not found.</h1><p>The route you tried doesn&apos;t exist in this gym.</p><Link href="/" className="button primary">Back to workouts</Link></div></main>;}
