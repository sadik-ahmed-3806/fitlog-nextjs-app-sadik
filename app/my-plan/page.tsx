import Navbar from "@/Navbar";
import MyPlan from "@/components/MyPlan";

export default function MyPlanPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#0a0a0a] text-white">
      <Navbar />
      <MyPlan />
    </div>
  );
}
