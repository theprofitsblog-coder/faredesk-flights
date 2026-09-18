import Link from "next/link";
import { AIRLINES } from "@/lib/airlines";
import { CITIES, citySlug } from "@/lib/cities";
import { AFFILIATE_DISCLOSURE, PHONE_DISPLAY, PHONE_HREF, SITE_NAME } from "@/lib/config";
import { PhoneIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-navy-800 bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10 rounded-2xl bg-navy-900 p-6 sm:p-8">
          <p className="text-xl font-bold text-white sm:text-2xl">
            Ready to book? Talk to an agent now.
          </p>
          <p className="mt-1 text-navy-300">
            Lines are open 24/7 from anywhere in the US or Canada. There is no charge to call.
          </p>
          <a
            href={PHONE_HREF}
            data-call-source="footer"
            className="cta-primary mt-5 w-full sm:w-auto"
          >
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{SITE_NAME}</p>
            <p className="text-sm leading-6 text-navy-300">
              An independent flight booking service connecting travellers in the United States and
              Canada with real travel agents, around the clock.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white">How it works</Link></li>
              <li><Link href="/faq" className="hover:text-white">Frequently asked questions</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of service</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Airlines we book</p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {AIRLINES.map((a) => (
                <li key={a.slug}>
                  <Link href={`/airlines/${a.slug}`} className="hover:text-white">
                    {a.name.replace(" Airlines", "").replace("Royal Dutch ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Popular departures</p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {CITIES.slice(0, 16).map((c) => (
                <li key={c.code}>
                  <Link href={`/flights/${citySlug(c)}`} className="hover:text-white">
                    {c.city}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/flights" className="font-semibold text-accent-400 hover:text-accent-300">
                  All {CITIES.length} airports &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-800 pt-6">
          <p className="text-xs leading-5 text-navy-400">{AFFILIATE_DISCLOSURE}</p>
          <p className="mt-4 text-xs text-navy-500">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
