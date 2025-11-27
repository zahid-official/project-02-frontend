import decodeToken from "@/services/auth/decodeToken";
import { UserInfo } from "../../../../types/userInfo.interface";
import NavbarDynamicContent from "./NavbarDynamicContent";
import { getDefaultDashboardRoute } from "@/utils/protectedRoutes";
import { NavSection } from "../../../../types/dashboard.interface";
import { getNavItemsByRole } from "@/utils/sidebarNavItems";

// DashboardNavbar Component
const DashboardNavbar = async () => {
  const userInfo = (await decodeToken()) as UserInfo;
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role) || [];
  return (
    <div>
      <NavbarDynamicContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
};

export default DashboardNavbar;
