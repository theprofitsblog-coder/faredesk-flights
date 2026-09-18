export type City = {
  /** IATA airport code, used in the URL slug: new-york-jfk */
  code: string;
  /** City name as shown to users */
  city: string;
  /** State / province */
  region: string;
  /** ISO country code */
  country: "US" | "CA";
  /** Airport name (primary commercial airport) */
  airport: string;
  /** WGS-84 coordinates — used to compute real great-circle distances */
  lat: number;
  lon: number;
  /** Short, human label used in "nearby airports" copy */
  blurb: string;
};

/**
 * Curated airport list. Coordinates are the published ARP (airport reference
 * point) values, so every distance and flight-time figure on the site is
 * computed from real geography rather than invented.
 */
export const CITIES: City[] = [
  { code: "JFK", city: "New York", region: "NY", country: "US", airport: "John F. Kennedy International", lat: 40.6413, lon: -73.7781, blurb: "the largest international gateway on the East Coast" },
  { code: "LAX", city: "Los Angeles", region: "CA", country: "US", airport: "Los Angeles International", lat: 33.9416, lon: -118.4085, blurb: "the busiest airport on the West Coast" },
  { code: "ORD", city: "Chicago", region: "IL", country: "US", airport: "O'Hare International", lat: 41.9742, lon: -87.9073, blurb: "a major hub for both domestic and transatlantic flights" },
  { code: "DFW", city: "Dallas", region: "TX", country: "US", airport: "Dallas/Fort Worth International", lat: 32.8998, lon: -97.0403, blurb: "one of the largest airport complexes in the world" },
  { code: "DEN", city: "Denver", region: "CO", country: "US", airport: "Denver International", lat: 39.8561, lon: -104.6737, blurb: "the main gateway to the Rocky Mountains" },
  { code: "ATL", city: "Atlanta", region: "GA", country: "US", airport: "Hartsfield-Jackson Atlanta International", lat: 33.6407, lon: -84.4277, blurb: "the busiest airport in the world by passenger volume" },
  { code: "SFO", city: "San Francisco", region: "CA", country: "US", airport: "San Francisco International", lat: 37.6213, lon: -122.379, blurb: "the primary Bay Area airport for transpacific routes" },
  { code: "SEA", city: "Seattle", region: "WA", country: "US", airport: "Seattle-Tacoma International", lat: 47.4502, lon: -122.3088, blurb: "the Pacific Northwest's biggest hub" },
  { code: "LAS", city: "Las Vegas", region: "NV", country: "US", airport: "Harry Reid International", lat: 36.084, lon: -115.1537, blurb: "the busiest leisure destination airport in the US" },
  { code: "MCO", city: "Orlando", region: "FL", country: "US", airport: "Orlando International", lat: 28.4312, lon: -81.3081, blurb: "the gateway to Walt Disney World and Universal" },
  { code: "MIA", city: "Miami", region: "FL", country: "US", airport: "Miami International", lat: 25.7959, lon: -80.287, blurb: "the leading US gateway to Latin America and the Caribbean" },
  { code: "CLT", city: "Charlotte", region: "NC", country: "US", airport: "Charlotte Douglas International", lat: 35.2144, lon: -80.9473, blurb: "a major East Coast connecting hub" },
  { code: "PHX", city: "Phoenix", region: "AZ", country: "US", airport: "Phoenix Sky Harbor International", lat: 33.4373, lon: -112.0078, blurb: "the main airport serving the Valley of the Sun" },
  { code: "IAH", city: "Houston", region: "TX", country: "US", airport: "George Bush Intercontinental", lat: 29.9902, lon: -95.3368, blurb: "a large hub for both domestic and Latin American travel" },
  { code: "BOS", city: "Boston", region: "MA", country: "US", airport: "Boston Logan International", lat: 42.3656, lon: -71.0096, blurb: "New England's busiest airport" },
  { code: "MSP", city: "Minneapolis", region: "MN", country: "US", airport: "Minneapolis-Saint Paul International", lat: 44.8848, lon: -93.2223, blurb: "the Upper Midwest's largest hub" },
  { code: "DTW", city: "Detroit", region: "MI", country: "US", airport: "Detroit Metropolitan Wayne County", lat: 42.2124, lon: -83.3534, blurb: "a key transatlantic gateway in the Great Lakes region" },
  { code: "FLL", city: "Fort Lauderdale", region: "FL", country: "US", airport: "Fort Lauderdale-Hollywood International", lat: 26.0742, lon: -80.1506, blurb: "a popular low-cost alternative to Miami" },
  { code: "PHL", city: "Philadelphia", region: "PA", country: "US", airport: "Philadelphia International", lat: 39.8744, lon: -75.2424, blurb: "a transatlantic gateway between New York and Washington" },
  { code: "BWI", city: "Baltimore", region: "MD", country: "US", airport: "Baltimore/Washington International Thurgood Marshall", lat: 39.1754, lon: -76.6684, blurb: "a convenient mid-Atlantic departure point" },
  { code: "DCA", city: "Washington", region: "DC", country: "US", airport: "Ronald Reagan Washington National", lat: 38.8512, lon: -77.0402, blurb: "minutes from the National Mall and Capitol Hill" },
  { code: "SLC", city: "Salt Lake City", region: "UT", country: "US", airport: "Salt Lake City International", lat: 40.7899, lon: -111.9791, blurb: "the closest major airport to five national parks" },
  { code: "SAN", city: "San Diego", region: "CA", country: "US", airport: "San Diego International", lat: 32.7338, lon: -117.1933, blurb: "a downtown airport just minutes from the beach" },
  { code: "TPA", city: "Tampa", region: "FL", country: "US", airport: "Tampa International", lat: 27.9755, lon: -82.5332, blurb: "the gateway to Florida's Gulf Coast" },
  { code: "PDX", city: "Portland", region: "OR", country: "US", airport: "Portland International", lat: 45.5898, lon: -122.5951, blurb: "consistently rated one of the best US airports" },
  { code: "HNL", city: "Honolulu", region: "HI", country: "US", airport: "Daniel K. Inouye International", lat: 21.3187, lon: -157.9224, blurb: "the main arrival point for Oahu" },
  { code: "AUS", city: "Austin", region: "TX", country: "US", airport: "Austin-Bergstrom International", lat: 30.1945, lon: -97.6699, blurb: "a fast-growing hub for tech and music travel" },
  { code: "STL", city: "St. Louis", region: "MO", country: "US", airport: "St. Louis Lambert International", lat: 38.7487, lon: -90.370, blurb: "a central US departure point with short security lines" },
  { code: "SMF", city: "Sacramento", region: "CA", country: "US", airport: "Sacramento International", lat: 38.6954, lon: -121.5908, blurb: "a relaxed alternative to Bay Area airports" },
  { code: "BNA", city: "Nashville", region: "TN", country: "US", airport: "Nashville International", lat: 36.1245, lon: -86.6782, blurb: "one of the fastest-growing airports in the country" },
  { code: "RDU", city: "Raleigh-Durham", region: "NC", country: "US", airport: "Raleigh-Durham International", lat: 35.8776, lon: -78.7875, blurb: "serving the Research Triangle" },
  { code: "SJC", city: "San Jose", region: "CA", country: "US", airport: "Norman Y. Mineta San Jose International", lat: 37.3639, lon: -121.9289, blurb: "the closest airport to Silicon Valley" },
  { code: "MCI", city: "Kansas City", region: "MO", country: "US", airport: "Kansas City International", lat: 39.2976, lon: -94.7139, blurb: "a mid-continent hub with a single-terminal layout" },
  { code: "MSY", city: "New Orleans", region: "LA", country: "US", airport: "Louis Armstrong New Orleans International", lat: 29.9934, lon: -90.258, blurb: "the gateway to the French Quarter and beyond" },
  { code: "SAT", city: "San Antonio", region: "TX", country: "US", airport: "San Antonio International", lat: 29.5337, lon: -98.4698, blurb: "serving the River Walk and historic missions" },
  { code: "EWR", city: "Newark", region: "NJ", country: "US", airport: "Newark Liberty International", lat: 40.6895, lon: -74.1745, blurb: "a New York-area airport with strong European service" },
  { code: "MKE", city: "Milwaukee", region: "WI", country: "US", airport: "Milwaukee Mitchell International", lat: 42.9472, lon: -87.8966, blurb: "a smaller, easier alternative to Chicago-area airports" },
  { code: "ABQ", city: "Albuquerque", region: "NM", country: "US", airport: "Albuquerque International Sunport", lat: 35.0402, lon: -106.609, blurb: "the main airport of the high desert Southwest" },
  { code: "RSW", city: "Fort Myers", region: "FL", country: "US", airport: "Southwest Florida International", lat: 26.5362, lon: -81.7552, blurb: "serving Sanibel, Captiva and Naples" },
  { code: "ELP", city: "El Paso", region: "TX", country: "US", airport: "El Paso International", lat: 31.8072, lon: -106.3781, blurb: "a border gateway with connections across the Southwest" },
  { code: "TUS", city: "Tucson", region: "AZ", country: "US", airport: "Tucson International", lat: 32.1161, lon: -110.941, blurb: "serving southern Arizona and Saguaro National Park" },
  { code: "BOI", city: "Boise", region: "ID", country: "US", airport: "Boise Airport", lat: 43.5644, lon: -116.2228, blurb: "the entry point to Idaho's mountains and rivers" },
  { code: "OKC", city: "Oklahoma City", region: "OK", country: "US", airport: "Will Rogers World", lat: 35.3931, lon: -97.6007, blurb: "the largest airport in Oklahoma" },
  { code: "ANC", city: "Anchorage", region: "AK", country: "US", airport: "Ted Stevens Anchorage International", lat: 61.1743, lon: -149.9982, blurb: "the main gateway to Alaska" },
  { code: "SJU", city: "San Juan", region: "PR", country: "US", airport: "Luis Muñoz Marín International", lat: 18.4394, lon: -66.0018, blurb: "the busiest airport in the Caribbean" },
  { code: "BDL", city: "Hartford", region: "CT", country: "US", airport: "Bradley International", lat: 41.9389, lon: -72.6832, blurb: "serving Connecticut and western Massachusetts" },
  { code: "RIC", city: "Richmond", region: "VA", country: "US", airport: "Richmond International", lat: 37.5052, lon: -77.3197, blurb: "a mid-size Virginia airport with short walks to gates" },
  { code: "JAX", city: "Jacksonville", region: "FL", country: "US", airport: "Jacksonville International", lat: 30.4941, lon: -81.6879, blurb: "northeast Florida's largest airport" },
  { code: "SNA", city: "Orange County", region: "CA", country: "US", airport: "John Wayne Airport", lat: 33.6757, lon: -117.8682, blurb: "the quietest option for Disneyland and Newport Beach" },
  { code: "YYZ", city: "Toronto", region: "ON", country: "CA", airport: "Toronto Pearson International", lat: 43.6777, lon: -79.6248, blurb: "Canada's busiest airport" },
  { code: "YVR", city: "Vancouver", region: "BC", country: "CA", airport: "Vancouver International", lat: 49.1967, lon: -123.1815, blurb: "a leading transpacific gateway on the West Coast" },
  { code: "YUL", city: "Montreal", region: "QC", country: "CA", airport: "Montréal-Trudeau International", lat: 45.4706, lon: -73.7408, blurb: "Quebec's main international airport" },
  { code: "YYC", city: "Calgary", region: "AB", country: "CA", airport: "Calgary International", lat: 51.1215, lon: -114.0076, blurb: "the closest major airport to Banff" },
  { code: "YEG", city: "Edmonton", region: "AB", country: "CA", airport: "Edmonton International", lat: 53.3097, lon: -113.58, blurb: "northern Alberta's main air gateway" },
  { code: "YOW", city: "Ottawa", region: "ON", country: "CA", airport: "Ottawa Macdonald-Cartier International", lat: 45.3225, lon: -75.6692, blurb: "serving Canada's capital" },
  { code: "YHZ", city: "Halifax", region: "NS", country: "CA", airport: "Halifax Stanfield International", lat: 44.8808, lon: -63.5086, blurb: "the main airport of Atlantic Canada" },
];

export const CITY_BY_CODE = new Map(CITIES.map((c) => [c.code, c]));

export const cityLabel = (c: City) => `${c.city}, ${c.region}`;

/** URL-safe slug: "new-york-jfk", "washington-dca", "raleigh-durham-rdu" */
export const citySlug = (c: City) =>
  `${c.city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${c.code.toLowerCase()}`;

export const CITY_BY_SLUG = new Map(CITIES.map((c) => [citySlug(c), c]));
