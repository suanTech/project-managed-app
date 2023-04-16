"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./UI/Icon";

export default function SidebarLink({ link }: {link: any}) {
  const pathname = usePathname();
  let isActive = false;
  if (pathname === link.path) {
    isActive = true;
  }
  return (
    <Link href={link.path} >
      <Icon name={link.icon} size="100%" className={`icon ${isActive && "active"}`}></Icon>
    </Link>
  );
}
