import { AIRLINES, type Airline } from "./airlines";
import { CITIES, cityLabel, citySlug, type City } from "./cities";

/**
 * Everything on a route page that is *derived from real data* rather than
 * invented copy. Distances are great-circle; durations are distance over an
 * average block speed plus taxi allowances, which is how scheduled times are
 * approximated in the industry.
 */

const EARTH_RADIUS_MI = 3958.8;
const DOMESTIC_CARRIERS = AIRLINES.filter((a) => !a.international);

export function greatCircleMiles(a: City, b: City): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(h));
}

export function distanceBand(miles: number) {
  if (miles < 400) return "short-haul";
  if (miles < 900) return "medium-haul";
  if (miles < 1800) return "transcontinental-range";
  return "long-haul";
}

/** Scheduled block time ≈ airborne time + taxi-out/in. */
export function blockMinutes(miles: number): number {
  const cruiseMph = 470;
  const airborne = miles / cruiseMph;
  const groundHours = miles < 500 ? 0.55 : 0.45;
  return Math.round((airborne + groundHours) * 60);
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export function formatMiles(miles: number): string {
  return miles.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/** UTC offset by state/province. AZ and HI do not observe DST; PR is AST. */
const TZ_OFFSET: Record<string, number> = {
  NY: -5, DC: -5, CT: -5, MA: -5, MD: -5, NJ: -5, NC: -5, GA: -5, FL: -5, PA: -5, VA: -5, PR: -4,
  IL: -6, TX: -6, MN: -6, WI: -6, MO: -6, LA: -6, AL: -6, OK: -6, TN: -6,
  CO: -7, AZ: -7, UT: -7, NM: -7,
  CA: -8, NV: -8, OR: -8, WA: -8,
  HI: -10, AK: -9,
  ON: -5, QC: -5, NS: -4, AB: -7, BC: -8,
};

export function tzOffsetHours(a: City, b: City): number {
  return (TZ_OFFSET[b.region] ?? 0) - (TZ_OFFSET[a.region] ?? 0);
}

export function tzLabel(offset: number): string {
  if (offset === 0) return "in the same time zone as your departure";
  const dir = offset > 0 ? "ahead of" : "behind";
  return `${Math.abs(offset)} hour${Math.abs(offset) === 1 ? "" : "s"} ${dir} your departure time zone`;
}

export type RouteData = {
  origin: City;
  destination: City;
  slug: string;
  miles: number;
  km: number;
  minutes: number;
  duration: string;
  band: string;
  tzOffset: number;
  isTransborder: boolean;
  nonstopLikely: boolean;
};

export function routeData(origin: City, destination: City): RouteData {
  const miles = greatCircleMiles(origin, destination);
  const minutes = blockMinutes(miles);
  return {
    origin,
    destination,
    slug: `${citySlug(origin)}-to-${citySlug(destination)}`,
    miles,
    km: Math.round(miles * 1.60934),
    minutes,
    duration: formatDuration(minutes),
    band: distanceBand(miles),
    tzOffset: tzOffsetHours(origin, destination),
    isTransborder: origin.country !== destination.country,
    nonstopLikely: miles < 1600,
  };
}

/** Deterministic hash — stable page-to-page variation instead of identical copy. */
export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function pick<T>(arr: readonly T[], seed: string): T {
  return arr[hashString(seed) % arr.length];
}

/** Alternate airports in the same metro, for honest "nearby airport" copy. */
const METRO_SIBLINGS: Record<string, string[]> = {
  JFK: ["EWR"],
  EWR: ["JFK"],
  LAX: ["SNA"],
  SNA: ["LAX"],
  ORD: ["MKE"],
  MKE: ["ORD"],
  MIA: ["FLL"],
  FLL: ["MIA"],
  DCA: ["BWI"],
  BWI: ["DCA"],
  SFO: ["SJC"],
  SJC: ["SFO"],
  YYZ: ["YOW"],
};

export function nearbyAirports(city: City): City[] {
  return (METRO_SIBLINGS[city.code] ?? [])
    .map((code) => CITIES.find((c) => c.code === code))
    .filter((c): c is City => Boolean(c));
}

/**
 * Which accepted carriers plausibly cover a route, based on hub overlap.
 * Copy derived from this never claims a specific nonstop exists — only which
 * networks our agents can search.
 */
export function likelyCarriers(r: RouteData): Airline[] {
  const pair = [r.origin, r.destination];
  const overlap = (a: Airline) => a.hubs.some((h) => pair.some((c) => h.includes(`(${c.code}`)));

  const pool = r.isTransborder
    ? [...DOMESTIC_CARRIERS.filter(overlap), AIRLINES.find((a) => a.slug === "air-canada")!].filter(
        (a, i, self) => a && self.indexOf(a) === i
      )
    : DOMESTIC_CARRIERS;

  const serving = pool.filter(overlap).sort((x, y) => y.hubs.length - x.hubs.length);
  if (serving.length >= 2) return serving.slice(0, 4);

  const rest = pool.filter((a) => !serving.includes(a));
  return [...serving, ...rest].slice(0, 4);
}

export function routeTitle(r: RouteData): string {
  return `${r.origin.city} (${r.origin.code}) to ${r.destination.city} (${r.destination.code}) Flights`;
}

/** Hierarchical URL: /flights/new-york-jfk/los-angeles-lax */
export function routeUrl(r: { origin: City; destination: City }): string {
  return `/flights/${citySlug(r.origin)}/${citySlug(r.destination)}`;
}

export function cityUrl(c: City): string {
  return `/flights/${citySlug(c)}`;
}

export function routeBreadcrumb(r: RouteData) {
  return [
    { name: "Home", url: "/" },
    { name: "Flight Routes", url: "/flights" },
    { name: `${r.origin.city} flights`, url: cityUrl(r.origin) },
    { name: `${r.origin.city} to ${r.destination.city}`, url: routeUrl(r) },
  ];
}

/** Routes of similar length from the same origin / to the same destination. */
export function relatedRoutes(r: RouteData) {
  const fromOrigin = CITIES.filter((c) => c.code !== r.destination.code && c.code !== r.origin.code)
    .map((destination) => ({ origin: r.origin, destination, miles: greatCircleMiles(r.origin, destination) }))
    .sort((a, b) => Math.abs(a.miles - r.miles) - Math.abs(b.miles - r.miles))
    .slice(0, 6);

  const toDestination = CITIES.filter((c) => c.code !== r.origin.code && c.code !== r.destination.code)
    .map((origin) => ({ origin, destination: r.destination, miles: greatCircleMiles(origin, r.destination) }))
    .sort((a, b) => Math.abs(a.miles - r.miles) - Math.abs(b.miles - r.miles))
    .slice(0, 6);

  return { fromOrigin, toDestination };
}

/**
 * "Popular" destinations ordered by real traffic weight, not just distance —
 * the codes below are the highest-volume airports in the list, so hub cities
 * surface first and small spokes come last.
 */
const TRAFFIC_WEIGHT = [
  "ATL", "DFW", "DEN", "ORD", "LAX", "CLT", "LAS", "PHX", "MCO", "SEA",
  "MIA", "JFK", "SFO", "IAH", "BOS", "MSP", "FLL", "DTW", "PHL", "LGA",
  "BWI", "DCA", "SAN", "TPA", "PDX", "HNL", "SLC", "BNA", "AUS", "YYZ",
];

export function popularRoutesFor(city: City) {
  const weight = (code: string) => {
    const i = TRAFFIC_WEIGHT.indexOf(code);
    return i === -1 ? TRAFFIC_WEIGHT.length : i;
  };

  return CITIES.filter((c) => c.code !== city.code)
    .map((destination) => ({
      origin: city,
      destination,
      miles: greatCircleMiles(city, destination),
    }))
    .sort(
      (a, b) =>
        weight(a.destination.code) - weight(b.destination.code) || a.miles - b.miles
    )
    .slice(0, 14);
}

export function cityDisplayName(c: City) {
  return cityLabel(c);
}
