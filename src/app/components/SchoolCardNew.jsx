import React, { useState } from "react";
import { Heart, Plus, Building2, Cpu, LineChart, GraduationCap, Microscope, Globe } from "lucide-react";

const getSchoolIcon = (type) => {
  switch (type) {
    case "école d'ingénieurs":
      return <Cpu className="w-8 h-8 text-white relative z-10" />;
    case "école de commerce":
      return <LineChart className="w-8 h-8 text-white relative z-10" />;
    case "université":
      return <Building2 className="w-8 h-8 text-white relative z-10" />;
    case "grande école":
      return <GraduationCap className="w-8 h-8 text-white relative z-10" />;
    case "école spécialisée":
      return <Microscope className="w-8 h-8 text-white relative z-10" />;
    default:
      return <Building2 className="w-8 h-8 text-white relative z-10" />;
  }
};

const getSchoolColor = (type) => {
  switch (type) {
    case "école d'ingénieurs":
      return "bg-gradient-to-br from-blue-500 to-blue-600";
    case "école de commerce":
      return "bg-gradient-to-br from-emerald-500 to-emerald-600";
    case "université":
      return "bg-gradient-to-br from-purple-500 to-purple-600";
    case "grande école":
      return "bg-gradient-to-br from-indigo-500 to-indigo-600";
    case "école spécialisée":
      return "bg-gradient-to-br from-rose-500 to-rose-600";
    default:
      return "bg-gradient-to-br from-slate-500 to-slate-600";
  }
};

function SchoolCardNew({
  school,
  isFavorite,
  isInComparison,
  onToggleFavorite,
  onToggleCompare,
  onViewDetails
}) {
  const [imageError, setImageError] = useState(false);

  // Function to get initials from school name
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex items-start gap-5 mb-4 relative z-10">
        <div className="relative">
          {school.logo && school.logo.startsWith('http') && !imageError ? (
            <div className="w-16 h-16 p-2 bg-white rounded-2xl shadow-sm border border-blue-50 flex items-center justify-center overflow-hidden">
              <img
                src={school.logo}
                alt={school.name}
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className={`w-16 h-16 rounded-2xl shadow-md flex items-center justify-center relative overflow-hidden ${getSchoolColor(school.type)}`}>
              <div className="absolute inset-0 bg-white/10" />
              <span className="text-xl font-bold text-white tracking-wider">{getInitials(school.name)}</span>
            </div>
          )}

          {/* Type Indicator Icon Badge */}
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-100 text-xs">
            {React.cloneElement(getSchoolIcon(school.type), { className: "w-3 h-3 text-gray-600" })}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1 truncate">{school.name}</h3>
          <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5 truncate">
            <span className="truncate">{school.city}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0" />
            <span className="text-blue-600/80">{school.type}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-xl transition-all ${isFavorite ? "bg-rose-50 text-rose-500" : "hover:bg-gray-100 text-gray-400"}`}
            title="Ajouter aux favoris"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500" : ""}`} />
          </button>

          {school.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(school.url, '_blank');
              }}
              className="p-2 rounded-xl hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"
              title="Visiter le site web"
            >
              <Globe className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {school.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-white/60 border border-blue-100 text-slate-600 text-xs font-semibold rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 relative z-10">
        <button
          onClick={onToggleCompare}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 ${isInComparison ? "bg-blue-600 text-white shadow-blue-200" : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
        >
          <Plus className="w-4 h-4" />
          <span>{isInComparison ? "Comparé" : "Comparer"}</span>
        </button>
        <button
          onClick={onViewDetails}
          className="px-6 py-2.5 bg-blue-50/50 border border-blue-100 text-blue-600 font-semibold rounded-xl hover:bg-white hover:shadow-md text-sm transition-all active:scale-95"
        >
          Détails
        </button>
      </div>
    </div>
  );
}

export { SchoolCardNew };
