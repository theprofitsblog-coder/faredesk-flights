import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CallCta from "@/components/CallCta";
import FaqSection from "@/components/FaqSection";
import FeatureList from "@/components/FeatureList";
import JsonLd from "@/components/JsonLd";
import { PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "How It Works — Booking a Flight by Phone",
  description: `A plain-English walkthrough of booking a flight over the phone with ${SITE_NAME}: what to have ready, what the agent does, what it costs and what happens after you pay. Call ${PHONE_DISPLAY}, open 24/7.`,
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    n: "1",
    title: "Dial the number",
    body: `Call ${PHONE_DISPLAY}. It is a toll-free line and there is no charge to speak with an agent, whether or not you end up booking. The line is staffed 24 hours a day, 7 days a week, from anywhere in the United States or Canada.`,
  },
  {
    n: "2",
    title: "Describe the trip",
    body: "Give the agent your departure and arrival cities, your travel dates, and how many people are travelling. If your dates can move by a day or two, say so up front — flexibility is usually the single biggest factor in what the fare comes out to.",
  },
  {
    n: "3",
    title: "Hear your options",
    body: "The agent searches the full accepted carrier list on your dates and reads back the itineraries that fit: departure times, connections, cabin, baggage allowance and the total price including taxes. Nothing is booked yet.",
  },
  {
    n: "4",
    title: "Choose and confirm",
    body: "Pick the itinerary you want. The agent repeats the total cost and the fare rules — including what happens if you need to change or cancel — and only then takes payment.",
  },
  {
    n: "5",
    title: "Receive your confirmation",
    body: "Your booking confirmation and e-ticket are issued directly to you, with the airline record locator you will need at check-in. Seat assignments and checked bags confirmed on the call are already attached.",
  },
];

const READY = [
  "Departure and arrival cities — airport codes if you have them, city names if not",
  "Travel dates, plus one or two flexible alternatives if your plans allow",
  "Number of passengers, with each traveller's legal name exactly as it appears on their government ID or passport",
  "Date of birth for any infant or child travelling",
  "A debit or credit card for payment",
  "Any assistance needed — wheelchair, medical equipment, travelling with an infant, unaccompanied minor",
  "Frequent flyer numbers, if you want miles credited",
];

const PROCESS_FAQS = [
  {
    q: "Is there a charge for calling?",
    a: `No. The call to ${PHONE_DISPLAY} is toll-free and there is no fee to speak with an agent or to get a quote. You only pay for the airfare itself, and the total is quoted to you before anything is charged.`,
  },
  {
    q: "What hours is the line open?",
    a: "24 hours a day, 7 days a week, including weekends and public holidays. Fares move around the clock, so being able to call at 2am is genuinely useful.",
  },
  {
    q: "Do I need to know exactly what I want before I call?",
    a: "No. A rough idea of where you want to go and roughly when is enough. Agents work through dates and routings with people all the time, and suggesting a cheaper alternative is part of the job.",
  },
  {
    q: "Can you book for a group?",
    a: "Yes. Group bookings are one of the strongest reasons to call — keeping six or eight people on the same flight and the same fare bucket is difficult to do through a consumer search site.",
  },
  {
    q: "Can you book international flights?",
    a: "Yes. Agents book transborder routes into Canada as well as transatlantic, Middle East and Asia-Pacific itineraries. They will also confirm the passport and entry requirements for your nationality before you pay.",
  },
  {
    q: "What if I need to change my flight later?",
    a: "Change terms belong to the fare you bought, and they are read back to you before payment so you know what you are agreeing to. If you do need to change something, call the same line and an agent handles it.",
  },
  {
    q: "Are you an airline?",
    a: `No. ${SITE_NAME} is an independent travel booking service. We are not affiliated with, endorsed by or sponsored by any of the airlines named on this site — we book their published fares on your behalf, the same way a travel agency always has.`,
  },
  {
    q: "How is my payment information handled?",
    a: "Payment details are taken over the phone and passed to the ticketing provider to issue your ticket. We do not publish or sell your payment information. See our privacy policy for the details of what is collected and why.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "How it works", url: "/how-it-works" },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">How booking by phone works</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        Five steps, one phone call, no forms. Here is exactly what happens when you dial{" "}
        {PHONE_DISPLAY}, what to have in front of you, and what you will be charged.
      </p>

      <ol className="mt-10 space-y-5">
        {STEPS.map((s) => (
          <li key={s.n} className="card flex gap-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-500 text-lg font-bold text-navy-950">
              {s.n}
            </span>
            <div>
              <h2 className="text-lg font-bold text-navy-900">{s.title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <CallCta source="how-it-works-mid" />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">What to have ready</h2>
          <p className="mt-2 text-slate-600">
            None of this is mandatory — you can call with just a destination and a rough date — but
            having it to hand makes the call much shorter.
          </p>
          <div className="mt-5">
            <FeatureList items={READY} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">What the agent actually does</h2>
          <div className="mt-5">
            <FeatureList
              items={[
                "Searches every accepted carrier on your dates rather than one airline at a time",
                "Compares nonstop options against well-timed connections, where a connection is often cheaper",
                "Checks nearby airports if flying into or out of a different one would save money",
                "Confirms what the fare includes — seat, carry-on, checked bag, change terms",
                "Handles seat assignments, special meals and assistance requests in the same call",
                "Explains the fare rules in plain language before you authorise payment",
              ]}
            />
          </div>
        </div>
      </div>

      <section className="prose-copy mt-14">
        <h2 className="mb-3 text-2xl font-bold">Why phone booking still beats a search engine</h2>
        <p>
          Consumer flight search has genuinely improved, and for a simple one-way, one-passenger
          trip there is little to gain from calling. The advantage shows up everywhere else.
        </p>
        <p>
          Multi-city and open-jaw itineraries are the clearest example. Building them by hand on a
          search site usually means booking two one-ways, which forfeits the protection you get when
          a single ticket covers the whole trip — if the first leg is cancelled, the airline has no
          obligation to rebook the second. An agent builds it as one ticket.
        </p>
        <p>
          Group travel is the other. Airlines release fare buckets in limited quantities, so the
          eighth passenger on a search often prices into a higher bucket than the first seven. Agents
          can see the bucket boundaries and will tell you honestly whether splitting the booking
          would be cheaper.
        </p>
        <p>
          Finally, fare rules. Basic economy products differ by carrier and by route, and the
          restrictions are buried in the fine print. Getting them read back to you takes about a
          minute and has saved plenty of people a very expensive surprise at the check-in desk.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-bold">Common questions about the process</h2>
        <FaqSection items={PROCESS_FAQS} />
      </section>

      <div className="mt-12">
        <CallCta
          source="how-it-works-bottom"
          headline={`Ready when you are — ${PHONE_DISPLAY}`}
          sub="Open 24/7 from the US and Canada. No charge for the call, no obligation to book."
        />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE_URL}/how-it-works/#faq`,
          mainEntity: PROCESS_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </div>
  );
}
