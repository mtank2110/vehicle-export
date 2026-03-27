import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Pencil, Check, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import { apiConfig } from "../../../config/apiConfig";

interface Vehicle {
  name: string;
  color: string;
  quantity: number;
}

interface SavedVehicle extends Vehicle {
  saved: boolean;
}

const DealerOrders = () => {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [dealerId, setDealerId] = useState("");
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [vehicles, setVehicles] = useState<SavedVehicle[]>([
    { name: "", color: "", quantity: 1, saved: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    axios.get(`${apiConfig.baseURL}/dealers`).then((res) => setDealers(res.data.data || []));
    axios.get(`${apiConfig.baseURL}/clients`).then((res) => setClients(res.data.data || res.data));
  }, []);

  const savedCount = vehicles.filter((v) => v.saved).length;

  const handleVehicleChange = (index: number, field: keyof Vehicle, value: any) => {
    const updated = [...vehicles];
    updated[index] = { ...updated[index], [field]: value };
    setVehicles(updated);
  };

  const handleSaveVehicle = (index: number) => {
    const v = vehicles[index];
    const newErrors: any = {};
    if (!v.name.trim()) newErrors[`name_${index}`] = "Name required";
    if (!v.color.trim()) newErrors[`color_${index}`] = "Color required";
    if (v.quantity < 1) newErrors[`qty_${index}`] = "Min 1";
    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return;
    }
    const updated = [...vehicles];
    updated[index] = { ...updated[index], saved: true };
    setVehicles(updated);
    // clear errors for this vehicle
    const cleared = { ...errors };
    delete cleared[`name_${index}`];
    delete cleared[`color_${index}`];
    delete cleared[`qty_${index}`];
    setErrors(cleared);
    toast.success(`Vehicle ${index + 1} saved!`);
  };

  const handleEditVehicle = (index: number) => {
    const updated = [...vehicles];
    updated[index] = { ...updated[index], saved: false };
    setVehicles(updated);
  };

  const addVehicle = () => {
    setVehicles([...vehicles, { name: "", color: "", quantity: 1, saved: false }]);
  };

  const removeVehicle = (index: number) => {
    if (vehicles.length === 1) return;
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = async () => {
    if (!dealerId) { toast.error("Select a dealer!"); return; }
    if (!clientId) { toast.error("Select a client!"); return; }
    if (vehicles.some((v) => !v.saved)) { toast.error("Save all vehicles first!"); return; }

    try {
      setLoading(true);
      const payload = {
        clientId,
        dealerId,
        date,
        vehicles: vehicles.map(({ saved, ...v }) => v),
      };
      await axios.post(`${apiConfig.baseURL}/orders`, payload);
      toast.success("Order created successfully!");
      navigate("/dealers");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error creating order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen p-4 rounded">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Dealer Order</h2>
          <p className="text-sm text-slate-500 dark:text-gray-300">
            Total Vehicles Saved: <span className="font-bold text-blue-600">{savedCount}</span>
          </p>
        </div>
        <button
          onClick={() => navigate("/dealers")}
          className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          ← Back
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-8 space-y-8">

        {/* Dealer + Client + Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dealer</label>
            <select
              value={dealerId}
              onChange={(e) => setDealerId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Dealer</option>
              {dealers.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Calendar size={16} /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Vehicles Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Vehicles ({savedCount} saved / {vehicles.length} total)
            </h3>
            <button
              onClick={addVehicle}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
            >
              <Plus size={16} /> Add Vehicle
            </button>
          </div>

          <div className="space-y-4">
            {vehicles.map((v, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg border ${
                  v.saved
                    ? "bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-700"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-slate-800 dark:text-white flex items-center gap-2">
                    Vehicle {i + 1}
                    {v.saved && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Saved ✓</span>}
                  </h4>
                  <div className="flex gap-2">
                    {!v.saved && vehicles.length > 1 && (
                      <button onClick={() => removeVehicle(i)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Name</label>
                    <input
                      type="text"
                      value={v.name}
                      disabled={v.saved}
                      onChange={(e) => handleVehicleChange(i, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:text-gray-500 text-black dark:text-white rounded focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {errors[`name_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`name_${i}`]}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                    <input
                      type="text"
                      value={v.color}
                      disabled={v.saved}
                      onChange={(e) => handleVehicleChange(i, "color", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:text-gray-500 text-black dark:text-white rounded focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {errors[`color_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`color_${i}`]}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={v.quantity}
                      min="1"
                      disabled={v.saved}
                      onChange={(e) => handleVehicleChange(i, "quantity", parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:text-gray-500 text-black dark:text-white rounded focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {errors[`qty_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`qty_${i}`]}</p>}
                  </div>
                </div>

                {/* Save / Edit button per vehicle */}
                <div className="flex justify-end">
                  {!v.saved ? (
                    <button
                      onClick={() => handleSaveVehicle(i)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                    >
                      <Check size={16} /> Save Vehicle
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditVehicle(i)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-lg"
                    >
                      <Pencil size={16} /> Edit Vehicle
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Order */}
        <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-gray-700">
          <button
            onClick={() => navigate("/dealers")}
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitOrder}
            disabled={loading}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            {loading ? "Creating..." : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealerOrders;