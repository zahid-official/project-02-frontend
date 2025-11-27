import decodeToken from "@/services/auth/decodeToken";
import SidebarDynamicContent from "./SidebarDynamicContent";
import { UserInfo } from "../../../../types/userInfo.interface";
import { getDefaultDashboardRoute } from "@/utils/protectedRoutes";
import { NavSection } from "../../../../types/dashboard.interface";

// DashboardSidebar Component
const DashboardSidebar = async () => {
  const userInfo = (await decodeToken()) as UserInfo;
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  const navItems: NavSection[] = [];

  return (
    <div className="max-w-72 w-full border min-h-screen">
      <SidebarDynamicContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
};

export default DashboardSidebar;
