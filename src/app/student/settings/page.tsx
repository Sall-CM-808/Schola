"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Camera,
  Eye,
  EyeOff,
  Save,
  Upload,
  Smartphone,
  Mail,
  Lock,
  Users,
  Moon,
  Sun,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    title: "Profil",
    icon: User,
    description: "Gérez vos informations personnelles",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Configurez vos préférences de notification",
  },
  {
    id: "privacy",
    title: "Confidentialité",
    icon: Shield,
    description: "Contrôlez la visibilité de vos informations",
  },
  {
    id: "appearance",
    title: "Apparence",
    icon: Palette,
    description: "Personnalisez l'interface",
  },
  {
    id: "language",
    title: "Langue & Région",
    icon: Globe,
    description: "Paramètres de localisation",
  },
];

export default function StudentSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    // Profil
    firstName: "Marie",
    lastName: "Camara",
    email: "marie.camara@schola.gn",
    phone: "+224 123 456 789",
    dateOfBirth: "2006-05-15",
    address: "Conakry, Guinée",
    bio: "Étudiante en Terminale S passionnée par les sciences et les mathématiques.",

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    homeworkReminders: true,
    gradeNotifications: true,
    classReminders: true,
    eventNotifications: true,

    // Confidentialité
    profileVisibility: "classmates", // public, classmates, teachers, private
    gradesVisibility: "private",
    parentAccess: true,

    // Apparence
    theme: "system", // light, dark, system
    language: "fr",
    timezone: "Africa/Conakry",

    // Sons
    notificationSound: true,
    keyboardSound: false,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Photo de profil */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#b8d070]" />
          Photo de profil
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-[#b8d070]/30">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                alt="Marie Camara"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-[#b8d070] text-white rounded-full hover:bg-[#a2c65e] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium mr-3">
              <Upload className="w-4 h-4 inline mr-2" />
              Changer la photo
            </button>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">
          Informations personnelles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Prénom</label>
            <input
              type="text"
              value={settings.firstName}
              onChange={(e) => handleSettingChange("firstName", e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Nom</label>
            <input
              type="text"
              value={settings.lastName}
              onChange={(e) => handleSettingChange("lastName", e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange("email", e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleSettingChange("phone", e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Date de naissance
            </label>
            <input
              type="date"
              value={settings.dateOfBirth}
              onChange={(e) =>
                handleSettingChange("dateOfBirth", e.target.value)
              }
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Adresse</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleSettingChange("address", e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-white/70 text-sm mb-2">Biographie</label>
          <textarea
            value={settings.bio}
            onChange={(e) => handleSettingChange("bio", e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
            placeholder="Parlez-nous un peu de vous..."
          />
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#b8d070]" />
          Sécurité
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#b8d070] text-white rounded-lg hover:bg-[#a2c65e] transition-colors text-sm font-medium">
            Changer le mot de passe
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#b8d070]" />
          Notifications par email
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Recevoir des emails",
              desc: "Notifications générales par email",
            },
            {
              key: "homeworkReminders",
              label: "Rappels de devoirs",
              desc: "Recevoir des rappels avant les échéances",
            },
            {
              key: "gradeNotifications",
              label: "Nouvelles notes",
              desc: "Être notifié lors de la publication des notes",
            },
            {
              key: "classReminders",
              label: "Rappels de cours",
              desc: "Notifications avant le début des cours",
            },
            {
              key: "eventNotifications",
              label: "Événements",
              desc: "Sorties, réunions et événements scolaires",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    settings[item.key as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    handleSettingChange(item.key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#b8d070]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8d070]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[#b8d070]" />
          Notifications push
        </h3>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <p className="text-white font-medium">Notifications push</p>
            <p className="text-white/60 text-sm">
              Recevoir des notifications sur votre appareil
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) =>
                handleSettingChange("pushNotifications", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#b8d070]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8d070]"></div>
          </label>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-[#b8d070]" />
          Sons
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "notificationSound",
              label: "Sons de notification",
              desc: "Jouer un son lors des notifications",
            },
            {
              key: "keyboardSound",
              label: "Sons du clavier",
              desc: "Sons lors de la saisie",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    settings[item.key as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    handleSettingChange(item.key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#b8d070]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8d070]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Visibilité du profil</h3>
        <div className="space-y-3">
          {[
            {
              value: "public",
              label: "Public",
              desc: "Visible par tous les utilisateurs",
            },
            {
              value: "classmates",
              label: "Camarades de classe",
              desc: "Visible uniquement par vos camarades",
            },
            {
              value: "teachers",
              label: "Professeurs uniquement",
              desc: "Visible seulement par les enseignants",
            },
            {
              value: "private",
              label: "Privé",
              desc: "Visible uniquement par vous",
            },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
            >
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={settings.profileVisibility === option.value}
                onChange={(e) =>
                  handleSettingChange("profileVisibility", e.target.value)
                }
                className="w-4 h-4 text-[#b8d070] bg-white/10 border-white/20 focus:ring-[#b8d070]/50"
              />
              <div className="ml-3">
                <p className="text-white font-medium">{option.label}</p>
                <p className="text-white/60 text-sm">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Accès aux notes</h3>
        <div className="space-y-3">
          {[
            {
              value: "private",
              label: "Privé",
              desc: "Seuls vous et vos professeurs peuvent voir vos notes",
            },
            {
              value: "parents",
              label: "Parents",
              desc: "Vos parents peuvent également voir vos notes",
            },
            {
              value: "classmates",
              label: "Camarades",
              desc: "Vos camarades peuvent voir vos moyennes générales",
            },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
            >
              <input
                type="radio"
                name="gradesVisibility"
                value={option.value}
                checked={settings.gradesVisibility === option.value}
                onChange={(e) =>
                  handleSettingChange("gradesVisibility", e.target.value)
                }
                className="w-4 h-4 text-[#b8d070] bg-white/10 border-white/20 focus:ring-[#b8d070]/50"
              />
              <div className="ml-3">
                <p className="text-white font-medium">{option.label}</p>
                <p className="text-white/60 text-sm">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#b8d070]" />
          Accès parental
        </h3>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <p className="text-white font-medium">
              Autoriser l'accès aux parents
            </p>
            <p className="text-white/60 text-sm">
              Permettre à vos parents de consulter vos informations scolaires
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.parentAccess}
              onChange={(e) =>
                handleSettingChange("parentAccess", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#b8d070]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8d070]"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#b8d070]" />
          Thème
        </h3>
        <div className="space-y-3">
          {[
            {
              value: "light",
              label: "Clair",
              desc: "Interface claire",
              icon: Sun,
            },
            {
              value: "dark",
              label: "Sombre",
              desc: "Interface sombre",
              icon: Moon,
            },
            {
              value: "system",
              label: "Système",
              desc: "Suit les préférences de votre appareil",
              icon: Settings,
            },
          ].map((option) => {
            const Icon = option.icon;
            return (
              <label
                key={option.value}
                className="flex items-center p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              >
                <input
                  type="radio"
                  name="theme"
                  value={option.value}
                  checked={settings.theme === option.value}
                  onChange={(e) => handleSettingChange("theme", e.target.value)}
                  className="w-4 h-4 text-[#b8d070] bg-white/10 border-white/20 focus:ring-[#b8d070]/50"
                />
                <Icon className="w-5 h-5 text-[#b8d070] ml-3 mr-2" />
                <div>
                  <p className="text-white font-medium">{option.label}</p>
                  <p className="text-white/60 text-sm">{option.desc}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLanguageSection = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Langue</h3>
        <select
          value={settings.language}
          onChange={(e) => handleSettingChange("language", e.target.value)}
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Fuseau horaire</h3>
        <select
          value={settings.timezone}
          onChange={(e) => handleSettingChange("timezone", e.target.value)}
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070]/50"
        >
          <option value="Africa/Conakry">Conakry (GMT+0)</option>
          <option value="Europe/Paris">Paris (GMT+1)</option>
          <option value="America/New_York">New York (GMT-5)</option>
        </select>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "appearance":
        return renderAppearanceSection();
      case "language":
        return renderLanguageSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Settings className="w-7 h-7 text-[#b8d070]" />
              Paramètres
            </h1>
            <p className="text-white/70">
              Personnalisez votre expérience Schola selon vos préférences.
            </p>
          </div>
          <button className="px-6 py-3 bg-[#b8d070] text-white rounded-xl hover:bg-[#a2c65e] transition-colors font-medium flex items-center gap-2">
            <Save className="w-4 h-4" />
            Sauvegarder
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu de navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <nav className="space-y-2">
            {settingsSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
                    activeSection === section.id
                      ? "bg-[#b8d070] text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <p className="font-medium">{section.title}</p>
                    <p className="text-xs opacity-80 hidden sm:block">
                      {section.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </nav>
        </motion.div>

        {/* Contenu de la section */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3"
        >
          {renderSection()}
        </motion.div>
      </div>
    </div>
  );
}

