import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Car, LayoutDashboard, List, CalendarPlus, BadgeCheck } from 'lucide-react';
import { vehicleApi, VehicleStats } from '../../services/vehicleApi';
import VehicleList from './VehicleList';
import BookVehicle from './BookVehicle';

const Vehicles: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'book'>('dashboard');

  const urlTab = searchParams.get('tab') as 'dashboard' | 'list' | 'book' | null;
  
  React.useEffect(() => {
    if (urlTab && ['dashboard', 'list', 'book'].includes(urlTab)) {
      setActiveTab(urlTab as 'dashboard' | 'list' | 'book');
    }
  }, [urlTab]);

  const handleTabClick = (tabId: 'dashboard' | 'list' | 'book') => {
    setActiveTab(tabId);
    navigate(`/vehicles?tab=${tabId}`);
  };
  const [stats, setStats] = useState<VehicleStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const response = await vehicleApi.getStats();
        if (response.success) {
          setStats(response.data!);
        }
      } catch (error) {
        console.error('Failed to fetch vehicle stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  React.useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['dashboard', 'list', 'book'].includes(tabParam)) {
      setActiveTab(tabParam as 'dashboard' | 'list' | 'book');
    }
  }, [searchParams]);

  const handleTabChange = (newTab: 'dashboard' | 'list' | 'book') => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'list' as const, label: 'Vehicle List', icon: List },
    { id: 'book' as const, label: 'Book Vehicle', icon: CalendarPlus },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-8 text-center transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Total Vehicles</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {loadingStats ? '...' : stats?.total ?? 0}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-8 text-center transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BadgeCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Available</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {loadingStats ? '...' : stats?.available ?? 0}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-8 text-center transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CalendarPlus className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Booked</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {loadingStats ? '...' : stats?.booked ?? 0}
              </p>
            </div>
          </div>
        );
      case 'list':
        return <VehicleList />;
      case 'book':
        return <BookVehicle />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen p-6 md:p-8 rounded-xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Vehicles
          </h1>
          <p className="text-slate-600 dark:text-gray-400 mt-1">Manage vehicle inventory and bookings</p>
        </div>
      </div>

      {/* Navbar Container */}
      <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-t-xl mb-0">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium cursor-pointer whitespace-nowrap transition-all duration-200 text-sm ${
                    isActive
                      ? 'border-b-4 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-b-2 border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-6 md:p-8">
        {renderTabContent()}
      </div>
    </div>
  );
};


export default Vehicles;

