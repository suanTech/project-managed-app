"use client";

import Card from "./UI/Card";
import SidebarLink from "./SidebarLink";
const links = [
  {
    label: "Home",
    icon: "Grid",
    path: "/home",
  },
  {
    label: "Status",
    icon: "CheckSquare",
    path: "/status",
  },
  {
    label: "Profile",
    icon: "User",
    path: "/profile",
  },
  {
    label: "Settings",
    icon: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <Card className="sidebar">
      <div>
        <h1>Logo</h1>
      </div>
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
}
