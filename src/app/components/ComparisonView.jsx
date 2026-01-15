import React from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import { X, Plus, Building2, Cpu, LineChart, GraduationCap, Microscope } from "lucide-react";
const getSchoolIcon = /* @__PURE__ */ __name2((type, size = "sm") => {
  const iconClass = size === "lg" ? "w-8 h-8" : "w-6 h-6";
  switch (type) {
    case "\xE9cole d'ing\xE9nieurs":
      return /* @__PURE__ */ React.createElement(Cpu, { className: `${iconClass} text-blue-600` });
    case "\xE9cole de commerce":
      return /* @__PURE__ */ React.createElement(LineChart, { className: `${iconClass} text-emerald-600` });
    case "universit\xE9":
      return /* @__PURE__ */ React.createElement(Building2, { className: `${iconClass} text-purple-600` });
    case "grande \xE9cole":
      return /* @__PURE__ */ React.createElement(GraduationCap, { className: `${iconClass} text-indigo-600` });
    case "\xE9cole sp\xE9cialis\xE9e":
      return /* @__PURE__ */ React.createElement(Microscope, { className: `${iconClass} text-rose-600` });
    default:
      return /* @__PURE__ */ React.createElement(Building2, { className: `${iconClass} text-gray-600` });
  }
}, "getSchoolIcon");
function ComparisonView({
  schools,
  allSchools,
  onAddSchool,
  onRemoveSchool,
  onViewDetails
}) {
  const availableSchools = allSchools.filter(
    (s) => !schools.find((cs) => cs.id === s.id)
  );
  return /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-4" }, schools.length < 3 && /* @__PURE__ */ React.createElement("div", { className: "glass-card border-0 rounded-xl p-4" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-gray-900 mb-3" }, "Ajouter une \xE9cole (", schools.length, "/3)"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 max-h-64 overflow-y-auto" }, availableSchools.map((school) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: school.id,
      onClick: /* @__PURE__ */ __name(() => onAddSchool(school), "onClick"),
      className: "w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 p-1 bg-white rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0" },
      school.logo && school.logo.startsWith('http')
        ? /* @__PURE__ */ React.createElement("img", { src: school.logo, alt: school.name, className: "w-full h-full object-contain" })
        : getSchoolIcon(school.type, "sm")
    ),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900" }, school.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, school.city)),
    /* @__PURE__ */ React.createElement(Plus, { className: "w-5 h-5 text-blue-600" })
  )))), schools.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "glass-card border-0 rounded-xl overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-gray-50 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-50" }, "Crit\xE8re"), schools.map((school) => /* @__PURE__ */ React.createElement("th", { key: school.id, className: "px-4 py-3 text-center min-w-[200px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 p-2 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden mx-auto" },
    school.logo && school.logo.startsWith('http')
      ? /* @__PURE__ */ React.createElement("img", { src: school.logo, alt: school.name, className: "w-full h-full object-contain" })
      : getSchoolIcon(school.type, "lg")
  ), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-semibold text-gray-900" }, school.name), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: /* @__PURE__ */ __name(() => onRemoveSchool(school.id), "onClick"),
      className: "text-xs text-red-600 hover:text-red-700"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )))))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-gray-200" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Ville"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-sm text-gray-600 text-center" }, school.city))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Type"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-sm text-gray-600 text-center capitalize" }, school.type))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Domaines"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-sm text-gray-600 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1 justify-center" }, school.domain.map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded" }, d)))))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Niveaux"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-sm text-gray-600 text-center" }, school.level.join(", ")))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Reconnaissances"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-sm text-gray-600" }, /* @__PURE__ */ React.createElement("ul", { className: "space-y-1 text-left" }, school.recognition.map((rec, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "text-xs" }, "\u2022 ", rec)))))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Alternance"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-sm text-center" }, /* @__PURE__ */ React.createElement("span", { className: school.alternance ? "text-green-600" : "text-gray-500" }, school.alternance ? "\u2713 Oui" : "\u2717 Non")))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Admission"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-xs text-gray-600 text-center" }, school.admissionProcess))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Co\xFBt annuel"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-sm text-gray-600 text-center font-medium" }, school.cost))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white" }, "Actions"), schools.map((school) => /* @__PURE__ */ React.createElement("td", { key: school.id, className: "px-4 py-3 text-center" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: /* @__PURE__ */ __name(() => onViewDetails(school), "onClick"),
      className: "text-sm text-blue-600 hover:text-blue-700"
    },
    "Voir la fiche"
  )))))))), schools.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "bg-white border border-gray-200 rounded-lg p-12 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-500" }, "Ajoutez des \xE9coles pour commencer la comparaison")));
}
__name(ComparisonView, "ComparisonView");
__name2(ComparisonView, "ComparisonView");
export {
  ComparisonView
};
