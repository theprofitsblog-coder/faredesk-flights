import type { Faq } from "@/lib/content";

/**
 * Native <details> accordion: content is in the HTML for crawlers and works
 * without JavaScript, so no hydration cost on thousands of pages.
 */
export default function FaqSection({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((f, i) => (
        <details key={f.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-navy-900 transition hover:bg-slate-50">
            {f.q}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-45"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-[15px] leading-7 text-slate-600">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
