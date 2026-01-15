var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import SchoolSearch from "./pages/SchoolSearch";
import Pricing from "./pages/Pricing";
import JobSearch from "./pages/JobSearch";
import Comparator from "./components/schools/Comparator";

function App() {
  return /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, { path: "/", element: /* @__PURE__ */ React.createElement(Home, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/search", element: /* @__PURE__ */ React.createElement(SchoolSearch, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/jobs", element: /* @__PURE__ */ React.createElement(JobSearch, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/compare", element: /* @__PURE__ */ React.createElement(Comparator, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/pricing", element: /* @__PURE__ */ React.createElement(Pricing, null) }))));
}
__name(App, "App");
__name2(App, "App");
var stdin_default = App;
export {
  stdin_default as default
};
