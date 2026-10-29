"use client";
import Image from "next/image";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { SITE } from "./site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30 bg-white shadow-[0_2px_12px_rgba(22,33,58,.06)]">
      <div className="mx-auto flex h-[68px] max-w-[1152px] items-center justify-between px-4 lg:px-0">
        <a href="#top" className="flex items-center gap-2 text-[#16213a]">
          <Image src="/sites/longphat/logo.png" alt="Du Lịch Long Phát" width={40} height={40} className="rounded-full" />
          <span className="text-[17px] font-extrabold tracking-tight">Du Lịch Long Phát</span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full bg-[#f5f7fa] px-2 py-1 lg:flex">
          {SITE.nav.map((n) => (
            <a key={n.label} href={n.href} className="rounded-full px-4 py-2 text-[14px] font-semibold text-[#16213a] transition hover:bg-[#f2751b]/10 hover:text-[#f2751b]">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${SITE.phoneRaw}`} className="hidden h-10 items-center gap-2 rounded-xl bg-[#f2751b] px-4 text-[15px] font-bold text-white transition hover:brightness-95 sm:flex">
            <Phone size={16} /> {SITE.phone}
          </a>
          <button aria-label="Menu" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f7fa] text-[#16213a] lg:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="ml-auto flex h-full w-[280px] flex-col gap-1 bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Đóng" onClick={() => setOpen(false)} className="mb-2 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f7fa]"><X size={18} /></button>
            {SITE.nav.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-[15px] font-semibold text-[#16213a] hover:bg-[#f5f7fa]">{n.label}</a>
            ))}
            <a href={`tel:${SITE.phoneRaw}`} className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#f2751b] font-bold text-white"><Phone size={16} /> {SITE.phone}</a>
          </div>
        </div>
      )}
    </header>
  );
}
