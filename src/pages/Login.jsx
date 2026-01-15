var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
const Login = /* @__PURE__ */ __name2(() => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = /* @__PURE__ */ __name2((e) => {
    e.preventDefault();
    navigate("/");
  }, "handleLogin");
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-center mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-xl mb-4 shadow-blue-500/30 shadow-lg" }, "EG"), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-900 mb-2" }, "Welcome Back"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500" }, "Sign in to continue to EduGuide")),
    /* @__PURE__ */ React.createElement("form", { onSubmit: handleLogin, className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Email Address"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(FiMail, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        value: email,
        onChange: /* @__PURE__ */ __name((e) => setEmail(e.target.value), "onChange"),
        placeholder: "student@example.com",
        className: "pl-12 bg-gray-50 border-gray-200 focus:bg-white",
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-2" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700" }, "Password"), /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-sm text-blue-600 hover:text-blue-700 font-medium" }, "Forgot password?")), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(FiLock, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        value: password,
        onChange: /* @__PURE__ */ __name((e) => setPassword(e.target.value), "onChange"),
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
        className: "pl-12 bg-gray-50 border-gray-200 focus:bg-white",
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "w-full btn btn-primary py-3.5 text-lg shadow-lg shadow-blue-500/30" }, "Sign In ", /* @__PURE__ */ React.createElement(FiArrowRight, { className: "ml-2" }))),
    /* @__PURE__ */ React.createElement("div", { className: "mt-8 text-center text-gray-500 text-sm" }, "Don't have an account?", " ", /* @__PURE__ */ React.createElement(Link, { to: "/signup", className: "text-blue-600 font-bold hover:underline" }, "Create account"))
  ));
}, "Login");
var stdin_default = Login;
export {
  stdin_default as default
};
