import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#e2ede6] bg-white">
      <div className="shell flex flex-col justify-between gap-2 py-7 text-[13px] text-[#829287] sm:flex-row sm:items-center">
        <Link href="/" className="font-semibold text-[#277448]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </Link>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
