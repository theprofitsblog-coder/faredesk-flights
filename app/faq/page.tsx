import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CallCta from "@/components/CallCta";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import type { Faq } from "@/lib/content";
import { PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Booking Flights by Phone",
  description: `Answers to the most common questions about booking flights over the phone with ${SITE_NAME}: cost, hours, coverage, changes, baggage and documents. Call ${PHONE_DISPLAY}, open 24/7.`,
  alternates: { canonical: "/faq" },
};

const SECTIONS: Array<{ title: string; note?: string; items: Faq[] }> = [
  {
    title: "Calling and cost",
    items: [
      {
        q: "Does it cost anything to call?",
        a: `No. The call to ${PHONE_DISPLAY} is toll-free from the United States and Canada, and there is no fee to speak with an agent or to get a quote. You only pay for the airfare you decide to book, and the total is quoted to you before payment is taken.`,
      },
      {
        q: "What hours are you open?",
        a: "24 hours a day, 7 days a week, including weekends and public holidays.",
      },
      {
        q: "Where can I call from?",
        a: "Anywhere in the United States or Canada. The number is toll-free, so standard long-distance charges do not apply.",
      },
      {
        q: "Do I have to book if I call?",
        a: "No. Getting a quote is free and there is no obligation. Plenty of calls end with the agent telling someone that waiting a few days is the better move.",
      },
    ],
  },
  {
    title: "Airlines and routes",
    items: [
      {
        q: "Which airlines can you book?",
        a: "Fifteen carriers: Delta, United, American, Southwest, Alaska, Hawaiian, Air Canada, British Airways, Lufthansa, Air France, KLM, Qatar Airways, Emirates, Etihad and Norwegian. Agents search them together rather than one at a time.",
      },
      {
        q: "Can you book flights outside the United States and Canada?",
        a: "Yes. Departures are from the US and Canada, but destinations include Europe, the Middle East, Asia-Pacific, Latin America and the Caribbean, connecting through the relevant carrier's hub.",
      },
      {
        q: "What if my city is not on your list?",
        a: "The site covers a subset of airports for reference. Agents book departures from airports well beyond that list — call and ask.",
      },
      {
        q: "Are you an airline?",
        a: `No. ${SITE_NAME} is an independent travel booking service. We are not affiliated with, endorsed by or sponsored by any of the airlines named on this site. Airline names are used only to describe the fares our agents can book.`,
      },
    ],
  },
  {
    title: "Fares, baggage and changes",
    items: [
      {
        q: "Is a phone booking more expensive than booking online?",
        a: "Not as a rule. You pay the published fare, and the agent's job is to find the cheapest itinerary that fits your dates — including options a single-airline site will never show you.",
      },
      {
        q: "When is the cheapest time to book?",
        a: "For most domestic routes, three to seven weeks out balances availability against price. Thin routes and holiday travel reward booking earlier. Fares move constantly, so a live search on your actual dates is the only reliable answer.",
      },
      {
        q: "What about checked bags?",
        a: "Allowance depends on the carrier and the fare brand you buy, not the airline overall. The agent confirms exactly what your fare includes before you pay.",
      },
      {
        q: "Can I change or cancel later?",
        a: "That is set by the fare rules of the ticket you buy, and they are read back to you before payment. If you need to make a change, call the same line and an agent handles it.",
      },
      {
        q: "Can you book for a group?",
        a: "Yes, and it is one of the best reasons to call. Keeping a group on one flight at one fare is hard to do through a consumer search site, because fare buckets sell out at different quantities.",
      },
    ],
  },
  {
    title: "Documents and travel requirements",
    items: [
      {
        q: "What identification do I need?",
        a: "For domestic US travel, a government-issued photo ID with the name matching your ticket exactly. For international travel, a valid passport — and depending on your citizenship, a visa or electronic travel authorization.",
      },
      {
        q: "Can you help with entry requirements?",
        a: "Agents confirm current entry requirements for your nationality at the time of booking. Requirements do change, so it is worth confirming close to departure as well.",
      },
      {
        q: "What about travelling with children or infants?",
        a: "Mention it at the start of the call. Lap-infant rules, child fares, unaccompanied-minor procedures and age limits all vary by carrier, and getting it right at booking avoids problems at the gate.",
      },
      {
        q: "Can you arrange wheelchair or medical assistance?",
        a: "Yes. Assistance requests are added to the booking during the call, and the agent confirms what the carrier can provide at each airport on your itinerary.",
      },
    ],
  },
];

export default function FaqPage() {
  const all = SECTIONS.flatMap((s) => s.items);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Frequently asked questions</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        Everything people usually ask before calling {PHONE_DISPLAY}. If your question is not here,
        the line is open 24/7 and asking costs nothing.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="FAQ sections">
        {SECTIONS.map((s, i) => (
          <a
            key={s.title}
            href={`#section-${i}`}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
          >
            {s.title}
          </a>
        ))}
      </nav>

      {SECTIONS.map((s, i) => (
        <section key={s.title} id={`section-${i}`} className="mt-12 scroll-mt-24">
          <h2 className="mb-5 text-2xl font-bold">{s.title}</h2>
          <FaqSection items={s.items} />
        </section>
      ))}

      <div className="mt-12">
        <CallCta
          source="faq-page"
          headline="Still not sure about something?"
          sub={`Call ${PHONE_DISPLAY} and just ask. There is no charge and no obligation to book.`}
        />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE_URL}/faq/#faqpage`,
          mainEntity: all.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </div>
  );
}
