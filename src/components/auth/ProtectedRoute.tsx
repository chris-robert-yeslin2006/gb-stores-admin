
import { useAuth } from "@/lib/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin) {
    toast.error("You do not have permission to access this page");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
