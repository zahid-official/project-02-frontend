"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  // Navigation links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Contacts", href: "/contacts" },
  ];

  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-7 sm:px-6">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-1">
            <Logo />
            <span className="text-4xl font-bold">Medicare</span>
          </div>
        </Link>

        <div className="flex items-center gap-2.5">
          {/* Desktop Nav */}
          <nav className="text-muted-foreground flex items-center gap-6 font-medium max-md:hidden">
            {navLinks?.map((item, idx) => (
              <Link key={idx} href={item?.href} className="hover:text-primary">
                {item?.label}
              </Link>
            ))}
          </nav>

          {/* Login Button */}
          <Separator
            orientation="vertical"
            className="h-6! mx-4 max-md:hidden"
          />
          <Button className="max-md:hidden px-6 text-base">Login</Button>

          {/* Dark Mode Toggler */}
          <ModeToggle />

          {/* Mobile Menu Button */}
          <nav className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-52 -right-4.5 absolute border p-3 md:hidden">
                {navLinks?.map((item, idx) => (
                  <DropdownMenuItem key={idx} className="cursor-pointer">
                    <Link href={item?.href} className="hover:text-primary">
                      {item?.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator className="mt-2.5" />

                <DropdownMenuItem className="bg-transparent! p-0">
                  <Button className="w-full mt-1.5">Login</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
