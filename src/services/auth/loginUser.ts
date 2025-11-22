/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envVars from "@/config/envVars";
import { parse } from "cookie";
import { cookies } from "next/headers";
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

    // Return response data
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export default loginUser;
