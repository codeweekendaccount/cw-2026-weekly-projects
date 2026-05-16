export default function VideoCard({ video }) {
  return (
    <div className="flex flex-col gap-3 cursor-pointer mb-6 group">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!video.isSponsored && (
          <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">
            {video.duration}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        {!video.isSponsored && (
          <img
            src={video.channelAvatar}
            alt={video.channelName}
            className="w-9 h-9 rounded-full shrink-0 mt-1"
          />
        )}
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium leading-snug line-clamp-2">
            {video.title}
          </h3>
          {video.isSponsored ? (
            <>
              <p className="text-sm text-neutral-400">
                Sponsored • {video.channelName}
              </p>
              <div className="flex gap-3 mt-2">
                <button className="px-4 py-2 rounded-full text-sm font-medium border border-neutral-700 hover:bg-neutral-800 transition-colors">
                  Watch
                </button>
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors">
                  Sign up
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-neutral-400 hover:text-white transition-colors">
                {video.channelName}
              </p>
              <p className="text-sm text-neutral-400">
                {video.views} • {video.timestamp}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
