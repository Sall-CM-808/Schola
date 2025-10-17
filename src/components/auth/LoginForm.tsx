"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, LogIn } from "lucide-react";
import { usersData } from "@/examples/permissionsData";
import { usePermissions } from "@/hooks/usePermissions";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, signInMock, signOutMock } = usePermissions();
  const [mounted, setMounted] = useState(false);

  // Ne pas rediriger automatiquement: laisser l'utilisateur choisir

  // Éviter l'hydratation invalide: attendre le montage client avant de générer des valeurs aléatoires
  useEffect(() => {
    setMounted(true);
  }, []);

  const bubbles = useMemo(() => {
    if (!mounted) return [] as Array<{ w: number; h: number; top: number; left: number; duration: number; dy: number; dx: number }>;
    const arr = Array.from({ length: 10 }).map(() => {
      const rnd = Math.random;
      return {
        w: rnd() * 20 + 10,
        h: rnd() * 20 + 10,
        top: rnd() * 100,
        left: rnd() * 100,
        duration: rnd() * 15 + 15,
        dy: (rnd() - 0.5) * 50,
        dx: (rnd() - 0.5) * 50,
      };
    });
    return arr;
  }, [mounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Auth mock: vérifie l'utilisateur dans usersData
    const user = usersData.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
    );

    if (!user) {
      setIsLoading(false);
      setError("Identifiants incorrects. Veuillez réessayer.");
      return;
    }

    // Connexion mock et redirection
    signInMock(user.id);
    router.replace("/pageHierarchique");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8b93] via-[#0d5a61] to-[#1d8b93] flex items-center justify-center p-4">
      {/* Bulles animées en arrière-plan (générées uniquement côté client après montage) */}
      {mounted && (
        <div className="absolute inset-0 opacity-20">
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: "#b8d070",
                width: `${b.w}px`,
                height: `${b.h}px`,
                top: `${b.top}%`,
                left: `${b.left}%`,
              }}
              animate={{
                y: [0, b.dy],
                x: [0, b.dx],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: b.duration,
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
        className="relative w-full max-w-md"
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
            <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
            <p className="text-white/70">Accédez à votre compte Fiinor</p>
          </div>

          {/* Déjà connecté */}
          {isAuthenticated && (
            <div className="mb-6 p-4 rounded-lg bg-white/10 border border-white/20">
              <p className="text-white/90 mb-3">Vous êtes déjà connecté.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.replace("/pageHierarchique")}
                  className="px-4 py-2 rounded-md bg-[#b8d070] text-[#1d8b93] font-medium hover:opacity-90 transition"
                >
                  Accéder à la hiérarchie
                </button>
                <button
                  onClick={() => {
                    signOutMock();
                    // Rester sur /login après déconnexion
                    router.refresh?.();
                  }}
                  className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-200 bg-red-500/20 border border-red-400/40 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-[#b8d070] hover:text-[#a2c65e] transition-colors duration-200"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#1d8b93]/30 border-t-[#1d8b93] rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">ou</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Connexion rapide - utilisateurs de démo */}
          <div className="max-h-72 overflow-y-auto divide-y divide-white/10 border border-white/10 rounded-lg mb-6">
            {usersData.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  signInMock(user.id);
                  router.replace("/pageHierarchique");
                }}
                className="w-full flex items-center justify-between text-left px-4 py-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-xs text-white/70">{user.email}</div>
                    <div className="text-[11px] text-white/50">mdp: {user.password}</div>
                  </div>
                </div>
                <LogIn size={18} className="text-white/60" />
              </button>
            ))}
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-white/70">
              Pas encore de compte ?{" "}
              <Link
                href="/signup"
                className="text-[#b8d070] hover:text-[#a2c65e] font-medium transition-colors duration-200"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
