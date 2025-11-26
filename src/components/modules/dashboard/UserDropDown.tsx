"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import { UserInfo } from "../../../../types/userInfo.interface";
import LogoutButton from "../auth/logout/LogoutButton";

// UserDropDown Component
const UserDropDown = ({ userInfo }: { userInfo: UserInfo | null }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <span className="text-sm font-semibold">
              {userInfo?.name.charAt(0).toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{userInfo?.name}</p>
              <p className="text-xs text-muted-foreground">{userInfo?.email}</p>
              <p className="text-xs text-primary capitalize">
                {userInfo?.role.toLowerCase()}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/profile"} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/change-password"} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Change Password
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-red-600">
            <LogoutButton className="w-full" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
