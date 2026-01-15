import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "./utils";
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    ResizablePrimitive.PanelGroup,
    {
      "data-slot": "resizable-panel-group",
      className: cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      ),
      ...props
    }
  );
}
__name(ResizablePanelGroup, "ResizablePanelGroup");
__name2(ResizablePanelGroup, "ResizablePanelGroup");
function ResizablePanel({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(ResizablePrimitive.Panel, { "data-slot": "resizable-panel", ...props });
}
__name(ResizablePanel, "ResizablePanel");
__name2(ResizablePanel, "ResizablePanel");
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    ResizablePrimitive.PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props
    },
    withHandle && /* @__PURE__ */ React.createElement("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border" }, /* @__PURE__ */ React.createElement(GripVerticalIcon, { className: "size-2.5" }))
  );
}
__name(ResizableHandle, "ResizableHandle");
__name2(ResizableHandle, "ResizableHandle");
export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
};
