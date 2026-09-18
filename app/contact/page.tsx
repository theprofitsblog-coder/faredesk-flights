import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { PhoneIcon } from "@/components/icons";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_E164, PHONE_HREF, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us — Talk to a Travel Agent",
  description: `Reach ${SITE_NAME} by phone at ${PHONE_DISPLAY}. The line is toll-free from the United States and Canada and open 24 hours a day, 7 days a week.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Contact us</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        The fastest way to reach a travel agent is by phone. The line is toll-free and staffed around
        the clock, so there is no reason to wait for business hours.
      </p>

      <div className="card mt-8 border-accent-300 bg-accent-50 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-navy-600">
          Book or ask a question
        </p>
        <a
          href={PHONE_HREF}
          data-call-source="contact-page"
          className="mt-3 inline-flex items-center gap-3 text-4xl font-extrabold text-navy-900 hover:text-navy-700 sm:text-5xl"
        >
          <PhoneIcon className="h-10 w-10 text-accent-600" />
          {PHONE_DISPLAY}
        </a>
        <p className="mt-4 text-navy-700">Open 24 hours a day, 7 days a week</p>
        <a href={PHONE_HREF} data-call-source="contact-page-button" className="cta-primary mt-5 w-full sm:w-auto">
          <PhoneIcon />
          Call now
        </a>
      </div>

      <div className="prose-copy mt-12">
        <h2 className="mb-3 text-2xl font-bold">Before you call</h2>
        <p>
          Have your departure and arrival cities, your travel dates and the number of passengers to
          hand. If your dates have any flexibility at all, mention it — it is usually the biggest
          lever on price. Each passenger's legal name should match the ID or passport they will
          travel with.
        </p>
        <p>
          There is no charge for the call and no obligation to book. If a fare is not worth taking,
          the agent will tell you.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-bold">What we can help with</h2>
        <ul>
          <li>Domestic flights within the United States and Canada</li>
          <li>Transborder flights between the US and Canada</li>
          <li>International itineraries into Europe, the Middle East, Asia-Pacific, Latin America and the Caribbean</li>
          <li>Group bookings and multi-city or open-jaw itineraries</li>
          <li>Changes to an existing booking made through us</li>
          <li>Seat assignments, checked baggage and special assistance requests</li>
        </ul>

        {CONTACT_EMAIL && (
          <>
            <h2 className="mb-3 mt-8 text-2xl font-bold">Email</h2>
            <p>
              For non-urgent enquiries you can write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-navy-700 underline">
                {CONTACT_EMAIL}
              </a>
              . Phone is still faster for anything time-sensitive, since fares change throughout the
              day.
            </p>
          </>
        )}

        <h2 className="mb-3 mt-8 text-2xl font-bold">Who you are talking to</h2>
        <p>
          {SITE_NAME} is an independent travel booking service. We are not an airline and we are not
          affiliated with, endorsed by or sponsored by any of the carriers named on this site. We
          book their published fares on your behalf, the same way a travel agency always has.
        </p>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${SITE_URL}/contact/`,
          url: `${SITE_URL}/contact/`,
          name: "Contact Us",
          mainEntity: {
            "@type": "Organization",
            name: SITE_NAME,
            telephone: PHONE_E164,
            url: SITE_URL,
          },
        }}
      />
    </div>
  );
}
