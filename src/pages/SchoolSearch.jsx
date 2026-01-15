var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { mockSchools } from "../data/mockSchools";
import SchoolCard from "../components/schools/SchoolCard";
import { useNavigate } from "react-router-dom";
const SchoolSearch = /* @__PURE__ */ __name2(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();
  const filters = ["All", "Ville", "Niveau", "Type", "Alternance", "Domaine", "M\xE9tier"];
  const filteredSchools = mockSchools.filter((school) => {
    return school.name.toLowerCase().includes(searchTerm.toLowerCase()) || school.location.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto px-6 py-8" }, /* @__PURE__ */ React.createElement("div", { className: "mb-8 text-center max-w-2xl mx-auto" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold mb-6" }, "Find the perfect school"), /* @__PURE__ */ React.createElement("div", { className: "relative group" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" }, /* @__PURE__ */ React.createElement(FiSearch, { className: "text-gray-400 group-focus-within:text-blue-500 transition-colors", size: 20 })), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Ex : \xE9cole d\u2019ing\xE9nieurs informatique \xE0 Lyon",
      className: "pl-12 pr-4 py-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl w-full text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg",
      value: searchTerm,
      onChange: /* @__PURE__ */ __name((e) => setSearchTerm(e.target.value), "onChange")
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-6 overflow-x-auto pb-2 justify-center scrollbar-hide" }, filters.map((filter) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: filter,
      onClick: /* @__PURE__ */ __name(() => setActiveFilter(filter), "onClick"),
      className: `px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${activeFilter === filter ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25" : "bg-slate-800/50 text-gray-400 border-slate-700 hover:bg-slate-700 hover:text-white"}`
    },
    filter === "All" ? "All Filters" : filter
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-6 text-sm text-gray-400 border-b border-gray-800 pb-4" }, /* @__PURE__ */ React.createElement("span", null, filteredSchools.length, " results found"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("span", null, "Sort by:"), /* @__PURE__ */ React.createElement("span", { className: "text-white cursor-pointer hover:underline" }, "Relevance"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" }, filteredSchools.map((school, index) => /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: school.id,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: "h-full"
    },
    /* @__PURE__ */ React.createElement(
      SchoolCard,
      {
        school,
        onCompare: /* @__PURE__ */ __name(() => navigate("/compare"), "onCompare"),
        onFavorite: /* @__PURE__ */ __name(() => {
        }, "onFavorite")
      }
    )
  ))));
}, "SchoolSearch");
var stdin_default = SchoolSearch;
export {
  stdin_default as default
};
