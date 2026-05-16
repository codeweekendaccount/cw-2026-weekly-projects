import { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { MdMenu, MdMic, MdNotifications, MdSearch, MdVideoCall } from "react-icons/md";

export default function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="flex justify-between items-center px-4 h-14 sticky top-0 bg-neutral-950 z-50">
      <div className="flex items-center gap-4">
        <button className="text-2xl p-2 rounded-full hover:bg-neutral-700 transition-colors">
          <MdMenu />
        </button>
        <div className="flex items-center gap-1 text-xl font-bold tracking-tight">
          <FaYoutube className="text-red-700 text-3xl" />
          <span>YouTube</span>
        </div>
      </div>

      <form
        className="flex items-center flex-1 max-w-180 gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-1 bg-neutral-950 border border-neutral-800 rounded-l-full overflow-hidden ml-10">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent border-none text-white px-4 text-base h-10 focus:outline-none focus:border-blue-700 placeholder:text-neutral-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-neutral-800 border-l border-neutral-800 w-16 h-10 flex items-center justify-center rounded-r-full hover:bg-neutral-800 transition-colors"
            type="submit"
          >
            <MdSearch size={24} />
          </button>
        </div>
        <button
          className="bg-neutral-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors shrink-0"
          type="button"
        >
          <MdMic size={20} />
        </button>
      </form>

      <div className="flex items-center gap-2">
        <button className="text-2xl p-2 rounded-full hover:bg-neutral-700 transition-colors">
          <MdVideoCall />
        </button>
        <button className="text-2xl p-2 rounded-full hover:bg-neutral-700 transition-colors">
          <MdNotifications />
        </button>
        <img
          src="https://yt3.ggpht.com/ytc/AIdro_m_H-P_Y-P_Y-P_Y-P_Y-P_Y=s68-c-k-c0x00ffffff-no-rj"
          alt="Profile"
          className="w-8 h-8 rounded-full ml-2"
        />
      </div>
    </nav>
  );
}
