
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

const AdminLayout = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden" 
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-brand-primary transform transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-center h-20 border-b border-brand-primary/20">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="bg-brand-secondary text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-xl">
              GB
            </div>
            <span className="text-white font-semibold text-xl">Admin Panel</span>
          </Link>
        </div>

        <nav className="px-4 py-6 space-y-2">
          <Link 
            to="/admin"
            className="flex items-center px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/products"
            className="flex items-center px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <ShoppingBag className="mr-3 h-5 w-5" />
            <span>Products</span>
          </Link>
          <Link 
            to="/admin/orders"
            className="flex items-center px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <Package className="mr-3 h-5 w-5" />
            <span>Orders</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-brand-primary/20 p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-200 hover:bg-white/10"
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-margin duration-300 ease-in-out",
        "md:ml-64"
      )}>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
