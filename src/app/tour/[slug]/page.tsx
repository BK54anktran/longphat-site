import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Hotel, MapPin, MessageCircle, Phone, Plane } from "lucide-react";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import TourTabs from "@/components/sites/longphat/TourTabs";
import TourCard from "@/components/sites/longphat/TourCard";
import { SITE } from "@/components/sites/longphat/site";
import { tours, tourDetails, slugOf, isInternational } from "@/components/sites/longphat/data";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return tours.map((t) => ({ slug: slugOf(t.href) })); }
const find = (slug: string) => tours.find((t) => slugOf(t.href) === slug);

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const t = find((await params).slug);
  return t ? { title: `${t.title} | Long Phát`, description: `${t.title} - ${t.duration}, khởi hành từ ${t.from_}, giá từ ${t.price}đ.`, openGraph: { images: [`/sites/longphat/${t.img}`] } } : {};
}

export default async function Page({ params }: P) {
  const slug = (await params).slug;
  const t = find(slug);
  const d = tourDetails[slug];
  if (!t || !d) notFound();
  const listHref = isInternational(t) ? "/tour-nuoc-ngoai" : "/tour-trong-nuoc";
  const related = tours.filter((x) => isInternational(x) === isInternational(t) && x.href !== t.href).slice(0, 4);
  const rows = [
    [Clock, "Thời gian", t.duration], [CalendarDays, "Ngày khởi hành", t.date], [Plane, "Phương tiện", t.transport],
    [Hotel, "Lưu trú", t.hotel], [MapPin, "Điểm khởi hành", t.from_],
  ] as const;
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: isInternational(t) ? "Tour nước ngoài" : "Tour trong nước", href: listHref }, { label: t.title }]} />
      <div className="mx-auto mt-4 max-w-[1152px] px-4 lg:px-0">
        <h1 className="text-[22px] font-extrabold uppercase leading-snug tracking-tight sm:text-[28px]">{t.title}</h1>
        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-6">
            <div className="relative aspect-[800/328] overflow-hidden rounded-xl bg-[#e5e8ef]">
              <Image src={`/sites/longphat/${t.img}`} alt={t.title} fill priority sizes="(min-width:1024px) 760px, 100vw" className="object-cover" />
            </div>
            <TourTabs tabs={d.tabs} />
          </div>
          <aside className="order-first space-y-4 lg:sticky lg:top-4 lg:order-none">
            <div className="rounded-2xl bg-white p-5 shadow-[0_6px_18px_rgba(22,33,58,.06)]">
              <ul className="space-y-3 text-[14px]">
                {rows.map(([I, k, v]) => (
                  <li key={k} className="flex items-start gap-3"><I size={17} className="mt-0.5 shrink-0 text-[#f2751b]" /><span><span className="text-[#5b6679]">{k}: </span><b>{v}</b></span></li>
                ))}
              </ul>
              <div className="mt-5 border-t border-[#e5e8ef] pt-4">
                <p className="text-[12px] text-[#5b6679]">Giá từ (một khách người lớn)</p>
                <p className="text-[30px] font-extrabold text-[#f2751b]">{t.price}<span className="text-[18px]">đ</span></p>
              </div>
              <div className="mt-4 grid gap-2">
                <a href={`tel:${SITE.phoneRaw}`} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#f2751b] font-bold text-white hover:brightness-95"><Phone size={17} /> Gọi {SITE.phone}</a>
                <Link href={`/lien-he?tour=${encodeURIComponent(t.title)}`} className="flex h-11 items-center justify-center rounded-xl border border-[#f2751b] font-bold text-[#f2751b] hover:bg-[#f2751b]/10">Liên hệ ngay</Link>
                <a href={SITE.zalo} target="_blank" rel="noopener" className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0068ff] font-bold text-white hover:brightness-95"><MessageCircle size={17} /> Chat Zalo</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <section className="mx-auto mt-9 max-w-[1152px] px-4 lg:px-0">
        <h2 className="text-[22px] font-extrabold tracking-tight">Tour tương tự</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.map((x) => <TourCard key={x.href} t={x} />)}</div>
      </section>
    </SiteShell>
  );
}
