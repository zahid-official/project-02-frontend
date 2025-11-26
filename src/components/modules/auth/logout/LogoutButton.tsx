"use client";
import { Button } from "@/components/ui/button";
import logoutUser from "@/services/auth/logoutUser";

// LogoutButton Component
const LogoutButton = ({ className }: { className?: string }) => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button className={className} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
