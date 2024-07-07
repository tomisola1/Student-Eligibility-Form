import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";

const inter = Lato({ subsets: ["latin"],  weight: "400"});

export const metadata: Metadata = {
  title: "Student Eligibility Report"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="acid">
      <head><link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico"/></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
