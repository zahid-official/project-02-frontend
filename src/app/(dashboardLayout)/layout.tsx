import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";

interface IProps {
  children: React.ReactNode;
}

// DashboardLayout Component
const DashboardLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <DashboardSidebar />

      <div className="w-full">
        {/* Dashboard Navbar */}
        <header>
          <DashboardNavbar />
        </header>

        {/* Main */}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
