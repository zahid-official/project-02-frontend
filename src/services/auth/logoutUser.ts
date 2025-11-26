"use server";

import { redirect } from "next/navigation";
import { deleteCookies } from "./cookies";

// logoutUser Function
const logoutUser = async () => {
  await deleteCookies("accessToken");
  await deleteCookies("refreshToken");

  redirect("/login?loggedOut=true");};

export default logoutUser;
