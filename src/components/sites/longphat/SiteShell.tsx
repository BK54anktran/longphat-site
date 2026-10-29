import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContact from "./FloatingContact";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className="min-h-screen bg-[#f5f7fa] text-[#16213a]">
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </div>
  );
}
