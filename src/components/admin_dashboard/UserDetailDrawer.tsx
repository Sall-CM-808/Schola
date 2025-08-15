"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Calendar,
  Clock,
  Shield,
  MapPin,
  Monitor,
  Activity,
  UserCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { UserDetail } from "@/lib/mocks/adminUsers";

interface UserDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userDetail: UserDetail | null;
  isLoading?: boolean;
}

const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({
  isOpen,
  onClose,
  userDetail,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-500/20 text-green-300 border-green-500/30"
      : "bg-red-500/20 text-red-300 border-red-500/30";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      admin: "bg-red-500/20 text-red-300 border-red-500/30",
      teacher: "bg-green-500/20 text-green-300 border-green-500/30",
      student: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      staff: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    };
    return colors[type as keyof typeof colors] || colors.student;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      admin: "Administrateur",
      teacher: "Enseignant",
      student: "Étudiant",
      staff: "Personnel",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.includes("Mobile")) return "📱";
    if (userAgent.includes("Tablet")) return "📱";
    return "💻";
  };

  const getBrowserName = (userAgent: string) => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Inconnu";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gradient-to-b from-[#1d8b93] to-[#0d5a61] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1d8b93]/95 to-[#0d5a61]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Détails utilisateur
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {isLoading ? (
                <UserDetailSkeleton />
              ) : userDetail ? (
                <>
                  {/* Profile Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
                        <span className="text-[#1d8b93] font-bold text-2xl">
                          {userDetail.profile.name.charAt(0)}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {userDetail.profile.name}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(
                              userDetail.profile.type
                            )}`}
                          >
                            {getTypeLabel(userDetail.profile.type)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                              userDetail.profile.status
                            )}`}
                          >
                            {userDetail.profile.status === "active" ? (
                              <>
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                                Actif
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-3 h-3 inline mr-1" />
                                Inactif
                              </>
                            )}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-white/80">
                            <User className="w-4 h-4" />
                            <span>{userDetail.profile.username}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Mail className="w-4 h-4" />
                            <span>{userDetail.profile.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Inscrit le{" "}
                              {formatDate(userDetail.profile.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Clock className="w-4 h-4" />
                            <span>
                              {userDetail.profile.lastLogin
                                ? `Dernière connexion: ${formatDate(
                                    userDetail.profile.lastLogin
                                  )}`
                                : "Jamais connecté"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
                      <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {userDetail.stats.totalSessions}
                      </div>
                      <div className="text-xs text-white/60">Sessions</div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
                      <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {userDetail.stats.averageSessionDuration}
                      </div>
                      <div className="text-xs text-white/60">Durée moy.</div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
                      <UserCheck className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {userDetail.roles.length}
                      </div>
                      <div className="text-xs text-white/60">Rôles</div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
                      <Calendar className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {userDetail.stats.accountAge}
                      </div>
                      <div className="text-xs text-white/60">Ancienneté</div>
                    </div>
                  </motion.div>

                  {/* Roles Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Rôles et Permissions
                    </h4>

                    <div className="space-y-4">
                      {userDetail.roles.map((role, index) => (
                        <motion.div
                          key={role.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="bg-white/5 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-white">
                              {role.name}
                            </h5>
                            <span className="text-xs text-white/60">
                              Attribué le {formatDate(role.assignedAt)}
                            </span>
                          </div>
                          <p className="text-sm text-white/70 mb-3">
                            {role.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission) => (
                              <span
                                key={permission}
                                className="px-2 py-1 bg-[#b8d070]/20 text-[#b8d070] rounded text-xs font-medium"
                              >
                                {permission}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Last Logins Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      Dernières Connexions
                    </h4>

                    <div className="space-y-3">
                      {userDetail.lastLogins.map((login, index) => (
                        <motion.div
                          key={login.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                        >
                          <div className="text-2xl">
                            {getDeviceIcon(login.userAgent)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-white">
                                {getBrowserName(login.userAgent)}
                              </span>
                              <span className="text-xs text-white/60">
                                {formatDate(login.timestamp)}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-white/70">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {login.location}
                              </span>
                              <span>{login.ipAddress}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white/60">
                    Aucune donnée utilisateur disponible
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Composant skeleton pour le loading
const UserDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Profile Skeleton */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-white/20 rounded w-48"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/20 rounded w-20"></div>
              <div className="h-6 bg-white/20 rounded w-16"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-white/20 rounded w-32"></div>
              <div className="h-4 bg-white/20 rounded w-40"></div>
              <div className="h-4 bg-white/20 rounded w-36"></div>
              <div className="h-4 bg-white/20 rounded w-44"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center"
          >
            <div className="w-6 h-6 bg-white/20 rounded mx-auto mb-2"></div>
            <div className="h-6 bg-white/20 rounded w-8 mx-auto mb-1"></div>
            <div className="h-3 bg-white/20 rounded w-12 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Sections Skeleton */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        >
          <div className="h-6 bg-white/20 rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-16 bg-white/20 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetailDrawer;
