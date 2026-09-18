import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF, SITE_NAME } from "@/lib/config";
import { PhoneIcon } from "./icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-800 bg-navy-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-white" aria-label={`${SITE_NAME} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-500 text-navy-950">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M21.5 15.5v-2l-8-2.5V5.75a1.75 1.75 0 0 0-3.5 0V11l-8 2.5v2l8-1.75v3.5l-2.25 1.5V20.5l3.75-1 3.75 1v-1.75L13 17.25v-3.5l8.5 1.75Z" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-navy-100 md:flex" aria-label="Main">
          <Link href="/flights" className="hover:text-white">Flight Routes</Link>
          <Link href="/airlines" className="hover:text-white">Airlines</Link>
          <Link href="/how-it-works" className="hover:text-white">How It Works</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
        </nav>

        <a
          href={PHONE_HREF}
          data-call-source="header"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-3 py-2 text-sm font-bold text-navy-950 transition hover:bg-accent-400 sm:px-4 sm:text-base"
        >
          <PhoneIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  );
}
