import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";
import { PhoneIcon } from "./icons";

type Props = {
  source: string;
  headline?: string;
  sub?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function CallCta({
  source,
  headline = "Get your fare quoted in minutes",
  sub = "Speak to a real agent — no chatbot, no forms, no waiting on hold music.",
  variant = "primary",
  className = "",
}: Props) {
  return (
    <div
      className={`card flex flex-col items-start gap-4 border-accent-300 bg-accent-50 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div>
        <p className="text-lg font-bold text-navy-900 sm:text-xl">{headline}</p>
        <p className="mt-1 text-sm text-navy-700">{sub}</p>
      </div>
      <a
        href={PHONE_HREF}
        data-call-source={source}
        className={variant === "primary" ? "cta-primary w-full sm:w-auto" : "cta-secondary w-full sm:w-auto"}
      >
        <PhoneIcon />
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}
