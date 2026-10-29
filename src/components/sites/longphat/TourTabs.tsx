"use client";
import { useState } from "react";
import Rich from "./Rich";

const LABELS = { program: "Chương trình", schedule: "Lịch khởi hành", note: "Ghi chú" } as const;
type K = keyof typeof LABELS;

export default function TourTabs({ tabs }: { tabs: Record<K, string> }) {
  const keys = (Object.keys(LABELS) as K[]).filter((k) => tabs[k]);
  const [k, setK] = useState<K>(keys[0]);
  const [open, setOpen] = useState(false);
  const long = tabs[k].length > 6000;
  return (
    <div className="mt-6">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-[#e5e8ef]">
        {keys.map((x) => (
          <button key={x} role="tab" aria-selected={k === x} onClick={() => { setK(x); setOpen(false); }}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-[14px] font-bold transition ${k === x ? "border-[#f2751b] text-[#f2751b]" : "border-transparent text-[#5b6679] hover:text-[#16213a]"}`}>
            {LABELS[x]}
          </button>
        ))}
      </div>
      <div className="relative pt-5">
        <div className={long && !open ? "max-h-[640px] overflow-hidden" : ""}><Rich html={tabs[k]} /></div>
        {long && !open && <div className="pointer-events-none absolute inset-x-0 bottom-10 h-24 bg-gradient-to-t from-white to-transparent" />}
        {long && (
          <button onClick={() => setOpen(!open)} className="mx-auto mt-3 block rounded-full border border-[#f2751b] px-5 py-2 text-[13px] font-bold text-[#f2751b] hover:bg-[#f2751b]/10">
            {open ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </div>
  );
}
