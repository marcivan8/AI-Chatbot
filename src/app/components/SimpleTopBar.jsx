import React from "react";
import { Home, Info, GraduationCap } from "lucide-react";

function SimpleTopBar({ currentPage, onNavigate }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 border border-white/10">
                <GraduationCap className="w-5 h-5 stroke-[2.5px] drop-shadow-md" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Guide</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase leading-none mt-0.5">
                L'orientation réinventée
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("home")}
              className={`p-2 rounded-xl transition-colors ${currentPage === "home"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              title="Accueil"
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate("about")}
              className={`p-2 rounded-xl transition-colors ${currentPage === "about"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              title="À propos"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SimpleTopBar };
