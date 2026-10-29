import type { ReactNode } from "react";
export default function Panel({ id, title, sub, children }: { id?: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto mt-9 w-full max-w-[1152px] scroll-mt-4 rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-6">
      <h2 className="text-[24px] font-extrabold tracking-tight text-[#16213a] sm:text-[28px]">{title}</h2>
      {sub && <p className="mt-1 text-[13px] text-[#5b6679]">{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
