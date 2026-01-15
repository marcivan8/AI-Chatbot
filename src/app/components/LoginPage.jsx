import React, { useState } from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");

import { BookOpen, Mail, Lock } from "lucide-react";
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = /* @__PURE__ */ __name2((e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 800);
  }, "handleSubmit");
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-70" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-70" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -bottom-8 left-20 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-70" }), /* @__PURE__ */ React.createElement("div", { className: "max-w-md w-full glass-card rounded-2xl p-8 relative z-10 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30 mb-4 transform hover:scale-105 transition-transform" }, /* @__PURE__ */ React.createElement(BookOpen, { className: "w-8 h-8 text-white" })), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-900 mb-2" }, "EduGuide"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500" }, "Trouvez votre formation id\xE9ale")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1.5" }, "Email"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      required: true,
      value: email,
      onChange: /* @__PURE__ */ __name((e) => setEmail(e.target.value), "onChange"),
      className: "w-full pl-10 pr-4 py-3 rounded-xl glass-input text-gray-900 placeholder-gray-400 focus:outline-none",
      placeholder: "Ex: etudiant@exemple.com"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1.5" }, "Mot de passe"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "password",
      required: true,
      value: password,
      onChange: /* @__PURE__ */ __name((e) => setPassword(e.target.value), "onChange"),
      className: "w-full pl-10 pr-4 py-3 rounded-xl glass-input text-gray-900 placeholder-gray-400 focus:outline-none",
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
    }
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-sm" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center gap-2 cursor-pointer group" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all" }), /* @__PURE__ */ React.createElement("span", { className: "text-gray-600 group-hover:text-gray-800 transition-colors" }, "Se souvenir de moi")), /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-blue-600 hover:text-blue-700 font-medium hover:underline" }, "Mot de passe oubli\xE9 ?")), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      disabled: isLoading,
      className: `w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all text-base flex items-center justify-center gap-2 ${isLoading ? "opacity-90 cursor-wait" : ""}`
    },
    isLoading ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }), /* @__PURE__ */ React.createElement("span", null, "Connexion...")) : "Se connecter"
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-8 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Pas encore de compte ?", " ", /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-blue-600 hover:text-blue-700 font-semibold hover:underline" }, "Cr\xE9er un compte")))));
}
__name(LoginPage, "LoginPage");
__name2(LoginPage, "LoginPage");
export {
  LoginPage
};
