import React, { useState } from "react";
import { X, Award, BookOpen, GraduationCap, Briefcase, ArrowRight, CheckCircle2, Building2, TrendingUp, TrendingDown, Minus, Euro, Gauge, Map } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function CareerDetailsModal({
  career,
  relatedSchools,
  onClose,
  onSchoolClick
}) {
  const [activeTab, setActiveTab] = useState("overview");

  const DemandIcon = career.demand === "high" ? TrendingUp : career.demand === "low" ? TrendingDown : Minus;

  // Prepare Salary Data for Chart
  const salaryData = career.salary ? [
    { name: "Junior", value: parseInt(career.salary.junior.split("k")[0]) },
    { name: "Sénior", value: parseInt(career.salary.senior.split("k")[0]) }
  ] : [];

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: Briefcase },
    { id: "roadmap", label: "Parcours", icon: Map },
    { id: "salary", label: "Salaire", icon: Euro },
    { id: "schools", label: "Écoles", icon: Building2 },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-[90vh] sm:h-auto sm:max-w-4xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-white relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold border border-white/10">
                  {career.domain}
                </span>
                {career.outlook && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full text-xs font-semibold border border-green-400/30 text-green-100">
                    <Gauge className="w-3 h-3" /> {career.outlook}
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">{career.name}</h2>
              <p className="text-blue-100 max-w-xl text-sm leading-relaxed opacity-90">{career.description}</p>
            </div>

            <div className="flex gap-4">
              {career.salary && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center min-w-[100px]">
                  <p className="text-xs text-blue-100 mb-1">Junior</p>
                  <p className="font-bold">{career.salary.junior}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 overflow-x-auto flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              {/* Skills */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-500" /> Compétences Clés
                </h3>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Subjects */}
              {career.keySubjects && (
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-500" /> Matières Favorites
                  </h3>
                  <div className="space-y-2">
                    {career.keySubjects.map((subject, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> {subject}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm md:col-span-2 flex flex-col sm:flex-row gap-6 justify-around">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg"><TrendingUp className="w-5 h-5 text-green-600" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Demande</p>
                    <p className="font-semibold text-gray-900 capitalize">{career.demand === "high" ? "Très Forte" : career.demand}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg"><GraduationCap className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Niveau</p>
                    <p className="font-semibold text-gray-900">{career.recommendedLevel[0]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg"><Briefcase className="w-5 h-5 text-orange-600" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Alternance</p>
                    <p className="font-semibold text-gray-900">{career.alternanceAvailable ? "Possible" : "Rare"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ROADMAP TAB */}
          {activeTab === "roadmap" && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-in fade-in duration-300">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" /> Votre Parcours Type
              </h3>

              <div className="relative pl-8 border-l-2 border-blue-100 space-y-8">
                {career.studyPath ? career.studyPath.map((step, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded mb-1 inline-block">
                        {step.step}
                      </span>
                      <h4 className="font-semibold text-gray-900 text-lg">{step.desc}</h4>
                      <p className="text-sm text-gray-500 mt-1">Étape clé pour acquérir les bases fondamentales.</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 italic">Parcours non disponible.</p>
                )}
                {/* Final Goal */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded mb-1 inline-block">JOB</span>
                    <h4 className="font-bold text-gray-900 text-lg">{career.name}</h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SALARY TAB */}
          {activeTab === "salary" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" /> Évolution Salariale
                </h3>
                {career.salary ? (
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salaryData} barSize={60}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis hide />
                        <Tooltip
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                          formatter={(value) => [`${value}k€`, "Salaire Moyen"]}
                        />
                        <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-gray-500">Données salariales non disponibles.</p>
                )}
                <p className="text-xs text-center text-gray-400 mt-4">* Estimations brutes annuelles (moyenne marché)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-600 font-medium mb-1">Junior (0-2 ans)</p>
                  <p className="text-2xl font-bold text-blue-900">{career.salary?.junior || "N/A"}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-sm text-purple-600 font-medium mb-1">Sénior (5+ ans)</p>
                  <p className="text-2xl font-bold text-purple-900">{career.salary?.senior || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          {/* SCHOOLS TAB */}
          {activeTab === "schools" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-600" /> Écoles Recommandées ({relatedSchools.length})
              </h3>
              {relatedSchools.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {relatedSchools.map((school) => (
                    <button
                      key={school.id}
                      onClick={() => onSchoolClick(school)}
                      className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 text-left group"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 overflow-hidden p-1">
                        {school.logo ? <img src={school.logo} alt={school.name} className="w-full h-full object-contain" /> : <Building2 className="w-6 h-6 text-gray-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">{school.name}</p>
                        <p className="text-xs text-gray-500 truncate">{school.city} • {school.type}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500">Aucune école recommandée trouvée pour le moment.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export { CareerDetailsModal };
