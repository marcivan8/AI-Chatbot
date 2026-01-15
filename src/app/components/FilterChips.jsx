import React from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import { MapPin, GraduationCap, Briefcase, FlaskConical } from "lucide-react";
function FilterChips({ activeFilters, onFilterChange, facets }) {
  const cities = facets?.cities?.length > 0 ? facets.cities : ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille"];
  const levels = facets?.levels?.length > 0 ? facets.levels : ["Bac+2", "Bac+3", "Bac+5", "BUT", "Licence", "Master"];
  const types = facets?.types?.length > 0 ? facets.types : ["universit\xE9", "\xE9cole d'ing\xE9nieurs", "\xE9cole de commerce", "grande \xE9cole", "\xE9cole sp\xE9cialis\xE9e"];
  const domains = facets?.domains?.length > 0 ? facets.domains : ["Informatique", "Commerce", "Sciences", "Droit", "Sant\xE9", "Arts"];
  const renderDropdown = (label, icon, category, items) => (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-sm transition-colors hover:border-gray-400 bg-white">
        {React.createElement(icon, { className: "w-3.5 h-3.5" })}
        <span>{label}</span>
        {activeFilters[category].length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-xs">
            {activeFilters[category].length}
          </span>
        )}
      </button>

      {/* Dropdown with bridge for safe hovering */}
      <div className="hidden group-hover:block absolute top-full left-0 pt-2 z-50 min-w-[200px]">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-2 max-h-[300px] overflow-y-auto">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => onFilterChange(category, item)}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm transition-colors hover:bg-gray-50 ${activeFilters[category].includes(item) ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-100 relative z-50">
      <div className="flex flex-wrap gap-2">
        {renderDropdown("Ville", MapPin, "city", cities)}
        {renderDropdown("Niveau", GraduationCap, "level", levels)}
        {renderDropdown("Domaine", FlaskConical, "domain", domains)}

        <button
          onClick={() => onFilterChange("alternance", "toggle")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${activeFilters.alternance === true
            ? "bg-blue-600 text-white"
            : "border border-gray-300 hover:border-gray-400 bg-white"
            }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Alternance</span>
        </button>
      </div>
    </div>
  );
}
__name(FilterChips, "FilterChips");
__name2(FilterChips, "FilterChips");
export {
  FilterChips
};
