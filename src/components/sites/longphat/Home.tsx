"use client";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Search, Phone, Mail, Clock, FileText, Plane, BadgeCheck } from "lucide-react";
import data from "./data.json";
import Header from "./Header";
import Hero from "./Hero";
import Panel from "./Panel";
import TourCard, { type Tour } from "./TourCard";
import { SITE } from "./site";

const tours = data.tours as Tour[];
const days = (d: string) => parseInt(d, 10) || 0;
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();
const STATS = [["8", "năm hoạt động"], ["27.000", "khách hàng tin tưởng"], ["500", "nhân viên"], ["40", "đối tác"]];
const SERVICES = [
  { icon: Plane, title: "Tour quốc tế & trong nước", text: "Tour trọn gói khởi hành từ TP.HCM, có bay khứ hồi, khách sạn và lịch khởi hành rõ ràng." },
  { icon: FileText, title: "Visa & hộ chiếu", text: "Gia hạn visa, thẻ tạm trú, giấy phép lao động, bằng lái xe quốc tế, giấy phép đầu tư." },
  { icon: BadgeCheck, title: "Nhập cảnh cho chuyên gia nước ngoài", text: "Hỗ trợ thủ tục nhập cảnh cho chuyên gia nước ngoài và bằng lái xe Việt Nam." },
];

const Grid = ({ list }: { list: Tour[] }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{list.map((t) => <TourCard key={t.href} t={t} />)}</div>
);

export default function Home() {
  const [q, setQ] = useState("");
  const [maxDays, setMaxDays] = useState(0);
  const [applied, setApplied] = useState({ q: "", maxDays: 0 });
  const ok = (t: Tour) => (!applied.q || norm(t.title).includes(norm(applied.q))) && (!applied.maxDays || days(t.duration) <= applied.maxDays);
  const hot = tours.filter((t) => t.hot && ok(t));
  const dom = tours.filter((t) => t.section === "TOUR TRONG NƯỚC" && ok(t));
  const intl = tours.filter((t) => t.section === "TOUR NƯỚC NGOÀI" && ok(t));
  const none = !hot.length && !dom.length && !intl.length;
  return (
    <div id="top" className="min-h-screen bg-[#f5f7fa] pb-0 text-[#16213a]">
      <Header />
      <Hero />
      <div className="relative z-10 mx-auto mt-5 max-w-[1152px] px-4 lg:px-0">
        <form onSubmit={(e) => { e.preventDefault(); setApplied({ q, maxDays }); }} className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(22,33,58,.12)] sm:p-5">
          <div className="mb-3 flex gap-2">
            <span className="rounded-full bg-[#f2751b]/10 px-4 py-1.5 text-[13px] font-bold text-[#f2751b]">Tour</span>
            <a href="#dich-vu" className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-[#5b6679] hover:bg-[#f5f7fa]">Visa</a>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_220px_auto]">
            <label className="flex items-center gap-3 rounded-xl border border-[#e5e8ef] px-3 py-2">
              <MapPin size={18} className="text-[#f2751b]" />
              <span className="flex-1"><span className="block text-[10px] font-bold uppercase tracking-wide text-[#8a94a6]">Điểm đến hoặc tên tour</span>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Đà Nẵng, Hàn Quốc..." className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:font-normal" /></span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-[#e5e8ef] px-3 py-2">
              <Clock size={18} className="text-[#f2751b]" />
              <span className="flex-1"><span className="block text-[10px] font-bold uppercase tracking-wide text-[#8a94a6]">Số ngày tối đa</span>
                <select value={maxDays} onChange={(e) => setMaxDays(+e.target.value)} className="w-full bg-transparent text-[15px] font-semibold outline-none">
                  <option value={0}>Không giới hạn</option>{[2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} ngày</option>)}
                </select></span>
            </label>
            <button className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#f2751b] px-6 text-[15px] font-bold text-white transition hover:brightness-95"><Search size={18} /> Tìm tour</button>
          </div>
        </form>
      </div>

      {none && <p className="mx-auto mt-9 max-w-[1152px] rounded-2xl bg-white p-8 text-center text-[#5b6679]">Không có tour phù hợp. Hãy thử từ khoá hoặc số ngày khác.</p>}
      {!!hot.length && <Panel id="tour-noi-bat" title="Dịch vụ nổi bật" sub={`${hot.length} tour được quan tâm nhiều · giá cho một khách`}><Grid list={hot} /></Panel>}
      {!!dom.length && <Panel id="tour-trong-nuoc" title="Tour trong nước" sub={`${dom.length} tour đang mở bán`}><Grid list={dom} /></Panel>}
      {!!intl.length && <Panel id="tour-nuoc-ngoai" title="Tour nước ngoài" sub={`${intl.length} tour đang mở bán`}><Grid list={intl} /></Panel>}

      <section className="mx-auto mt-12 max-w-[1152px] px-4 lg:px-0">
        <h2 className="text-[24px] font-extrabold tracking-tight sm:text-[28px]">Vì sao chọn Du Lịch Long Phát?</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(([n, l]) => (
            <div key={l} className="rounded-xl border border-[#e5e8ef] bg-white p-5">
              <p className="text-[32px] font-extrabold text-[#f2751b]">{n}</p><p className="text-[13px] text-[#5b6679]">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="dich-vu" className="mx-auto mt-12 max-w-[1152px] scroll-mt-4 px-4 lg:px-0">
        <div className="rounded-2xl bg-[#16213a] p-5 text-white sm:p-8">
          <h2 className="text-[22px] font-extrabold tracking-tight sm:text-[26px]">Ngoài tour, Long Phát còn hỗ trợ gì?</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {SERVICES.map(({ icon: I, title, text }) => (
              <div key={title} className="rounded-xl bg-white/[.07] p-4">
                <I size={22} className="text-[#f2751b]" /><p className="mt-2 text-[15px] font-bold">{title}</p><p className="mt-1 text-[13px] leading-5 text-white/70">{text}</p>
              </div>
            ))}
          </div>
          <a href={`tel:${SITE.phoneRaw}`} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#f2751b] px-5 font-bold">Gọi tư vấn {SITE.phone}</a>
        </div>
      </section>

      <Panel id="tin-tuc" title="Tin tức">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.news.map((n) => (
            <a key={n.href} href={SITE.origin + n.href} target="_blank" rel="noopener" className="group overflow-hidden rounded-xl border border-[#e5e8ef] bg-white transition hover:shadow-[0_10px_24px_rgba(22,33,58,.12)]">
              <div className="relative aspect-[4/3] bg-[#e5e8ef]"><Image src={`/sites/longphat/${n.img}`} alt={n.title} fill sizes="(min-width:1024px) 270px, 90vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="p-3"><h3 className="line-clamp-3 text-[14px] font-bold leading-5">{n.title}</h3><p className="mt-2 text-[13px] font-semibold text-[#f2751b]">Xem chi tiết →</p></div>
            </a>
          ))}
        </div>
      </Panel>

      <footer id="lien-he" className="mt-12 scroll-mt-4 bg-[#16213a] text-white/80">
        <div className="mx-auto grid max-w-[1152px] gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1.4fr] lg:px-0">
          <div>
            <div className="flex items-center gap-2 text-white"><Image src="/sites/longphat/logo.png" alt="" width={36} height={36} className="rounded-full" /><span className="font-extrabold">Du Lịch Long Phát</span></div>
            <p className="mt-3 text-[13px] leading-6">Chuyên cung cấp dịch vụ nhập cảnh cho chuyên gia nước ngoài, gia hạn visa, thẻ tạm trú, giấy phép lao động, bằng lái xe Việt Nam, bằng lái xe quốc tế, giấy phép đầu tư...</p>
          </div>
          <div>
            <p className="font-bold text-white">Liên kết</p>
            <ul className="mt-3 space-y-2 text-[13px]">{SITE.nav.map((n) => <li key={n.label}><a href={n.href} className="hover:text-white">{n.label}</a></li>)}</ul>
          </div>
          <div>
            <p className="font-bold text-white">Liên hệ</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              <li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0" />{SITE.address}</li>
              <li className="flex gap-2"><Phone size={15} className="mt-0.5" /><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
              <li className="flex gap-2"><Mail size={15} className="mt-0.5" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li className="flex gap-2"><Clock size={15} className="mt-0.5" />{SITE.hours}</li>
              <li>MST: {SITE.mst}</li>
              <li><a className="font-semibold text-[#f2751b]" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}>Xem bản đồ</a></li>
            </ul>
          </div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-[12px] text-white/50">© Bản quyền thuộc về {SITE.company}</p>
      </footer>
    </div>
  );
}
