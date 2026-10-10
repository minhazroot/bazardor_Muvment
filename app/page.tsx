import Image from "next/image";
import Link from "next/link";
// import { ArrowDown, ArrowRight, ArrowUp, CircleDot } from "lucide-react";
// import { getProducts } from "@/lib/products";
// import { ProductGrid } from "@/components/product-card";
// import SortableProducts from "@/components/sortable-products";
// import SnapshotNote from "@/components/snapshot-note";
// import { bnNumber } from "@/lib/numbers";

// export default async function HomePage() {
//   const { products, isSnapshot } = await getProducts();
//   const risers = [...products]
//     .filter((p) => p.change > 0)
//     .sort((a, b) => b.change - a.change)
//     .slice(0, 6);
//   const fallers = [...products]
//     .filter((p) => p.change < 0)
//     .sort((a, b) => a.change - b.change)
//     .slice(0, 6);
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  return (
    <main>
      <section className="border-b border-[#e5f0e6] bg-[radial-gradient(ellipse_at_90%_30%,#e9f9e8,transparent_46%),linear-gradient(120deg,#f8fcf7,#eef9ed)]">
        <div className="shell grid min-h-[330px] items-center gap-8 py-12 md:grid-cols-[1.25fr_.75fr] md:py-14">
          <div className="relative z-10">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d0ead4] bg-[#e6f5e8] px-3 py-1.5 text-[12px] font-bold text-[#26724b]">
              <CircleDot size={13} /> {date}
            </p>
            <h1 className="max-w-xl text-[34px] leading-[1.3] font-extrabold tracking-tight text-[#183e2a] sm:text-[44px] md:text-[49px]">
              আজকের বাজারের দাম <span className="text-[#249456]">এক নজরে</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#65816c]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <Link
              href="#সব-পণ্য"
              className="primary-button mt-6 text-sm sm:text-[15px]"
            >
              সব পণ্য দেখুন <ArrowRight size={17} />
            </Link>
          </div>
          <div className="relative flex justify-center md:justify-end">
            <div
              aria-hidden="true"
              className="absolute inset-5 rounded-full bg-[#d8f0d4] blur-3xl"
            />
            <Image
              src="/bazar-hero.png"
              alt="তাজা ফল ও সবজির বাজারের ঝুড়ি"
              width={315}
              height={263}
              priority
              className="relative h-auto w-[240px] object-contain drop-shadow-xl sm:w-[320px]"
            />
          </div>
        </div>
      </section>
    
    </main>
  );
}
