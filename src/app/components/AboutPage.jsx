import React from "react";
import { BookOpen, Target, Users, Heart, Sparkles, CheckCircle2, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

function AboutPage() {
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

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-full">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] -z-10" />

          <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-xl shadow-blue-500/10 mb-6 relative group transform hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <BookOpen className="w-10 h-10 text-blue-600 relative z-10" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-purple-800 mb-4 tracking-tight">
            À propos d'EduGuide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Votre copilote intelligent pour une orientation éducative réussie.
            Déclarez votre avenir avec confiance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Mission Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-8 rounded-3xl border border-white/60 shadow-xl shadow-blue-900/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:translate-y-[-40%] transition-transform duration-700" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Notre Mission</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  EduGuide centralise et simplifie l'accès à l'information sur les formations en France.
                  Nous combinons <span className="text-blue-600 font-semibold">intelligence artificielle</span> et données vérifiées pour offrir une expérience d'orientation personnalisée, intuitive et sans stress.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Grid: Audience & Values */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Target Audience */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center transform rotate-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Pour qui ?</h2>
              </div>

              <ul className="space-y-4">
                {[
                  "Lycéens en quête d'orientation",
                  "Étudiants en réorientation",
                  "Professionnels en reconversion",
                  "Parents accompagnateurs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 group">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-green-700 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center transform -rotate-3">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Nos Valeurs</h2>
              </div>

              <div className="space-y-5">
                {[
                  { icon: Shield, title: "Transparence", desc: "Informations fiables et sources vérifiées.", color: "text-blue-500" },
                  { icon: Users, title: "Accessibilité", desc: "Gratuit et simple pour tous.", color: "text-indigo-500" },
                  { icon: Zap, title: "Innovation", desc: "IA de pointe pour vous guider.", color: "text-amber-500" }
                ].map((val, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`mt-1 ${val.color}`}>
                      <val.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{val.title}</h3>
                      <p className="text-sm text-gray-500">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full text-sm text-gray-500 border border-gray-100">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            Version 1.0.0 &bull; © 2026 EduGuide
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export { AboutPage };
