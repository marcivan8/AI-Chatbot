import React from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import { GraduationCap, Briefcase, GitCompare, BarChart3 } from "lucide-react";
function BottomNav({ activeTab, onTabChange, comparisonCount, onEddyClick }) {
  const tabs = [
    { id: "schools", name: "\xC9coles", icon: GraduationCap },
    { id: "careers", name: "M\xE9tiers", icon: Briefcase },
    { id: "comparison", name: "Comparer", icon: GitCompare, badge: comparisonCount },
    { id: "insights", name: "Stats", icon: BarChart3 }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-end justify-between px-2" },
    /* @__PURE__ */ React.createElement("button", {
    onClick: /* @__PURE__ */ __name(() => onTabChange("schools"), "onClick"),
    className: `flex-1 flex flex-col items-center justify-center py-3 transition-colors ${activeTab === "schools" ? "text-blue-600" : "text-gray-400"}`
  }, /* @__PURE__ */ React.createElement(GraduationCap, { className: "w-6 h-6 mb-1" }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-medium" }, "\xC9coles")),

    /* @__PURE__ */ React.createElement("button", {
    onClick: /* @__PURE__ */ __name(() => onTabChange("careers"), "onClick"),
    className: `flex-1 flex flex-col items-center justify-center py-3 transition-colors ${activeTab === "careers" ? "text-blue-600" : "text-gray-400"}`
  }, /* @__PURE__ */ React.createElement(Briefcase, { className: "w-6 h-6 mb-1" }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-medium" }, "M\xE9tiers")),

    /* @__PURE__ */ React.createElement("div", { className: "relative -top-5" },
      /* @__PURE__ */ React.createElement("button", {
    onClick: onEddyClick,
    className: "w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center border-4 border-white transform transition-transform active:scale-95"
  }, /* @__PURE__ */ React.createElement("img", { src: "/eddy-avatar-3d.png", alt: "Eddy", className: "w-full h-full object-cover rounded-full" }))
  ),

    /* @__PURE__ */ React.createElement("button", {
    onClick: /* @__PURE__ */ __name(() => onTabChange("comparison"), "onClick"),
    className: `flex-1 flex flex-col items-center justify-center py-3 transition-colors relative ${activeTab === "comparison" ? "text-blue-600" : "text-gray-400"}`
  },
      /* @__PURE__ */ React.createElement("div", { className: "relative" },
        /* @__PURE__ */ React.createElement(GitCompare, { className: "w-6 h-6 mb-1" }),
    comparisonCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center border border-white" }, comparisonCount)
  ),
      /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-medium" }, "Comparer")
  ),

    /* @__PURE__ */ React.createElement("button", {
    onClick: /* @__PURE__ */ __name(() => onTabChange("insights"), "onClick"),
    className: `flex-1 flex flex-col items-center justify-center py-3 transition-colors ${activeTab === "insights" ? "text-blue-600" : "text-gray-400"}`
  }, /* @__PURE__ */ React.createElement(BarChart3, { className: "w-6 h-6 mb-1" }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-medium" }, "Stats"))
  ));
}
__name(BottomNav, "BottomNav");
__name2(BottomNav, "BottomNav");
export {
  BottomNav
};
