export function CardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="পণ্য লোড হচ্ছে"
      className="grid grid-cols-1 gap-4 min-[410px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="surface min-h-52 rounded-2xl p-5">
          <div className="skeleton mb-4 h-14 w-14" />
          <div className="skeleton mb-3 h-5 w-3/4" />
          <div className="skeleton mb-7 h-3 w-1/3" />
          <div className="flex justify-between">
            <div className="skeleton h-6 w-20" />
            <div className="skeleton h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
export function PageSkeleton() {
  return (
    <main className="shell py-10">
      <div className="skeleton mb-3 h-10 w-48" />
      <div className="skeleton mb-8 h-5 w-72 max-w-full" />
      <CardsSkeleton />
    </main>
  );
}
