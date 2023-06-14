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
    label: "Activities",
    icon: "Clock",
    path: "/activities",
  },
  {
    label: "Settings",
    icon: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <Card type="primary" role="sidebar">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
}
