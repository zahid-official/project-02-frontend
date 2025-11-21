/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envVars from "@/config/envVars";

// loginUser Function
const loginUser = async (_previousState: any, formData: any): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

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
