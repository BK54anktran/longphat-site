import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const font = Be_Vietnam_Pro({ variable: "--font-geist-sans", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Du Lịch Long Phát - Tour, visa và dịch vụ uy tín",
  description: "Du Lịch Long Phát chuyên tour trong nước, tour nước ngoài, visa và dịch vụ du lịch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${font.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
