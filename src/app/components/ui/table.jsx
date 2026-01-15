import React from "react";
"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import * as React from "react";
import { cn } from "./utils";
function Table({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto"
    },
    /* @__PURE__ */ React.createElement(
      "table",
      {
        "data-slot": "table",
        className: cn("w-full caption-bottom text-sm", className),
        ...props
      }
    )
  );
}
__name(Table, "Table");
__name2(Table, "Table");
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
__name(TableHeader, "TableHeader");
__name2(TableHeader, "TableHeader");
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
__name(TableBody, "TableBody");
__name2(TableBody, "TableBody");
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  );
}
__name(TableFooter, "TableFooter");
__name2(TableFooter, "TableFooter");
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
__name(TableRow, "TableRow");
__name2(TableRow, "TableRow");
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
__name(TableHead, "TableHead");
__name2(TableHead, "TableHead");
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ React.createElement(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
__name(TableCell, "TableCell");
__name2(TableCell, "TableCell");
function TableCaption({
  className,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("text-muted-foreground mt-4 text-sm", className),
      ...props
    }
  );
}
__name(TableCaption, "TableCaption");
__name2(TableCaption, "TableCaption");
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
};
