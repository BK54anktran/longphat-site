import raw from "./data.json";
import detail from "./detail.json";
import type { Tour } from "./TourCard";

export const tours = raw.tours as Tour[];
export const news = raw.news as { img: string; title: string; href: string; w: number; h: number }[];
export const slugOf = (href: string) => href.split("/")[1];
export const tourDetails = detail.tours as Record<string, { slug: string; tabs: { program: string; schedule: string; note: string }; info: string[]; priceOld: string }>;
export const blogPosts = detail.blog as Record<string, { slug: string; title: string; content: string }>;
export const visaPages = detail.visa as { slug: string; title: string; content: string }[];
export const visaCards = detail.visaCards as { slug: string; title: string; img: string }[];
export const DOMESTIC = "TOUR TRONG NƯỚC";
export const INTERNATIONAL = "TOUR NƯỚC NGOÀI";
export const priceNum = (p: string) => parseInt(p.replace(/\D/g, ""), 10) || 0;
export const dateKey = (d: string) => d.split("/").reverse().join("");
export const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();
export const daysOf = (d: string) => parseInt(d, 10) || 0;
export const newsItem = (slug: string) => news.find((n) => slugOf(n.href) === slug);

// Tour nổi bật ở trang chủ có section riêng; mọi tour không thuộc "nước ngoài" đều là tour trong nước.
export const isInternational = (t: { section: string }) => t.section === INTERNATIONAL;
