import React from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import { TrendingUp, TrendingDown, Minus, Euro, Gauge } from "lucide-react";
function CareerCard({ career, onClick }) {
  const DemandIcon = career.demand === "high" ? TrendingUp : career.demand === "low" ? TrendingDown : Minus;
  const demandColor = career.demand === "high" ? "text-green-600" : career.demand === "low" ? "text-red-600" : "text-yellow-600";
  const demandText = career.demand === "high" ? "Forte demande" : career.demand === "low" ? "Faible demande" : "Demande moyenne";

  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      className: "w-full text-left bg-white/80 backdrop-blur-md border border-white/40 shadow-sm rounded-xl p-5 group hover:shadow-lg hover:bg-white hover:scale-[1.02] transition-all duration-300 relative overflow-hidden flex flex-col h-full"
    },
    /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),

    /*Header*/
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-3 w-full" },
        /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1" }, career.name),
        /* @__PURE__ */ React.createElement("div", { className: `flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${career.demand === "high" ? "bg-green-100 text-green-700" : career.demand === "low" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}` },
            /* @__PURE__ */ React.createElement(DemandIcon, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, demandText)
    )
    ),

    /*Desc*/
    /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-grow" }, career.description),

    /*Skills*/
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-4" }, career.skills.slice(0, 3).map((skill, index) => /* @__PURE__ */ React.createElement("span", { key: index, className: "px-2.5 py-1 bg-gray-100 group-hover:bg-blue-50 text-gray-600 group-hover:text-blue-600 text-xs rounded-md transition-colors font-medium" }, skill)), career.skills.length > 3 && /* @__PURE__ */ React.createElement("span", { className: "px-2 py-1 text-xs text-gray-500 font-medium" }, "+", career.skills.length - 3)),

    /*Footer Info*/
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 text-xs pt-3 border-t border-gray-100 w-full text-gray-500" },
      career.salary && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" },
            /* @__PURE__ */ React.createElement(Euro, { className: "w-3.5 h-3.5 text-blue-500" }),
            /* @__PURE__ */ React.createElement("span", null, career.salary.junior)
      ),
      career.outlook && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" },
            /* @__PURE__ */ React.createElement(Gauge, { className: "w-3.5 h-3.5 text-purple-500" }),
            /* @__PURE__ */ React.createElement("span", null, career.outlook)
      )
    )
  );
}
__name(CareerCard, "CareerCard");
__name2(CareerCard, "CareerCard");
export {
  CareerCard
};
