"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  AtSign,
  Shield,
  GraduationCap,
  Users,
  Briefcase,
  Eye,
  EyeOff,
  Save,
  Loader2,
} from "lucide-react";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateUserData) => Promise<void>;
}

export interface CreateUserData {
  name: string;
  username: string;
  email: string;
  type: "admin" | "teacher" | "student" | "staff";
  status: "active" | "inactive";
  password: string;
  avatar?: string;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CreateUserData>({
    name: "",
    username: "",
    email: "",
    type: "student",
    status: "active",
    password: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateUserData>>({});

  const userTypes = [
    {
      value: "admin" as const,
      label: "Administrateur",
      icon: Shield,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
    },
    {
      value: "teacher" as const,
      label: "Enseignant",
      icon: GraduationCap,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      value: "student" as const,
      label: "Étudiant",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      value: "staff" as const,
      label: "Personnel",
      icon: Briefcase,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateUserData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (formData.username.length < 3) {
      newErrors.username =
        "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        username: "",
        email: "",
        type: "student",
        status: "active",
        password: "",
        avatar: "",
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateUserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: "",
        username: "",
        email: "",
        type: "student",
        status: "active",
        password: "",
        avatar: "",
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background:
                "linear-gradient(135deg, rgba(29, 139, 147, 0.95) 0%, rgba(29, 139, 147, 0.85) 100%)",
              backdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
              boxShadow: "0 32px 64px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#b8d070]/20">
                  <User className="w-5 h-5 text-[#b8d070]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Nouvel Utilisateur
                  </h2>
                  <p className="text-sm text-white/70">
                    Créer un nouveau compte utilisateur
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 disabled:opacity-50"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Nom complet */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      errors.name ? "border-red-400" : "border-white/20"
                    } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-colors`}
                    placeholder="Entrez le nom complet"
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-300">{errors.name}</p>
                )}
              </div>

              {/* Nom d'utilisateur */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Nom d&apos;utilisateur *
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange(
                        "username",
                        e.target.value.toLowerCase().replace(/\s/g, "")
                      )
                    }
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      errors.username ? "border-red-400" : "border-white/20"
                    } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-colors`}
                    placeholder="nom.utilisateur"
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-300">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Adresse email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      errors.email ? "border-red-400" : "border-white/20"
                    } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-colors`}
                    placeholder="utilisateur@example.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300">{errors.email}</p>
                )}
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mot de passe *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full pl-4 pr-12 py-3 bg-white/10 border ${
                      errors.password ? "border-red-400" : "border-white/20"
                    } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-colors`}
                    placeholder="Mot de passe sécurisé"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-300">{errors.password}</p>
                )}
              </div>

              {/* Type d'utilisateur */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Type d'utilisateur *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {userTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleInputChange("type", type.value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          formData.type === type.value
                            ? "border-[#b8d070] bg-[#b8d070]/20"
                            : "border-white/20 bg-white/5 hover:bg-white/10"
                        }`}
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${type.bgColor}`}>
                            <Icon className={`w-4 h-4 ${type.color}`} />
                          </div>
                          <span className="text-white font-medium">
                            {type.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Statut */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Statut du compte
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange("status", "active")}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.status === "active"
                        ? "border-green-400 bg-green-500/20 text-green-300"
                        : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                    }`}
                    disabled={isLoading}
                  >
                    Actif
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange("status", "inactive")}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.status === "inactive"
                        ? "border-red-400 bg-red-500/20 text-red-300"
                        : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                    }`}
                    disabled={isLoading}
                  >
                    Inactif
                  </button>
                </div>
              </div>

              {/* Avatar URL (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  URL de l'avatar (optionnel)
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => handleInputChange("avatar", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-colors"
                  placeholder="https://example.com/avatar.jpg"
                  disabled={isLoading}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/20">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors duration-200 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold rounded-lg hover:from-[#a2c65e] hover:to-[#b8d070] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Création...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Créer l'utilisateur
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateUserModal;
