import decodeToken from "@/services/auth/decodeToken";
import NavbarDynamicContent from "./NavbarDynamicContent";
import { UserInfo } from "../../../../types/userInfo.interface";

// DashboardNavbar Component
const DashboardNavbar = async () => {
  const userInfo = (await decodeToken()) as UserInfo;
  return (
    <div>
      <NavbarDynamicContent userInfo={userInfo} />
    </div>
  );
};

export default DashboardNavbar;
