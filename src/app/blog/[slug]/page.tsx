import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/sites/longphat/SiteShell";
import Breadcrumb from "@/components/sites/longphat/Breadcrumb";
import Rich from "@/components/sites/longphat/Rich";
import { blogPosts, news, newsItem, slugOf } from "@/components/sites/longphat/data";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(blogPosts).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const slug = (await params).slug, p = blogPosts[slug], img = newsItem(slug)?.img;
  return p ? { title: `${p.title} | Long Phát`, openGraph: img ? { images: [`/sites/longphat/${img}`] } : undefined } : {};
}

export default async function Page({ params }: P) {
  const slug = (await params).slug, p = blogPosts[slug], img = newsItem(slug);
  if (!p) notFound();
  const others = news.filter((n) => slugOf(n.href) !== slug).slice(0, 4);
  return (
    <SiteShell>
      <Breadcrumb items={[{ label: "Tin tức", href: "/blog" }, { label: p.title }]} />
      <article className="mx-auto mt-4 max-w-[860px] rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(22,33,58,.06)] sm:p-8">
        <h1 className="text-[24px] font-extrabold leading-snug tracking-tight sm:text-[30px]">{p.title}</h1>
        {img && <Image src={`/sites/longphat/${img.img}`} alt={p.title} width={img.w} height={img.h} priority sizes="(min-width:860px) 780px, 100vw" className="mt-5 h-auto w-full rounded-xl bg-[#e5e8ef]" />}
        <Rich html={p.content} className="mt-6" />
      </article>
      <section className="mx-auto mt-9 max-w-[1152px] px-4 lg:px-0">
        <h2 className="text-[22px] font-extrabold tracking-tight">Bài viết khác</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((n) => (
            <Link key={n.href} href={`/blog/${slugOf(n.href)}`} className="group overflow-hidden rounded-xl border border-[#e5e8ef] bg-white transition hover:shadow-[0_10px_24px_rgba(22,33,58,.12)]">
              <div className="relative aspect-[4/3] bg-[#e5e8ef]"><Image src={`/sites/longphat/${n.img}`} alt={n.title} fill sizes="(min-width:1024px) 270px, 90vw" className="object-cover" /></div>
              <h3 className="line-clamp-3 p-3 text-[14px] font-bold leading-5">{n.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
