import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AFFILIATE_DISCLOSURE, CONTACT_EMAIL, PHONE_DISPLAY, SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use the ${SITE_NAME} website or book a flight through ${PHONE_DISPLAY}.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const UPDATED = "September 2026";

const SECTIONS: Array<{ h: string; p: string[] }> = [
  {
    h: "1. What this site is",
    p: [
      `${SITE_NAME} is an independent travel booking service. This website provides route information and connects travellers with travel agents who book air tickets on their behalf.`,
      "We are not an airline and we do not operate aircraft. We are not affiliated with, endorsed by or sponsored by any of the airlines named on this site. Airline names and trademarks belong to their respective owners and are used only to describe the fares our agents can book.",
    ],
  },
  {
    h: "2. Route information on this site",
    p: [
      "Distances shown on route pages are great-circle measurements between published airport reference points. Flight durations are typical scheduled block times, calculated as an approximation, and are not a promise of any specific schedule.",
      "Schedules, fares, availability, baggage rules and entry requirements change constantly. Nothing on this website constitutes an offer to sell a specific fare at a specific price. The only binding quotation is the one an agent gives you on the call, and it is valid only at the moment it is given.",
    ],
  },
  {
    h: "3. Booking and payment",
    p: [
      "When you book by phone, the agent will quote a total price including fare, taxes and any optional services you request, and will read back the fare rules before payment is taken. Payment is authorised by you during the call.",
      "Once a ticket is issued, your contract of carriage is with the operating airline, not with us. The fare rules attached to your ticket govern changes, cancellations and refunds.",
    ],
  },
  {
    h: "4. Changes, cancellations and refunds",
    p: [
      "Change and refund terms are set by the fare you purchase. Some fares are non-refundable and non-changeable, and some carriers charge change fees in addition to any fare difference.",
      "If you need to change or cancel a booking made through us, call the same line. We cannot override the fare rules you agreed to at the time of booking.",
      "In the event of a schedule change, cancellation or disruption by the airline, the airline's own policies and your contract of carriage determine what remedies are available.",
    ],
  },
  {
    h: "5. Travel documents and entry requirements",
    p: [
      "You are responsible for holding valid travel documents, including passports, visas and any electronic travel authorization required for your itinerary, and for meeting the entry requirements of every country you travel to or through.",
      "Agents can advise on requirements at the time of booking, but requirements change and the final responsibility rests with the traveller. Carriers may deny boarding where documents are not in order, and fares are typically not refundable in that situation.",
    ],
  },
  {
    h: "6. Compensation disclosure",
    p: [AFFILIATE_DISCLOSURE],
  },
  {
    h: "7. Use of this website",
    p: [
      "You may use this website for personal, non-commercial purposes. You may not scrape, copy or republish its content at scale, interfere with its operation, or use it in any way that is unlawful or misleading.",
      "Content is provided as-is. We do not warrant that it is complete, current or free of errors.",
    ],
  },
  {
    h: "8. Limitation of liability",
    p: [
      "To the maximum extent permitted by law, we are not liable for indirect, incidental or consequential losses arising from your use of this website or from a booking, including losses caused by airline schedule changes, cancellations, missed connections, denied boarding or entry refusal.",
      "Nothing in these terms limits liability that cannot lawfully be limited, including liability for fraud or for death or personal injury caused by negligence.",
    ],
  },
  {
    h: "9. Changes to these terms",
    p: [
      `These terms were last updated in ${UPDATED}. We may update them from time to time; the current version is always the one posted on this page.`,
    ],
  },
  {
    h: "10. Contact",
    p: [
      `Questions about these terms can be directed to us by phone at ${PHONE_DISPLAY}${CONTACT_EMAIL ? ` or by email at ${CONTACT_EMAIL}` : ""}. The line is open 24 hours a day, 7 days a week.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Terms of service", url: "/terms" },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight">Terms of service</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {UPDATED}</p>

      <div className="prose-copy mt-8">
        {SECTIONS.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="mb-3 text-xl font-bold">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
