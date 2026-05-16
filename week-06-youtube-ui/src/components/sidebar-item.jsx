export default function SidebarItem({ icon: Icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-6 px-3 py-2.5 rounded-lg cursor-pointer text-sm ${active ? "bg-neutral-800 font-medium" : "hover:bg-neutral-700"} transition-colors`}
    >
      <Icon className="text-2xl" />
      <span>{label}</span>
    </div>
  );
}
