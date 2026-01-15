var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
const Pricing = /* @__PURE__ */ __name2(() => {
  const plans = [
    {
      name: "Free",
      price: "\u20AC0",
      period: "/month",
      description: "Perfect for exploring options.",
      features: ["Search all schools", "Basic Eddy Chat (5 questions/day)", "Access detailed school profiles", "Community forums"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro Student",
      price: "\u20AC9",
      period: "/month",
      description: "For serious applicants.",
      features: ["Unlimited Eddy Chat", "Personalized Application Roadmap", "Visa Assistance Guide", "Exclusive Webinars", "Priority Support"],
      cta: "Go Pro",
      popular: true
    },
    {
      name: "Premium",
      price: "\u20AC29",
      period: "/month",
      description: "All-inclusive guidance.",
      features: ["Everything in Pro", "1-on-1 Counselor Session", "Essay Review", "Mock Interviews", "Housing Assistance"],
      cta: "Get Premium",
      popular: false
    }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto px-6 py-20" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-4" }, "Simple, Transparent Pricing"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-lg max-w-2xl mx-auto" }, "Choose the plan that fits your journey to studying in France. No hidden fees.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" }, plans.map((plan, index) => /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: plan.name,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1 },
      className: `glass-panel p-8 rounded-3xl relative flex flex-col ${plan.popular ? "border-blue-500 border-opacity-50 shadow-neon" : ""}`
    },
    plan.popular && /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg" }, "Most Popular"),
    /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-white mb-2" }, plan.name), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm mb-6" }, plan.description), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline" }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl font-bold text-white" }, plan.price), /* @__PURE__ */ React.createElement("span", { className: "text-gray-500 ml-1" }, plan.period))),
    /* @__PURE__ */ React.createElement("ul", { className: "space-y-4 mb-8 flex-grow" }, plan.features.map((feature, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "flex items-start text-sm text-gray-300" }, /* @__PURE__ */ React.createElement(FiCheck, { className: "text-green-400 mr-3 mt-1 flex-shrink-0" }), feature))),
    /* @__PURE__ */ React.createElement("button", { className: `w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25" : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"}` }, plan.cta)
  ))));
}, "Pricing");
var stdin_default = Pricing;
export {
  stdin_default as default
};
