"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, Home, Trophy, Users } from "lucide-react";
import { StarCounter } from "./StarCounter";

const links = [
  { href: "/", label: "Home", icon: Home }, { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/quiz", label: "Play", icon: Gamepad2 }, { href: "/progress", label: "Progress", icon: Trophy },
  { href: "/parents", label: "Parents", icon: Users },
];
export function Navbar() {
  const path = usePathname(); const focus = path.startsWith("/learn/");
  if (focus) return <div className="focus-top"><Link href="/learn" className="back-link">← Lessons</Link><StarCounter /></div>;
  return <><header className="desktop-nav"><Link href="/" className="brand"><span aria-hidden="true">🌈</span><span><b>Happy English</b><small>Learn English. Have Fun!</small></span></Link><nav aria-label="Main navigation">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined} className={path === href ? "active" : ""}><Icon size={20}/>{label}</Link>)}</nav><StarCounter /></header><nav className="bottom-nav" aria-label="Mobile navigation">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined} className={path === href ? "active" : ""}><Icon size={23}/><span>{label}</span></Link>)}</nav></>;
}
