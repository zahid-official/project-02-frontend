"use server";
import envVars from "@/config/envVars";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookies } from "./cookies";
import { UserInfo } from "../../../types/userInfo.interface";

// decodeToken Function
const decodeToken = async (): Promise<UserInfo | null> => {
  const accessToken = await getCookies("accessToken");
  if (!accessToken) {
    return null;
  }

  const verifiedToken = jwt.verify(
    accessToken,
    envVars.jwt.access_secret
  ) as JwtPayload;
  if (!verifiedToken) {
    return null;
  }

  const userInfo: UserInfo = {
    name: verifiedToken?.name || "Unknown User",
    email: verifiedToken?.email,
    role: verifiedToken?.role,
  };

  return userInfo;
};

export default decodeToken;
