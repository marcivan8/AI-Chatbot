var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
const Navbar = /* @__PURE__ */ __name2(() => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: "Schoole Search", path: "/search" },
    { name: "Careers", path: "/jobs" },
    { name: "Compare", path: "/compare" }
  ];
  const isActive = /* @__PURE__ */ __name2((path) => location.pathname === path, "isActive");
  return /* @__PURE__ */ React.createElement("nav", { className: "fixed top-0 w-full z-50 glass-panel border-b-0 rounded-none bg-opacity-80 backdrop-blur-md" }, /* @__PURE__ */ React.createElement("div", { className: "container mx-auto px-6 py-4 flex justify-between items-center" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "text-2xl font-bold tracking-tight flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg" }, "EG"), /* @__PURE__ */ React.createElement("span", { className: "text-white" }, "EduGuide")), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex items-center gap-8" }, navLinks.map((link) => /* @__PURE__ */ React.createElement(
    Link,
    {
      key: link.path,
      to: link.path,
      className: `text-sm font-medium transition-colors hover:text-white ${isActive(link.path) ? "text-white" : "text-gray-400"}`
    },
    link.name
  ))), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "md:hidden text-white text-2xl",
      onClick: /* @__PURE__ */ __name(() => setIsOpen(!isOpen), "onClick")
    },
    isOpen ? /* @__PURE__ */ React.createElement(FiX, null) : /* @__PURE__ */ React.createElement(FiMenu, null)
  )), /* @__PURE__ */ React.createElement(AnimatePresence, null, isOpen && /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" },
      exit: { opacity: 0, height: 0 },
      className: "md:hidden glass-panel border-t border-gray-800 overflow-hidden"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col p-6 space-y-4" }, navLinks.map((link) => /* @__PURE__ */ React.createElement(
      Link,
      {
        key: link.path,
        to: link.path,
        onClick: /* @__PURE__ */ __name(() => setIsOpen(false), "onClick"),
        className: `text-lg font-medium block ${isActive(link.path) ? "text-white" : "text-gray-400"}`
      },
      link.name
    )))
  )));
}, "Navbar");
var stdin_default = Navbar;
export {
  stdin_default as default
};
