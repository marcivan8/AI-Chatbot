var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React, { useState } from "react";
import { mockSchools } from "../../data/mockSchools";
const Comparator = /* @__PURE__ */ __name2(() => {
  const [school1, setSchool1] = useState(mockSchools[0]);
  const [school2, setSchool2] = useState(mockSchools[1]);
  const ComparisonRow = /* @__PURE__ */ __name2(({ label, value1, value2 }) => /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 py-4 border-b border-gray-700 hover:bg-white/5 transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "col-span-1 text-gray-400 font-medium pl-4 flex items-center" }, label), /* @__PURE__ */ React.createElement("div", { className: "col-span-1 font-semibold text-white px-2" }, value1), /* @__PURE__ */ React.createElement("div", { className: "col-span-1 font-semibold text-white px-2 border-l border-gray-700" }, value2)), "ComparisonRow");
  return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto px-6 py-12" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold mb-8" }, "Compare Schools"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-8 mb-12" }, /* @__PURE__ */ React.createElement("div", { className: "col-span-1" }), " ", /* @__PURE__ */ React.createElement("div", { className: "col-span-1" }, /* @__PURE__ */ React.createElement("div", { className: "glass-panel p-4 rounded-xl mb-4" }, /* @__PURE__ */ React.createElement(
    "select",
    {
      className: "w-full bg-transparent border-none text-white focus:ring-0 text-lg font-bold",
      value: school1.id,
      onChange: /* @__PURE__ */ __name((e) => setSchool1(mockSchools.find((s) => s.id === parseInt(e.target.value))), "onChange")
    },
    mockSchools.map((s) => /* @__PURE__ */ React.createElement("option", { key: s.id, value: s.id, className: "bg-slate-900" }, s.name))
  ), /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-sm text-blue-400" }, school1.location))), /* @__PURE__ */ React.createElement("div", { className: "col-span-1" }, /* @__PURE__ */ React.createElement("div", { className: "glass-panel p-4 rounded-xl mb-4 relative" }, /* @__PURE__ */ React.createElement(
    "select",
    {
      className: "w-full bg-transparent border-none text-white focus:ring-0 text-lg font-bold",
      value: school2.id,
      onChange: /* @__PURE__ */ __name((e) => setSchool2(mockSchools.find((s) => s.id === parseInt(e.target.value))), "onChange")
    },
    mockSchools.map((s) => /* @__PURE__ */ React.createElement("option", { key: s.id, value: s.id, className: "bg-slate-900" }, s.name))
  ), /* @__PURE__ */ React.createElement("div", { className: "mt-2 text-sm text-blue-400" }, school2.location)))), /* @__PURE__ */ React.createElement("div", { className: "glass-panel rounded-2xl overflow-hidden border border-gray-700" }, /* @__PURE__ */ React.createElement(ComparisonRow, { label: "Tuition", value1: school1.tuition, value2: school2.tuition }), /* @__PURE__ */ React.createElement(ComparisonRow, { label: "Major", value1: school1.major, value2: school2.major }), /* @__PURE__ */ React.createElement(ComparisonRow, { label: "Rating", value1: `${school1.rating}/5`, value2: `${school2.rating}/5` }), /* @__PURE__ */ React.createElement(
    ComparisonRow,
    {
      label: "Type",
      value1: school1.tags.includes("Public") ? "Public" : "Private",
      value2: school2.tags.includes("Public") ? "Public" : "Private"
    }
  ), /* @__PURE__ */ React.createElement(
    ComparisonRow,
    {
      label: "Dipl\xF4me",
      value1: "Grade de Master",
      value2: "Grade de Master"
    }
  ), /* @__PURE__ */ React.createElement(
    ComparisonRow,
    {
      label: "Reconnaissance",
      value1: /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "badge bg-blue-500/20 text-blue-300 px-2 rounded text-xs border border-blue-500/30" }, "CTI")),
      value2: /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "badge bg-blue-500/20 text-blue-300 px-2 rounded text-xs border border-blue-500/30" }, "CTI"))
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-12 grid grid-cols-2 gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "glass-panel p-6 rounded-2xl" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold mb-4" }, "Employment Rate"), /* @__PURE__ */ React.createElement("div", { className: "h-4 bg-gray-700 rounded-full overflow-hidden mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "h-full bg-blue-500", style: { width: "92%" } })), /* @__PURE__ */ React.createElement("div", { className: "h-4 bg-gray-700 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "h-full bg-purple-500", style: { width: "88%" } })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between mt-2 text-sm text-gray-400" }, /* @__PURE__ */ React.createElement("span", null, school1.name, " (92%)"), /* @__PURE__ */ React.createElement("span", null, school2.name, " (88%)"))), /* @__PURE__ */ React.createElement("div", { className: "glass-panel p-6 rounded-2xl" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold mb-4" }, "Student Satisfaction"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-8 h-32" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-4xl font-bold text-blue-400" }, school1.rating), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, "out of 5")), /* @__PURE__ */ React.createElement("div", { className: "h-20 w-px bg-gray-700" }), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-4xl font-bold text-purple-400" }, school2.rating), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, "out of 5"))))));
}, "Comparator");
var stdin_default = Comparator;
export {
  stdin_default as default
};
