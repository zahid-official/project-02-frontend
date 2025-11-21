/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envVars from "@/config/envVars";
import z from "zod";

// Zod schema
const loginZodSchema = z.object({
  // Email
  email: z
    .email({ error: "Email is required." })
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

    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export default loginUser;
