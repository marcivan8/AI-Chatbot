import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "./utils";
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
__name(Avatar, "Avatar");
__name2(Avatar, "Avatar");
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
__name(AvatarImage, "AvatarImage");
__name2(AvatarImage, "AvatarImage");
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
__name(AvatarFallback, "AvatarFallback");
__name2(AvatarFallback, "AvatarFallback");
export {
  Avatar,
  AvatarFallback,
  AvatarImage
};
