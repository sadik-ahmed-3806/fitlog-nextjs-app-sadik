import Hero from "@/Hero";
import Navbar from "@/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
