import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CallCta from "@/components/CallCta";
import FaqSection from "@/components/FaqSection";
import FeatureList from "@/components/FeatureList";
import JsonLd from "@/components/JsonLd";
import { AIRLINES, AIRLINE_BY_SLUG } from "@/lib/airlines";
import { CITIES, citySlug } from "@/lib/cities";
import { airlineFaq, airlineIntro, airlineWhyCall } from "@/lib/content";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return AIRLINES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = AIRLINE_BY_SLUG.get(slug);
  if (!a) return { robots: { index: false, follow: false } };

  const title = `Book ${a.name} Flights by Phone — ${PHONE_DISPLAY}`;
  const description = `Book ${a.name} flights by phone with a real travel agent. Call ${PHONE_DISPLAY} any time, 24/7. Hubs include ${a.hubs.slice(0, 3).join(", ")}. No charge for the call.`;

  return {
    title,
    description,
    alternates: { canonical: `/airlines/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/airlines/${slug}/`,
      title,
      description,
      locale: "en_US",
    },
  };
}

export default async function AirlinePage({ params }: Props) {
  const { slug } = await params;
  const a = AIRLINE_BY_SLUG.get(slug);
  if (!a) notFound();

  const faqs = airlineFaq(a);
  // Airports in our network that this carrier plausibly serves, based on hub overlap.
  const hubCodes = new Set(
    a.hubs.flatMap((h) => (h.match(/\(([A-Z]{3})/g) ?? []).map((m) => m.slice(1)))
  );
  const servedAirports = CITIES.filter((c) => hubCodes.has(c.code));
  const otherCities = CITIES.filter((c) => !hubCodes.has(c.code)).slice(0, 12);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Airlines", url: "/airlines" },
          { name: a.name, url: `/airlines/${slug}` },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Book {a.name} flights by phone
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-500">
            {a.alliance ? `${a.alliance} member` : "Independent carrier"} &middot; {a.code} &middot;
            based in {a.home}
          </p>
        </div>
        <a href="tel:+18557150929" data-call-source={`airline-${slug}`} className="cta-primary text-xl">
          {PHONE_DISPLAY}
        </a>
      </div>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{airlineIntro(a)}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { k: "Hubs", v: `${a.hubs.length}`, s: a.hubs.slice(0, 2).map((h) => h.split(" (")[0]).join(", ") },
          { k: "Alliance", v: a.alliance ?? "None", s: a.alliance ? "Partner itineraries available" : "No partner network" },
          { k: "Coverage", v: a.international ? "International" : "US & Canada", s: "Searched on every call" },
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
          source={`airline-mid-${slug}`}
          headline={`Want a ${a.name} fare compared against the others?`}
          sub="Agents search the full accepted carrier list on your dates, then read back the total including baggage."
        />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="prose-copy">
          <h2 className="mb-3 text-2xl font-bold">What an agent can do on a {a.name} booking</h2>
          <FeatureList items={airlineWhyCall(a)} />

          <h2 className="mb-3 mt-8 text-2xl font-bold">Where {a.name} operates</h2>
          <p>
            {a.name} runs hubs at {a.hubs.join(", ")}.{" "}
            {a.international
              ? `Flights from North America typically connect through ${a.hubs[0]}, which also opens up onward itineraries across the carrier's full network.`
              : `Cities outside those hubs are usually reached with one connection, and the choice of which hub to connect through changes both the price and the total travel time.`}
          </p>
          {servedAirports.length > 0 && (
            <p>
              Airports in our network that map directly onto this carrier's hub list include{" "}
              {servedAirports.slice(0, 8).map((c, i) => (
                <span key={c.code}>
                  {i > 0 && ", "}
                  <Link href={`/flights/${citySlug(c)}`} className="font-semibold text-navy-700 underline">
                    {c.city} ({c.code})
                  </Link>
                </span>
              ))}
              .
            </p>
          )}

          <h2 className="mb-3 mt-8 text-2xl font-bold">Booking {a.name} over the phone</h2>
          <p>
            Calling {PHONE_DISPLAY} does not put you in a {a.name} queue. You reach an independent
            travel agent who books {a.name} fares the same way a travel agency always has — with
            access to published fares across the carrier list, not just one airline's website.
          </p>
          <p>
            In practice this is often faster than booking direct. If the {a.name} fare on your dates
            is poor, the agent will say so and show you what the other carriers are charging on the
            same flight times. There is no incentive to push one brand over another.
          </p>
          <p>
            Everything is quoted as a total — fare, taxes, seat selection and baggage — before you
            authorise payment. Fare rules, including change and cancellation terms, are read back to
            you in plain language.
          </p>

          <h2 className="mb-3 mt-8 text-2xl font-bold">Departure cities we cover</h2>
          <p>
            Beyond {a.name}'s own hubs, agents book departures from across the network, connecting
            where it makes sense.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {otherCities.map((c) => (
              <Link
                key={c.code}
                href={`/flights/${citySlug(c)}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
              >
                {c.city} <span className="text-slate-400">({c.code})</span>
              </Link>
            ))}
          </div>
          <p className="mt-3">
            <Link href="/flights" className="font-semibold text-navy-700 underline">
              See all {CITIES.length} airports &rarr;
            </Link>
          </p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card border-accent-300 bg-accent-50">
            <p className="text-lg font-bold text-navy-900">Book a {a.name} flight now</p>
            <p className="mt-1 text-sm text-navy-700">
              Toll-free from the US and Canada, 24 hours a day.
            </p>
            <a
              href="tel:+18557150929"
              data-call-source={`airline-aside-${slug}`}
              className="cta-primary mt-4 w-full text-xl"
            >
              {PHONE_DISPLAY}
            </a>
            <ul className="mt-4 space-y-2 text-sm text-navy-800">
              <li>Have your dates and passenger names ready</li>
              <li>Note any flexibility — it usually lowers the fare</li>
              <li>Fare rules explained before you pay</li>
            </ul>
          </div>

          <div className="card">
            <p className="font-semibold text-navy-900">Other airlines we book</p>
            <ul className="mt-3 space-y-2">
              {AIRLINES.filter((x) => x.slug !== a.slug)
                .slice(0, 8)
                .map((x) => (
                  <li key={x.slug}>
                    <Link href={`/airlines/${x.slug}`} className="text-sm text-navy-700 hover:underline">
                      {x.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/airlines" className="text-sm font-semibold text-navy-700 underline">
                  All 15 airlines &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-bold">{a.name} booking — frequently asked questions</h2>
        <FaqSection items={faqs} />
      </section>

      <p className="mt-10 text-xs leading-5 text-slate-400">
        Hub lists, alliance membership and route coverage are described at a high level and can
        change; live schedules and fares are confirmed by an agent at the time of booking. {a.name}{" "}
        is not affiliated with, endorsed by or sponsored by FareDesk.
      </p>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Airlines", item: `${SITE_URL}/airlines/` },
              { "@type": "ListItem", position: 3, name: a.name, item: `${SITE_URL}/airlines/${slug}/` },
            ],
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
            "@type": "Service",
            serviceType: `Airline ticket booking by phone — ${a.name}`,
            provider: { "@id": `${SITE_URL}/#organization` },
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
