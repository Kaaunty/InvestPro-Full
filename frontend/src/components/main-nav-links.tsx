"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, type LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";

import { cn } from "../lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Tela Inicial", icon: Home },
  { href: "/clientes", label: "Clientes", icon: Users },
];

export default function MainNavLinks() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                "justify-start",
                isActive && "bg-muted text-primary hover:text-primary"
              )}
              tooltip={link.label}
            >
              <Link href={link.href}>
                <link.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {link.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
