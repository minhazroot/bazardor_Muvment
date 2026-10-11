"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Category, Product } from "@/lib/types";
import { bnNumber } from "@/lib/numbers";

function BanglaDate() {
  return (
    <span suppressHydrationWarning>
      {new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
      }).format(new Date())}
    </span>
  );
}
function PriceTicker({ products }: { products: Product[] }) {
  const shown = products.filter((p) => p.change !== 0).slice(0, 28);
  const render = (suffix: string) =>
    shown.map((p, i) => (
      <span
        key={`${suffix}-${p.slug}-${i}`}
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12px] sm:text-[13px]"
      >
        <span>{p.emoji}</span>
        <span className="font-semibold">{p.name}</span>
        <span className="text-emerald-100">
          {bnNumber(p.price)} টাকা/{p.unit}
        </span>
        <span className={p.change > 0 ? "text-yellow-200" : "text-orange-200"}>
          {p.change > 0 ? "▲" : "▼"} {bnNumber(Math.abs(p.change), 1)}%
        </span>
      </span>
    ));
  return (
    <div
      aria-label="পণ্যের দামের চলমান তালিকা"
      className="overflow-hidden border-t border-emerald-900/10 bg-[#176d46] py-2.5 text-white"
    >
      <div className="ticker-track">
        {render("one")}
        {render("two")}
      </div>
    </div>
  );
}
export default function SiteHeader({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const pathname = usePathname(),
    router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [tickerProducts, setTickerProducts] = useState(products);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/prices", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.products) && data.products.length)
          setTickerProducts(data.products);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  async function logout() {
    const { error } = await authClient.signOut();
    if (error) return toast.error(error.message || "সাইন আউট করা যায়নি");
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }
  return (
    <header className="relative z-40 border-b border-[#e5eee8] bg-white">
      <div className="shell flex min-h-[72px] items-center justify-between gap-3 py-2">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7ed]">
            <span className="text-[25px]">🛒</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[23px] leading-tight font-extrabold tracking-tight text-[#176d46]">
              বাজার দর
            </span>
            <span className="max-w-[210px] truncate text-[11px] text-[#829187] sm:max-w-none">
              <BanglaDate />
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? (
            <div aria-label="সেশন লোড হচ্ছে" className="skeleton h-10 w-28" />
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                className="secondary-button !px-3 !py-2.5 text-sm"
              >
                <UserRound size={16} />
                <span className="hidden sm:inline">আমার প্রোফাইল</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="primary-button !px-3 !py-2.5 text-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">সাইন আউট</span>
              </button>
            </>
          ) : (
            <>
              <Link
                className="secondary-button !px-3 sm:!px-5 !py-2.5 text-sm"
                href="/signin"
              >
                সাইন ইন
              </Link>
              <Link
                className="primary-button !px-3 sm:!px-5 !py-2.5 text-sm"
                href="/signup"
              >
                সাইন আপ
              </Link>
            </>
          )}
          <button
            className="btn btn-ghost btn-square !h-10 !min-h-10 border border-[#d8e6db] text-[#176d46] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav
        className="hidden border-t border-[#f0f4f0] md:block"
        aria-label="পণ্যের ক্যাটাগরি"
      >
        <div className="shell flex items-center gap-1 py-2">
          <Link
            href="/"
            className={`rounded-lg px-3.5 py-2 text-[14px] font-semibold ${pathname === "/" ? "bg-[#e8f7ec] text-[#14683e]" : "text-[#526d59] hover:bg-[#f1f7f2]"}`}
          >
            সব পণ্য
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors ${pathname === `/category/${c.slug}` ? "bg-[#e8f7ec] text-[#14683e]" : "text-[#526d59] hover:bg-[#f1f7f2]"}`}
            >
              {c.emoji} {c.name}
            </Link>
          ))}
        </div>
      </nav>
      {open && (
        <nav
          className="shell grid grid-cols-3 gap-2 border-t border-[#f0f4f0] py-3 md:hidden"
          aria-label="মোবাইল ক্যাটাগরি মেনু"
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-[#f1f7f2] px-2 py-2 text-center text-sm"
          >
            সব পণ্য
          </Link>
          {categories.map((c) => (
            <Link
              href={`/category/${c.slug}`}
              key={c.slug}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-2 py-2 text-center text-sm ${pathname === `/category/${c.slug}` ? "bg-[#d9f5df] text-[#155f3a]" : "bg-[#f4f8f4]"}`}
            >
              {c.emoji} {c.name}
            </Link>
          ))}
        </nav>
      )}
      <PriceTicker products={tickerProducts} />
    </header>
  );
}
