import React from "react";
import { User, Heart, BookOpen, Settings, LogOut, ChevronRight, Shield, Sparkles, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

function ProfilePage({ onLogout, favoritesCount }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  const quickActions = [
    {
      title: "Mes Favoris",
      subtitle: `${favoritesCount} école${favoritesCount > 1 ? "s" : ""} enregistrée${favoritesCount > 1 ? "s" : ""}`,
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
      gradient: "from-red-500/10 to-transparent"
    },
    {
      title: "Comparateur",
      subtitle: "3 comparaisons actives",
      icon: BookOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      gradient: "from-purple-500/10 to-transparent"
    },
    {
      title: "Paramètres",
      subtitle: "Préférences & Notifications",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      gradient: "from-gray-500/10 to-transparent"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-full">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header / Hero */}
          <motion.div
            variants={itemVariants}
            className="text-center relative mb-12"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-[80px] -z-10" />
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mon Espace</h1>
            <p className="text-gray-500">Gérez votre parcours en toute simplicité</p>
          </motion.div>

          {/* User Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-6 rounded-3xl border border-white/60 shadow-xl shadow-blue-900/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white p-0.5" />
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">Marc-Ivan</h2>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200 uppercase tracking-wide">Premium</span>
                </div>
                <p className="text-gray-500 font-medium">marcivan@epitech.eu</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-400 pt-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>Étudiant • Bac+3</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/60 shadow-sm hover:shadow-lg transition-all text-left relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${action.gradient} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500`} />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{action.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Logout Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 p-4 bg-white/50 hover:bg-red-50 border border-red-100/50 hover:border-red-200 rounded-2xl text-red-600 hover:text-red-700 font-semibold transition-all shadow-sm hover:shadow active:scale-95 backdrop-blur-sm"
            >
              <LogOut className="w-5 h-5" />
              <span>Se déconnecter</span>
            </button>
            <p className="text-center text-xs text-gray-400 mt-6">
              Compte sécurisé • Version 1.0.0
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

export { ProfilePage };
