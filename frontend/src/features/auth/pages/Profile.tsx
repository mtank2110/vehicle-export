import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { User, Mail, Shield, Edit2 } from "lucide-react";
import Button from "../../../components/common/Button";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-pink-500";
      case "manager":
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      default:
        return "bg-gradient-to-r from-green-500 to-teal-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 mb-6 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,...')]"></div>
        </div>

        <div className="relative flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center ring-4 ring-white/30">
            <User className="w-12 h-12 text-white" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">
              {user?.name || "Admin User"}
            </h1>
            <p className="text-blue-100 mb-3">
              {user?.email || "admin@vehicleexport.com"}
            </p>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-sm font-medium ${getRoleBadgeColor(user?.role || "admin")}`}
            >
              <Shield className="w-4 h-4" />
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "Admin"}
            </span>
          </div>

          <Button
            variant="outline"
            className="!border-white/30 !text-white hover:!bg-white/10 hidden md:flex"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            Personal Information
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                Full Name
              </label>
              <p className="text-gray-900 dark:text-gray-200 font-medium">
                {user?.name || "Admin User"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                Email Address
              </label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900 dark:text-gray-200 font-medium">
                  {user?.email || "admin@vehicleexport.com"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            Account Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                Role
              </label>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-sm font-medium ${getRoleBadgeColor(user?.role || "admin")}`}
              >
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : "Admin"}
              </span>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                Account Status
              </label>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
