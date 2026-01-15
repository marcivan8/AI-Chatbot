import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "./utils";
function HoverCard({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(HoverCardPrimitive.Root, { "data-slot": "hover-card", ...props });
}
__name(HoverCard, "HoverCard");
__name2(HoverCard, "HoverCard");
function HoverCardTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(HoverCardPrimitive.Trigger, { "data-slot": "hover-card-trigger", ...props });
}
__name(HoverCardTrigger, "HoverCardTrigger");
__name2(HoverCardTrigger, "HoverCardTrigger");
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(HoverCardPrimitive.Portal, { "data-slot": "hover-card-portal" }, /* @__PURE__ */ React.createElement(
    HoverCardPrimitive.Content,
    {
      "data-slot": "hover-card-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ));
}
__name(HoverCardContent, "HoverCardContent");
__name2(HoverCardContent, "HoverCardContent");
export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
};
