import { Info } from "lucide-react";
export default function SnapshotNote() {
  return (
    <div className="my-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <Info size={18} className="mt-0.5 shrink-0" />
      <p>
        লাইভ API এখন পাওয়া যাচ্ছে না। এখানে <strong>৯ অক্টোবর ২০২৬</strong>-এর
        রেফারেন্স ডেটা দেখানো হচ্ছে; এগুলো বর্তমান বাজারদর নয়।
      </p>
    </div>
  );
}
