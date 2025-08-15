"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import { useAuthStore } from "@/stores/authStore";
import {
  User,
  Crown,
  GraduationCap,
  Settings,
  LogOut,
  ChevronDown,
  UserCircle2,
  Sparkles,
} from "lucide-react";

// Interface pour définir les types d'utilisateurs
interface UserRole {
  role: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgColor: string;
  label: string;
}

const userRoles: Record<string, UserRole> = {
  admin: {
    role: "admin",
    icon: Crown,
    color: "text-amber-400",
    bgColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    label: "Administrateur",
  },
  teacher: {
    role: "teacher",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    label: "Enseignant",
  },
  student: {
    role: "student",
    icon: User,
    color: "text-blue-400",
    bgColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    label: "Étudiant",
  },
  premium: {
    role: "premium",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    label: "Premium",
  },
  default: {
    role: "user",
    icon: UserCircle2,
    color: "text-slate-400",
    bgColor: "bg-gradient-to-r from-slate-500 to-slate-600",
    label: "Utilisateur",
  },
};

// Composant Avatar utilisateur premium
const UserAvatar: React.FC<{
  user: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
  size?: "sm" | "md" | "lg";
  showDropdown?: boolean;
  onLogout?: () => void;
}> = ({ user, size = "md", showDropdown = false, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userRole =
    userRoles[user?.role?.toLowerCase() || "default"] || userRoles.default;
  const IconComponent = userRole.icon;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  } as const;

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  } as const;

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        {/* Avatar avec icône de rôle */}
        <div
          className={`${sizeClasses[size]} rounded-full ${userRole.bgColor} p-0.5 shadow-lg ring-2 ring-white/20`}
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <IconComponent className={`${iconSizes[size]} text-white`} />
          </div>
        </div>

        {/* Info utilisateur */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-sm">
              {user?.name || user?.email?.split("@")[0] || "Utilisateur"}
            </span>
            {user?.role === "premium" && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-xs text-purple-300 font-medium">PRO</span>
              </div>
            )}
          </div>
          <span className={`text-xs ${userRole.color} font-medium`}>
            {userRole.label}
          </span>
        </div>

        {/* Dropdown trigger */}
        {showDropdown && (
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <ChevronDown
              className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Dropdown menu */}
      {showDropdown && isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 overflow-hidden z-50">
          <div className="p-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full ${userRole.bgColor} p-0.5`}>
                <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <p className="font-medium text-slate-800 text-sm">
                  {user?.name || user?.email?.split("@")[0]}
                </p>
                <p className="text-xs text-slate-500">{userRole.label}</p>
              </div>
            </div>
          </div>

          <div className="p-2 bg-[#0d5a61]/80 rounded-lg shadow-md">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-white text-sm hover:bg-[#1d8b93]/80 rounded-lg transition-all duration-200">
              <Settings className="w-5 h-5" />
              Paramètres
            </button>
            <button
              onClick={() => {
                onLogout?.();
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-[#b8d070] text-sm hover:bg-[#b8d070]/20 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant NavLink amélioré
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 group"
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#b8d070] to-[#a2c65e] group-hover:w-full transition-all duration-300"></div>
  </a>
);

// Composant MobileNavLink amélioré
const MobileNavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium border border-transparent hover:border-white/20"
  >
    {children}
  </a>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      // Cette logique sera gérée par le composant UserAvatar
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-[#1d8b93]/95 via-[#1d8b93]/90 to-[#0d5a61]/95 backdrop-blur-xl shadow-xl shadow-[#1d8b93]/20 border-b border-white/10"
          : "bg-white/5 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* LOGO + NOM */}
          <Link href="/" className="flex items-center group">
            <div className="w-10 h-10 mr-3 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#b8d070] to-[#a2c65e] shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-[#1d8b93] font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-[#b8d070] transition-colors duration-300">
                Schola
              </span>
              <span className="text-xs text-white/60 font-medium">
                Education Platform
              </span>
            </div>
          </Link>

          {/* NAV LINKS (desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="#accueil">Accueil</NavLink>
            <NavLink href="#fonctionnalites">Fonctionnalités</NavLink>
            <NavLink href="#equipe">Équipe</NavLink>
            <NavLink href="#tarifs">Tarifs</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            <div className="flex items-center ml-6 pl-6 border-l border-white/20">
              {isAuthenticated ? (
                <UserAvatar user={user} showDropdown={true} onLogout={logout} />
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="group relative px-5 py-2.5 rounded-xl border-2 border-white/30 text-white text-sm font-medium hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm inline-block text-center"
                  >
                    <span className="relative z-10">Connexion</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    href="/signup"
                    className="group relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] text-sm font-bold hover:from-[#a2c65e] hover:to-[#b8d070] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-block"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Inscription
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 focus:outline-none hover:bg-white/10 rounded-xl transition-colors duration-200"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <div
          className={`md:hidden transition-all duration-300 ${
            isScrolled
              ? "bg-gradient-to-b from-[#1d8b93]/95 to-[#0d5a61]/95"
              : "bg-white/10"
          } backdrop-blur-xl border-t border-white/10`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            <MobileNavLink href="#accueil" onClick={() => setIsMenuOpen(false)}>
              Accueil
            </MobileNavLink>
            <MobileNavLink
              href="#fonctionnalites"
              onClick={() => setIsMenuOpen(false)}
            >
              Fonctionnalités
            </MobileNavLink>
            <MobileNavLink href="#equipe" onClick={() => setIsMenuOpen(false)}>
              Équipe
            </MobileNavLink>
            <MobileNavLink href="#tarifs" onClick={() => setIsMenuOpen(false)}>
              Tarifs
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>

            <div className="pt-4 space-y-3 border-t border-white/20">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-2">
                    <UserAvatar user={user} size="lg" />
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-center border-2 border-red-400/50 text-red-300 text-sm font-medium rounded-xl hover:bg-red-500/10 hover:border-red-400 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center border-2 border-white/30 text-white text-sm font-medium rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-center bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] text-sm font-bold rounded-xl hover:from-[#a2c65e] hover:to-[#b8d070] transition-all duration-300 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </nav>
  );
};

export default Navbar;
