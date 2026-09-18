import type { Airline } from "./airlines";
import type { RouteData } from "./geo";
import { formatMiles, hashString, likelyCarriers, pick, tzLabel } from "./geo";
import { PHONE_DISPLAY } from "./config";

/**
 * Copy engine.
 *
 * Programmatic SEO fails when every page is the same paragraph with two nouns
 * swapped. Each generator below branches on real route attributes (distance
 * band, time-zone shift, transborder status, hub overlap) so a 300-mile hop
 * and a 4,900-mile Alaska run genuinely read differently.
 */

const INTROS: Record<string, string[]> = {
  "short-haul": [
    "At roughly {miles} miles, {from} to {to} is a short hop — the kind of route where a mid-morning departure can still leave you at dinner on the other side.",
    "The {from} to {to} route covers about {miles} miles, which puts it firmly in short-haul territory and makes same-day round trips realistic.",
    "Flying {from} to {to} means covering around {miles} miles, short enough that most carriers schedule several departures across the day.",
  ],
  "medium-haul": [
    "{from} to {to} spans approximately {miles} miles — long enough to want a comfortable seat, short enough to avoid an overnight.",
    "The {miles}-mile run between {from} and {to} is a classic medium-haul route, and competition on it tends to keep fares reasonable.",
    "Covering about {miles} miles, {from} to {to} usually works as a single-segment trip with a morning or early-afternoon departure.",
  ],
  "transcontinental-range": [
    "At around {miles} miles, {from} to {to} is a transcontinental-range route where the difference between a basic economy and a main-cabin fare becomes worth paying attention to.",
    "{from} to {to} is roughly {miles} miles of flying. On routes this long, departure timing matters as much as price.",
    "The {miles}-mile journey from {from} to {to} is long enough that cabin choice, baggage policy and connection quality all affect the real cost of the ticket.",
  ],
  "long-haul": [
    "{from} to {to} is about {miles} miles — one of the longer domestic runs in the network, and one where a phone booking pays for itself.",
    "Covering roughly {miles} miles, {from} to {to} is a long-haul trip where seat selection and meal service are worth confirming before you pay.",
    "At approximately {miles} miles, {from} to {to} is a serious piece of flying, and schedule options can be limited depending on the season.",
  ],
};

export function routeIntro(r: RouteData): string {
  const templates = INTROS[r.band] ?? INTROS["medium-haul"];
  const tpl = templates[hashString(`${r.slug}-intro`) % templates.length];
  return tpl
    .replaceAll("{miles}", formatMiles(r.miles))
    .replaceAll("{from}", r.origin.city)
    .replaceAll("{to}", r.destination.city);
}

export function durationLine(r: RouteData): string {
  const base = `A typical nonstop flight from ${r.origin.airport} (${r.origin.code}) to ${r.destination.airport} (${r.destination.code}) takes about ${r.duration}.`;
  const tz = r.tzOffset !== 0
    ? ` ${r.destination.city} is ${tzLabel(r.tzOffset)}, so the elapsed clock time you see on a boarding pass will differ from the time you actually spend in the air.`
    : " Both cities are in the same time zone, so scheduled and elapsed times line up.";
  return base + tz;
}

export function connectionsLine(r: RouteData): string {
  if (r.nonstopLikely) {
    return `On a route of ${formatMiles(r.miles)} miles, nonstop service is commonly available — though the exact schedule changes by season, so an agent will confirm what is running on your travel dates before quoting a price.`;
  }
  return `At ${formatMiles(r.miles)} miles, this route is often served with one connection through a major hub rather than nonstop. An agent can compare a nonstop against a well-timed connection, since a short layover is frequently cheaper than a premium on the direct flight.`;
}

export function transborderLine(r: RouteData): string {
  if (!r.isTransborder) return "";
  return `Because ${r.origin.city} and ${r.destination.city} are in different countries, this is a transborder itinerary: you will clear US Customs and Border Protection preclearance or arrival immigration, and you need a valid passport plus any required entry authorization. Agents check document requirements as part of the booking.`;
}

export function carrierLine(r: RouteData): string {
  const carriers = likelyCarriers(r);
  const names = carriers.map((c) => c.name);
  if (names.length === 0) return "";
  if (names.length === 1) {
    return `${names[0]} is the accepted carrier most likely to appear in a search for this route.`;
  }
  const head = names.slice(0, -1).join(", ");
  return `For this route, searches most often surface ${head} and ${names[names.length - 1]}, depending on the day and how far ahead you book.`;
}

export function seasonalLine(r: RouteData): string {
  const leisure = new Set(["LAS", "MCO", "HNL", "TPA", "RSW", "FLL", "MIA", "SJU", "PHX", "SAN", "SNA", "ABQ", "TUS", "BOI", "ANC"]);
  const destIsLeisure = leisure.has(r.destination.code);
  const originIsLeisure = leisure.has(r.origin.code);

  if (destIsLeisure) {
    return `Demand into ${r.destination.city} peaks around school holidays, spring break and major conventions, which is when published fares climb fastest. Booking three to seven weeks out is usually the sweet spot, and an agent can watch a fare that has already moved.`;
  }
  if (originIsLeisure) {
    return `Outbound fares from ${r.origin.city} are heavily leisure-driven, so weekend and holiday departures price higher than mid-week ones. If your dates have any flexibility at all, moving by a day often changes the fare more than any airline promotion will.`;
  }
  return `${r.origin.city} to ${r.destination.city} carries a healthy mix of business and leisure traffic. Business-heavy routes tend to be cheapest when you stay over a Saturday night or fly Tuesday through Thursday; leisure-heavy routes reward booking further out.`;
}

export function airportLine(r: RouteData): string {
  const lines = [
    `${r.origin.city} travellers depart from ${r.origin.airport} (${r.origin.code}), ${r.origin.blurb}. Arrivals land at ${r.destination.airport} (${r.destination.code}), ${r.destination.blurb}.`,
    `Departures run out of ${r.origin.airport} (${r.origin.code}) — ${r.origin.blurb} — and land at ${r.destination.airport} (${r.destination.code}), ${r.destination.blurb}.`,
  ];
  return lines[hashString(`${r.slug}-airport`) % lines.length];
}

export function whyCallSection(r: RouteData): string[] {
  const items = [
    `Comparing ${likelyCarriers(r).map((c) => c.name).join(", ")} side by side on one call instead of reloading a dozen tabs.`,
    "Checking whether a connection through a different hub beats the cheapest nonstop after baggage and change fees are counted.",
    "Locking a fare while you confirm dates with the rest of your party.",
    "Sorting out seat assignments, checked bags and special assistance in the same conversation.",
  ];
  if (r.isTransborder) {
    items.push("Verifying passport validity, entry requirements and preclearance before you pay.");
  }
  if (r.miles > 1800) {
    items.push("Finding a cabin and seat that make a long sector survivable without paying top-of-range fares.");
  }
  if (r.tzOffset !== 0) {
    items.push("Avoiding a connection that only works on paper once the time-zone change is applied.");
  }
  items.push(`Getting a human answer about changes and refunds on the ${r.origin.city} to ${r.destination.city} route instead of reading fare rules alone.`);
  return items;
}

export type Faq = { q: string; a: string };

export function routeFaq(r: RouteData): Faq[] {
  const faqs: Faq[] = [
    {
      q: `How long is the flight from ${r.origin.city} to ${r.destination.city}?`,
      a: `A nonstop flight covers roughly ${formatMiles(r.miles)} miles (${r.km.toLocaleString("en-US")} km) and typically takes about ${r.duration} gate to gate. Connecting itineraries add layover time on top of that, so the total trip can be meaningfully longer.`,
    },
    {
      q: `Are there nonstop flights from ${r.origin.city} to ${r.destination.city}?`,
      a: r.nonstopLikely
        ? `Nonstop service is commonly scheduled on this route, but availability varies by day of week and season. Call ${PHONE_DISPLAY} and an agent will tell you exactly what is operating on your dates.`
        : `Nonstop options are limited at ${formatMiles(r.miles)} miles, so most itineraries include one connection. An agent can compare a nonstop against a short, well-timed connection — the connecting fare is often lower.`,
    },
    {
      q: `Which airlines fly from ${r.origin.city} to ${r.destination.city}?`,
      a: `Our agents search the full set of accepted carriers, and on this route ${carrierLine(r).replace(/^For this route, searches most often surface /, "").replace(/\.$/, "")}. Which of them actually operate on your date depends on the season.`,
    },
    {
      q: `When should I book ${r.origin.city} to ${r.destination.city}?`,
      a: r.nonstopLikely
        ? `For a route of this length, three to seven weeks ahead is usually the best balance of availability and price. Around major holidays, earlier is safer. Fares move constantly, so the only reliable answer for your specific dates is a live search — call ${PHONE_DISPLAY} any time, 24/7.`
        : `Longer and thinner routes reward booking earlier, because seat availability in the lowest fare buckets runs out first. If you are travelling at a holiday peak, start looking further out than you think you need to.`,
    },
    {
      q: `Does it cost extra to book by phone?`,
      a: `No. Calling ${PHONE_DISPLAY} connects you with a US-based travel agent at no charge. You only pay for the fare itself, and the agent will always quote the total — fare, taxes and any baggage — before anything is confirmed.`,
    },
    {
      q: `What do I need to have ready when I call?`,
      a: `Your departure and arrival cities, your travel dates (plus one or two flexible alternatives if you have them), the number of passengers with each traveller's legal name exactly as it appears on their ID, and a card for payment. If any passenger needs assistance or is travelling with an infant, mention that up front.`,
    },
  ];

  if (r.isTransborder) {
    faqs.push({
      q: `What documents do I need to fly from ${r.origin.city} to ${r.destination.city}?`,
      a: `You will need a valid passport, and depending on your citizenship you may need a visa or an electronic travel authorization. The agent will confirm the current entry requirements for your nationality at the time of booking, since rules do change.`,
    });
  }
  if (r.tzOffset !== 0) {
    faqs.push({
      q: `Is there a time difference between ${r.origin.city} and ${r.destination.city}?`,
      a: `Yes — ${r.destination.city} is ${tzLabel(r.tzOffset)}. It matters most on tight connections and early-morning departures, so confirm you are reading arrival times in local time, not your home time zone.`,
    });
  }
  return faqs;
}

export function airlineFaq(a: Airline): Faq[] {
  const faqs: Faq[] = [
    {
      q: `Can I book a ${a.name} flight by phone?`,
      a: `Yes. Call ${PHONE_DISPLAY} and a US-based agent will search live ${a.name} availability along with the other accepted carriers, then quote you a total including taxes and any baggage before you commit.`,
    },
    {
      q: `Is ${PHONE_DISPLAY} the ${a.name} phone number?`,
      a: `No. ${PHONE_DISPLAY} is FareDesk, an independent travel booking service. We are not ${a.name} and we are not affiliated with or endorsed by them — we book their published fares on your behalf, the same way a travel agency does.`,
    },
    {
      q: `Where does ${a.name} fly from?`,
      a: `${a.name} is based in ${a.home} and operates major hubs at ${a.hubs.slice(0, 4).join(", ")}${a.hubs.length > 4 ? " and others" : ""}. Routes from smaller cities usually connect through one of those hubs.`,
    },
    {
      q: `What are the ${a.name} baggage rules?`,
      a: `Baggage allowance depends on the fare brand you buy and your status, so it is worth confirming rather than assuming. The agent will tell you exactly what is included in the fare they quote before you pay.`,
    },
    {
      q: `Does booking with an agent cost more than booking online?`,
      a: `No. There is no charge to call ${PHONE_DISPLAY}. You pay the fare the airline publishes, and the agent's job is to find the cheapest itinerary that actually fits your dates.`,
    },
    {
      q: `Is the ${PHONE_DISPLAY} line open outside business hours?`,
      a: `Yes — the line is staffed 24 hours a day, 7 days a week, from anywhere in the United States or Canada.`,
    },
  ];
  return faqs;
}

export function airlineIntro(a: Airline): string {
  const alliance = a.alliance ? ` ${a.name} is a ${a.alliance} member, which means itineraries can be built across the alliance's partner network when a direct fare is not available.` : "";
  return `${a.name} is based in ${a.home} and operates hubs at ${a.hubs.join(", ")}. ${a.summary}${alliance}`;
}

export function airlineWhyCall(a: Airline): string[] {
  return [
    `Comparing ${a.name} against other accepted carriers on your exact dates rather than checking one site at a time.`,
    ...a.strengths.map((s) => `Confirming ${s.toLowerCase()}.`),
    "Getting the total price — fare, taxes, seat and baggage — read back to you before you authorise payment.",
  ].slice(0, 6);
}

/** Deterministic "best day" copy, varied but never asserting a live price. */
export function bestDayLine(r: RouteData): string {
  const options = [
    "Mid-week departures, especially Tuesday and Wednesday, are historically the cheapest days to fly, and returning on a weekday beats returning on a Sunday.",
    "If your dates can move at all, shifting by a single day often changes the fare more than any promotion will. Saturday-night returns tend to price lower on business-heavy routes.",
    "Tuesday through Thursday departures usually undercut weekend departures, and early-morning flights are both cheaper and less likely to be delayed.",
  ];
  return pick(options, `${r.slug}-day`);
}

export function baggageLine(): string {
  return "Checked-bag rules differ sharply between carriers and fare brands. On the call, the agent confirms what your specific fare includes so the price you hear is the price you pay.";
}

export function changePolicyLine(): string {
  return "Change and cancellation terms are set by the fare you buy, not by the airline as a whole. Anything the agent quotes comes with the fare rules read back to you before payment, so there are no surprises later.";
}
