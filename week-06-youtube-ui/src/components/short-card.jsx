export default function ShortCard({ short }) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer group">
      <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-neutral-800">
        <img
          src={short.thumbnail}
          alt={short.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium line-clamp-2">{short.title}</h3>
        <p className="text-xs text-neutral-400">{short.views}</p>
      </div>
    </div>
  );
}
