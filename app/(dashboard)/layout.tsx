import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GlassPane className="w-full h-full flex items-center justify-center">
      <Sidebar />
      {children}
    </GlassPane>
  );
}
