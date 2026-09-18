import Link from "next/link";

export type Crumb = { name: string; url: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.url} className="flex items-center gap-1.5">
              {last ? (
                <span className="font-medium text-navy-800" aria-current="page">{c.name}</span>
              ) : (
                <Link href={c.url} className="hover:text-navy-700 hover:underline">{c.name}</Link>
              )}
              {!last && <span aria-hidden="true" className="text-slate-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
