import { CheckIcon } from "./icons";

export default function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-7 text-slate-700">
          <CheckIcon className="mt-1 h-5 w-5 text-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
