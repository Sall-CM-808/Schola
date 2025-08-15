"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Eye,
  Monitor,
  Globe,
  Palette,
  Layout,
  Type,
  Volume2,
  Mail,
  Smartphone,
  Lock,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  currentUserProfile,
  userSessions,
  loadSettings,
  saveSettings,
  settingsOptions,
  getDeviceIcon,
  getSessionStatusColor,
  getSessionStatusLabel,
  revokeSession,
  simulateLoading,
  type Settings,
  type UserSession,
} from "@/lib/mocks/adminSettings";

const AdminSettingsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>(loadSettings());
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [revokingSessions, setRevokingSessions] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(500);
      setSessions(userSessions);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleSettingChange = (
    category: keyof Settings,
    key: string,
    value: any
  ) => {
    const newSettings = {
      ...settings,
      [category]:
        typeof settings[category] === "object"
          ? { ...settings[category], [key]: value }
          : value,
    };

    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleRevokeSession = async (sessionId: string) => {
    setRevokingSessions((prev) => new Set(prev).add(sessionId));

    try {
      const result = await revokeSession(sessionId);

      if (result.success) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        console.log("✅", result.message);
      } else {
        console.error("❌", result.message);
      }
    } catch (error) {
      console.error("❌", "Erreur lors de la révocation de la session");
    } finally {
      setRevokingSessions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
    }
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Confidentialité", icon: Shield },
    { id: "accessibility", label: "Accessibilité", icon: Eye },
    { id: "security", label: "Sécurité", icon: Lock },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 bg-white/20 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded w-96 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 animate-pulse">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 animate-pulse">
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-white/20 rounded"></div>
              ))}
            </div>
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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-white/70">
          Gérez vos préférences et paramètres de sécurité
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#b8d070] text-[#1d8b93] font-medium shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Informations du Profil
                </h2>

                <div className="flex items-center gap-6 p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
                    <span className="text-[#1d8b93] font-bold text-3xl">
                      {currentUserProfile.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {currentUserProfile.name}
                    </h3>
                    <p className="text-white/70 mb-2">
                      {currentUserProfile.email}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>@{currentUserProfile.username}</span>
                      <span>•</span>
                      <span>{currentUserProfile.role}</span>
                      <span>•</span>
                      <span>{currentUserProfile.sessionsCount} connexions</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/80">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={currentUserProfile.name}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                      readOnly
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/80">
                      Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      value={currentUserProfile.username}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                      readOnly
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/80">
                      Email
                    </label>
                    <input
                      type="email"
                      value={currentUserProfile.email}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                      readOnly
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-white/80">
                      Rôle
                    </label>
                    <input
                      type="text"
                      value={currentUserProfile.role}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#b8d070]"
                      readOnly
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Apparence
                </h2>

                <div className="space-y-6">
                  {/* Theme */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Thème
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {settingsOptions.theme.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleSettingChange("theme", "", option.value)
                          }
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            settings.theme === option.value
                              ? "bg-[#b8d070]/20 border-[#b8d070] text-[#b8d070]"
                              : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <div className="font-medium mb-2">{option.label}</div>
                          <div className="text-sm opacity-80">
                            {option.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Density */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Layout className="w-5 h-5" />
                      Densité d'affichage
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {settingsOptions.density.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleSettingChange("density", "", option.value)
                          }
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            settings.density === option.value
                              ? "bg-[#b8d070]/20 border-[#b8d070] text-[#b8d070]"
                              : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <div className="font-medium mb-2">{option.label}</div>
                          <div className="text-sm opacity-80">
                            {option.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Langue
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {settingsOptions.language.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleSettingChange("language", "", option.value)
                          }
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            settings.language === option.value
                              ? "bg-[#b8d070]/20 border-[#b8d070] text-[#b8d070]"
                              : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-2 font-medium mb-2">
                            <span className="text-2xl">{option.flag}</span>
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Notifications
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      key: "email",
                      label: "Notifications par email",
                      icon: Mail,
                      description: "Recevoir des notifications par email",
                    },
                    {
                      key: "push",
                      label: "Notifications push",
                      icon: Smartphone,
                      description: "Notifications sur vos appareils",
                    },
                    {
                      key: "desktop",
                      label: "Notifications bureau",
                      icon: Monitor,
                      description: "Notifications sur le bureau",
                    },
                    {
                      key: "sound",
                      label: "Sons de notification",
                      icon: Volume2,
                      description: "Sons pour les notifications",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/10">
                          <item.icon className="w-5 h-5 text-white/70" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {item.label}
                          </div>
                          <div className="text-sm text-white/60">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            "notifications",
                            item.key,
                            !settings.notifications[
                              item.key as keyof typeof settings.notifications
                            ]
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.notifications[
                            item.key as keyof typeof settings.notifications
                          ]
                            ? "bg-[#b8d070]"
                            : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notifications[
                              item.key as keyof typeof settings.notifications
                            ]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Confidentialité
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      key: "profileVisible",
                      label: "Profil visible",
                      description:
                        "Votre profil est visible par les autres utilisateurs",
                    },
                    {
                      key: "activityVisible",
                      label: "Activité visible",
                      description: "Votre activité est visible par les autres",
                    },
                    {
                      key: "onlineStatus",
                      label: "Statut en ligne",
                      description: "Afficher votre statut en ligne",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/10">
                          <Shield className="w-5 h-5 text-white/70" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {item.label}
                          </div>
                          <div className="text-sm text-white/60">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            "privacy",
                            item.key,
                            !settings.privacy[
                              item.key as keyof typeof settings.privacy
                            ]
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.privacy[
                            item.key as keyof typeof settings.privacy
                          ]
                            ? "bg-[#b8d070]"
                            : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.privacy[
                              item.key as keyof typeof settings.privacy
                            ]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Accessibility Tab */}
            {activeTab === "accessibility" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Accessibilité
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      key: "highContrast",
                      label: "Contraste élevé",
                      description:
                        "Améliorer la lisibilité avec un contraste plus élevé",
                    },
                    {
                      key: "reducedMotion",
                      label: "Réduire les animations",
                      description:
                        "Limiter les animations pour une meilleure accessibilité",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/10">
                          <Eye className="w-5 h-5 text-white/70" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {item.label}
                          </div>
                          <div className="text-sm text-white/60">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            "accessibility",
                            item.key,
                            !settings.accessibility[
                              item.key as keyof typeof settings.accessibility
                            ]
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.accessibility[
                            item.key as keyof typeof settings.accessibility
                          ]
                            ? "bg-[#b8d070]"
                            : "bg-white/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.accessibility[
                              item.key as keyof typeof settings.accessibility
                            ]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}

                  {/* Font Size */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Taille de police
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {settingsOptions.fontSize.map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleSettingChange(
                              "accessibility",
                              "fontSize",
                              option.value
                            )
                          }
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            settings.accessibility.fontSize === option.value
                              ? "bg-[#b8d070]/20 border-[#b8d070] text-[#b8d070]"
                              : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <div className="font-medium mb-2">{option.label}</div>
                          <div className="text-sm opacity-80">
                            {option.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Sécurité</h2>

                <div className="space-y-6">
                  {/* Sessions actives */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      Sessions Actives
                    </h3>
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">
                              {getDeviceIcon(session.deviceName, session.os)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-white">
                                  {session.deviceName}
                                </span>
                                <div
                                  className={`w-2 h-2 rounded-full ${getSessionStatusColor(
                                    session.lastActivity
                                  )}`}
                                ></div>
                                <span className="text-sm text-white/60">
                                  {getSessionStatusLabel(
                                    session.lastActivity,
                                    session.isCurrent
                                  )}
                                </span>
                              </div>
                              <div className="text-sm text-white/60">
                                {session.browser} • {session.os} •{" "}
                                {session.location}
                              </div>
                              <div className="text-xs text-white/50">
                                IP: {session.ipAddress} • Connexion:{" "}
                                {new Date(session.loginAt).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                          {!session.isCurrent && (
                            <button
                              onClick={() => handleRevokeSession(session.id)}
                              disabled={revokingSessions.has(session.id)}
                              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors duration-200 disabled:opacity-50"
                            >
                              {revokingSessions.has(session.id) ? (
                                <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Informations de sécurité */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-1">
                          Conseils de sécurité
                        </h4>
                        <ul className="text-sm text-blue-200/80 space-y-1">
                          <li>
                            • Révoquez les sessions sur des appareils que vous
                            n'utilisez plus
                          </li>
                          <li>• Vérifiez régulièrement vos sessions actives</li>
                          <li>• Utilisez un mot de passe fort et unique</li>
                          <li>
                            • Activez l'authentification à deux facteurs si
                            disponible
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSettingsPage;
