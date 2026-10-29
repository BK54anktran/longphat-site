import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import { news, slugOf } from "@/components/sites/longphat/data";

export const metadata: Metadata = { title: "Tin tức | Du Lịch Long Phát", description: "Cẩm nang du lịch, kinh nghiệm đặt tour, thủ tục visa và những điểm check-in từ Du Lịch Long Phát." };

export default function Page() {
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: "Tin tức" }]} />
      <section className="mx-auto mt-4 max-w-[1152px] rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-6">
        <h1 className="mb-4 text-[26px] font-extrabold tracking-tight sm:text-[30px]">Danh mục tin tức</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((n) => (
            <Link key={n.href} href={`/blog/${slugOf(n.href)}`} className="group overflow-hidden rounded-xl border border-[#e5e8ef] bg-white transition hover:shadow-[0_10px_24px_rgba(22,33,58,.12)]">
              <div className="relative aspect-[4/3] bg-[#e5e8ef]"><Image src={`/sites/longphat/${n.img}`} alt={n.title} fill sizes="(min-width:1024px) 270px, 90vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="p-3"><h2 className="line-clamp-3 text-[14px] font-bold leading-5">{n.title}</h2><p className="mt-2 text-[13px] font-semibold text-[#f2751b]">Xem chi tiết →</p></div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
