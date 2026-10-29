"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import TourCard, { type Tour } from "./TourCard";
import { daysOf, dateKey, norm, priceNum } from "./data";

const SORTS = [
  { v: "date", label: "Khởi hành gần nhất" },
  { v: "priceAsc", label: "Giá thấp đến cao" },
  { v: "priceDesc", label: "Giá cao đến thấp" },
];

export default function ToursBrowser({ tours }: { tours: Tour[] }) {
  const [q, setQ] = useState("");
  const [maxDays, setMaxDays] = useState(0);
  const [sort, setSort] = useState("date");
  const list = useMemo(() => {
    const r = tours.filter((t) => (!q || norm(t.title).includes(norm(q))) && (!maxDays || daysOf(t.duration) <= maxDays));
    const key: Record<string, (a: Tour, b: Tour) => number> = {
      date: (a, b) => dateKey(a.date).localeCompare(dateKey(b.date)),
      priceAsc: (a, b) => priceNum(a.price) - priceNum(b.price),
      priceDesc: (a, b) => priceNum(b.price) - priceNum(a.price),
    };
    return [...r].sort(key[sort]);
  }, [tours, q, maxDays, sort]);
  const field = "rounded-xl border border-[#e5e8ef] bg-white px-3 py-2.5 text-[14px] font-semibold outline-none focus:border-[#f2751b]";
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1fr_180px_210px]">
        <label className="flex items-center gap-2 rounded-xl border border-[#e5e8ef] bg-white px-3 focus-within:border-[#f2751b]">
          <Search size={17} className="text-[#f2751b]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm điểm đến hoặc tên tour" aria-label="Tìm tour" className="w-full bg-transparent py-2.5 text-[14px] outline-none" />
        </label>
        <select value={maxDays} onChange={(e) => setMaxDays(+e.target.value)} aria-label="Số ngày tối đa" className={field}>
          <option value={0}>Số ngày: tất cả</option>
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>Tối đa {n} ngày</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sắp xếp" className={field}>
          {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
        </select>
      </div>
      <p className="mt-4 text-[13px] text-[#5b6679]">{list.length} tour</p>
      {list.length ? (
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{list.map((t) => <TourCard key={t.href} t={t} />)}</div>
      ) : (
        <p className="mt-6 rounded-xl bg-[#f5f7fa] p-8 text-center text-[#5b6679]">Không có tour phù hợp. Hãy thử từ khoá hoặc số ngày khác.</p>
      )}
    </>
  );
}
