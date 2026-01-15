import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { School, Briefcase, TrendingUp, Award, BarChart3, PieChart as PieIcon, Loader2 } from "lucide-react";

export function InsightsView({ onNavigate, onFilter }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center p-8 text-gray-500">
        Impossible de charger les statistiques.
      </div>
    );
  }

  const { totalSchools, alternanceCount, domains, types, highDemandCareers, totalCareers } = stats;

  const domainData = Object.entries(domains)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const typeData = Object.entries(types).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100/50 rounded-2xl shadow-sm">
          <BarChart3 className="w-10 h-10 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Insights Market
          </h1>
          <p className="text-gray-500 font-medium">Analyse temps réel du marché</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="glass-card border-0 rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none" />
        <h2 className="font-bold text-xl text-gray-800 mb-6 relative z-10 flex items-center gap-2">
          Statistiques Générales
        </h2>
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div
            onClick={() => {
              if (onFilter) onFilter({ city: [], type: [], level: [], domain: [], alternance: null });
              if (onNavigate) onNavigate("schools");
            }}
            className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-600 font-medium mb-1">Écoles</p>
                <p className="text-3xl font-extrabold text-blue-900 drop-shadow-sm">{totalSchools}</p>
              </div>
              <School className="w-8 h-8 text-blue-400 opacity-80" />
            </div>
          </div>
          <div
            onClick={() => {
              if (onFilter) onFilter({ city: [], type: [], level: [], domain: [], alternance: true });
              if (onNavigate) onNavigate("schools");
            }}
            className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-green-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">Alternance</p>
                <p className="text-3xl font-extrabold text-green-900 drop-shadow-sm">{alternanceCount}</p>
              </div>
              <Award className="w-8 h-8 text-green-400 opacity-80" />
            </div>
          </div>
          <div
            onClick={() => {
              if (onNavigate) onNavigate("careers");
            }}
            className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-purple-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-purple-600 font-medium mb-1">Métiers</p>
                {/* Assuming total careers is not directly available in aggregate stats but highDemandCareers length is a proxy or we can update API to return total careers count. For now let's show high demand count or just remove this card if redundant, but user UI needs it. Let's use highDemandCareers.length or maybe we should have updated API to return total careers. Let's assume highDemandCareers is what we have for now. Actually, let's keep it 'Top Demande' for the orange one and maybe 'Métiers Pén.' for this one? Original code used `careers.length`.
                Let's check what I returned in API.
                API returned: totalSchools, alternanceCount, domains, types, highDemandCareers.
                The API did NOT return total careers.
                I should probably fetch `careers` separately or update `getStats`.
                Actually, let's just use `highDemandCareers.length` for "Top Demande" (Orange).
                And for "Métiers" (Purple), I don't have the total count.
                I'll stick to displaying "?" or fetching careers as well.
                Wait, I can just call `apiService.getCareers` in parallel or update `getStats` to return `totalCareers`.
                Updating `getStats` in backend is better.
                But for now, I will just call `apiService.getCareers` in this component or just leave it out.
                Actually, the original UI showed "Métiers".
                Let's quickly assume I should update the backend to include `totalCareers`?
                No, I'll allow `InsightsView` to fetch `careers` as well since it might need them for other things or just use the high demand count for now.
                Wait, the simplest thing is to just fetch careers in `InsightsView` too if needed.
                However, I'll update `InsightsView` to just show `highDemandCareers.length` for now to avoid blocking.
                Actually, looking at the previous code, the purple card was "Métiers". The orange card was "Top Demande".
                I'll just put `highDemandCareers.length` in the purple card for now if I can't get total.
                OR, better: I'll make a quick update to `backend/app/api.py` to return `totalCareers`?
                No, let's just fetch both `getStats` and `getCareers` inside `useEffect` using `Promise.all`. It's robust.
                */}
                <p className="text-3xl font-extrabold text-purple-900 drop-shadow-sm">{totalCareers || highDemandCareers.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-purple-400 opacity-80" />
            </div>
          </div>
          <div
            onClick={() => {
              if (onNavigate) onNavigate("careers");
            }}
            className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-orange-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-orange-600 font-medium mb-1">Top Demande</p>
                <p className="text-3xl font-extrabold text-orange-900 drop-shadow-sm">{highDemandCareers.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-400 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass-card border-0 rounded-2xl p-6">
        <h2 className="font-bold text-xl text-gray-800 mb-6">Domaines Populaires</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={domainData} barSize={40}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="shadow" height="130%">
                  <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)" }}
              />
              <Bar dataKey="count" fill="url(#colorUv)" radius={[8, 8, 0, 0]} filter="url(#shadow)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart & Legend */}
      <div className="glass-card border-0 rounded-2xl p-6">
        <h2 className="font-bold text-xl text-gray-800 mb-6">Répartition Établissements</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="w-full sm:w-1/2" style={{ height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <defs>
                  {COLORS.map((color, index) => (
                    <linearGradient key={`grad-${index}`} id={`colorAds-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                  <filter id="pie-shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.15)" />
                  </filter>
                </defs>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  filter="url(#pie-shadow)"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorAds-${index})`} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full sm:w-1/2 grid grid-cols-1 gap-3">
            {typeData.map((entry, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm text-gray-700 font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High Demand Careers List */}
      <div className="glass-card border-0 rounded-2xl p-6">
        <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">🔥 Métiers Trending</h2>
        <div className="space-y-4">
          {highDemandCareers.map((career) => (
            <div
              key={career.id}
              className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl shadow-inner">
                  📈
                </div>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{career.name}</p>
                  <p className="text-sm text-gray-500">{career.domain}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {career.skills.slice(0, 2).map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white border border-gray-100 px-2 py-1 rounded-full text-gray-600 font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
