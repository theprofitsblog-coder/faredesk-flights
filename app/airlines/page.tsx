import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import { DOMESTIC_AIRLINES, INTERNATIONAL_AIRLINES } from "@/lib/airlines";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Airlines We Can Book — 15 Carriers, One Phone Call",
  description: `Our agents book 15 airlines including Delta, United, American, Southwest, Alaska, Air Canada, British Airways, Lufthansa, Air France, KLM, Qatar, Emirates and Etihad. Call ${PHONE_DISPLAY}, open 24/7.`,
  alternates: { canonical: "/airlines" },
};

function AirlineCard({ a }: { a: (typeof DOMESTIC_AIRLINES)[number] }) {
  return (
    <Link
      href={`/airlines/${a.slug}`}
      className="card group transition hover:border-navy-400 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900 group-hover:underline">{a.name}</h3>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
          {a.code}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{a.summary}</p>
      <p className="mt-3 text-xs text-slate-500">
        {a.alliance ? `${a.alliance} member` : "No alliance"} &middot; Based in {a.home}
      </p>
      <p className="mt-1 text-xs text-slate-500">Hubs: {a.hubs.slice(0, 3).join(", ")}</p>
    </Link>
  );
}

export default function AirlinesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Airlines", url: "/airlines" },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Airlines we can book</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        Fifteen carriers, searched together on one call. Our agents are not tied to a single airline,
        so you get an honest comparison across US domestic networks and the major international
        carriers rather than whatever one site happens to promote. Call {PHONE_DISPLAY} any time —
        the line is open 24 hours a day, 7 days a week, from anywhere in the United States or Canada.
      </p>

      <div className="mt-8">
        <CallCta
          source="airlines-index"
          headline="Which airline is cheapest for your trip?"
          sub="That depends on your dates, not on the brand. An agent checks all of them in one call."
        />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">US and Canadian network carriers</h2>
        <p className="mt-2 text-slate-600">
          The six carriers that carry most domestic traffic inside the United States and Canada.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMESTIC_AIRLINES.map((a) => (
            <AirlineCard key={a.slug} a={a} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">International carriers</h2>
        <p className="mt-2 text-slate-600">
          Transatlantic, Middle East and Asia-Pacific operators that connect through European and
          Gulf hubs.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERNATIONAL_AIRLINES.map((a) => (
            <AirlineCard key={a.slug} a={a} />
          ))}
        </div>
      </section>

      <section className="prose-copy mt-14">
        <h2 className="mb-3 text-2xl font-bold">How airline choice actually affects your fare</h2>
        <p>
          The cheapest carrier for a route is rarely the same one two weeks later. Fare buckets open
          and close based on how a route is selling, so a carrier that looks expensive today can be
          the value option next month. That is the practical reason to have an agent search the whole
          list at once rather than checking one airline at a time.
        </p>
        <p>
          Alliance membership matters too. If a direct fare is not available, a Star Alliance,
          oneworld or SkyTeam itinerary can often be built across partner airlines on a single
          ticket, which keeps your baggage checked through and protects you if a connection is
          missed. Building that by hand on a consumer search site is awkward; for an agent it is
          routine.
        </p>
        <p>
          One caution worth stating plainly: baggage allowance, change fees and seat policies are set
          by the fare brand you buy, not by the airline overall. The same carrier can sell three
          different products on the same flight with three different rule sets. The agent reads back
          the rules for the specific fare they quote, before you authorise payment.
        </p>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${SITE_URL}/airlines/`,
          name: "Airlines we can book",
          numberOfItems: DOMESTIC_AIRLINES.length + INTERNATIONAL_AIRLINES.length,
          itemListElement: [...DOMESTIC_AIRLINES, ...INTERNATIONAL_AIRLINES].map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.name,
            url: `${SITE_URL}/airlines/${a.slug}/`,
          })),
        }}
      />
    </div>
  );
}
