import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "./utils";
import { buttonVariants } from "./button";
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
__name(AlertDialog, "AlertDialog");
__name2(AlertDialog, "AlertDialog");
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
__name(AlertDialogTrigger, "AlertDialogTrigger");
__name2(AlertDialogTrigger, "AlertDialogTrigger");
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
__name(AlertDialogPortal, "AlertDialogPortal");
__name2(AlertDialogPortal, "AlertDialogPortal");
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
__name(AlertDialogOverlay, "AlertDialogOverlay");
__name2(AlertDialogOverlay, "AlertDialogOverlay");
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(AlertDialogPortal, null, /* @__PURE__ */ React.createElement(AlertDialogOverlay, null), /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Content,
    {
      "data-slot": "alert-dialog-content",
      className: cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
        className
      ),
      ...props
    }
  ));
}
__name(AlertDialogContent, "AlertDialogContent");
__name2(AlertDialogContent, "AlertDialogContent");
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
__name(AlertDialogHeader, "AlertDialogHeader");
__name2(AlertDialogHeader, "AlertDialogHeader");
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
__name(AlertDialogFooter, "AlertDialogFooter");
__name2(AlertDialogFooter, "AlertDialogFooter");
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
__name(AlertDialogTitle, "AlertDialogTitle");
__name2(AlertDialogTitle, "AlertDialogTitle");
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
__name(AlertDialogDescription, "AlertDialogDescription");
__name2(AlertDialogDescription, "AlertDialogDescription");
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
__name(AlertDialogAction, "AlertDialogAction");
__name2(AlertDialogAction, "AlertDialogAction");
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
__name(AlertDialogCancel, "AlertDialogCancel");
__name2(AlertDialogCancel, "AlertDialogCancel");
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
};
