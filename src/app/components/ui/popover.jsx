import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "./utils";
function Popover({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
__name(Popover, "Popover");
__name2(Popover, "Popover");
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
__name(PopoverTrigger, "PopoverTrigger");
__name2(PopoverTrigger, "PopoverTrigger");
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(PopoverPrimitive.Portal, null, /* @__PURE__ */ React.createElement(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ));
}
__name(PopoverContent, "PopoverContent");
__name2(PopoverContent, "PopoverContent");
function PopoverAnchor({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(PopoverPrimitive.Anchor, { "data-slot": "popover-anchor", ...props });
}
__name(PopoverAnchor, "PopoverAnchor");
__name2(PopoverAnchor, "PopoverAnchor");
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger
};
