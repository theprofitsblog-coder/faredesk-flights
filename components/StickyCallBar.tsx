import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";
import { PhoneIcon } from "./icons";

/**
 * Mobile-only persistent call bar. Hidden on md+ because the header CTA is
 * already in view there.
 */
export default function StickyCallBar() {
  return (
    <>
      <div className="sticky-call-spacer" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800 bg-navy-900/98 px-4 py-3 backdrop-blur md:hidden">
        <a
          href={PHONE_HREF}
          data-call-source="sticky-bar"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-base font-bold text-navy-950 active:scale-[.99]"
        >
          <PhoneIcon />
          Call {PHONE_DISPLAY} — free, 24/7
        </a>
      </div>
    </>
  );
}
