import Link from "next/link";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import RouteSearch from "@/components/RouteSearch";
import { CheckIcon, ClockIcon, GlobeIcon, PhoneIcon, ShieldIcon } from "@/components/icons";
import { AIRLINES } from "@/lib/airlines";
import { CITIES, citySlug } from "@/lib/cities";
import { PHONE_DISPLAY, PHONE_HREF, SITE_NAME, SITE_URL } from "@/lib/config";
import { greatCircleMiles, formatMiles, routeUrl } from "@/lib/geo";

const STEPS = [
  {
    n: "1",
    title: "Call the number",
    body: `Dial ${PHONE_DISPLAY} from anywhere in the United States or Canada. The call is toll-free and there is no charge to speak with an agent.`,
  },
  {
    n: "2",
    title: "Describe your trip",
    body: "Give your cities, dates and passenger count. Add a flexible date or two if you can — it is usually the single biggest lever on price.",
  },
  {
    n: "3",
    title: "Compare real options",
    body: "The agent searches every accepted carrier on your dates and reads back the itineraries, including baggage and change terms.",
  },
  {
    n: "4",
    title: "Confirm and fly",
    body: "You authorise payment over the phone and receive your confirmation directly. Total cost is quoted before anything is charged.",
  },
];

const BENEFITS = [
  "A human reads the fare rules to you, so baggage and change fees are not a surprise at the airport",
  "Multi-city and open-jaw itineraries built properly instead of two separate one-ways",
  "Alternate airports compared automatically — flying into a nearby city can be materially cheaper",
  "Seat assignments, checked bags and special assistance handled in the same call",
  "Fare rules explained in plain English before you pay",
  "Available 24 hours a day, every day, including holidays",
];

const REASONS = [
  {
    title: "Your dates moved",
    body: "Rebuilding an itinerary across a new date range is faster with an agent who can see availability across carriers than by re-running the same search yourself.",
  },
  {
    title: "You are booking for a group",
    body: "Seats on the same flight, same fare bucket, for six people, is exactly the case where a manual search falls apart and an agent succeeds.",
  },
  {
    title: "The itinerary is complicated",
    body: "Open-jaw, multi-city, mixed-cabin, or a route with no obvious nonstop. These are the trips where a connection choice is worth real money.",
  },
  {
    title: "You would rather not read fare rules",
    body: "Basic economy restrictions differ by carrier and by route. Getting them read back to you takes a minute and prevents expensive mistakes.",
  },
];

/** Curated marquee routes with real computed distances. */
const MARQUEE: Array<[string, string]> = [
  ["JFK", "LAX"], ["LAX", "HNL"], ["ORD", "MCO"], ["ATL", "LAS"], ["SEA", "JFK"],
  ["DEN", "MIA"], ["BOS", "SFO"], ["DFW", "YYZ"], ["LAS", "YYZ"], ["MCO", "YYZ"],
  ["PHX", "HNL"], ["SFO", "HNL"], ["IAH", "JFK"], ["MSP", "LAS"], ["BWI", "MCO"],
  ["EWR", "LAX"], ["SAN", "JFK"], ["TPA", "DEN"], ["AUS", "JFK"], ["BNA", "LAS"],
];

function byCode(code: string) {
  const c = CITIES.find((x) => x.code === code);
  if (!c) throw new Error(`Unknown airport code in marquee list: ${code}`);
  return c;
}

export default function HomePage() {
  const marquee = MARQUEE.map(([o, d]) => ({
    origin: byCode(o),
    destination: byCode(d),
    miles: greatCircleMiles(byCode(o), byCode(d)),
  }));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <span className="pill !border-accent-400 !bg-accent-500/15 !text-accent-200">
                <ClockIcon className="h-4 w-4" /> Open 24/7 — US &amp; Canada
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Book your flight with a real person, on the phone.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-navy-200">
                {SITE_NAME} connects travellers across the United States and Canada with a US-based
                travel agent who searches live fares on Delta, United, American, Southwest, Alaska
                and ten other major carriers — then books the trip for you.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={PHONE_HREF} data-call-source="hero" className="cta-primary text-xl">
                  <PhoneIcon className="h-6 w-6" />
                  {PHONE_DISPLAY}
                </a>
                <Link href="/how-it-works" className="cta-secondary !bg-white/10 hover:!bg-white/20">
                  How it works
                </Link>
              </div>

              <ul className="mt-8 grid gap-2 text-sm text-navy-200 sm:grid-cols-2">
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-accent-400" /> Toll-free, no charge to call</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-accent-400" /> 15 accepted airlines</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-accent-400" /> {CITIES.length} airports covered</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-accent-400" /> Total price quoted up front</li>
              </ul>
            </div>

            <div className="lg:pl-4">
              <RouteSearch />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
          {[
            { icon: <ClockIcon className="h-6 w-6" />, t: "24/7 availability", d: "Nights, weekends and holidays included." },
            { icon: <GlobeIcon className="h-6 w-6" />, t: "US & Canada", d: "Domestic, transborder and international departures." },
            { icon: <ShieldIcon className="h-6 w-6" />, t: "Independent agents", d: "We compare carriers rather than selling one." },
          ].map((f) => (
            <div key={f.t} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                {f.icon}
              </span>
              <div>
                <p className="font-semibold text-navy-900">{f.t}</p>
                <p className="text-sm text-slate-600">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold sm:text-4xl">How booking by phone works</h2>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Four steps, one phone call. You do not need to have your itinerary planned out before you
          dial — that is what the agent is for.
        </p>

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="card">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-500 font-bold text-navy-950">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <CallCta source="home-mid" />
        </div>
      </section>

      {/* ---------- Why call ---------- */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Why travellers call instead of searching</h2>
              <p className="mt-3 text-lg text-slate-600">
                Online search is good at one-way, one-passenger, one-airport trips. It gets worse
                quickly from there.
              </p>
              <ul className="mt-6 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex gap-3 leading-7 text-slate-700">
                    <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {REASONS.map((r) => (
                <div key={r.title} className="card">
                  <h3 className="text-base">{r.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Popular routes ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold sm:text-4xl">Popular flight routes</h2>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Distance and typical nonstop time for the routes travellers ask about most. Pick one for
          full route details, or call {PHONE_DISPLAY} for live availability on your dates.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marquee.map((r) => (
            <Link
              key={`${r.origin.code}-${r.destination.code}`}
              href={routeUrl(r)}
              className="card group transition hover:border-navy-300 hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-bold text-navy-900">
                  {r.origin.city} <span className="text-slate-400">&rarr;</span> {r.destination.city}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {r.origin.code}-{r.destination.code}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {formatMiles(r.miles)} miles &middot; view route details
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-navy-700 group-hover:underline">
                {r.origin.city} to {r.destination.city} flights &rarr;
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-6">
          <Link href="/flights" className="font-semibold text-navy-700 underline">
            Browse all {CITIES.length} departure airports and every route between them &rarr;
          </Link>
        </p>
      </section>

      {/* ---------- Airlines ---------- */}
      <section className="bg-navy-950 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Airlines our agents can book</h2>
          <p className="mt-3 max-w-2xl text-lg text-navy-300">
            Fifteen carriers, from US domestic networks to long-haul international. An agent searches
            them together so you see the whole picture in one call.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AIRLINES.map((a) => (
              <Link
                key={a.slug}
                href={`/airlines/${a.slug}`}
                className="rounded-xl border border-navy-800 bg-navy-900 p-4 transition hover:border-accent-500"
              >
                <p className="font-semibold text-white">{a.name}</p>
                <p className="mt-1 text-xs text-navy-400">
                  {a.alliance ? `${a.alliance} member` : "Independent carrier"} &middot; {a.hubs[0]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Departure cities ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold sm:text-4xl">Flights by departure city</h2>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Every airport we cover, with routes from that city to the rest of the network.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {CITIES.map((c) => (
            <Link
              key={c.code}
              href={`/flights/${citySlug(c)}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
            >
              {c.city} <span className="text-slate-400">({c.code})</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CallCta
          source="home-bottom"
          headline={`Talk to an agent about your trip — ${PHONE_DISPLAY}`}
          sub="Toll-free from the US and Canada. Open 24/7, including holidays."
        />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en-US",
        }}
      />
    </>
  );
}
