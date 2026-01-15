var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React, { useState } from "react";
const ERROR_IMG_SRC = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const handleError = /* @__PURE__ */ __name2(() => {
    setDidError(true);
  }, "handleError");
  const { src, alt, style, className, ...rest } = props;
  return didError ? /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `inline-block bg-gray-100 text-center align-middle ${className ?? ""}`,
      style
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center w-full h-full" }, /* @__PURE__ */ React.createElement("img", { src: ERROR_IMG_SRC, alt: "Error loading image", ...rest, "data-original-url": src }))
  ) : /* @__PURE__ */ React.createElement("img", { src, alt, className, style, ...rest, onError: handleError });
}
__name(ImageWithFallback, "ImageWithFallback");
__name2(ImageWithFallback, "ImageWithFallback");
export {
  ImageWithFallback
};
