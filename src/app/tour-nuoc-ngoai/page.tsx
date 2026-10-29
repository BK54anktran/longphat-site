import type { Metadata } from "next";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import ToursBrowser from "@/components/sites/longphat/ToursBrowser";
import { tours, isInternational } from "@/components/sites/longphat/data";

export const metadata: Metadata = { title: "Tour nước ngoài | Du Lịch Long Phát", description: "Tour nước ngoài khởi hành từ TP.HCM: Nhật Bản, Hàn Quốc, Bali, Singapore, Malaysia, Indonesia..." };

export default function Page() {
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: "Tour nước ngoài" }]} />
      <section className="mx-auto mt-4 max-w-[1152px] rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-6">
        <h1 className="mb-4 text-[26px] font-extrabold tracking-tight sm:text-[30px]">Tour nước ngoài</h1>
        <ToursBrowser tours={tours.filter(isInternational)} />
      </section>
    </SiteShell>
  );
}
