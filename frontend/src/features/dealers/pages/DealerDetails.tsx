import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DealerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/dealers/${id}`)
      .then(res => setDealer(res.data.data))
      .catch(console.error);
  }, [id]);

  if (!dealer) return <div className="p-6 dark:text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Dealer Details</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{dealer._id.slice(-4)}</p>
        </div>
        <button
          onClick={() => navigate("/dealers")}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          ← Back to Dealers
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Dealer Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
            <p className="font-medium text-slate-800 dark:text-white">{dealer.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Contact</p>
            <p className="font-medium text-slate-800 dark:text-white">{dealer.contact}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
            <p className="font-medium text-slate-800 dark:text-white">{dealer.email || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Address</p>
            <p className="font-medium text-slate-800 dark:text-white">{dealer.address || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">GST Number</p>
            <p className="font-medium text-slate-800 dark:text-white">{dealer.gstNumber || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDetails;