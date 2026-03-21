import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Car,
  LayoutDashboard,
  Users,
  FileText,
  FileCheck,
  Truck,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    { name: "Vehicles", icon: <Car size={20} />, path: "/vehicles" },
    { name: "Clients", icon: <Users size={20} />, path: "/clients" },
    {
      name: "Proforma Invoices",
      icon: <FileText size={20} />,
      path: "/proforma-invoice",
    },
    {
      name: "Letter of Credit",
      icon: <FileCheck size={20} />,
      path: "/letter-of-credit",
    },
    { name: "Dealers", icon: <Truck size={20} />, path: "/dealers" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-colors duration-200">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-gray-50 dark:border-gray-800">
        <Car className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
        <span className="font-bold text-lg text-gray-900 dark:text-white">
          Vehicle Export
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
