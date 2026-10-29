"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const BANNERS = [
  { src: "/sites/longphat/1790418802-sa-1.webp", alt: "Du Lịch Long Phát - Tour quốc tế, tour trong nước, visa và hộ chiếu" },
  { src: "/sites/longphat/1790421858-hn-quc-ma-ng-ang-lm.webp", alt: "Tour Hàn Quốc mùa đông" },
  { src: "/sites/longphat/1790517998-visa.webp", alt: "Dịch vụ visa" },
];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative mx-auto aspect-[1600/424] w-full max-w-[1440px] overflow-hidden bg-[#16213a] min-[1152px]:rounded-b-2xl">
      {BANNERS.map((b, k) => (
        <Image key={b.src} src={b.src} alt={b.alt} fill priority={k === 0} sizes="100vw" className={`object-cover transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {BANNERS.map((b, k) => (
          <button key={b.src} aria-label={`Banner ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-white" : "w-2 bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
