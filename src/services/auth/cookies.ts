"use server";
import { cookies } from "next/headers";

export const setCookies = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
};

export const getCookies = async (name: string) => {
  const cookieStore = await cookies();
  const result = cookieStore.get(name)?.value || null;
  return result;
};

export const deleteCookies = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
