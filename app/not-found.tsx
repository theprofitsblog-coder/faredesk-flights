import Link from "next/link";
import CallCta from "@/components/CallCta";
import RouteSearch from "@/components/RouteSearch";
import { CITIES, citySlug } from "@/lib/cities";
import { SITE_URL } from "@/lib/config";

export const metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/404` },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">404</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">We could not find that route</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        The page you were looking for does not exist. It may have been a mistyped city or airport
        code — try the search below, or call an agent and they will find the route for you.
      </p>

      <div className="mt-8">
        <RouteSearch />
      </div>

      <div className="mt-8">
        <CallCta source="404" />
      </div>

      <div className="mt-10">
        <p className="mb-3 font-semibold text-navy-900">Or start from a departure city:</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CITIES.slice(0, 18).map((c) => (
            <Link
              key={c.code}
              href={`/flights/${citySlug(c)}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
            >
              {c.city} <span className="text-slate-400">({c.code})</span>
            </Link>
          ))}
        </div>
        <p className="mt-4">
          <Link href="/flights" className="font-semibold text-navy-700 underline">
            All {CITIES.length} airports &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
