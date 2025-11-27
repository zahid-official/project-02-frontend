import { NavSection } from "../../types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./protectedRoutes";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["PATIENT", "DOCTOR", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/profile`,
          icon: "User",
          roles: ["PATIENT", "DOCTOR", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
          roles: ["PATIENT"],
        },
      ],
    },
  ];
};

export const doctorNavItems: NavSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "Appointments",
        href: "/doctor/dashboard/doctor-appoinments",
        icon: "Calendar",
        badge: "3",
        roles: ["DOCTOR"],
      },
      {
        title: "My Schedules",
        href: "/doctor/dashboard/doctor-schedules",
        icon: "Clock",
        roles: ["DOCTOR"],
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/doctor-prescriptions",
        icon: "FileText",
        roles: ["DOCTOR"],
      },
    ],
  },
];

export const patientNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/appointments",
        icon: "Calendar",
        roles: ["PATIENT"],
      },
      {
        title: "Book Appointment",
        href: "/consultation",
        icon: "ClipboardList",
        roles: ["PATIENT"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/prescriptions",
        icon: "FileText",
        roles: ["PATIENT"],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity",
        roles: ["PATIENT"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Doctors",
        href: "/admin/dashboard/doctors-management",
        icon: "Stethoscope",
        roles: ["ADMIN"],
      },
      {
        title: "Patients",
        href: "/admin/dashboard/patients-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar",
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock",
        roles: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "DOCTOR":
      return [...commonNavItems, ...doctorNavItems];
    case "PATIENT":
      return [...commonNavItems, ...patientNavItems];
    default:
      return [];
  }
};
