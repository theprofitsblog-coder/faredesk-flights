import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, PHONE_DISPLAY, SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects information when you call ${PHONE_DISPLAY} or use this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const UPDATED = "September 2026";

const SECTIONS: Array<{ h: string; p: string[] }> = [
  {
    h: "Who we are",
    p: [
      `${SITE_NAME} is an independent travel booking service that connects travellers in the United States and Canada with travel agents who book air tickets on their behalf. We are not an airline, and we are not affiliated with, endorsed by or sponsored by any of the carriers named on this website.`,
      "This policy explains what information is collected when you use this website or call us, how it is used, and the choices you have.",
    ],
  },
  {
    h: "Information we collect",
    p: [
      "Website usage. Like most websites, this site may collect standard technical information such as your browser type, device type, approximate region, referring page and the pages you view. This information is aggregated and is used to understand which content is useful and to keep the site working properly.",
      "Calls. When you call, the call may be recorded or monitored for quality assurance and training, and for the protection of both parties. You will be told at the start of the call if recording is in effect.",
      "Booking details. If you proceed with a booking, we collect the information needed to issue your ticket: passenger legal names exactly as they appear on travel documents, contact details, dates of birth where required, frequent flyer numbers if you provide them, and payment card details.",
      "Information you volunteer. Anything else you choose to tell an agent — travel preferences, accessibility needs, dietary requirements — is recorded only insofar as it is needed to complete your booking.",
    ],
  },
  {
    h: "How we use your information",
    p: [
      "To complete and manage your flight booking, including issuing tickets and confirmation documents.",
      "To communicate with you about your booking: schedule changes, cancellations, refunds and travel requirements.",
      "To pass passenger and payment information to airlines, ticketing providers and payment processors, which is necessary to issue an airline ticket.",
      "To improve the service, including training agents and identifying recurring problems.",
      "To meet legal, regulatory and airline record-keeping obligations.",
      "We do not sell your personal information. Payment card details are handled by our payment processors and are not published or shared beyond what issuing a ticket requires.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: [
      "This website may use cookies and similar technologies to remember preferences, measure how pages are used and understand where visitors came from. Analytics data is aggregated and is not used to build an individual profile of you.",
      "You can block or delete cookies through your browser settings. Doing so does not prevent you from calling us or booking a flight.",
    ],
  },
  {
    h: "Third parties",
    p: [
      "Issuing an airline ticket necessarily involves sharing your details with the airline operating your flight and with the ticketing or distribution provider that issues it. Those parties handle your data under their own policies and under the terms of the fare you purchase.",
      "We may also use analytics and hosting providers to operate this website. Those providers process data on our behalf and are not permitted to use it for their own purposes.",
    ],
  },
  {
    h: "Data retention",
    p: [
      "Booking records are kept for as long as required to service the ticket, handle disputes, and meet legal and airline record-keeping obligations. Website analytics data is retained on an aggregated basis.",
    ],
  },
  {
    h: "Your choices and rights",
    p: [
      "Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, and to object to certain processing. Residents of California, Canada and the European Economic Area have specific statutory rights in this area.",
      `To make a request, call ${PHONE_DISPLAY}${CONTACT_EMAIL ? ` or write to ${CONTACT_EMAIL}` : ""}. We will respond within the period required by applicable law.`,
      "Note that we cannot delete information that airlines or regulators require us to retain for a fixed period.",
    ],
  },
  {
    h: "Security",
    p: [
      "Payment information is taken over a recorded, access-controlled line and passed to processors that meet industry card-security standards. Access to booking records is limited to staff who need it to service your trip.",
      "No method of transmission or storage is perfectly secure. We take reasonable measures, but cannot guarantee absolute security.",
    ],
  },
  {
    h: "Children",
    p: [
      "This website is not directed at children, and we do not knowingly collect information from children except as passenger details required for a booking made by an adult.",
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      `This policy was last updated in ${UPDATED}. If it changes materially, the updated version will be posted on this page with a new date.`,
    ],
  },
  {
    h: "Contact",
    p: [
      `Questions about this policy can be directed to us by phone at ${PHONE_DISPLAY}${CONTACT_EMAIL ? ` or by email at ${CONTACT_EMAIL}` : ""}. The line is open 24 hours a day, 7 days a week.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy policy", url: "/privacy-policy" },
        ]}
      />

      <h1 className="text-4xl font-extrabold tracking-tight">Privacy policy</h1>
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
