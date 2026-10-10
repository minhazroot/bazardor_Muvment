
import Link from "next/link";
import type { Product } from "@/lib/types";
import { bnNumber } from "@/lib/numbers";
export function ChangeBadge({ change }: { change: number }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-md px-2 py-1 text-[12px] font-bold ${change > 0 ? "badge-up" : change < 0 ? "badge-down" : "badge-flat"}`}
    >
      {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
      {bnNumber(Math.abs(change), 1)}%
    </span>
  );
}


export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      className="product-card group"
    >
      <div className="flex items-center gap-3">
        <span className="emoji-box shrink-0" aria-hidden="true">
          {product.emoji}
        </span>


        <div className="min-w-0">
          <h3 className="text-[16px] font-bold text-[#243d2c]">
            {product.name}
          </h3>
          <p className="text-[12px] text-[#8c9a8c]">
            প্রতি {product.unit}
          </p>
        </div>
      </div>


      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div>
          <p className="text-[11px] text-[#839586]">
            আজকের দাম
          </p>
          <p className="text-[19px] font-bold text-[#243d2c]">
            {bnNumber(product.price)}
            <span className="ml-1 text-[13px] font-normal">
              টাকা
            </span>
          </p>
        </div>


        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}


export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[410px]:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
