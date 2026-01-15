import React, { useState } from "react";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");

import { Search } from "lucide-react";
import { SimpleTopBar } from "./components/SimpleTopBar";
import { BottomNav } from "./components/BottomNav";

import { HomePage } from "./components/HomePage";
import { PageLayout } from "./components/PageLayout";
import { AboutPage } from "./components/AboutPage";
import { ProfilePage } from "./components/ProfilePage";
import { FilterChips } from "./components/FilterChips";
import { SchoolCardNew } from "./components/SchoolCardNew";
import { SchoolDetailsModal } from "./components/SchoolDetailsModal";
import { CareerCard } from "./components/CareerCard";
import { CareerDetailsModal } from "./components/CareerDetailsModal";
import { ComparisonView } from "./components/ComparisonView";
import { InsightsView } from "./components/InsightsView";
import { EddyChatbot } from "./components/EddyChatbot";
// mockCareers removed

import { apiService } from "../services/api";
// mockSchools removed, using API now
function App() {

  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState("schools");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    city: [],
    level: [],
    type: [],
    alternance: null,

    domain: []
  });
  const [facets, setFacets] = useState({
    cities: [],
    types: [],
    levels: [],
    domains: []
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("eddy_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [comparisonSchools, setComparisonSchools] = useState(() => {
    const saved = localStorage.getItem("eddy_comparison");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careerSearchQuery, setCareerSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [visibleSchoolsCount, setVisibleSchoolsCount] = useState(20);
  const [schools, setSchools] = useState([]);
  const [careers, setCareers] = useState([]); // New state for careers
  const [isLoading, setIsLoading] = useState(false);

  // Fetch facets on mount
  React.useEffect(() => {
    const fetchFacets = async () => {
      try {
        const data = await apiService.getFacets();
        if (data) setFacets(data);
      } catch (err) {
        console.error("Failed to load facets", err);
      }
    };
    fetchFacets();
  }, []);

  // Fetch careers on mount
  React.useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await apiService.getCareers();
        if (data) setCareers(data);
      } catch (err) {
        console.error("Failed to load careers", err);
      }
    };
    fetchCareers();
  }, []); // Run once on mount

  // Fetch schools from API on mount or filter change
  React.useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      try {
        const filtersToSend = {
          query: searchQuery,
          city: filters.city,
          type: filters.type,
          level: filters.level,
          domain: filters.domain,
          alternance: filters.alternance
        };
        const data = await apiService.getSchools(filtersToSend);
        setSchools(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search a bit if needed, but for now direct call
    const timer = setTimeout(() => {
      fetchSchools();
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, searchQuery]);

  // Persist Favorites
  React.useEffect(() => {
    localStorage.setItem("eddy_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Persist Comparison
  React.useEffect(() => {
    localStorage.setItem("eddy_comparison", JSON.stringify(comparisonSchools));
  }, [comparisonSchools]);

  const handleLoadMore = () => {
    setVisibleSchoolsCount((prev) => prev + 20);
  };


  if (currentPage === "home") {
    return /* @__PURE__ */ React.createElement(PageLayout, null, /* @__PURE__ */ React.createElement(SimpleTopBar, { currentPage, onNavigate: setCurrentPage }), /* @__PURE__ */ React.createElement(HomePage, {
      facets,
      onGetStarted: /* @__PURE__ */ __name((input, type) => {
        setCurrentPage("app");
        setActiveTab("schools");
        if (type && input) {
          setFilters(prev => ({ ...prev, [type]: [input] }));
        } else if (typeof input === 'string' && input) {
          setSearchQuery(input);
        }
      }, "onGetStarted")
    }));
  }
  if (currentPage === "about") {
    return /* @__PURE__ */ React.createElement(PageLayout, null, /* @__PURE__ */ React.createElement(SimpleTopBar, { currentPage, onNavigate: setCurrentPage }), /* @__PURE__ */ React.createElement(AboutPage, null));
  }
  if (currentPage === "profile") {
    return /* @__PURE__ */ React.createElement(PageLayout, null, /* @__PURE__ */ React.createElement(SimpleTopBar, { currentPage, onNavigate: setCurrentPage }), /* @__PURE__ */ React.createElement(
      ProfilePage,
      {
        favoritesCount: favorites.length
      }
    ));
  }
  // No local filtering for schools anymore
  // Use 'careers' state instead of mockCareers
  const filteredCareers = careers.filter(
    (career) => career.name.toLowerCase().includes(careerSearchQuery.toLowerCase()) || career.domain.toLowerCase().includes(careerSearchQuery.toLowerCase())
  );
  const handleFilterChange = /* @__PURE__ */ __name2((category, value) => {
    if (category === "alternance") {
      setFilters((prev) => ({
        ...prev,
        alternance: prev.alternance === true ? null : true
      }));
    } else {
      setFilters((prev) => {
        const currentArray = prev[category];
        const newArray = currentArray.includes(value) ? currentArray.filter((v) => v !== value) : [...currentArray, value];
        return { ...prev, [category]: newArray };
      });
    }
  }, "handleFilterChange");
  const toggleFavorite = /* @__PURE__ */ __name2((schoolId) => {
    setFavorites(
      (prev) => prev.includes(schoolId) ? prev.filter((id) => id !== schoolId) : [...prev, schoolId]
    );
  }, "toggleFavorite");
  const toggleCompare = /* @__PURE__ */ __name2((school) => {
    setComparisonSchools((prev) => {
      const exists = prev.find((s) => s.id === school.id);
      if (exists) {
        return prev.filter((s) => s.id !== school.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, school];
    });
  }, "toggleCompare");
  const getRelatedSchools = /* @__PURE__ */ __name2((career) => {
    if (!career || !schools) return [];
    // Filter schools that match the career's domain
    const matchedSchools = schools.filter((school) => {
      // 1. Check for domain match (fuzzy match)
      if (school.domain && Array.isArray(school.domain)) {
        return school.domain.some(d =>
          d.toLowerCase().includes(career.domain.toLowerCase()) ||
          career.domain.toLowerCase().includes(d.toLowerCase())
        );
      }
      return false;
    });

    // Return top 5 matches
    return matchedSchools.slice(0, 5);
  }, "getRelatedSchools");
  return /* @__PURE__ */ React.createElement(PageLayout, null, /* @__PURE__ */ React.createElement(SimpleTopBar, { currentPage, onNavigate: setCurrentPage }), (activeTab === "schools" || activeTab === "careers") && /* @__PURE__ */ React.createElement("div", { className: "bg-white px-4 py-3 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: activeTab === "schools" ? "Rechercher une \xE9cole..." : "Rechercher un m\xE9tier...",
      value: activeTab === "schools" ? searchQuery : careerSearchQuery,
      onChange: /* @__PURE__ */ __name((e) => activeTab === "schools" ? setSearchQuery(e.target.value) : setCareerSearchQuery(e.target.value), "onChange"),
      className: "w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    }
  ))), activeTab === "schools" && /* @__PURE__ */ React.createElement(FilterChips, { activeFilters: filters, onFilterChange: handleFilterChange, facets }), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto pb-20" }, activeTab === "schools" && /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3" }, isLoading && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, "Chargement..."), !isLoading && /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-500" }, schools.length, " r\xE9sultat", schools.length > 1 ? "s" : ""), !isLoading && schools.slice(0, visibleSchoolsCount).map((school) => /* @__PURE__ */ React.createElement(
    SchoolCardNew,
    {
      key: school.id,
      school,
      isFavorite: favorites.includes(school.id),
      isInComparison: !!comparisonSchools.find((s) => s.id === school.id),
      onToggleFavorite: /* @__PURE__ */ __name(() => toggleFavorite(school.id), "onToggleFavorite"),
      onToggleCompare: /* @__PURE__ */ __name(() => toggleCompare(school), "onToggleCompare"),
      onViewDetails: /* @__PURE__ */ __name(() => setSelectedSchool(school), "onViewDetails")
    }
  )), !isLoading && visibleSchoolsCount < schools.length && /* @__PURE__ */ React.createElement("button", { className: "w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl mt-4 hover:bg-blue-100 transition-colors", onClick: handleLoadMore }, "Voir plus de r\xE9sultats"), !isLoading && schools.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-500" }, "Aucune \xE9cole trouv\xE9e"))), activeTab === "careers" && /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-500" }, filteredCareers.length, " r\xE9sultat", filteredCareers.length > 1 ? "s" : ""), filteredCareers.map((career) => /* @__PURE__ */ React.createElement(
    CareerCard,
    {
      key: career.id,
      career,
      onClick: /* @__PURE__ */ __name(() => setSelectedCareer(career), "onClick")
    }
  )), filteredCareers.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-500" }, "Aucun m\xE9tier trouv\xE9"))), activeTab === "comparison" && /* @__PURE__ */ React.createElement(
    ComparisonView,
    {
      schools: comparisonSchools,
      allSchools: schools, // use API schools for comparison view too? or might need to fetch all?
      onAddSchool: toggleCompare,
      onRemoveSchool: /* @__PURE__ */ __name((id) => {
        const school = comparisonSchools.find((s) => s.id === id);
        if (school) toggleCompare(school);
      }, "onRemoveSchool"),
      onViewDetails: setSelectedSchool
    }
  ), activeTab === "insights" && /* @__PURE__ */ React.createElement(InsightsView, {
    onNavigate: setActiveTab,
    onFilter: setFilters
  })), /* @__PURE__ */ React.createElement(
    BottomNav,
    {
      activeTab,
      onTabChange: setActiveTab,
      comparisonCount: comparisonSchools.length,
      onEddyClick: /* @__PURE__ */ __name(() => setIsChatOpen(true), "onEddyClick")
    }
  ), selectedSchool && /* @__PURE__ */ React.createElement(
    SchoolDetailsModal,
    {
      school: selectedSchool,
      onClose: /* @__PURE__ */ __name(() => setSelectedSchool(null), "onClose")
    }
  ), selectedCareer && /* @__PURE__ */ React.createElement(
    CareerDetailsModal,
    {
      career: selectedCareer,
      relatedSchools: getRelatedSchools(selectedCareer),
      onClose: /* @__PURE__ */ __name(() => setSelectedCareer(null), "onClose"),
      onSchoolClick: /* @__PURE__ */ __name((school) => {
        setSelectedCareer(null);
        setSelectedSchool(school);
      }, "onSchoolClick")
    }
  ), /* @__PURE__ */ React.createElement(
    EddyChatbot,
    {
      isOpen: isChatOpen,
      onClose: /* @__PURE__ */ __name(() => setIsChatOpen(false), "onClose")
    }
  ));
}
__name(App, "App");
__name2(App, "App");
export {
  App as default
};
