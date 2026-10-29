import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1152px] flex-wrap items-center gap-1 px-4 pt-5 text-[13px] text-[#5b6679] lg:px-0">
      <Link href="/" className="hover:text-[#f2751b]">Trang chủ</Link>
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1">
          <ChevronRight size={14} />
          {i.href ? <Link href={i.href} className="hover:text-[#f2751b]">{i.label}</Link> : <span className="line-clamp-1 font-semibold text-[#16213a]">{i.label}</span>}
        </span>
      ))}
    </nav>
  );
}
