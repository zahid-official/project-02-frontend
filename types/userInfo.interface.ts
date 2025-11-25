import { UserRole } from "@/utils/protectedRoutes";

export interface UserInfo {
  name: string;
  email: string;
  role: UserRole;
}
