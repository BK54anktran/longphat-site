import Image from "next/image";
import { CalendarDays, Clock, Hotel, MapPin, Plane } from "lucide-react";
import { SITE } from "./site";

export type Tour = { section: string; title: string; img: string; hot: boolean; duration: string; date: string; transport: string; hotel: string; from_: string; price: string; href: string };

export default function TourCard({ t }: { t: Tour }) {
  return (
    <a href={SITE.origin + t.href} target="_blank" rel="noopener" className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e8ef] bg-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(22,33,58,.12)]">
      <div className="relative aspect-[800/328] overflow-hidden bg-[#e5e8ef]">
        <Image src={`/sites/longphat/${t.img}`} alt={t.title} fill sizes="(min-width:1024px) 270px, (min-width:640px) 45vw, 90vw" className="object-cover transition duration-500 group-hover:scale-105" />
        {t.hot && <span className="absolute right-2 top-2 rounded-full bg-[#f2751b] px-2 py-1 text-[11px] font-bold text-white">HOT</span>}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-3 min-h-[60px] text-[14px] font-bold uppercase leading-5 text-[#16213a]">{t.title}</h3>
        <div className="mt-2 space-y-1 text-[12px] text-[#5b6679]">
          <p className="flex items-center gap-1.5"><Clock size={13} /> {t.duration} · <Hotel size={13} /> {t.hotel}</p>
          <p className="flex items-center gap-1.5"><Plane size={13} /> {t.transport}</p>
          <p className="flex items-center gap-1.5"><MapPin size={13} /> <span className="line-clamp-1">Từ {t.from_}</span></p>
          <p className="flex items-center gap-1.5"><CalendarDays size={13} /> Khởi hành {t.date}</p>
        </div>
        <p className="mt-auto pt-3 text-[18px] font-extrabold text-[#f2751b]">{t.price} <span className="text-[14px]">đ</span></p>
      </div>
    </a>
  );
}
