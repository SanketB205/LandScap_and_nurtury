import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Inbox,
  Briefcase,
  Sprout,
  Image,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Eye,
  AlertCircle,
} from "lucide-react";
import api from "../../services/api";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/analytics/stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-semibold">Aggregating database statistics...</p>
      </div>
    );
  }

  const metricCards = [
    {
      title: "Total Customer Leads",
      value: stats?.totalInquiries || 0,
      icon: Inbox,
      color: "bg-blue-50 text-blue-800 border-blue-100",
      sub: `${stats?.newInquiries || 0} require initial response`,
    },
    {
      title: "New Inquiries (Action Required)",
      value: stats?.newInquiries || 0,
      icon: AlertCircle,
      color: "bg-amber-50 text-amber-800 border-amber-100",
      sub: "Awaiting team phone contact",
    },
    {
      title: "Active Services",
      value: stats?.totalServices || 0,
      icon: Briefcase,
      color: "bg-green-50 text-green-800 border-green-100",
      sub: "Published on live website",
    },
    {
      title: "Nursery Plant Listings",
      value: stats?.totalPlants || 0,
      icon: Sprout,
      color: "bg-lime-50 text-lime-900 border-lime-100",
      sub: "In catalog with care instructions",
    },
    {
      title: "Completed Projects",
      value: stats?.totalProjects || 0,
      icon: Image,
      color: "bg-purple-50 text-purple-800 border-purple-100",
      sub: "With Before/After imagery",
    },
    {
      title: "Fulfilled / Closed Projects",
      value: stats?.completedInquiries || 0,
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-800 border-emerald-100",
      sub: "Completed site delivery",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black font-serif text-gray-900">
          Executive Operations Overview
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Live MongoDB metrics for Janai Landscape Services business activity in Pune.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between ${card.color}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold">{card.title}</span>
                <div className="p-2 rounded-xl bg-white/70 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="pt-4">
                <span className="text-3xl font-black tracking-tight">{card.value}</span>
                <p className="text-[11px] opacity-80 mt-1 font-medium">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Customer Inquiries</h2>
            <p className="text-xs text-gray-500">Latest quotation and service requests</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats?.recentInquiries?.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">No recent inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Area / Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats?.recentInquiries?.map((inq) => (
                  <tr key={inq._id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-green-800">
                      {inq.referenceId}
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-gray-900 block font-semibold">{inq.name}</strong>
                      <span className="text-[11px] text-gray-400">{inq.phone}</span>
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate">{inq.serviceName}</td>
                    <td className="py-3 px-4">
                      <span>{inq.areaSqFt ? `${inq.areaSqFt} sq ft` : "—"}</span>
                      <span className="block text-[11px] text-gray-400">{inq.budgetRange}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === "New"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "Contacted"
                            ? "bg-blue-100 text-blue-800"
                            : inq.status === "Quotation Sent"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to="/admin/inquiries"
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-lg transition"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
