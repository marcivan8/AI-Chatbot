var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "../chatbot/ChatWidget";
const Layout = /* @__PURE__ */ __name2(({ children }) => {
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col min-h-screen" }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("main", { className: "flex-grow pt-20" }, children), /* @__PURE__ */ React.createElement(ChatWidget, null), /* @__PURE__ */ React.createElement(Footer, null));
}, "Layout");
var stdin_default = Layout;
export {
  stdin_default as default
};
