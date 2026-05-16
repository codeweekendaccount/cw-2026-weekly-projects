import { SiYoutubeshorts } from "react-icons/si";
import ShortCard from "./short-card";
import { SHORTS } from "../data";

export default function ShortsSection() {
  return (
    <div className="py-6 border-y border-neutral-800 my-6">
      <div className="flex items-center gap-2 mb-4 px-2">
        <SiYoutubeshorts className="text-red-700 text-2xl" />
        <h2 className="text-xl font-bold">Shorts</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {SHORTS.map((short) => (
          <ShortCard key={short.id} short={short} />
        ))}
      </div>
    </div>
  );
}
