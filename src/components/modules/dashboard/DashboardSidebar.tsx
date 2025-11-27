import decodeToken from "@/services/auth/decodeToken";
import SidebarDynamicContent from "./SidebarDynamicContent";
import { UserInfo } from "../../../../types/userInfo.interface";
import { getDefaultDashboardRoute } from "@/utils/protectedRoutes";
import { NavSection } from "../../../../types/dashboard.interface";
import { getNavItemsByRole } from "@/utils/sidebarNavItems";

// DashboardSidebar Component
const DashboardSidebar = async () => {
  const userInfo = (await decodeToken()) as UserInfo;
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role) || [];

  return (
    <div className="max-w-64 md:w-full border min-h-screen">
      <SidebarDynamicContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
};

export default DashboardSidebar;
