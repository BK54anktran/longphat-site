"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import { SITE } from "./site";

export default function ContactForm({ tour }: { tour?: string }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: tour ? `Tôi muốn tư vấn về: ${tour}` : "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.message}\n\nHọ tên: ${f.name}\nSĐT: ${f.phone}\nEmail: ${f.email}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Liên hệ từ website - " + f.name)}&body=${encodeURIComponent(body)}`;
  };
  const input = "w-full rounded-xl border border-[#e5e8ef] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#f2751b]";
  return (
    <form onSubmit={submit} className="space-y-3">
      <input required className={input} placeholder="Họ và tên *" value={f.name} onChange={set("name")} />
      <input required type="email" className={input} placeholder="Email *" value={f.email} onChange={set("email")} />
      <input required className={input} placeholder="Số điện thoại *" inputMode="tel" value={f.phone} onChange={set("phone")} />
      <textarea required rows={5} className={input} placeholder="Nội dung liên hệ *" value={f.message} onChange={set("message")} />
      <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f2751b] text-[15px] font-bold text-white transition hover:brightness-95"><Mail size={18} /> Gửi liên hệ</button>
      <p className="text-[12px] text-[#8a94a6]">Nút gửi sẽ mở ứng dụng email của bạn với nội dung đã điền sẵn.</p>
    </form>
  );
}
