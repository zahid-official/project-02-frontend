/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envVars from "@/config/envVars";
import {
  getDefaultDashboardRoute,
  isValidRedirectRole,
  UserRole,
} from "@/utils/protectedRoutes";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

// Zod schema
const loginZodSchema = z.object({
  // Email
  email: z
    .email({ error: "Invalid email format." })
    .min(5, { error: "Email must be at least 5 characters long." })
    .max(100, { error: "Email cannot exceed 100 characters." })
    .trim(),

  // Password
  password: z
    .string({ error: "Password is required." })
    .min(8, { error: "Password must be at least 8 characters long." })
    .trim(),
});

// loginUser Function
const loginUser = async (_previousState: any, formData: any): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validate data with Zod schema before sending request to backend API
    const validateData = loginZodSchema.safeParse(loginData);
    if (!validateData.success) {
      return {
        success: false,
        errors: validateData?.error?.issues?.map((issue) => ({
          field: issue?.path[0],
          message: issue?.message,
        })),
      };
    }

    // Send POST request to login endpoint
    const res = await fetch(`${envVars.backend_url}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    // Handle unsuccessful login
    if (!result.success) {
      throw new Error("Failed to login user. Please try again.");
    }

    // Handle successful login
    let accessTokenData: Record<string, string> | undefined;
    let refreshTokenData: Record<string, string> | undefined;
    const setCookieHeaders = res.headers.getSetCookie();

    // Extract tokens from Set-Cookie headers
    setCookieHeaders?.forEach((cookie: string) => {
      const parsedCookie = parse(cookie);

      if (parsedCookie?.accessToken) {
        accessTokenData = parsedCookie as Record<string, string>;
      }
      if (parsedCookie?.refreshToken) {
        refreshTokenData = parsedCookie as Record<string, string>;
      }
    });

    // Check if tokens are present
    if (!accessTokenData || !refreshTokenData) {
      throw new Error("Invalid token provided, authorization denied");
    }

    // Set cookies in the response
    const cookieStore = await cookies();
    cookieStore.set({
      name: "accessToken",
      value: accessTokenData.accessToken,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: accessTokenData.path || "/",
    });

    cookieStore.set({
      name: "refreshToken",
      value: refreshTokenData.refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: refreshTokenData.path || "/",
    });

    // Verify access token and get user role
    const verifiedToken = jwt.verify(
      accessTokenData.accessToken,
      envVars.jwt.access_secret
    );
    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token provided, authorization denied");
    }

    // Redirect user based on role and redirectTo parameter
    const userRole: UserRole = verifiedToken?.role;
    if (redirectTo) {
      const validRole = isValidRedirectRole(redirectTo, userRole);
      if (validRole) {
        redirect(redirectTo);
      } else {
        redirect(getDefaultDashboardRoute(userRole));
      }
    }

    redirect(getDefaultDashboardRoute(userRole));
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error };
  }
};

export default loginUser;
