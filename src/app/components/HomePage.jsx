import React, { useState, useEffect } from "react";
import { Search, MapPin, Award, Book, Briefcase, ChevronRight, Sparkles, Brain, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroBgStudies from "../../assets/hero_bg_studies.png";
import heroBgSchool from "../../assets/hero_bg_school.png";
import heroBgSuccess from "../../assets/hero_bg_success.png";

const heroImages = [heroBgStudies, heroBgSchool, heroBgSuccess];

function HomePage({ onGetStarted, facets }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filters = [
    { label: "Ville", icon: MapPin, items: facets?.cities || [], type: "city" },
    { label: "Type", icon: Award, items: facets?.types || [], type: "type" },
    { label: "Filière", icon: Book, items: facets?.domains || [], type: "domain" },
    { label: "Niveau", icon: Briefcase, items: facets?.levels || [], type: "level" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-white min-h-full relative overflow-x-hidden">

      {/* Hero Background Image Slider */}
      <div className="absolute top-0 left-0 w-full h-[700px] z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            initial={{ opacity: 0, scale: 1.1, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            alt="University Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Light Overlay for Bottom Fade Only - Keeping Image Clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        <div className="absolute inset-0 bg-white/10" /> {/* Very subtle brightening if needed */}
      </div>

      {/* Floating Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 -left-20 w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 pt-24 pb-20 flex flex-col items-center justify-center text-center relative z-10"
      >
        {/* Content Wrapper for Extra Readability */}
        <div className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/30 rounded-[3rem] p-8 md:p-12 border border-white/50 shadow-xl shadow-blue-900/5">

          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm text-blue-700 text-sm font-semibold mb-8 hover:shadow-md transition-shadow cursor-default">
              <Sparkles className="w-4 h-4 text-yellow-600 fill-yellow-500" />
              <span>Trouvez votre voie instantanément</span>
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1] drop-shadow-sm">
            Votre avenir <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">commence ici.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-700 font-medium mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            La plateforme intelligente qui simplifie votre recherche d'école.
            Explorez, comparez et trouvez la formation idéale en quelques clics.
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto mb-12 relative group">
            <div className="absolute inset-0 bg-blue-900/10 rounded-3xl blur-xl group-hover:bg-blue-900/20 transition-colors duration-500" />
            <div className="relative bg-white/90 backdrop-blur-md p-2 rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50 flex items-center">
              <div className="pl-4 text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Ex: École d'ingénieur Paris, Design..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-14 pl-4 bg-transparent text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && onGetStarted(searchQuery)}
              />
              <button
                onClick={() => onGetStarted(searchQuery)}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 h-12 rounded-2xl font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95"
              >
                <span>Rechercher</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onGetStarted(searchQuery)}
                className="sm:hidden w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Filter Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-24 z-50 relative">
            {filters.map((filter) => (
              <div key={filter.label} className="relative group">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl text-slate-700 font-medium hover:border-blue-300 hover:bg-blue-50/80 hover:text-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <filter.icon className="w-4 h-4" />
                  <span className="text-sm">{filter.label}</span>
                </button>

                {/* Dropdown */}
                {/* Dropdown */}
                {filter.items && filter.items.length > 0 && (
                  <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 z-50 pt-3 min-w-[200px]">
                    <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-blue-900/10 p-2 max-h-[300px] overflow-y-auto ring-1 ring-black/5">
                      <div className="py-1">
                        {filter.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => onGetStarted(item, filter.type)}
                            className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Stats Section with Glass Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto w-full">
            {[
              { value: "1200+", label: "Écoles", color: "text-blue-600", bg: "bg-blue-50" },
              { value: "500+", label: "Métiers", color: "text-purple-600", bg: "bg-purple-50" },
              { value: "50+", label: "Domaines", color: "text-green-600", bg: "bg-green-50" }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-3xl border border-white/60 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all hover:-translate-y-1 text-center bg-white/60 backdrop-blur-md">
                <h3 className={`text-3xl font-extrabold ${stat.color} mb-1`}>{stat.value}</h3>
                <p className="text-gray-600 font-bold text-sm tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export { HomePage };
