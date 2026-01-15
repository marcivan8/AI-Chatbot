import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "./utils";
function Sheet({ ...props }) {
  return /* @__PURE__ */ React.createElement(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
__name(Sheet, "Sheet");
__name2(Sheet, "Sheet");
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
__name(SheetTrigger, "SheetTrigger");
__name2(SheetTrigger, "SheetTrigger");
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
__name(SheetClose, "SheetClose");
__name2(SheetClose, "SheetClose");
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
__name(SheetPortal, "SheetPortal");
__name2(SheetPortal, "SheetPortal");
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
__name(SheetOverlay, "SheetOverlay");
__name2(SheetOverlay, "SheetOverlay");
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ React.createElement(SheetPortal, null, /* @__PURE__ */ React.createElement(SheetOverlay, null), /* @__PURE__ */ React.createElement(
    SheetPrimitive.Content,
    {
      "data-slot": "sheet-content",
      className: cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
        side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
        side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
        side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
        className
      ),
      ...props
    },
    children,
    /* @__PURE__ */ React.createElement(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none" }, /* @__PURE__ */ React.createElement(XIcon, { className: "size-4" }), /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Close"))
  ));
}
__name(SheetContent, "SheetContent");
__name2(SheetContent, "SheetContent");
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
__name(SheetHeader, "SheetHeader");
__name2(SheetHeader, "SheetHeader");
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
__name(SheetFooter, "SheetFooter");
__name2(SheetFooter, "SheetFooter");
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
__name(SheetTitle, "SheetTitle");
__name2(SheetTitle, "SheetTitle");
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
__name(SheetDescription, "SheetDescription");
__name2(SheetDescription, "SheetDescription");
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
};
