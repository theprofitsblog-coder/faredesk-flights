export type Airline = {
  slug: string;
  name: string;
  /** ICAO-style short code used in copy ("DL") */
  code: string;
  alliance: string | null;
  home: string;
  /** Major hub / focus cities — used for genuinely useful route copy */
  hubs: string[];
  /** Fleet + service tier in one short, verifiable line */
  summary: string;
  /** What an agent can realistically help with on this carrier */
  strengths: string[];
  /** True when the carrier is primarily international from North America */
  international: boolean;
};

/**
 * Only the carriers on the offer's accepted airline list appear here.
 * Facts are kept deliberately high-level (hubs, alliance, home base) so the
 * pages stay accurate; live availability and pricing are always confirmed by
 * the agent on the call.
 */
export const AIRLINES: Airline[] = [
  {
    slug: "delta",
    name: "Delta Air Lines",
    code: "DL",
    alliance: "SkyTeam",
    home: "Atlanta, Georgia",
    hubs: ["Atlanta (ATL)", "Detroit (DTW)", "Minneapolis (MSP)", "Salt Lake City (SLC)", "Seattle (SEA)", "New York (JFK/LGA)", "Los Angeles (LAX)", "Boston (BOS)"],
    summary: "One of the largest US network carriers, with deep domestic coverage and a strong joint-venture network across the Atlantic and Pacific.",
    strengths: ["Nonstop coverage from eight major US hubs", "Comfort+ and Delta One premium cabins", "Strong connections into Europe with Air France and KLM", "Same-day confirmed changes at the gate"],
    international: false,
  },
  {
    slug: "united",
    name: "United Airlines",
    code: "UA",
    alliance: "Star Alliance",
    home: "Chicago, Illinois",
    hubs: ["Chicago (ORD)", "Denver (DEN)", "Houston (IAH)", "Newark (EWR)", "San Francisco (SFO)", "Washington (IAD)", "Los Angeles (LAX)"],
    summary: "A global carrier with the widest transpacific network of any US airline and major hubs on both coasts.",
    strengths: ["Extensive Asia-Pacific service from San Francisco and Los Angeles", "Polaris business class on long-haul routes", "Seven US hubs for easy re-routes", "Premium Plus economy on widebody flights"],
    international: false,
  },
  {
    slug: "american",
    name: "American Airlines",
    code: "AA",
    alliance: "oneworld",
    home: "Fort Worth, Texas",
    hubs: ["Charlotte (CLT)", "Chicago (ORD)", "Dallas/Fort Worth (DFW)", "Miami (MIA)", "Philadelphia (PHL)", "Phoenix (PHX)", "Washington (DCA)", "Los Angeles (LAX)"],
    summary: "The world's largest airline by scheduled seats, and the strongest US network into Latin America and the Caribbean.",
    strengths: ["Best-in-class service to Mexico, Central and South America", "Eight US hubs, including the largest at DFW", "Flagship business class on long-haul", "Frequent short-haul premium transcon service"],
    international: false,
  },
  {
    slug: "southwest",
    name: "Southwest Airlines",
    code: "WN",
    alliance: null,
    home: "Dallas, Texas",
    hubs: ["Dallas (DAL)", "Chicago (MDW)", "Denver (DEN)", "Las Vegas (LAS)", "Baltimore (BWI)", "Phoenix (PHX)", "Houston (HOU)", "Oakland (OAK)"],
    summary: "The largest low-cost carrier in the US, known for two free checked bags and a straightforward fare structure.",
    strengths: ["No change fees on any fare", "Two free checked bags included", "Point-to-point routes that skip big hubs", "Frequent fare sales on leisure routes"],
    international: false,
  },
  {
    slug: "alaska",
    name: "Alaska Airlines",
    code: "AS",
    alliance: "oneworld",
    home: "Seattle, Washington",
    hubs: ["Seattle (SEA)", "Portland (PDX)", "San Francisco (SFO)", "Los Angeles (LAX)", "San Diego (SAN)", "Anchorage (ANC)"],
    summary: "A West Coast carrier with the dominant network into Alaska and some of the most valuable partner award redemptions in the industry.",
    strengths: ["Unmatched service within and to Alaska", "Strong West Coast transcon schedule", "Highly rated guest service and on-time record", "Premium class on most routes"],
    international: false,
  },
  {
    slug: "hawaiian",
    name: "Hawaiian Airlines",
    code: "HA",
    alliance: null,
    home: "Honolulu, Hawaii",
    hubs: ["Honolulu (HNL)", "Kahului (OGG)", "Kona (KOA)", "Lihue (LIH)"],
    summary: "Hawaii's largest carrier and the only airline serving every major island with scheduled service.",
    strengths: ["Mainland-to-Hawaii nonstops from the West Coast", "Inter-island hops between Oahu, Maui, Kauai and Hawaii Island", "Extra Legroom seating on most widebodies", "Strong schedule during peak holiday periods"],
    international: false,
  },
  {
    slug: "air-canada",
    name: "Air Canada",
    code: "AC",
    alliance: "Star Alliance",
    home: "Montreal, Quebec",
    hubs: ["Toronto (YYZ)", "Montreal (YUL)", "Vancouver (YVR)", "Calgary (YYC)"],
    summary: "Canada's flag carrier and largest airline, with dense transborder service into the US and a broad global network.",
    strengths: ["The widest selection of Canada-to-US routes", "Maple Leaf lounges and Signature Class on long-haul", "Strong connections into Europe, Asia and South America", "Aeroplan redemptions on partner airlines"],
    international: true,
  },
  {
    slug: "british-airways",
    name: "British Airways",
    code: "BA",
    alliance: "oneworld",
    home: "London, United Kingdom",
    hubs: ["London Heathrow (LHR)", "London Gatwick (LGW)"],
    summary: "The UK flag carrier, operating multiple daily flights from most major US gateways into London and onward.",
    strengths: ["Multiple daily London departures from New York, Boston, Chicago and Los Angeles", "Connections across Europe, Africa and Asia via Heathrow", "Club World business class and First on key routes", "Often competitive on transatlantic premium fares"],
    international: true,
  },
  {
    slug: "lufthansa",
    name: "Lufthansa",
    code: "LH",
    alliance: "Star Alliance",
    home: "Cologne, Germany",
    hubs: ["Frankfurt (FRA)", "Munich (MUC)"],
    summary: "Germany's flag carrier and one of the largest transatlantic operators into central Europe.",
    strengths: ["Two strong European hubs for onward connections", "Wide US network beyond the biggest gateways", "Business and First class with dedicated terminals", "Frequent fare sales into Germany and central Europe"],
    international: true,
  },
  {
    slug: "air-france",
    name: "Air France",
    code: "AF",
    alliance: "SkyTeam",
    home: "Tremblay-en-France",
    hubs: ["Paris Charles de Gaulle (CDG)", "Paris Orly (ORY)"],
    summary: "France's flag carrier, connecting North America to Paris and on to Africa, the Middle East and Asia.",
    strengths: ["Multiple daily Paris departures from several US cities", "Premium Economy and Business on all long-haul", "Excellent onward network into Africa", "Joint transatlantic pricing with Delta and KLM"],
    international: true,
  },
  {
    slug: "klm",
    name: "KLM Royal Dutch Airlines",
    code: "KL",
    alliance: "SkyTeam",
    home: "Amstelveen, Netherlands",
    hubs: ["Amsterdam Schiphol (AMS)"],
    summary: "The Netherlands' flag carrier, running a single-hub operation through Amsterdam that makes tight connections easy.",
    strengths: ["One terminal hub keeps connections short", "Broad US departure list for a single-hub carrier", "Consistently high on-time performance", "Combined SkyTeam inventory with Delta and Air France"],
    international: true,
  },
  {
    slug: "qatar",
    name: "Qatar Airways",
    code: "QR",
    alliance: "oneworld",
    home: "Doha, Qatar",
    hubs: ["Doha Hamad International (DOH)"],
    summary: "A Gulf carrier frequently rated among the world's best, with an efficient Doha hub linking North America to Asia, Africa and Oceania.",
    strengths: ["Qsuite business class on most long-haul aircraft", "Strong fares into India, Southeast Asia and Africa", "Excellent hub with short minimum connection times", "Fifth-freedom and partner options out of Doha"],
    international: true,
  },
  {
    slug: "emirates",
    name: "Emirates",
    code: "EK",
    alliance: null,
    home: "Dubai, United Arab Emirates",
    hubs: ["Dubai International (DXB)"],
    summary: "One of the world's largest international airlines, operating an all-widebody fleet through its Dubai hub.",
    strengths: ["A380 service from select US gateways", "Strong connectivity into India, the Middle East and Asia", "Generous checked baggage allowance on most fares", "Competitive premium cabin pricing on long sectors"],
    international: true,
  },
  {
    slug: "etihad",
    name: "Etihad Airways",
    code: "EY",
    alliance: null,
    home: "Abu Dhabi, United Arab Emirates",
    hubs: ["Zayed International Airport (AUH)"],
    summary: "The national airline of the UAE, connecting North America to the Middle East, South Asia, Africa and Australia via Abu Dhabi.",
    strengths: ["Business Studio with direct aisle access", "Free or discounted Abu Dhabi stopover options", "Strong fares into India and Southeast Asia", "Newer terminal at Zayed International"],
    international: true,
  },
  {
    slug: "norwegian",
    name: "Norwegian Air Shuttle",
    code: "DY",
    alliance: null,
    home: "Oslo, Norway",
    hubs: ["Oslo Gardermoen (OSL)"],
    summary: "A Nordic low-cost carrier based in Oslo. Its route network is restructured regularly, so an agent always confirms current schedules before booking.",
    strengths: ["Low base fares on published routes", "Simple one-way pricing for flexible itineraries", "Nordic and European coverage from Oslo", "Agents verify live availability before anything is ticketed"],
    international: true,
  },
];

export const AIRLINE_BY_SLUG = new Map(AIRLINES.map((a) => [a.slug, a]));

/** Carriers our agents book most often for domestic US/Canada travel. */
export const DOMESTIC_AIRLINES = AIRLINES.filter((a) => !a.international);
export const INTERNATIONAL_AIRLINES = AIRLINES.filter((a) => a.international);
