"use client";
import { Button } from "@/components/ui/button";
import logoutUser from "@/services/auth/logoutUser";

// LogoutButton Component
const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
