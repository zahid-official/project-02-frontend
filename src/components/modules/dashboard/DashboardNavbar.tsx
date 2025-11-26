import decodeToken from "@/services/auth/decodeToken";
import NavbarDynamicContent from "./NavbarDynamicContent";
import { UserInfo } from "../../../../types/userInfo.interface";
import { getDefaultDashboardRoute } from "@/utils/protectedRoutes";

// DashboardNavbar Component
const DashboardNavbar = async () => {
  const userInfo = (await decodeToken()) as UserInfo;
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  return (
    <div>
      <NavbarDynamicContent userInfo={userInfo} dashboardHome={dashboardHome} />
    </div>
  );
};

export default DashboardNavbar;
