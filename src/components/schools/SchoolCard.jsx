var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React from "react";
import { FiMapPin, FiStar, FiCheck, FiHeart, FiBarChart2 } from "react-icons/fi";
const SchoolCard = /* @__PURE__ */ __name2(({ school, onCompare, onFavorite }) => {
  return /* @__PURE__ */ React.createElement("div", { className: "glass-card rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-300 flex flex-col h-full bg-[#1e293b]/50 border border-slate-700/50" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 pb-4 border-b border-slate-700/50 flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg flex-shrink-0" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: school.image,
      alt: school.name,
      className: "w-full h-full object-contain",
      onError: /* @__PURE__ */ __name((e) => {
        e.target.onerror = null;
        e.target.src = "https://via.placeholder.com/64?text=Logo";
      }, "onError")
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex-grow" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-white leading-tight mb-1" }, school.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-sm text-gray-400 gap-2" }, /* @__PURE__ */ React.createElement(FiMapPin, { className: "text-blue-400" }), /* @__PURE__ */ React.createElement("span", null, school.location), /* @__PURE__ */ React.createElement("span", { className: "w-1 h-1 rounded-full bg-gray-600" }), /* @__PURE__ */ React.createElement("span", null, school.type || "Private")))), /* @__PURE__ */ React.createElement("div", { className: "p-6 flex-grow flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, school.tags.map((tag, index) => /* @__PURE__ */ React.createElement("span", { key: index, className: "px-2 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20" }, tag)), school.alternance && /* @__PURE__ */ React.createElement("span", { className: "px-2 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-300 border border-green-500/20 flex items-center gap-1" }, /* @__PURE__ */ React.createElement(FiCheck, { size: 10 }), " Alternance")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 text-sm text-gray-300 mt-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-500 uppercase font-semibold" }, "Tuition"), /* @__PURE__ */ React.createElement("span", null, school.tuition)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-500 uppercase font-semibold" }, "Rating"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 text-yellow-400" }, /* @__PURE__ */ React.createElement(FiStar, { className: "fill-current" }), /* @__PURE__ */ React.createElement("span", null, school.rating, "/5"))))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-slate-800/50 border-t border-slate-700/50 grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: /* @__PURE__ */ __name(() => onCompare(school), "onClick"),
      className: "btn btn-glass text-xs py-2 px-3 flex items-center justify-center gap-2 hover:bg-white/10"
    },
    /* @__PURE__ */ React.createElement(FiBarChart2, null),
    " Comparer"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: /* @__PURE__ */ __name(() => onFavorite(school), "onClick"),
      className: "btn btn-glass text-xs py-2 px-3 flex items-center justify-center gap-2 hover:bg-white/10"
    },
    /* @__PURE__ */ React.createElement(FiHeart, null),
    " Favori"
  ), /* @__PURE__ */ React.createElement("button", { className: "col-span-2 btn btn-primary text-sm py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white shadow-lg shadow-orange-500/20 font-semibold" }, "Voir la fiche")));
}, "SchoolCard");
var stdin_default = SchoolCard;
export {
  stdin_default as default
};
