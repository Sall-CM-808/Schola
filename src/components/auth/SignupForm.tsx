"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useClientSideAnimations } from "@/hooks/useClientSideAnimations";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  Phone,
  Calendar,
  IdCard,
  Check,
  Upload,
  UserCheck,
  School,
  X
} from "lucide-react";
import Image from "next/image";

const SignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Éviter les erreurs d'hydratation avec Math.random()
  const isClient = useClientSideAnimations();
  
  // Données du formulaire
  const [adminData, setAdminData] = useState({
    // Informations de base (obligatoires)
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    type_utilisateur: "admin_unite",
    admin_scope: "admin_unite"
  });
  
  const [personalData, setPersonalData] = useState({
    // Informations personnelles (optionnelles)
    genre: "",
    date_naissance: "",
    lieu_naissance: "",
    telephone: "",
    telephone_urgence: "",
    numero_piece_identite: "",
    // Adresse
    adresse: "",
    ville: "",
    region: "",
    pays: ""
  });
  
  const [schoolData, setSchoolData] = useState({
    // Informations école (obligatoires)
    nom: "",
    code: "",
    type_unite: "ecole",
    type_etablissement: "",
    description: ""
  });

  // État pour le logo de l'école
  const [schoolLogo, setSchoolLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const totalSteps = 3;
  // Gestionnaires de changement pour chaque section
  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setPersonalData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSchoolData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // Gestionnaire pour l'upload du logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (file.type.startsWith('image/')) {
        setSchoolLogo(file);
        
        // Créer un aperçu
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez sélectionner un fichier image valide.');
      }
    }
  };

  // Supprimer le logo
  const removeLogo = () => {
    setSchoolLogo(null);
    setLogoPreview(null);
  };

  // Navigation entre les étapes
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation des étapes
  const validateStep1 = () => {
    return adminData.username && adminData.email && adminData.password && 
           adminData.password_confirm && adminData.first_name && adminData.last_name &&
           adminData.password === adminData.password_confirm;
  };

  const validateStep3 = () => {
    return schoolData.nom && schoolData.code && schoolData.type_etablissement && schoolData.description;
  };

  // Soumission finale
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const finalData = {
      admin: adminData,
      personal: personalData,
      school: schoolData
    };

    console.log("Inscription admin:", finalData);
    
    // Simulation API
    setTimeout(() => {
      setIsLoading(false);
      alert("Inscription réussie !");
    }, 2000);
  };

  // Titres et descriptions des étapes avec icônes
  const stepInfo = {
    1: {
      title: "Informations Administrateur",
      description: "Créez votre compte administrateur",
      icon: <UserCheck className="w-6 h-6" />
    },
    2: {
      title: "Informations Personnelles", 
      description: "Complétez votre profil (optionnel)",
      icon: <User className="w-6 h-6" />
    },
    3: {
      title: "Informations École",
      description: "Configurez votre établissement",
      icon: <School className="w-6 h-6" />
    }
  };

  // Rendu de l'étape 2 - Informations personnelles
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Genre */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Genre
        </label>
        <select
          name="genre"
          value={personalData.genre}
          onChange={handlePersonalChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
        >
          <option value="" className="bg-[#1d8b93] text-white">Sélectionner</option>
          <option value="M" className="bg-[#1d8b93] text-white">Masculin</option>
          <option value="F" className="bg-[#1d8b93] text-white">Féminin</option>
          <option value="A" className="bg-[#1d8b93] text-white">Autre</option>
        </select>
      </div>

      {/* Date de naissance et lieu */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Date de naissance
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="date"
              name="date_naissance"
              value={personalData.date_naissance}
              onChange={handlePersonalChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Lieu de naissance
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              name="lieu_naissance"
              value={personalData.lieu_naissance}
              onChange={handlePersonalChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
              placeholder="Ville, Pays"
            />
          </div>
        </div>
      </div>

      {/* Téléphones */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Téléphone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="tel"
              name="telephone"
              value={personalData.telephone}
              onChange={handlePersonalChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
              placeholder="+33 6 12 34 56 78"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Téléphone d&apos;urgence
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="tel"
              name="telephone_urgence"
              value={personalData.telephone_urgence}
              onChange={handlePersonalChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
              placeholder="+33 6 12 34 56 78"
            />
          </div>
        </div>
      </div>

      {/* Pièce d'identité */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Numéro pièce d&apos;identité
        </label>
        <div className="relative">
          <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            name="numero_piece_identite"
            value={personalData.numero_piece_identite}
            onChange={handlePersonalChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="CNI, Passeport..."
          />
        </div>
      </div>

      {/* Adresse complète */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Adresse complète
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-white/50 w-5 h-5" />
          <textarea
            name="adresse"
            value={personalData.adresse}
            onChange={handlePersonalChange}
            rows={3}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300 resize-none"
            placeholder="123 Rue de la République..."
          />
        </div>
      </div>

      {/* Ville, Région, Pays */}
      <div className="grid grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Ville
          </label>
          <input
            type="text"
            name="ville"
            value={personalData.ville}
            onChange={handlePersonalChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="Paris"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Région
          </label>
          <input
            type="text"
            name="region"
            value={personalData.region}
            onChange={handlePersonalChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="Île-de-France"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Pays
          </label>
          <input
            type="text"
            name="pays"
            value={personalData.pays}
            onChange={handlePersonalChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="France"
          />
        </div>
      </div>
    </div>
  );

  // Rendu de l'étape 3 - Informations école
  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Nom de l'école */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Nom de l&apos;école *
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            name="nom"
            value={schoolData.nom}
            onChange={handleSchoolChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="École Primaire Jean Moulin"
            required
          />
        </div>
      </div>

      {/* Code école */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Code de l&apos;école *
        </label>
        <div className="relative">
          <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            name="code"
            value={schoolData.code}
            onChange={handleSchoolChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="ECO-001-2024"
            required
          />
        </div>
      </div>

      {/* Type d'établissement */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Type d&apos;établissement *
        </label>
        <select
          name="type_etablissement"
          value={schoolData.type_etablissement}
          onChange={handleSchoolChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
          required
        >
          <option value="" className="bg-[#1d8b93] text-white">Sélectionner le type</option>
          <option value="maternelle" className="bg-[#1d8b93] text-white">École Maternelle</option>
          <option value="primaire" className="bg-[#1d8b93] text-white">École Primaire</option>
          <option value="college" className="bg-[#1d8b93] text-white">Collège</option>
          <option value="lycee" className="bg-[#1d8b93] text-white">Lycée</option>
          <option value="universite" className="bg-[#1d8b93] text-white">Université</option>
          <option value="formation_pro" className="bg-[#1d8b93] text-white">Formation Professionnelle</option>
          <option value="autre" className="bg-[#1d8b93] text-white">Autre</option>
        </select>
      </div>

      {/* Description */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Description de l&apos;école *
        </label>
        <textarea
          name="description"
          value={schoolData.description}
          onChange={handleSchoolChange}
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300 resize-none"
          placeholder="Décrivez votre établissement, sa mission, ses spécificités..."
          required
        />
      </div>

      {/* Upload du logo */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Logo de l&apos;école (optionnel)
        </label>
        
        {!logoPreview ? (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-[#b8d070] hover:bg-white/5 transition-all duration-300"
            >
              <Upload className="w-8 h-8 text-white/50 mb-2" />
              <span className="text-white/70 text-sm font-medium">
                Cliquez pour télécharger le logo
              </span>
              <span className="text-white/50 text-xs mt-1">
                PNG, JPG, GIF jusqu&apos;à 5MB
              </span>
            </label>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center space-x-4 p-4 bg-white/10 border border-white/20 rounded-xl">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/20">
                <img
                  src={logoPreview}
                  alt="Aperçu du logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">
                  {schoolLogo?.name}
                </p>
                <p className="text-white/70 text-xs">
                  {schoolLogo && (schoolLogo.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={removeLogo}
                className="p-2 text-white/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Rendu des composants d'étapes
  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Username */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Nom d&apos;utilisateur *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            name="username"
            value={adminData.username}
            onChange={handleAdminChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="nom_utilisateur"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Adresse email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleAdminChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="admin@ecole.com"
            required
          />
        </div>
      </div>

      {/* Prénom et Nom */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Prénom *
          </label>
          <input
            type="text"
            name="first_name"
            value={adminData.first_name}
            onChange={handleAdminChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="Prénom"
            required
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Nom *
          </label>
          <input
            type="text"
            name="last_name"
            value={adminData.last_name}
            onChange={handleAdminChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="Nom"
            required
          />
        </div>
      </div>

      {/* Mot de passe */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Mot de passe *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={adminData.password}
            onChange={handleAdminChange}
            className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirmation mot de passe */}
      <div className="relative">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Confirmer le mot de passe *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="password_confirm"
            value={adminData.password_confirm}
            onChange={handleAdminChange}
            className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors duration-200"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8b93] via-[#0d5a61] to-[#1d8b93] flex items-center justify-center p-4">
      {/* Bulles animées en arrière-plan - uniquement côté client */}
      {isClient && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: "#b8d070",
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg">
                <span className="text-[#1d8b93] font-bold text-xl">F</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-white">Fiinor</span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">{stepInfo[currentStep as keyof typeof stepInfo].title}</h1>
            <p className="text-white/70">{stepInfo[currentStep as keyof typeof stepInfo].description}</p>
          </div>

          {/* Progress Bar */}
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-[#b8d070] text-[#1d8b93]"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  {step <= currentStep ? (
                    step === currentStep ? (
                      stepInfo[step as keyof typeof stepInfo].icon
                    ) : (
                      <Check className="w-5 h-5" />
                    )
                  ) : (
                    stepInfo[step as keyof typeof stepInfo].icon
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step < currentStep ? "bg-[#b8d070]" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="text-[#b8d070]">
                {stepInfo[currentStep as keyof typeof stepInfo].icon}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {stepInfo[currentStep as keyof typeof stepInfo].title}
              </h2>
            </div>
            <p className="text-white/70">
              {stepInfo[currentStep as keyof typeof stepInfo].description}
            </p>
          </div>

          {/* Form Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === 1 && !validateStep1()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  (currentStep === 1 && !validateStep1())
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] hover:-translate-y-0.5'
                }`}
              >
                Suivant
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !validateStep3()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#1d8b93]/30 border-t-[#1d8b93] rounded-full animate-spin" />
                ) : (
                  <>
                    Créer le compte
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Login link */}
          <div className="text-center mt-8">
            <p className="text-white/70">
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="text-[#b8d070] hover:text-[#a2c65e] font-medium transition-colors duration-200"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;
