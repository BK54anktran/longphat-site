import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import { visaCards } from "@/components/sites/longphat/data";

export const metadata: Metadata = { title: "Visa nhanh của các nước | Du Lịch Long Phát", description: "Dịch vụ làm visa nhanh: Anh, Mỹ, Việt Nam và nhiều nước khác." };

export default function Page() {
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: "Visa" }]} />
      <section className="mx-auto mt-4 max-w-[1152px] rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-6">
        <h1 className="mb-4 text-[26px] font-extrabold tracking-tight sm:text-[30px]">Visa nhanh của các nước</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visaCards.map((v) => (
            <Link key={v.slug} href={`/visa/${v.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-[#16213a]">
              <Image src={v.img} alt={v.title} fill sizes="(min-width:1024px) 370px, 90vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/5" />
              <span className="absolute bottom-4 left-4 text-[22px] font-extrabold text-white">Visa {v.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
