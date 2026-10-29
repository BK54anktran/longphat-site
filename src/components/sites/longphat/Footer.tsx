import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "./site";

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#16213a] text-white/80">
      <div className="mx-auto grid max-w-[1152px] gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1.4fr] lg:px-0">
        <div>
          <div className="flex items-center gap-2 text-white"><Image src="/sites/longphat/logo.png" alt="" width={36} height={36} className="rounded-full" /><span className="font-extrabold">Du Lịch Long Phát</span></div>
          <p className="mt-3 text-[13px] leading-6">Chuyên cung cấp dịch vụ nhập cảnh cho chuyên gia nước ngoài, gia hạn visa, thẻ tạm trú, giấy phép lao động, bằng lái xe Việt Nam, bằng lái xe quốc tế, giấy phép đầu tư...</p>
        </div>
        <div>
          <p className="font-bold text-white">Liên kết</p>
          <ul className="mt-3 space-y-2 text-[13px]">{SITE.nav.map((n) => <li key={n.label}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>)}</ul>
        </div>
        <div>
          <p className="font-bold text-white">Liên hệ</p>
          <ul className="mt-3 space-y-2 text-[13px]">
            <li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0" />{SITE.address}</li>
            <li className="flex gap-2"><Phone size={15} className="mt-0.5" /><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
            <li className="flex gap-2"><Mail size={15} className="mt-0.5" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-2"><Clock size={15} className="mt-0.5" />{SITE.hours}</li>
            <li>MST: {SITE.mst}</li>
            <li className="flex gap-4 pt-1">
              <a className="font-semibold text-[#f2751b]" target="_blank" rel="noopener" href={SITE.zalo}>Zalo</a>
              <a className="font-semibold text-[#f2751b]" target="_blank" rel="noopener" href={SITE.facebook}>Facebook</a>
              <Link className="font-semibold text-[#f2751b]" href="/lien-he">Bản đồ</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-[12px] text-white/50">© Bản quyền thuộc về {SITE.company}</p>
    </footer>
  );
}
