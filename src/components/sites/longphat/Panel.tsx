import Link from "next/link";
import type { ReactNode } from "react";
export default function Panel({ id, title, sub, more, children }: { id?: string; title: string; sub?: string; more?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto mt-9 w-full max-w-[1152px] scroll-mt-4 rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-[24px] font-extrabold tracking-tight text-[#16213a] sm:text-[28px]">{title}</h2>
          {sub && <p className="mt-1 text-[13px] text-[#5b6679]">{sub}</p>}
        </div>
        {more && <Link href={more} className="shrink-0 text-[13px] font-semibold text-[#f2751b] hover:underline">Xem tất cả</Link>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
