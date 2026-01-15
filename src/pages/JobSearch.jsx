var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { mockJobs } from "../data/mockJobs";
import { mockSchools } from "../data/mockSchools";
import SchoolCard from "../components/schools/SchoolCard";
const JobSearch = /* @__PURE__ */ __name2(() => {
  const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredJobs = mockJobs.filter(
    (job) => job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const recommendedSchools = selectedJob ? mockSchools.filter((school) => selectedJob.recommendedSchools.includes(school.id)) : [];
  return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto px-6 py-8 h-[calc(100vh-80px)] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold mb-4" }, "Explore Careers"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(FiSearch, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Ex: d\xE9veloppeur web, data analyst...",
      className: "pl-12 bg-gray-900/50 border-gray-700 w-full max-w-2xl py-3 rounded-xl",
      value: searchTerm,
      onChange: /* @__PURE__ */ __name((e) => setSearchTerm(e.target.value), "onChange")
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row gap-8 flex-grow overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "w-full lg:w-1/3 overflow-y-auto pr-2 space-y-4" }, filteredJobs.map((job) => /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: job.id,
      onClick: /* @__PURE__ */ __name(() => setSelectedJob(job), "onClick"),
      whileHover: { scale: 1.02 },
      className: `p-6 rounded-2xl cursor-pointer border transition-all ${selectedJob?.id === job.id ? "bg-blue-600/20 border-blue-500" : "glass-panel border-transparent hover:bg-white/5"}`
    },
    /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-white mb-2" }, job.title),
    /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-400 line-clamp-2" }, job.description),
    /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-slate-700 px-2 py-1 rounded text-gray-300" }, job.salary), /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-slate-700 px-2 py-1 rounded text-gray-300" }, job.level))
  ))), /* @__PURE__ */ React.createElement("div", { className: "w-full lg:w-2/3 glass-panel rounded-3xl p-8 overflow-y-auto border border-gray-800" }, /* @__PURE__ */ React.createElement(AnimatePresence, { mode: "wait" }, selectedJob && /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: selectedJob.id,
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl" }, /* @__PURE__ */ React.createElement(FiBriefcase, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl font-bold text-white" }, selectedJob.title), /* @__PURE__ */ React.createElement("p", { className: "text-blue-400" }, selectedJob.salary, " \u2022 ", selectedJob.level))),
    /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-white mb-3" }, "Description"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300 leading-relaxed text-lg" }, selectedJob.description)),
    /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-white mb-3" }, "Key Skills"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, selectedJob.skills.map((skill) => /* @__PURE__ */ React.createElement("span", { key: skill, className: "px-4 py-2 bg-slate-800 rounded-lg text-sm text-blue-300 border border-slate-700" }, skill)))),
    /* @__PURE__ */ React.createElement("div", { className: "border-t border-gray-700 pt-8" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-white mb-6" }, "Recommended Schools"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, recommendedSchools.map((school) => /* @__PURE__ */ React.createElement("div", { key: school.id, className: "h-full" }, /* @__PURE__ */ React.createElement(
      SchoolCard,
      {
        school,
        onCompare: /* @__PURE__ */ __name(() => {
        }, "onCompare"),
        onFavorite: /* @__PURE__ */ __name(() => {
        }, "onFavorite")
      }
    ))))),
    /* @__PURE__ */ React.createElement("div", { className: "mt-8 pt-8 border-t border-gray-700 text-center" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary px-8 py-3 flex items-center gap-2 mx-auto" }, "See detailed roadmap ", /* @__PURE__ */ React.createElement(FiArrowRight, null)))
  )))));
}, "JobSearch");
var stdin_default = JobSearch;
export {
  stdin_default as default
};
