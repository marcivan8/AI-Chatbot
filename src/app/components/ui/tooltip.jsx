import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "./utils";
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
__name(TooltipProvider, "TooltipProvider");
__name2(TooltipProvider, "TooltipProvider");
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(TooltipProvider, null, /* @__PURE__ */ React.createElement(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }));
}
__name(Tooltip, "Tooltip");
__name2(Tooltip, "Tooltip");
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
__name(TooltipTrigger, "TooltipTrigger");
__name2(TooltipTrigger, "TooltipTrigger");
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(TooltipPrimitive.Portal, null, /* @__PURE__ */ React.createElement(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props
    },
    children,
    /* @__PURE__ */ React.createElement(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
  ));
}
__name(TooltipContent, "TooltipContent");
__name2(TooltipContent, "TooltipContent");
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
};
