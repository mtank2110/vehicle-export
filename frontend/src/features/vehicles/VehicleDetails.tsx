import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, ArrowLeft, Car } from "lucide-react";
import { vehicleApi, Vehicle } from '../../services/vehicleApi';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const response = await vehicleApi.getById(id!);
      if (response.success) {
        setVehicle(response.data);
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Booked':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        Loading vehicle details...
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-8 text-center">
        Vehicle not found
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Car className="w-8 h-8 text-blue-600" />
            {vehicle.name}
          </h1>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getStatusColor(vehicle.status)}`}>
            {vehicle.status}
          </span>
        </div>
        <button
          onClick={() => navigate('/vehicles')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white font-medium"
        >
          <ArrowLeft size={18} />
          Back to List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white border-b pb-2">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Color</p>
              <p className="font-semibold text-slate-900 dark:text-white">{vehicle.color}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Quantity</p>
              <p className="font-semibold text-slate-900 dark:text-white">{vehicle.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Booked By</p>
              <p className="font-semibold text-slate-900 dark:text-white">{vehicle.bookedBy || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white border-b pb-2">Technical Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Engine No</p>
              <p className="font-mono text-slate-900 dark:text-white">{vehicle.engineNo}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Chassis No</p>
              <p className="font-mono text-slate-900 dark:text-white">{vehicle.chassisNo}</p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white border-b pb-2">Timeline</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Created</p>
              <p className="text-sm text-slate-900 dark:text-white">
                {new Date(vehicle.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-gray-400">Updated</p>
              <p className="text-sm text-slate-900 dark:text-white">
                {new Date(vehicle.updatedAt || vehicle.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => navigate(`/vehicles/edit/${vehicle._id}`)}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm"
        >
          <Eye size={16} className="inline mr-2" />
          Edit Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;
