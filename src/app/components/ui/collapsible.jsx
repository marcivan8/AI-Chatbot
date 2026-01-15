import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(CollapsiblePrimitive.Root, { "data-slot": "collapsible", ...props });
}
__name(Collapsible, "Collapsible");
__name2(Collapsible, "Collapsible");
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    CollapsiblePrimitive.CollapsibleTrigger,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
__name(CollapsibleTrigger, "CollapsibleTrigger");
__name2(CollapsibleTrigger, "CollapsibleTrigger");
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    CollapsiblePrimitive.CollapsibleContent,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
__name(CollapsibleContent, "CollapsibleContent");
__name2(CollapsibleContent, "CollapsibleContent");
export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
};
