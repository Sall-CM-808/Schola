"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTeacherSettings,
  getTeacherProfile,
  saveTeacherSettings,
  resetTeacherSettings,
  getThemeLabel,
  getDensityLabel,
  getLanguageLabel,
  getFontSizeLabel,
  type TeacherSettings,
  type TeacherProfile,
} from "@/lib/mocks/teacherSettings";
import {
  Settings,
  User,
  Palette,
  Bell,
  Shield,
  Accessibility,
  Save,
  RotateCcw,
  Monitor,
  Sun,
  Moon,
  Volume2,
  Eye,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Check,
} from "lucide-react";

const TeacherSettingsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<TeacherSettings | null>(null);
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [activeTab, setActiveTab] = useState<
    "profile" | "appearance" | "notifications" | "privacy" | "accessibility"
  >("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [settingsData, profileData] = await Promise.all([
          getTeacherSettings(),
          getTeacherProfile(),
        ]);
        setSettings(settingsData);
        setProfile(profileData);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSettingChange = (
    category: keyof TeacherSettings,
    key: string,
    value: any
  ) => {
    if (!settings) return;

    const newSettings = { ...settings };
    if (
      typeof newSettings[category] === "object" &&
      newSettings[category] !== null
    ) {
      (newSettings[category] as any)[key] = value;
    } else {
      (newSettings as any)[category] = value;
    }

    setSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      await saveTeacherSettings(settings);
      setHasChanges(false);

      // Toast notification
      const toast = document.createElement("div");
      toast.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      toast.textContent = "Paramètres sauvegardés avec succès";
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    try {
      const defaultSettings = await resetTeacherSettings();
      setSettings(defaultSettings);
      setHasChanges(false);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Confidentialité", icon: Shield },
    { id: "accessibility", label: "Accessibilité", icon: Accessibility },
  ];

  if (isLoading || !settings || !profile) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-white/20 rounded w-64 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white/5 rounded-xl p-6 animate-pulse">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 bg-white/5 rounded-xl p-6 animate-pulse">
            <div className="h-96 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
          <p className="text-white/70">
            Personnalisez votre expérience d'enseignement
          </p>
        </div>

        {hasChanges && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors duration-200 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Réinitialiser
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-[#b8d070] text-[#1d8b93] font-medium rounded-lg hover:bg-[#a2c65e] transition-colors duration-200 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-[#1d8b93]/30 border-t-[#1d8b93] rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#b8d070] text-[#1d8b93] shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Profil
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center mx-auto mb-4">
                          <span className="text-[#1d8b93] font-bold text-2xl">
                            {profile.name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {profile.name}
                        </h3>
                        <p className="text-white/60">{profile.title}</p>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <Mail className="w-4 h-4 text-white/60" />
                          <div>
                            <div className="text-xs text-white/60">Email</div>
                            <div className="text-white">{profile.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <Phone className="w-4 h-4 text-white/60" />
                          <div>
                            <div className="text-xs text-white/60">
                              Téléphone
                            </div>
                            <div className="text-white">{profile.phone}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <MapPin className="w-4 h-4 text-white/60" />
                          <div>
                            <div className="text-xs text-white/60">Bureau</div>
                            <div className="text-white">{profile.office}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <BookOpen className="w-4 h-4 text-white/60" />
                          <div>
                            <div className="text-xs text-white/60">
                              Département
                            </div>
                            <div className="text-white">
                              {profile.department}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-medium text-white mb-2">
                          Spécialisations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.specializations.map((spec, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-[#b8d070]/20 text-[#b8d070] rounded-full text-sm"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-medium text-white mb-2">
                          Biographie
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {profile.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Palette className="w-6 h-6" />
                    Apparence
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Monitor className="w-5 h-5" />
                        Thème
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["dark", "light", "auto"].map((theme) => (
                          <button
                            key={theme}
                            onClick={() =>
                              handleSettingChange("theme", "", theme)
                            }
                            className={`p-4 rounded-lg border transition-all duration-200 ${
                              settings.theme === theme
                                ? "bg-[#b8d070]/20 border-[#b8d070] text-[#b8d070]"
                                : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center justify-center mb-2">
                              {theme === "dark" && <Moon className="w-6 h-6" />}
                              {theme === "light" && <Sun className="w-6 h-6" />}
                              {theme === "auto" && (
                                <Monitor className="w-6 h-6" />
                              )}
                            </div>
                            <div className="font-medium">
                              {getThemeLabel(theme)}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Densité d'affichage
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["compact", "comfortable", "spacious"].map(
                          (density) => (
                            <button
                              key={density}
                              onClick={() =>
                                handleSettingChange("density", "", density)
                              }
                              className={`p-4 rounded-lg border transition-all duration-200 ${
                                settings.density === density
                                  ? "bg-[#b8d070]/20 border-[#b8d070] text-[#b8d070]"
                                  : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                              }`}
                            >
                              <div className="font-medium mb-2">
                                {getDensityLabel(density)}
                              </div>
                              <div className="text-sm opacity-80">
                                {density === "compact" &&
                                  "Plus d'informations par écran"}
                                {density === "comfortable" &&
                                  "Équilibre optimal"}
                                {density === "spacious" &&
                                  "Plus d'espace entre les éléments"}
                              </div>
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Langue
                        </h3>
                        <select
                          value={settings.language}
                          onChange={(e) =>
                            handleSettingChange("language", "", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
                        >
                          {["fr", "en", "es"].map((lang) => (
                            <option key={lang} value={lang}>
                              {getLanguageLabel(lang)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Taille de police
                        </h3>
                        <select
                          value={settings.fontSize}
                          onChange={(e) =>
                            handleSettingChange("fontSize", "", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b8d070] focus:border-transparent"
                        >
                          {["small", "medium", "large"].map((size) => (
                            <option key={size} value={size}>
                              {getFontSizeLabel(size)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Bell className="w-6 h-6" />
                    Notifications
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        key: "email",
                        label: "Notifications par email",
                        icon: Mail,
                      },
                      { key: "push", label: "Notifications push", icon: Bell },
                      {
                        key: "assignments",
                        label: "Nouvelles attributions",
                        icon: Settings,
                      },
                      {
                        key: "grades",
                        label: "Résultats d'évaluations",
                        icon: BookOpen,
                      },
                      {
                        key: "messages",
                        label: "Messages des étudiants",
                        icon: Mail,
                      },
                    ].map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.key}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-white/60" />
                            <span className="text-white">
                              {notification.label}
                            </span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                settings.notifications[
                                  notification.key as keyof typeof settings.notifications
                                ]
                              }
                              onChange={(e) =>
                                handleSettingChange(
                                  "notifications",
                                  notification.key,
                                  e.target.checked
                                )
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8d070]"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Confidentialité
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        key: "profileVisible",
                        label: "Profil visible par les étudiants",
                        icon: User,
                      },
                      {
                        key: "emailVisible",
                        label: "Email visible dans l'annuaire",
                        icon: Mail,
                      },
                      {
                        key: "statusVisible",
                        label: "Statut en ligne visible",
                        icon: Eye,
                      },
                    ].map((privacy) => {
                      const Icon = privacy.icon;
                      return (
                        <div
                          key={privacy.key}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-white/60" />
                            <span className="text-white">{privacy.label}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                settings.privacy[
                                  privacy.key as keyof typeof settings.privacy
                                ]
                              }
                              onChange={(e) =>
                                handleSettingChange(
                                  "privacy",
                                  privacy.key,
                                  e.target.checked
                                )
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8d070]"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "accessibility" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Accessibility className="w-6 h-6" />
                    Accessibilité
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        key: "highContrast",
                        label: "Contraste élevé",
                        icon: Eye,
                      },
                      {
                        key: "reducedMotion",
                        label: "Réduire les animations",
                        icon: Volume2,
                      },
                      {
                        key: "screenReader",
                        label: "Optimisation lecteur d'écran",
                        icon: Accessibility,
                      },
                    ].map((accessibility) => {
                      const Icon = accessibility.icon;
                      return (
                        <div
                          key={accessibility.key}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-white/60" />
                            <span className="text-white">
                              {accessibility.label}
                            </span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                settings.accessibility[
                                  accessibility.key as keyof typeof settings.accessibility
                                ]
                              }
                              onChange={(e) =>
                                handleSettingChange(
                                  "accessibility",
                                  accessibility.key,
                                  e.target.checked
                                )
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8d070]"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeacherSettingsPage;
