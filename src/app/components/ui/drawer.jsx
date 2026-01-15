import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "./utils";
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DrawerPrimitive.Root, { "data-slot": "drawer", ...props });
}
__name(Drawer, "Drawer");
__name2(Drawer, "Drawer");
function DrawerTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DrawerPrimitive.Trigger, { "data-slot": "drawer-trigger", ...props });
}
__name(DrawerTrigger, "DrawerTrigger");
__name2(DrawerTrigger, "DrawerTrigger");
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DrawerPrimitive.Portal, { "data-slot": "drawer-portal", ...props });
}
__name(DrawerPortal, "DrawerPortal");
__name2(DrawerPortal, "DrawerPortal");
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DrawerPrimitive.Close, { "data-slot": "drawer-close", ...props });
}
__name(DrawerClose, "DrawerClose");
__name2(DrawerClose, "DrawerClose");
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    DrawerPrimitive.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
__name(DrawerOverlay, "DrawerOverlay");
__name2(DrawerOverlay, "DrawerOverlay");
function DrawerContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DrawerPortal, { "data-slot": "drawer-portal" }, /* @__PURE__ */ React.createElement(DrawerOverlay, null), /* @__PURE__ */ React.createElement(
    DrawerPrimitive.Content,
    {
      "data-slot": "drawer-content",
      className: cn(
        "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
        "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
        "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
        "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
        "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
        className
      ),
      ...props
    },
    /* @__PURE__ */ React.createElement("div", { className: "bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
    children
  ));
}
__name(DrawerContent, "DrawerContent");
__name2(DrawerContent, "DrawerContent");
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
__name(DrawerHeader, "DrawerHeader");
__name2(DrawerHeader, "DrawerHeader");
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "drawer-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
__name(DrawerFooter, "DrawerFooter");
__name2(DrawerFooter, "DrawerFooter");
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    DrawerPrimitive.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
__name(DrawerTitle, "DrawerTitle");
__name2(DrawerTitle, "DrawerTitle");
function DrawerDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    DrawerPrimitive.Description,
    {
      "data-slot": "drawer-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
__name(DrawerDescription, "DrawerDescription");
__name2(DrawerDescription, "DrawerDescription");
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
};
