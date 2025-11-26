// Define user roles and their protected routes
export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

// Define the structure for route configurations
export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

// Public authentication routes
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// Common protected routes for all authenticated users
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/profile", "/settings", "/change-password"],
  patterns: [],
};

// Admin protected routes
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/], // routes start with /admin
};

// Doctor protected routes
export const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/], // routes start with /doctor
};

// Patient protected routes
export const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/], // routes start with /dashboard
};

// Function to check if a route is an authentication route
export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route) => route === pathname);
};

// Function to check if a route is matched in the given route configuration
export const isRouteProtected = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes?.exact?.includes(pathname)) {
    return true;
  }
  return routes?.patterns?.some((pattern: RegExp) => pattern.test(pathname));
};

// Function to get the required user role for accessing a given route
export const getRouteAccessRole = (
  pathname: string
): UserRole | "COMMON" | null => {
  if (isRouteProtected(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteProtected(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isRouteProtected(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRouteProtected(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

// Get default dashboard route based on user role
export const getDefaultDashboardRoute = (role: UserRole) => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "DOCTOR") {
    return "/doctor/dashboard";
  }
  if (role === "PATIENT") {
    return "/dashboard";
  }
  return "/";
};

export const isValidRedirectRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteAccessRole(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
