/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envVars from "@/config/envVars";

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
