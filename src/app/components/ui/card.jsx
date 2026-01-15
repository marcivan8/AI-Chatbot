import React from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import { cn } from "./utils";
function Card({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className
      ),
      ...props
    }
  );
}
__name(Card, "Card");
__name2(Card, "Card");
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
__name(CardHeader, "CardHeader");
__name2(CardHeader, "CardHeader");
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "h4",
    {
      "data-slot": "card-title",
      className: cn("leading-none", className),
      ...props
    }
  );
}
__name(CardTitle, "CardTitle");
__name2(CardTitle, "CardTitle");
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "p",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground", className),
      ...props
    }
  );
}
__name(CardDescription, "CardDescription");
__name2(CardDescription, "CardDescription");
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
__name(CardAction, "CardAction");
__name2(CardAction, "CardAction");
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6 [&:last-child]:pb-6", className),
      ...props
    }
  );
}
__name(CardContent, "CardContent");
__name2(CardContent, "CardContent");
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
__name(CardFooter, "CardFooter");
__name2(CardFooter, "CardFooter");
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
};
