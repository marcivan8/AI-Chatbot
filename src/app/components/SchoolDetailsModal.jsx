import React, { useState } from "react";
import { X, MapPin, Building2, GraduationCap, Award, DollarSign, FileText, FlaskConical, Briefcase, Cpu, LineChart, Microscope, ChevronRight, Globe, School, Calendar, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getSchoolIcon = (type) => {
  switch (type) {
    case "école d'ingénieurs":
      return <Cpu className="w-8 h-8 text-white" />;
    case "école de commerce":
      return <LineChart className="w-8 h-8 text-white" />;
    case "université":
      return <Building2 className="w-8 h-8 text-white" />;
    case "grande école":
      return <GraduationCap className="w-8 h-8 text-white" />;
    case "école spécialisée":
      return <Microscope className="w-8 h-8 text-white" />;
    default:
      return <School className="w-8 h-8 text-white" />;
  }
};

const getSchoolColor = (type) => {
  switch (type) {
    case "école d'ingénieurs":
      return "bg-gradient-to-br from-blue-500 to-blue-600";
    case "école de commerce":
      return "bg-gradient-to-br from-emerald-500 to-emerald-600";
    case "université":
      return "bg-gradient-to-br from-purple-500 to-purple-600";
    case "grande école":
      return "bg-gradient-to-br from-indigo-500 to-indigo-600";
    case "école spécialisée":
      return "bg-gradient-to-br from-rose-500 to-rose-600";
    default:
      return "bg-gradient-to-br from-slate-500 to-slate-600";
  }
};

const getAdmissionTimeline = (process = "") => {
  const p = process.toLowerCase();
  if (p.includes("parcoursup")) {
    return [
      { date: "Janvier", title: "Ouverture de la plateforme", desc: "Découverte des formations et inscription." },
      { date: "Mars", title: "Voeux et Dossiers", desc: "Date limite pour formuler vos voeux." },
      { date: "Avril", title: "Confirmation", desc: "Dernier jour pour confirmer vos voeux." },
      { date: "Juin", title: "Résultats d'admission", desc: "Début de la phase d'admission principale." }
    ];
  } else if (p.includes("concours")) {
    return [
      { date: "Décembre - Janvier", title: "Inscription au Concours", desc: "Inscription en ligne sur le site du concours." },
      { date: "Avril - Mai", title: "Épreuves Écrites", desc: "Passage des examens écrits." },
      { date: "Juin - Juillet", title: "Oraux d'Admission", desc: "Entretiens de motivation et épreuves orales." },
      { date: "Juillet", title: "Résultats", desc: "Publication des résultats finaux." }
    ];
  } else {
    // Dossier / Default
    return [
      { date: "Toute l'année", title: "Information", desc: "Renseignez-vous sur le site de l'école." },
      { date: "Printemps", title: "Dépôt de candidature", desc: "Envoi du dossier (CV, lettre, notes)." },
      { date: "1 mois après", title: "Entretien éventuel", desc: "Entretien avec le jury d'admission." },
      { date: "Rapidement", title: "Réponse", desc: "Réponse de l'école sous quelques semaines." }
    ];
  }
};

const getRequiredDocuments = (type = "") => {
  const t = type.toLowerCase();
  const base = ["CV à jour", "Lettre de motivation", "Relevés de notes", "Pièce d'identité"];

  if (t.includes("art") || t.includes("architecture") || t.includes("design")) {
    return [...base, "Portfolio artistique (Book)", "Projet personnel"];
  } else if (t.includes("ingénieur") || t.includes("commerce") || t.includes("management")) {
    return [...base, "Score test d'anglais (TOEIC/TOEFL)", "Lettre(s) de recommandation"];
  } else if (t.includes("université")) {
    return ["Relevés de notes officiel", "Diplôme du Baccalauréat", "Attestation CVEC", "Photos d'identité"];
  }
  return base;
};

function SchoolDetailsModal({ school, onClose }) {
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Function to get initials from school name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const tabs = [
    { id: "overview", label: "Aperçu", icon: Building2 },
    { id: "programs", label: "Formations", icon: GraduationCap },
    { id: "admission", label: "Admission", icon: FileText },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white/90 backdrop-blur-xl w-full sm:max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="relative overflow-hidden p-8 pb-6 bg-gradient-to-b from-blue-50/50 to-transparent flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-all text-gray-500 hover:text-gray-900 shadow-sm z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-6 relative z-10">
            {/* Logo / Initials */}
            <div className="flex-shrink-0">
              {school.logo && school.logo.startsWith('http') && !imageError ? (
                <div className="w-24 h-24 p-3 bg-white rounded-2xl shadow-lg border border-white/60 flex items-center justify-center overflow-hidden">
                  <img
                    src={school.logo}
                    alt={school.name}
                    className="w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className={`w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden ${getSchoolColor(school.type)}`}>
                  <div className="absolute inset-0 bg-white/10" />
                  <span className="text-3xl font-bold text-white tracking-widest text-shadow-sm">{getInitials(school.name)}</span>
                </div>
              )}
            </div>

            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${getSchoolColor(school.type)} shadow-sm`}>
                  {school.type}
                </span>
                {school.alternance && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700">
                    Alternance
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight">{school.name}</h2>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{school.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-8 flex border-b border-gray-100 bg-white/50 sticky top-0 z-10 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50"
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="p-8 pt-6 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* Description */}
                <div>
                  <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-4 py-1 bg-blue-50/30 rounded-r-lg">
                    {school.description}
                  </p>
                </div>

                {/* Key Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Frais de scolarité</p>
                      <p className="font-semibold text-gray-900">{school.cost}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Niveaux</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {school.level.map((l, i) => (
                          <span key={i} className="text-xs font-semibold px-2 py-0.5 bg-gray-100 rounded text-gray-700 border border-gray-200">{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recognition & Tags */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Reconnaissances et Labels
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {school.recognition.map((rec, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm border border-yellow-100">
                        <Award className="w-3.5 h-3.5" />
                        <span className="font-medium">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* PROGRAMS TAB */}
            {activeTab === "programs" && (
              <motion.div
                key="programs"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-blue-600" />
                    Domaines d'enseignement
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {school.domain.map((d, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white text-blue-800 rounded-lg text-sm font-semibold border border-blue-100 shadow-sm">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {school.programs && school.programs.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-slate-600" />
                      Diplômes & Cursus
                    </h3>
                    <ul className="grid gap-3">
                      {school.programs.map((prog, i) => (
                        <li key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          <span className="font-medium text-gray-700">{prog}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 italic">
                    Aucun détail spécifique sur les cursus disponible.
                  </div>
                )}
              </motion.div>
            )}

            {/* ADMISSION TAB */}
            {activeTab === "admission" && (
              <motion.div
                key="admission"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* 1. Timeline Section */}
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-6 text-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Calendrier d'Admission
                  </h4>
                  <div className="relative border-l-2 border-blue-100 ml-3 space-y-8">
                    {getAdmissionTimeline(school.admissionProcess).map((step, idx) => (
                      <div key={idx} className="relative pl-8">
                        {/* Dot */}
                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-500 shadow-sm" />
                        <div>
                          <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-blue-50 text-blue-700 mb-1">
                            {step.date}
                          </span>
                          <h5 className="font-bold text-gray-900">{step.title}</h5>
                          <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Documents Checklist */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-lg">
                    <FileText className="w-5 h-5 text-slate-600" />
                    Documents Requis (Estimé)
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {getRequiredDocuments(school.type).map((doc, i) => (
                      <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Cost & Advice Summary */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600/80 mb-2">Frais de scolarité</h4>
                    <p className="font-bold text-orange-900 text-lg flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      {school.cost}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600/80 mb-2">Procédure</h4>
                    <p className="font-bold text-blue-900 text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      {school.admissionProcess}
                    </p>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-8 pt-4 bg-white border-t border-gray-100 flex-shrink-0 rounded-b-3xl">
          <button
            onClick={() => {
              if (school.url) window.open(school.url, '_blank');
            }}
            disabled={!school.url}
            className={`w-full py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${school.url
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            {school.url ? (
              <>
                Visiter le site web
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Site web non disponible
              </>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}

export { SchoolDetailsModal };
