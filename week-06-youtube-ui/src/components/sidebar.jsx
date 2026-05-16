import { SIDEBAR_ITEMS, USER_ITEMS } from "../data";
import SidebarItem from "./sidebar-item";
import {
  MdHistory,
  MdHome,
  MdOutlineExplore,
  MdPlaylistPlay,
  MdSubscriptions,
  MdThumbUp,
  MdWatchLater,
} from "react-icons/md";

export default function Sidebar() {
  const iconMap = {
    Home: MdHome,
    Shorts: MdOutlineExplore,
    Subscriptions: MdSubscriptions,
    History: MdHistory,
    Playlists: MdPlaylistPlay,
    WatchLater: MdWatchLater,
    Liked: MdThumbUp,
  };

  return (
    <aside className="w-60 p-3 overflow-y-auto shrink-0 hidden md:block">
      <div className="border-b border-neutral-800 pb-3 mb-3">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.label}
            icon={iconMap[item.iconName]}
            label={item.label}
            active={item.active}
          />
        ))}
      </div>
      <div className="border-b border-neutral-800 pb-3 mb-3">
        <h3 className="px-3 py-2 text-base font-medium">You</h3>
        {USER_ITEMS.map((item) => (
          <SidebarItem
            key={item.label}
            icon={iconMap[item.iconName]}
            label={item.label}
          />
        ))}
      </div>
    </aside>
  );
}
