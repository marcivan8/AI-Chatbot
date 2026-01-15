import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
const Toaster = /* @__PURE__ */ __name2(({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ React.createElement(
    Sonner,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
}, "Toaster");
export {
  Toaster
};
