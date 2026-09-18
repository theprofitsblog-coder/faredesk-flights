/**
 * Site-wide configuration.
 *
 * The only thing you normally need to change is SITE_URL — set the
 * NEXT_PUBLIC_SITE_URL environment variable in Vercel (Project → Settings →
 * Environment Variables) to your real domain and re-deploy so that canonical
 * URLs, Open Graph tags and the XML sitemap point at the live site.
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const SITE_URL = envUrl || "https://faredesk-flights.vercel.app";

export const SITE_NAME = "FareDesk";
export const SITE_TAGLINE = "Book flights by phone with a real agent";

/** The single published number for this campaign (toll-free, US/CA). */
export const PHONE_E164 = "+18557150929";
/** Human-readable rendering used in copy and headings. */
export const PHONE_DISPLAY = "(855) 715-0929";
/** Click-to-call href. */
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const SERVICE_HOURS = "24 hours a day, 7 days a week";
export const SERVICE_REGIONS = ["United States", "Canada"];

/**
 * Optional. Leave unset and the site never renders an email address, so it
 * can't advertise a mailbox that nobody reads. Set it once a real inbox exists.
 */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

/**
 * Google Search Console ownership token.
 *
 * Hardcoded as a fallback on purpose: if it lived only in an env var, forgetting
 * to set it on a fresh Vercel project would silently drop the tag and Google
 * would de-verify the property. Override via env if you ever rotate it.
 *
 * Do NOT remove — GSC requires the tag to stay present after verification.
 */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "SkgM39tmMN7IwoO9fmQ15cVKVY-Zh43_cw6iTvOATO4";

export const DEFAULT_DESCRIPTION = `${SITE_NAME} is an independent flight booking service. Call ${PHONE_DISPLAY} any time, day or night, and a US-based travel agent will price and book your flight with Delta, United, American, Southwest, Alaska and other major carriers.`;

/**
 * Honest disclosure required on every page. Keeps the site compliant with
 * the offer rules and with FTC guidance on endorsements/affiliate links.
 */
export const AFFILIATE_DISCLOSURE =
  "FareDesk is an independent travel booking service. We are not an airline, and we are not affiliated with, endorsed by, or sponsored by any of the airlines named on this site. Airline names and trademarks are the property of their respective owners and are used only to describe the fares our agents can book. We may receive compensation when you complete a booking.";
