// import Image from "next/image";
// import Link from "next/link";
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
//   const date = new Intl.DateTimeFormat("bn-BD", {
//     dateStyle: "full",
//     timeZone: "Asia/Dhaka",
//   }).format(new Date());
//   return (
//     <main>
//       <section className="border-b border-[#e5f0e6] bg-[radial-gradient(ellipse_at_90%_30%,#e9f9e8,transparent_46%),linear-gradient(120deg,#f8fcf7,#eef9ed)]">
//         <div className="shell grid min-h-[330px] items-center gap-8 py-12 md:grid-cols-[1.25fr_.75fr] md:py-14">
//           <div className="relative z-10">
//             <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d0ead4] bg-[#e6f5e8] px-3 py-1.5 text-[12px] font-bold text-[#26724b]">
//               <CircleDot size={13} /> {date}
//             </p>
//             <h1 className="max-w-xl text-[34px] leading-[1.3] font-extrabold tracking-tight text-[#183e2a] sm:text-[44px] md:text-[49px]">
//               আজকের বাজারের দাম <span className="text-[#249456]">এক নজরে</span>
//             </h1>
//             <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#65816c]">
//               চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
//               বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
//             </p>
//             <Link
//               href="#সব-পণ্য"
//               className="primary-button mt-6 text-sm sm:text-[15px]"
//             >
//               সব পণ্য দেখুন <ArrowRight size={17} />
//             </Link>
//           </div>
//           <div className="relative flex justify-center md:justify-end">
//             <div
//               aria-hidden="true"
//               className="absolute inset-5 rounded-full bg-[#d8f0d4] blur-3xl"
//             />
//             <Image
//               src="/bazar-hero.png"
//               alt="তাজা ফল ও সবজির বাজারের ঝুড়ি"
//               width={315}
//               height={263}
//               priority
//               className="relative h-auto w-[240px] object-contain drop-shadow-xl sm:w-[320px]"
//             />
//           </div>
//         </div>
//       </section>
//         <div className="shell pb-24">
//         {isSnapshot && <SnapshotNote />}
//         <section className="pt-13 sm:pt-16" aria-labelledby="rising-prices">
//           <div className="mb-5 flex items-center gap-3">
//             <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8f7ec] text-[#1a9256]">
//               <ArrowUp size={22} />
//             </span>
//             <div>
//               <h2
//                 id="rising-prices"
//                 className="text-2xl font-extrabold text-[#214633]"
//               >
//                 আজ দাম বেড়েছে <span className="text-[#a3000e]">▲</span>
//               </h2>
//               <p className="mt-1 text-[13px] text-[#869786]">
//                 আজকের সর্বোচ্চ মূল্যবৃদ্ধির {bnNumber(risers.length)}টি পণ্য
//               </p>
//             </div>
//           </div>
//           {risers.length ? (
//             <ProductGrid products={risers} />
//           ) : (
//             <p className="rounded-xl bg-white p-8 text-[#73917a]">
//               এই মুহূর্তে দাম বেড়েছে এমন কোনো পণ্য নেই।
//             </p>
//           )}
//         </section>
//         <section className="pt-13 sm:pt-16" aria-labelledby="falling-prices">
//           <div className="mb-5 flex items-center gap-3">
//             <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0ef] text-[#de5557]">
//               <ArrowDown size={22} />
//             </span>
//             <div>
//               <h2
//                 id="falling-prices"
//                 className="text-2xl font-extrabold text-[#214633]"
//               >
//                 আজ দাম কমেছে <span className="text-[#024f05]">▼</span>
//               </h2>
//               <p className="mt-1 text-[13px] text-[#869786]">
//                 আজকের সর্বোচ্চ মূল্যহ্রাসের {bnNumber(fallers.length)}টি পণ্য
//               </p>
//             </div>
//           </div>
//           {fallers.length ? (
//             <ProductGrid products={fallers} />
//           ) : (
//             <p className="rounded-xl bg-white p-8 text-[#73917a]">
//               এই মুহূর্তে দাম কমেছে এমন কোনো পণ্য নেই।
//             </p>
//           )}
//         </section>
//         <section
//           id="সব-পণ্য"
//           className="pt-13 sm:pt-16"
//           aria-labelledby="all-products"
//         >
//           <div className="mb-5">
//             <h2
//               id="all-products"
//               className="text-[27px] font-extrabold text-[#214633]"
//             >
//               সব পণ্য
//             </h2>
//             <p className="mt-2 text-[14px] text-[#819282]">
//               আপনার প্রয়োজনীয় সব নিত্যপণ্যের দাম ও দামের পরিবর্তন জানুন এক
//               নজরে।
//             </p>
//           </div>
//           <SortableProducts products={products} />
//         </section>
//       </div>


    
//     </main>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-card";
import SortableProducts from "@/components/sortable-products";
import SnapshotNote from "@/components/snapshot-note";
import { bnNumber } from "@/lib/numbers";

export default async function HomePage() {
  const { products, isSnapshot } = await getProducts();

  const risers = [...products]
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

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
              আজকের বাজারের দাম{" "}
              <span className="text-[#249456]">এক নজরে</span>
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

      <div className="shell pb-24">
        {isSnapshot && <SnapshotNote />}

        {/* Rising Prices */}
        <section
          className="pt-13 sm:pt-16"
          aria-labelledby="rising-prices"
        >
          <div className="mb-5 flex items-center gap-3">
            {/* Red Up Icon */}
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#fff0ef] text-[#d92832]"
              aria-hidden="true"
            >
              <span className="text-[24px] font-bold leading-none">▲</span>
            </span>

            <div>
              <h2
                id="rising-prices"
                className="text-2xl font-extrabold text-[#214633]"
              >
                আজ দাম বেড়েছে
              </h2>

              <p className="mt-1 text-[13px] text-[#869786]">
                আজকের সর্বোচ্চ মূল্যবৃদ্ধির {bnNumber(risers.length)}টি পণ্য
              </p>
            </div>
          </div>

          {risers.length ? (
            <ProductGrid products={risers} />
          ) : (
            <p className="rounded-xl bg-white p-8 text-[#73917a]">
              এই মুহূর্তে দাম বেড়েছে এমন কোনো পণ্য নেই।
            </p>
          )}
        </section>

        {/* Falling Prices */}
        <section
          className="pt-13 sm:pt-16"
          aria-labelledby="falling-prices"
        >
          <div className="mb-5 flex items-center gap-3">
            {/* Green Down Icon */}
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8f7ec] text-[#1a9256]"
              aria-hidden="true"
            >
              <span className="text-[24px] font-bold leading-none">▼</span>
            </span>

            <div>
              <h2
                id="falling-prices"
                className="text-2xl font-extrabold text-[#214633]"
              >
                আজ দাম কমেছে
              </h2>

              <p className="mt-1 text-[13px] text-[#869786]">
                আজকের সর্বোচ্চ মূল্যহ্রাসের {bnNumber(fallers.length)}টি পণ্য
              </p>
            </div>
          </div>

          {fallers.length ? (
            <ProductGrid products={fallers} />
          ) : (
            <p className="rounded-xl bg-white p-8 text-[#73917a]">
              এই মুহূর্তে দাম কমেছে এমন কোনো পণ্য নেই।
            </p>
          )}
        </section>

        {/* All Products */}
        <section
          id="সব-পণ্য"
          className="pt-13 sm:pt-16"
          aria-labelledby="all-products"
        >
          <div className="mb-5">
            <h2
              id="all-products"
              className="text-[27px] font-extrabold text-[#214633]"
            >
              সব পণ্য
            </h2>

            <p className="mt-2 text-[14px] text-[#819282]">
              আপনার প্রয়োজনীয় সব নিত্যপণ্যের দাম ও দামের পরিবর্তন জানুন এক
              নজরে।
            </p>
          </div>

          <SortableProducts products={products} />
        </section>
      </div>
    </main>
  );
}