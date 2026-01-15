import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "./utils";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
__name(Dialog, "Dialog");
__name2(Dialog, "Dialog");
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
__name(DialogTrigger, "DialogTrigger");
__name2(DialogTrigger, "DialogTrigger");
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
__name(DialogPortal, "DialogPortal");
__name2(DialogPortal, "DialogPortal");
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
__name(DialogClose, "DialogClose");
__name2(DialogClose, "DialogClose");
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
__name(DialogOverlay, "DialogOverlay");
__name2(DialogOverlay, "DialogOverlay");
function DialogContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(DialogPortal, { "data-slot": "dialog-portal" }, /* @__PURE__ */ React.createElement(DialogOverlay, null), /* @__PURE__ */ React.createElement(
    DialogPrimitive.Content,
    {
      "data-slot": "dialog-content",
      className: cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
        className
      ),
      ...props
    },
    children,
    /* @__PURE__ */ React.createElement(DialogPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }, /* @__PURE__ */ React.createElement(XIcon, null), /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Close"))
  ));
}
__name(DialogContent, "DialogContent");
__name2(DialogContent, "DialogContent");
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
__name(DialogHeader, "DialogHeader");
__name2(DialogHeader, "DialogHeader");
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
__name(DialogFooter, "DialogFooter");
__name2(DialogFooter, "DialogFooter");
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
__name(DialogTitle, "DialogTitle");
__name2(DialogTitle, "DialogTitle");
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
__name(DialogDescription, "DialogDescription");
__name2(DialogDescription, "DialogDescription");
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};
