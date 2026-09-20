import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/components/ProgressProvider";
import { Navbar } from "@/components/Navbar";
import { WebMcpTools } from "@/components/WebMcpTools";

export const metadata: Metadata = {
  title: "Happy English | Learn & Play",
  description: "A joyful English learning adventure for children ages 3–8.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><ProgressProvider><WebMcpTools/><Navbar />{children}</ProgressProvider></body>
    </html>
  );
}
