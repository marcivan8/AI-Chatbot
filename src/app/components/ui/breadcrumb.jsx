import React from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "./utils";
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ React.createElement("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
__name(Breadcrumb, "Breadcrumb");
__name2(Breadcrumb, "Breadcrumb");
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
__name(BreadcrumbList, "BreadcrumbList");
__name2(BreadcrumbList, "BreadcrumbList");
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
__name(BreadcrumbItem, "BreadcrumbItem");
__name2(BreadcrumbItem, "BreadcrumbItem");
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ React.createElement(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
__name(BreadcrumbLink, "BreadcrumbLink");
__name2(BreadcrumbLink, "BreadcrumbLink");
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-foreground font-normal", className),
      ...props
    }
  );
}
__name(BreadcrumbPage, "BreadcrumbPage");
__name2(BreadcrumbPage, "BreadcrumbPage");
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props
    },
    children ?? /* @__PURE__ */ React.createElement(ChevronRight, null)
  );
}
__name(BreadcrumbSeparator, "BreadcrumbSeparator");
__name2(BreadcrumbSeparator, "BreadcrumbSeparator");
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("flex size-9 items-center justify-center", className),
      ...props
    },
    /* @__PURE__ */ React.createElement(MoreHorizontal, { className: "size-4" }),
    /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "More")
  );
}
__name(BreadcrumbEllipsis, "BreadcrumbEllipsis");
__name2(BreadcrumbEllipsis, "BreadcrumbEllipsis");
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
};
