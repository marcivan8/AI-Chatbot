var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiBook, FiAward, FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Home = /* @__PURE__ */ __name2(() => {
  const navigate = useNavigate();
  const filters = [
    { label: "Ville", icon: /* @__PURE__ */ React.createElement(FiMapPin, null) },
    { label: "Type", icon: /* @__PURE__ */ React.createElement(FiAward, null) },
    { label: "Fili\xE8re", icon: /* @__PURE__ */ React.createElement(FiBook, null) },
    { label: "Niveau", icon: /* @__PURE__ */ React.createElement(FiBriefcase, null) }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-50 to-transparent z-0 pointer-events-none" }), /* @__PURE__ */ React.createElement("div", { className: "container mx-auto px-6 relative z-10 text-center max-w-3xl" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    /* @__PURE__ */ React.createElement("div", { className: "inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100 shadow-sm" }, "\u2728 Start your journey today"),
    /* @__PURE__ */ React.createElement("h1", { className: "text-5xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight leading-tight" }, "Find your future in ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "text-blue-600" }, "Higher Education")),
    /* @__PURE__ */ React.createElement("p", { className: "text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed" }, "EduGuide makes it simple to discover top schools and career paths. Search, compare, and decide with confidence.")
  ), /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay: 0.2 },
      className: "relative max-w-2xl mx-auto"
    },
    /* @__PURE__ */ React.createElement("div", { className: "absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" }, /* @__PURE__ */ React.createElement(FiSearch, { size: 24 })),
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        placeholder: "Search for a school, major, or city...",
        className: "w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-100 shadow-xl shadow-blue-500/5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-lg transition-all"
      }
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => navigate("/search"), "onClick"),
        className: "absolute right-3 top-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-medium transition-colors"
      },
      "Search"
    )
  ), /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.4 },
      className: "flex flex-wrap justify-center gap-3 mt-8"
    },
    filters.map((filter) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: filter.label,
        onClick: /* @__PURE__ */ __name(() => navigate("/search"), "onClick"),
        className: "flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 group-hover:text-blue-500" }, filter.icon),
      /* @__PURE__ */ React.createElement("span", { className: "font-medium text-sm" }, filter.label)
    ))
  )));
}, "Home");
var stdin_default = Home;
export {
  stdin_default as default
};
