/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envVars from "@/config/envVars";
import z from "zod";

// Zod schema
const registerZodSchema = z.object({
  patient: z.object({
    // Name
    name: z
      .string({ error: "Name must be a string" })
      .min(2, { error: "Name must be at least 2 characters long." })
      .max(50, { error: "Name cannot exceed 50 characters." })
      .trim(),

    // Email
    email: z
      .email({ error: "Invalid email format" })
      .min(5, { error: "Email must be at least 5 characters long." })
      .max(100, { error: "Email cannot exceed 100 characters." })
      .trim(),

    // Gender
    gender: z.enum(["MALE", "FEMALE"], "Gender must be either MALE or FEMALE."),

    // Phone
    phone: z
      .string({ error: "Phone Number must be string" })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        error: "Phone must be valid for Bangladesh.",
      })
      .trim(),
  }),

  // Password
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password must be string",
    })
    .min(8, { error: "Password must be includes 8 characters long." })

    // Password complexity requirements
    .regex(/^(?=.*[A-Z])/, {
      error: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      error: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      error: "Password must contain at least 1 number.",
    })
    .trim(),
});

// registerPatient Function
const registerPatient = async (
  _previousState: any,
  formData: any
): Promise<any> => {
  try {
    const registerData = {
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
      },
      password: formData.get("password"),
    };

    // Validate data with Zod schema before sending request to backend API
    const validateData = registerZodSchema.safeParse(registerData);

    console.log(validateData?.error?.issues?.map((is) => console.log(is)));
    if (!validateData.success) {
      return {
        success: false,
        errors: validateData?.error?.issues?.map((issue) => ({
          field: issue?.path[1] ? issue?.path[1] : issue?.path[0],
          message: issue?.message,
        })),
      };
    }

    // Create FormData object
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    // Send POST request to patient create endpoint
    const res = await fetch(`${envVars.backend_url}/patient/create`, {
      method: "POST",
      body: newFormData,
    }).then((res) => res.json());

    return res;
  } catch (error) {
    return { error };
  }
};

export default registerPatient;
