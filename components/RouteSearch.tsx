"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CITIES, citySlug, type City } from "@/lib/cities";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";
import { PhoneIcon, SearchIcon } from "./icons";

const matchCity = (q: string): City | undefined => {
  const needle = q.trim().toLowerCase();
  if (!needle) return undefined;
  return (
    CITIES.find((c) => c.code.toLowerCase() === needle) ??
    CITIES.find((c) => c.city.toLowerCase() === needle) ??
    CITIES.find((c) => c.city.toLowerCase().startsWith(needle)) ??
    CITIES.find((c) => c.airport.toLowerCase().includes(needle))
  );
};

const label = (c: City) => `${c.city}, ${c.region} (${c.code})`;

export default function RouteSearch({
  defaultOrigin,
  compact = false,
}: {
  defaultOrigin?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [from, setFrom] = useState(defaultOrigin ?? "");
  const [to, setTo] = useState("");

  const origin = useMemo(() => matchCity(from), [from]);
  const destination = useMemo(() => matchCity(to), [to]);
  const ready = Boolean(origin && destination && origin.code !== destination.code);
  const href = ready ? `/flights/${citySlug(origin!)}/${citySlug(destination!)}` : "/flights";

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ready) router.push(href);
  };

  return (
    <form
      onSubmit={onSearch}
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:p-5 ${compact ? "" : "sm:p-6"}`}
      role="search"
      aria-label="Find a flight route"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-end">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Flying from
          </span>
          <input
            list="city-options"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="City or airport code"
            autoComplete="off"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-base outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200"
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="mx-auto mb-1 hidden rounded-lg border border-slate-300 px-3 py-3 text-slate-500 transition hover:bg-slate-100 sm:block"
          aria-label="Swap origin and destination"
          title="Swap origin and destination"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path d="M7 4 3 8l4 4M3 8h13a4 4 0 0 1 0 8h-1m-5 4-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Flying to
          </span>
          <input
            list="city-options"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="City or airport code"
            autoComplete="off"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-base outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200"
          />
        </label>

        <button
          type="submit"
          disabled={!ready}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-5 py-3 font-semibold text-white transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          <SearchIcon />
          See route
        </button>
      </div>

      <datalist id="city-options">
        {CITIES.map((c) => (
          <option key={c.code} value={c.city}>
            {c.code}
          </option>
        ))}
      </datalist>

      <p className="mt-3 text-sm text-slate-500">
        Prefer to talk it through?{" "}
        <a href={PHONE_HREF} data-call-source="route-search" className="font-semibold text-navy-700 underline">
          <span className="inline-flex items-center gap-1">
            <PhoneIcon className="h-4 w-4" />
            {PHONE_DISPLAY}
          </span>
        </a>{" "}
        — open 24/7.
      </p>

      {!ready && (from || to) && (
        <p className="mt-2 text-sm text-accent-700">
          Pick two different airports, or{" "}
          <Link href="/flights" className="underline">browse every route</Link>.
        </p>
      )}
      {ready && (
        <p className="mt-2 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-navy-800">
            {label(origin!)} &rarr; {label(destination!)}
          </span>
        </p>
      )}
    </form>
  );
}
