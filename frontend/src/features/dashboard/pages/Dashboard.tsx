import React from "react";
import {
  Folder,
  FileText,
  Car,
  MoreHorizontal,
  Plus,
  CheckCircle,
  Truck,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const quickAccess = [
    {
      title: "Total Vehicles",
      value: "124 Vehicles",
      size: "In Stock",
      icon: <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Pending PI",
      value: "18 Documents",
      size: "Requires Action",
      icon: <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "In Transit",
      value: "32 Vehicles",
      size: "Shipping",
      icon: <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Delivered",
      value: "74 Vehicles",
      size: "Completed",
      icon: (
        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      ),
    },
  ];

  const activeShipments = [
    {
      id: 1,
      name: "Maruti Swift - CH123456",
      client: "Public",
      size: "4.5 MB",
      date: "Apr 10, 2024",
      type: "Docs",
    },
    {
      id: 2,
      name: "Toyota Innova - CH789012",
      client: "Public",
      size: "2.5 MB",
      date: "Apr 2, 2024",
      type: "Fonts",
    },
    {
      id: 3,
      name: "Proforma Invoice #1234",
      client: "Private (+4)",
      size: "1.2 MB",
      date: "Yesterday",
      type: "Source",
      isActive: true,
    },
    {
      id: 4,
      name: "Letter of Credit #5678",
      client: "Private",
      size: "12.2 MB",
      date: "Yesterday",
      type: "Example",
    },
  ];

  const timelineActivity = [
    {
      date: "Yesterday",
      activities: [
        { text: "You shared edit access to", target: "Client ABC", img: "C" },
        { text: "You uploaded document", target: "PI_1234.pdf", img: "P" },
      ],
    },
    {
      date: "Apr 1, 2024",
      activities: [
        { text: "You changed status to", target: "In Transit", img: "T" },
      ],
    },
  ];

  return (
    <div className="font-sans animate-fade-in text-gray-800 dark:text-gray-200 transition-colors duration-200">
      {/* Top Navigation / Breadcrumb Area */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </span>
            Vehicle Export
          </h1>
          <div className="hidden md:flex gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1 cursor-pointer">
              Dashboard
            </span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
              Activity
            </span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
              Calendar
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Left Content Area */}
        <div className="lg:col-span-9 space-y-8">
          {/* Quick Access Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Quick Access
              </h2>
              <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {quickAccess.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.value} • {item.size}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Table / List Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-200">Home</span>
                <span>›</span>
                <span>Active Shipments</span>
              </div>
              <button className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                    <th className="font-medium p-4 pl-6">Name</th>
                    <th className="font-medium p-4">Sharing</th>
                    <th className="font-medium p-4">Size</th>
                    <th className="font-medium p-4">Modified</th>
                    <th className="font-medium p-4"></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {activeShipments.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${item.isActive ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
                    >
                      <td className="p-4 pl-6 flex items-center gap-3">
                        <Folder
                          className={`w-5 h-5 ${item.isActive ? "text-blue-600 dark:text-blue-400" : "text-blue-500 dark:text-blue-300"}`}
                          fill="currentColor"
                        />
                        <span
                          className={`font-medium ${item.isActive ? "text-blue-900 dark:text-blue-300" : "text-gray-800 dark:text-gray-200"}`}
                        >
                          {item.name}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">
                        {item.client}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">
                        {item.size}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">
                        {item.date}
                      </td>
                      <td className="p-4 text-right">
                        <MoreHorizontal className="w-5 h-5 text-gray-400 inline-block hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Details & Activity) */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Folder
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="currentColor"
              />
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              ×
            </button>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Source Details
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            1.2 MB • Yesterday • 1 Item
          </p>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Tags
              </span>
              <span className="text-blue-600 dark:text-blue-400 cursor-pointer font-medium">
                Edit
              </span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs font-medium">
                Work
              </span>
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs font-medium">
                Source
              </span>
            </div>
          </div>

          <div className="flex border-b border-gray-100 dark:border-gray-800 mb-6 gap-6 text-sm">
            <span className="pb-3 border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium cursor-pointer">
              Activity
            </span>
            <span className="pb-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
              Comments
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {timelineActivity.map((group, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {group.date}
                  </span>
                </div>
                <div className="space-y-4 pl-4 border-l-2 border-gray-100 dark:border-gray-800 ml-1">
                  {group.activities.map((activity, actIdx) => (
                    <div key={actIdx} className="relative pl-4">
                      <div className="absolute -left-[21px] top-1 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                        {activity.img}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.text}{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {activity.target}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
