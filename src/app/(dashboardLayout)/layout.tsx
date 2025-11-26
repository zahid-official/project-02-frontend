import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";

interface IProps {
  children: React.ReactNode;
}

// DashboardLayout Component
const DashboardLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen">
      {/* Dashboard Navbar */}
      <header>
        <DashboardNavbar />
      </header>

      {/* Main */}
      <main className="flex">
        <DashboardSidebar />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
