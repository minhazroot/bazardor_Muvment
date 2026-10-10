import type { Metadata } from "next";
// import ToastProvider from "@/components/toast-provider";
// import { categories, snapshotProducts } from "@/data/snapshot";
// import SiteHeader from "@/components/site-header";
// import SiteFooter from "@/components/site-footer";
// import "./globals.css";
export const metadata: Metadata = {
  title: { default: "বাজার দর | আজকের বাজারদর", template: "%s | বাজার দর" },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপণ্যের আজকের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক তুলনা।",
  icons: { icon: "/logo-icon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col antialiased">
        {/* <SiteHeader categories={categories} products={snapshotProducts} /> */}
        <div className="flex-1">{children}</div>
        {/* <SiteFooter />
        <ToastProvider /> */}
      </body>
    </html>
  );
}
