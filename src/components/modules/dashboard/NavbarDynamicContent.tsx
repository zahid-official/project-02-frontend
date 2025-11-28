"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { NavSection } from "../../../../types/dashboard.interface";
import { UserInfo } from "../../../../types/userInfo.interface";
import MobileMenuSidebar from "./MobileMenuSidebar";
import UserDropDown from "./UserDropDown";

interface IProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

// NavbarDynamicContent Component
const NavbarDynamicContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", checkSmallerScreen);
    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-12">
          {/* Mobile Menu Toggle */}
          <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            {/* Hide the overlay on medium and larger screens */}
            <SheetContent side="left" className="w-64 p-0">
              <MobileMenuSidebar
                userInfo={userInfo}
                navItems={navItems || []}
                dashboardHome={dashboardHome || ""}
              />
            </SheetContent>
            <SheetDescription className="sr-only">Mobile menu</SheetDescription>
          </Sheet>

          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-9" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            </Button>

            {/* User Dropdown */}
            <UserDropDown userInfo={userInfo} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarDynamicContent;
