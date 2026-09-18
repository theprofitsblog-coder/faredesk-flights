import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CallCta from "@/components/CallCta";
import FaqSection from "@/components/FaqSection";
import FeatureList from "@/components/FeatureList";
import JsonLd from "@/components/JsonLd";
import RouteSearch from "@/components/RouteSearch";
import { CITIES, CITY_BY_SLUG, citySlug } from "@/lib/cities";
import {
  airportLine,
  baggageLine,
  bestDayLine,
  carrierLine,
  changePolicyLine,
  connectionsLine,
  durationLine,
  routeFaq,
  routeIntro,
  seasonalLine,
  transborderLine,
  whyCallSection,
} from "@/lib/content";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/config";
import {
  formatMiles,
  likelyCarriers,
  nearbyAirports,
  relatedRoutes,
  routeBreadcrumb,
  routeData,
} from "@/lib/geo";

type Props = { params: Promise<{ origin: string; destination: string }> };

/** Every ordered city pair — the core of the programmatic SEO footprint. */
export function generateStaticParams() {
  return CITIES.flatMap((origin) =>
    CITIES.filter((destination) => destination.code !== origin.code).map((destination) => ({
      origin: citySlug(origin),
      destination: citySlug(destination),
    }))
  );
}

/** Resolves the URL slugs into a computed route, or null if the pair is invalid. */
async function resolve(params: Promise<{ origin: string; destination: string }>) {
  const { origin, destination } = await params;
  const o = CITY_BY_SLUG.get(origin);
  const d = CITY_BY_SLUG.get(destination);
  if (!o || !d || o.code === d.code) return null;
  return routeData(o, d);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return { robots: { index: false, follow: false } };

  const title = `${r.origin.city} to ${r.destination.city} Flights — Book by Phone ${PHONE_DISPLAY}`;
  const description = `Book flights from ${r.origin.city} (${r.origin.code}) to ${r.destination.city} (${r.destination.code}) by phone. About ${formatMiles(r.miles)} miles, roughly ${r.duration} nonstop. Call ${PHONE_DISPLAY} any time, 24/7, and an agent will search every carrier and book it.`;

  return {
    title,
    description,
    alternates: { canonical: `/flights/${citySlug(r.origin)}/${citySlug(r.destination)}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/flights/${citySlug(r.origin)}/${citySlug(r.destination)}/`,
      title,
      description,
      locale: "en_US",
    },
  };
}

export default async function RoutePage({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();

  const carriers = likelyCarriers(r);
  const faqs = routeFaq(r);
  const related = relatedRoutes(r);
  const originAlternates = nearbyAirports(r.origin);
  const destAlternates = nearbyAirports(r.destination);
  const crumbs = routeBreadcrumb(r);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={crumbs} />

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        {r.origin.city} to {r.destination.city} Flights
      </h1>
      <p className="mt-2 text-lg font-medium text-slate-500">
        {r.origin.code} &rarr; {r.destination.code} &middot; book by phone, 24/7
      </p>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{routeIntro(r)}</p>

      {/* ---------- Key facts ---------- */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "Distance", v: `${formatMiles(r.miles)} mi`, s: `${r.km.toLocaleString("en-US")} km` },
          { k: "Nonstop time", v: r.duration, s: "typical, gate to gate" },
          { k: "Time zone", v: r.tzOffset === 0 ? "Same" : `${r.tzOffset > 0 ? "+" : ""}${r.tzOffset} hr`, s: r.destination.city },
          { k: "Route type", v: r.isTransborder ? "Transborder" : "Domestic", s: r.band },
        ].map((s) => (
          <div key={s.k} className="card !p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.k}</p>
            <p className="mt-1 text-xl font-bold text-navy-900">{s.v}</p>
            <p className="text-sm text-slate-500">{s.s}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <CallCta
          source={`route-${r.origin.code}-${r.destination.code}`}
          headline={`${r.origin.city} to ${r.destination.city} — call ${PHONE_DISPLAY}`}
          sub="An agent searches every accepted carrier on your exact dates. No charge for the call, 24 hours a day."
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="prose-copy">
          <h2 className="mb-3 text-2xl font-bold">Flight details for this route</h2>
          <p>{durationLine(r)}</p>
          <p>{connectionsLine(r)}</p>
          <p>{airportLine(r)}</p>
          {transborderLine(r) && <p>{transborderLine(r)}</p>}
          <p>{carrierLine(r)}</p>

          <h2 className="mb-3 mt-8 text-2xl font-bold">When to book {r.origin.city} to {r.destination.city}</h2>
          <p>{bestDayLine(r)}</p>
          <p>{seasonalLine(r)}</p>
          <p>{baggageLine()}</p>
          <p>{changePolicyLine()}</p>

          <h2 className="mb-3 mt-8 text-2xl font-bold">Why call instead of searching online</h2>
          <FeatureList items={whyCallSection(r)} />

          {(originAlternates.length > 0 || destAlternates.length > 0) && (
            <>
              <h2 className="mb-3 mt-8 text-2xl font-bold">Nearby airports worth comparing</h2>
              <p>
                {originAlternates.length > 0 && (
                  <>
                    Near {r.origin.city}, {originAlternates.map((a) => `${a.airport} (${a.code})`).join(" and ")}{" "}
                  </>
                )}
                {originAlternates.length > 0 && destAlternates.length > 0 && "and "}
                {destAlternates.length > 0 && (
                  <>
                    near {r.destination.city},{" "}
                    {destAlternates.map((a) => `${a.airport} (${a.code})`).join(" and ")}{" "}
                  </>
                )}
                are alternatives. An agent prices the swap as part of the call — on longer routes the
                difference can be larger than any fare sale.
              </p>
            </>
          )}

          <h2 className="mb-3 mt-8 text-2xl font-bold">Carriers searched on this route</h2>
          <ul>
            {carriers.map((c) => (
              <li key={c.slug}>
                <Link href={`/airlines/${c.slug}`} className="font-semibold text-navy-700 underline">
                  {c.name}
                </Link>
                {c.alliance ? ` — ${c.alliance} member` : ""}, hubs at {c.hubs.slice(0, 3).join(", ")}.
              </li>
            ))}
          </ul>
          <p>
            Which of these actually operate {r.origin.code}–{r.destination.code} on your dates depends
            on the season, so the only reliable answer is a live search. That is what the call is
            for.
          </p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card border-accent-300 bg-accent-50">
            <p className="text-lg font-bold text-navy-900">Speak to an agent now</p>
            <p className="mt-1 text-sm text-navy-700">
              Toll-free from the US and Canada. Open 24/7, including weekends and holidays.
            </p>
            <a
              href="tel:+18557150929"
              data-call-source={`route-aside-${r.origin.code}-${r.destination.code}`}
              className="cta-primary mt-4 w-full text-xl"
            >
              {PHONE_DISPLAY}
            </a>
            <ul className="mt-4 space-y-2 text-sm text-navy-800">
              <li>Have your dates and passenger names ready</li>
              <li>Mention any flexibility — it usually saves money</li>
              <li>Total price is quoted before you pay</li>
            </ul>
          </div>

          <div className="card">
            <p className="font-semibold text-navy-900">Search another route</p>
            <div className="mt-3">
              <RouteSearch defaultOrigin={r.origin.city} compact />
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- FAQs ---------- */}
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-bold">
          {r.origin.city} to {r.destination.city} — frequently asked questions
        </h2>
        <FaqSection items={faqs} />
      </section>

      {/* ---------- Related routes ---------- */}
      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">More flights from {r.origin.city}</h2>
          <ul className="mt-4 space-y-2">
            {related.fromOrigin.map((x) => (
              <li key={x.destination.code}>
                <Link
                  href={`/flights/${citySlug(x.origin)}/${citySlug(x.destination)}`}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
                >
                  <span>
                    {x.origin.city} to {x.destination.city}
                  </span>
                  <span className="text-slate-400">{formatMiles(x.miles)} mi</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">Flights to {r.destination.city}</h2>
          <ul className="mt-4 space-y-2">
            {related.toDestination.map((x) => (
              <li key={x.origin.code}>
                <Link
                  href={`/flights/${citySlug(x.origin)}/${citySlug(x.destination)}`}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
                >
                  <span>
                    {x.origin.city} to {x.destination.city}
                  </span>
                  <span className="text-slate-400">{formatMiles(x.miles)} mi</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-12">
        <CallCta
          source={`route-bottom-${r.origin.code}-${r.destination.code}`}
          headline={`Ready to fly ${r.origin.city} to ${r.destination.city}?`}
          sub={`Call ${PHONE_DISPLAY} — a real agent, 24 hours a day, at no charge.`}
        />
      </div>

      <p className="mt-10 text-xs leading-5 text-slate-400">
        Distances are great-circle measurements between published airport reference points and
        durations are typical scheduled block times. Live schedules, fares and availability change
        constantly and are confirmed by an agent at the time of booking.
      </p>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              item: `${SITE_URL}${c.url}/`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Flight",
            departureAirport: {
              "@type": "Airport",
              name: r.origin.airport,
              iataCode: r.origin.code,
            },
            arrivalAirport: {
              "@type": "Airport",
              name: r.destination.airport,
              iataCode: r.destination.code,
            },
            estimatedFlightDuration: `PT${Math.floor(r.minutes / 60)}H${r.minutes % 60}M`,
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Airline ticket booking by phone",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "Airport", name: r.origin.airport, iataCode: r.origin.code },
              { "@type": "Airport", name: r.destination.airport, iataCode: r.destination.code },
            ],
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
