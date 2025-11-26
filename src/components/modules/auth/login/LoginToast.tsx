"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

// LoginToast Component
const LoginToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("loggedIn") === "true") {
      toast.success("You have been logged in successfully.");
      const newPath = new URL(window.location.href);
      newPath.searchParams.delete("loggedIn");
      router.replace(newPath.toString());
    }
  }, [searchParams, router]);

  return null;
};

export default LoginToast;
