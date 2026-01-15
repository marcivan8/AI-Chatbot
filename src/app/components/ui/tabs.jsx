import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
__name(Tabs, "Tabs");
__name2(Tabs, "Tabs");
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className
      ),
      ...props
    }
  );
}
__name(TabsList, "TabsList");
__name2(TabsList, "TabsList");
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
__name(TabsTrigger, "TabsTrigger");
__name2(TabsTrigger, "TabsTrigger");
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
__name(TabsContent, "TabsContent");
__name2(TabsContent, "TabsContent");
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
};
