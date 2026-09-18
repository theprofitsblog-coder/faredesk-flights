import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import RouteSearch from "@/components/RouteSearch";
import { CITIES, CITY_BY_SLUG, citySlug } from "@/lib/cities";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/config";
import { formatMiles, nearbyAirports, popularRoutesFor, routeUrl } from "@/lib/geo";

type Props = { params: Promise<{ origin: string }> };

export function generateStaticParams() {
  return CITIES.map((c) => ({ origin: citySlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { origin } = await params;
  const city = CITY_BY_SLUG.get(origin);
  if (!city) return { robots: { index: false, follow: false } };

  const title = `Flights from ${city.city}, ${city.region} (${city.code}) — Book by Phone 24/7`;
  const description = `Book flights from ${city.airport} (${city.code}) by phone. Call ${PHONE_DISPLAY} any time, 24/7, and a US-based agent will search every major carrier and book your trip from ${city.city}.`;

  return {
    title,
    description,
    alternates: { canonical: `/flights/${origin}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/flights/${origin}/`,
      title,
      description,
      locale: "en_US",
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { origin } = await params;
  const city = CITY_BY_SLUG.get(origin);
  if (!city) notFound();

  const routes = popularRoutesFor(city);
  const allDestinations = CITIES.filter((c) => c.code !== city.code);
  const alternates = nearbyAirports(city);
  const domestic = allDestinations.filter((c) => c.country === city.country);
  const crossBorder = allDestinations.filter((c) => c.country !== city.country);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Flight Routes", url: "/flights" },
          { name: `Flights from ${city.city}`, url: `/flights/${origin}` },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Flights from {city.city}, {city.region}
      </h1>
      <p className="mt-2 text-lg font-medium text-slate-500">
        {city.airport} ({city.code})
      </p>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        {city.airport} ({city.code}) is {city.blurb}. Book any departure from {city.city} by phone —
        call {PHONE_DISPLAY} any time, 24 hours a day, and a US-based travel agent will search every
        accepted carrier on your dates, explain the fare rules, and ticket the itinerary for you.
        There is no charge for the call.
      </p>

      <div className="mt-8">
        <RouteSearch defaultOrigin={city.city} />
      </div>

      {alternates.length > 0 && (
        <div className="mt-6 rounded-xl border border-navy-200 bg-navy-50 p-4 text-sm text-navy-800">
          <span className="font-semibold">Nearby alternatives:</span>{" "}
          {alternates.map((a, i) => (
            <span key={a.code}>
              {i > 0 && ", "}
              <Link href={`/flights/${citySlug(a)}`} className="font-medium underline">
                {a.airport} ({a.code})
              </Link>
            </span>
          ))}{" "}
          — an agent will compare departures from both airports, which often changes the fare.
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Most popular routes from {city.city}</h2>
        <p className="mt-2 text-slate-600">
          Distances below are the real great-circle figures between airport reference points, and
          nonstop times are typical scheduled block times.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <Link
              key={r.destination.code}
              href={routeUrl(r)}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-navy-400 hover:shadow-card"
            >
              <p className="font-semibold text-navy-900 group-hover:underline">
                {city.city} to {r.destination.city}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {formatMiles(r.miles)} miles &middot; {r.destination.code}
                {r.destination.country !== city.country && " · transborder"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <CallCta
          source={`city-${city.code}`}
          headline={`Flying out of ${city.city}? Call ${PHONE_DISPLAY}`}
          sub="Agents cover routes from this airport that no search page lists, including international connections."
        />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">All destinations from {city.airport} ({city.code})</h2>
        <p className="mt-2 text-slate-600">
          {allDestinations.length} destinations — {domestic.length} within{" "}
          {city.country === "US" ? "the United States" : "Canada"} and {crossBorder.length}{" "}
          {city.country === "US" ? "in Canada" : "in the United States"}.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {allDestinations.map((d) => (
            <Link
              key={d.code}
              href={routeUrl({ origin: city, destination: d })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
            >
              {d.city} <span className="text-slate-400">({d.code})</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="prose-copy mt-14">
        <h2 className="mb-3 text-2xl font-bold">Booking flights from {city.city} by phone</h2>
        <p>
          Searching online works fine for a simple one-way trip. It gets harder when you need seats
          for several people on the same fare, when your dates have some flexibility, or when a
          connection through a different hub would be both cheaper and quicker. Those are the cases
          where a phone call with an agent beats a browser tab.
        </p>
        <p>
          When you call {PHONE_DISPLAY}, the agent searches live inventory across the accepted
          carrier list rather than a single airline's site. You hear the itineraries, the baggage
          allowance, and the change terms before you authorise anything. Because the line runs 24/7,
          a fare that moves at 2am can still be dealt with at 2am.
        </p>
        {alternates.length > 0 && (
          <p>
            Travellers near {city.city} often save by considering{" "}
            {alternates.map((a) => `${a.city} (${a.code})`).join(" or ")} as well. An agent checks
            both automatically rather than leaving it to you to run the search twice.
          </p>
        )}
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Airport",
            "@id": `${SITE_URL}/flights/${origin}/#airport`,
            name: city.airport,
            iataCode: city.code,
            address: {
              "@type": "PostalAddress",
              addressLocality: city.city,
              addressRegion: city.region,
              addressCountry: city.country,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Flight Routes", item: `${SITE_URL}/flights/` },
              {
                "@type": "ListItem",
                position: 3,
                name: `Flights from ${city.city}`,
                item: `${SITE_URL}/flights/${origin}/`,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Airline ticket booking by phone",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: {
              "@type": "Airport",
              name: city.airport,
              iataCode: city.code,
            },
            availableChannel: {
              "@type": "ServiceChannel",
              servicePhone: { "@type": "ContactPoint", telephone: "+18557150929" },
              availableLanguage: "English",
            },
          },
        ]}
      />
    </div>
  );
}
