import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import Rich from "@/components/sites/longphat/Rich";
import { SITE } from "@/components/sites/longphat/site";
import { visaPages, visaCards } from "@/components/sites/longphat/data";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return visaPages.map((v) => ({ slug: v.slug })); }
const find = (slug: string) => visaPages.find((v) => v.slug === slug);
const label = (slug: string) => visaCards.find((c) => c.slug === slug)?.title ?? find(slug)?.title ?? slug;

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const slug = (await params).slug;
  return find(slug) ? { title: `Visa ${label(slug)} | Du Lịch Long Phát` } : {};
}

export default async function Page({ params }: P) {
  const slug = (await params).slug, v = find(slug);
  if (!v) notFound();
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: "Visa", href: "/visa" }, { label: `Visa ${label(slug)}` }]} />
      <article className="mx-auto mt-4 max-w-[860px] rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-8">
        <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[32px]">Visa {label(slug)}</h1>
        <Rich html={v.content} className="mt-5" />
        <div className="mt-8 flex flex-wrap gap-3 border-t border-[#e5e8ef] pt-6">
          <a href={`tel:${SITE.phoneRaw}`} className="flex h-11 items-center gap-2 rounded-xl bg-[#f2751b] px-5 font-bold text-white"><Phone size={17} /> Gọi tư vấn {SITE.phone}</a>
          <Link href="/lien-he" className="flex h-11 items-center rounded-xl border border-[#f2751b] px-5 font-bold text-[#f2751b]">Gửi liên hệ</Link>
        </div>
      </article>
    </SiteShell>
  );
}
