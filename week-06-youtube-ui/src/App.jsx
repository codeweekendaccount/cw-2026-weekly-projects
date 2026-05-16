import "./index.css";
import { useState } from "react";
import { VIDEOS } from "./data";
import CategoryBar from "./components/category-bar";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ShortsSection from "./components/shorts-section";
import VideoCard from "./components/video-card";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = VIDEOS.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" ||
      video.category === selectedCategory ||
      video.isSponsored;

    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channelName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar onSearch={setSearchQuery} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 px-4 overflow-y-auto pb-8">
          <CategoryBar
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
            {filteredVideos.slice(0, 4).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {selectedCategory === "All" && <ShortsSection />}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
            {filteredVideos.slice(4).length > 0
              ? filteredVideos
                  .slice(4)
                  .map((video) => <VideoCard key={video.id} video={video} />)
              : filteredVideos.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center mt-20 gap-4">
                    <h2 className="text-xl">
                      No videos found matching "{searchQuery}"
                    </h2>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="px-4 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full transition-colors"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
