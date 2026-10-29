import type { Metadata } from "next";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import ToursBrowser from "@/components/sites/longphat/ToursBrowser";
import { tours, isInternational } from "@/components/sites/longphat/data";

export const metadata: Metadata = { title: "Tour trong nước | Du Lịch Long Phát", description: "Tour trong nước khởi hành từ TP.HCM: Miền Bắc, Miền Trung, Miền Tây, Ninh Chữ, Phan Thiết, Quy Nhơn..." };

export default function Page() {
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: "Tour trong nước" }]} />
      <section className="mx-auto mt-4 max-w-[1152px] rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-6">
        <h1 className="mb-4 text-[26px] font-extrabold tracking-tight sm:text-[30px]">Tour trong nước</h1>
        <ToursBrowser tours={tours.filter((t) => !isInternational(t))} />
      </section>
    </SiteShell>
  );
}
