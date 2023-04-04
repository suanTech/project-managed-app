'use client'

import Sidebar from "@/components/Sidebar";
import Button from "@/components/UI/Button";

export default function Home() {
  return (
    <div>
      <Sidebar></Sidebar>
      <Button className="secondary small">Hello</Button>
    </div>
  )
}
