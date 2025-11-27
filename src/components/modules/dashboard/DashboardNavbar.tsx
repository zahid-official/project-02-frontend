import decodeToken from "@/services/auth/decodeToken";
import { UserInfo } from "../../../../types/userInfo.interface";
import NavbarDynamicContent from "./NavbarDynamicContent";

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
