import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import RouteSearch from "@/components/RouteSearch";
import { CITIES, citySlug } from "@/lib/cities";
import { PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Flight Routes — Every Airport We Cover",
  description: `Browse every US and Canadian airport ${SITE_NAME} covers, with route details, real distances and typical flight times. Call ${PHONE_DISPLAY} any time, 24/7, and an agent will price and book it.`,
  alternates: { canonical: "/flights" },
};

export default function FlightsIndexPage() {
  const us = CITIES.filter((c) => c.country === "US");
  const ca = CITIES.filter((c) => c.country === "CA");
  const totalRoutes = CITIES.length * (CITIES.length - 1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Flight Routes", url: "/flights" },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Flight routes we book</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        {CITIES.length} airports across the United States and Canada, with{" "}
        {totalRoutes.toLocaleString("en-US")} route pages covering every city pair between them. Each
        page shows the real great-circle distance, typical nonstop time and the carriers our agents
        usually search first. Call {PHONE_DISPLAY} any time — day or night — and an agent will price
        and book the trip.
      </p>

      <div className="mt-8">
        <RouteSearch />
      </div>

      <div className="mt-10">
        <CallCta
          source="flights-index"
          headline="Can't find your route?"
          sub="Agents book flights well beyond the airports listed here, including international departures."
        />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">United States airports</h2>
        <p className="mt-2 text-slate-600">{us.length} departure airports, each with routes to every other city in the network.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {us.map((c) => (
            <Link
              key={c.code}
              href={`/flights/${citySlug(c)}`}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-navy-400 hover:shadow-card"
            >
              <p className="font-semibold text-navy-900">
                Flights from {c.city}, {c.region}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {c.airport} ({c.code}) &middot; {CITIES.length - 1} routes
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Canadian airports</h2>
        <p className="mt-2 text-slate-600">{ca.length} departure airports. Transborder itineraries into the US include preclearance details.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ca.map((c) => (
            <Link
              key={c.code}
              href={`/flights/${citySlug(c)}`}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-navy-400 hover:shadow-card"
            >
              <p className="font-semibold text-navy-900">
                Flights from {c.city}, {c.region}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {c.airport} ({c.code}) &middot; {CITIES.length - 1} routes
              </p>
            </Link>
          ))}
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/flights/`,
          url: `${SITE_URL}/flights/`,
          name: "Flight Routes",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: CITIES.map((c) => ({
            "@type": "Airport",
            name: c.airport,
            iataCode: c.code,
            address: {
              "@type": "PostalAddress",
              addressLocality: c.city,
              addressRegion: c.region,
              addressCountry: c.country,
            },
          })),
        }}
      />
    </div>
  );
}
