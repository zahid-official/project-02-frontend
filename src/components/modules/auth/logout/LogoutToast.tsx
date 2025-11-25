"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

// LogoutTosat Component
const LogoutToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("loggedOut") === "true") {
      toast.success("You have been logged out successfully.");
      const newPath = new URL(window.location.href);
      newPath.searchParams.delete("loggedOut");
      router.replace(newPath.toString());
    }
  }, [searchParams, router]);

  return null;
};

export default LogoutToast;
