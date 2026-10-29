import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "./site";

export default function FloatingContact() {
  const cls = "flex h-11 w-11 items-center sm:h-12 sm:w-12 justify-center rounded-full text-white shadow-lg transition hover:scale-105";
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3">
      <a href={SITE.zalo} target="_blank" rel="noopener" aria-label="Chat Zalo" className={`${cls} bg-[#0068ff]`}><MessageCircle size={22} /></a>
      <a href={`tel:${SITE.phoneRaw}`} aria-label="Gọi hotline" className={`${cls} bg-[#f2751b]`}><Phone size={22} /></a>
    </div>
  );
}
