import React from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function PageLayout({ children, className = "" }) {
  return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col relative overflow-hidden ${className}` }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-1/4 right-20 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-70" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-70" })), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 flex flex-col flex-1 w-full" }, children));
}
__name(PageLayout, "PageLayout");
__name2(PageLayout, "PageLayout");
export {
  PageLayout
};
