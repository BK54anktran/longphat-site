import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import ContactForm from "@/components/sites/longphat/ContactForm";
import { SITE } from "@/components/sites/longphat/site";

export const metadata: Metadata = { title: "Liên hệ | Du Lịch Long Phát", description: "Liên hệ Du Lịch Long Phát để được tư vấn tour, visa và dịch vụ du lịch." };

export default async function Page({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const { tour } = await searchParams;
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: "Liên hệ" }]} />
      <section className="mx-auto mt-4 max-w-[1152px] rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-8">
        <h1 className="mb-6 text-[26px] font-extrabold tracking-tight sm:text-[30px]">Liên hệ với chúng tôi</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <ContactForm tour={tour} />
          <div>
            <h2 className="text-[18px] font-extrabold">Thông tin liên hệ</h2>
            <ul className="mt-3 space-y-3 text-[14px]">
              <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-[#f2751b]" />{SITE.address}</li>
              <li className="flex gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-[#f2751b]" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-[#f2751b]" /><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
            </ul>
            <iframe title="Bản đồ Du Lịch Long Phát" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-5 h-[300px] w-full rounded-xl border-0" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
