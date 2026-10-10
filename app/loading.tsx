import { CardsSkeleton } from "@/components/skeletons";
export default function Loading() {
  return (
    <main className="shell py-10">
      <div className="skeleton mb-12 h-60 w-full" />
      <div className="skeleton mb-6 h-8 w-64 max-w-full" />
      <CardsSkeleton count={6} />
      <div className="skeleton my-10 h-8 w-64 max-w-full" />
      <CardsSkeleton count={6} />
    </main>
  );
}
