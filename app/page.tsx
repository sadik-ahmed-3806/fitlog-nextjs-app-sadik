import Hero from "@/Hero";
import Library from "@/components/Library";
import Navbar from "@/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main>
        <Hero />
        <Library />
      </main>
    </div>
  );
}
