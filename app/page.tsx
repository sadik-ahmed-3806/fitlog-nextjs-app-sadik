import Hero from "@/Hero";
import Library from "@/components/Library";
import Navbar from "@/Navbar";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Library />
      </main>
    </div>
  );
}
