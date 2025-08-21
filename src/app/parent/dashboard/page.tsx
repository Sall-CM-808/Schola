"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  BookOpen,
  MessageCircle,
  CreditCard,
  GraduationCap,
  UserX,
  Heart,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Bell,
  Mail,
  MailOpen,
  User,
  MapPin,
  Star,
  Award,
  Target,
  Zap,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Share2,
  Bookmark,
  Activity,
  PieChart,
  BarChart3,
  Sparkles,
} from "lucide-react";

// Components
import KpiCard, { KpiCardSkeleton } from "@/components/admin_dashboard/KpiCard";
import DataTable, {
  DataTableSkeleton,
} from "@/components/admin_dashboard/DataTable";
import DashboardGrid from "@/components/layout/DashboardGrid";
import { SectionCard, SectionHeader } from "@/components/ui/SectionCard";

// Mock data
import {
  children,
  homeworks,
  messages,
  invoices,
  events,
  getParentKPI,
  simulateLoading,
  type ParentChild,
  type ParentHomework,
  type ParentMessage,
  type ParentInvoice,
  type ParentEvent,
} from "@/lib/mocks/parentDashboard";

const ParentDashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");
  const [activeKpiCard, setActiveKpiCard] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState<{
    kpi: ReturnType<typeof getParentKPI>;
    children: ParentChild[];
    homeworks: ParentHomework[];
    messages: ParentMessage[];
    invoices: ParentInvoice[];
    events: ParentEvent[];
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await simulateLoading(300);
      setData({
        kpi: getParentKPI(),
        children,
        homeworks,
        messages,
        invoices,
        events,
      });
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Filtrer les données selon l'enfant sélectionné
  const filteredHomeworks =
    selectedChild === "all"
      ? homeworks
          .filter((hw) => hw.status === "a_faire" || hw.status === "en_retard")
          .slice(0, 8)
      : homeworks.filter((hw) => hw.childId === selectedChild).slice(0, 8);

  const recentMessages = messages
    .filter(
      (msg) =>
        selectedChild === "all" || !msg.childId || msg.childId === selectedChild
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  // Colonnes pour la table des devoirs
  const homeworkColumns = [
    {
      key: "dueDate",
      header: "Échéance",
      render: (hw: ParentHomework) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-white/60" />
          <span className="text-sm">
            {new Date(hw.dueDate).toLocaleDateString("fr-FR")}
          </span>
        </div>
      ),
    },
    {
      key: "child",
      header: "Enfant",
      render: (hw: ParentHomework) => {
        const child = children.find((c) => c.id === hw.childId);
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
              <span className="text-[#1d8b93] font-bold text-xs">
                {child?.name.charAt(0)}
              </span>
            </div>
            <span className="text-white/80 text-sm">{child?.name}</span>
          </div>
        );
      },
    },
    {
      key: "subject",
      header: "Matière",
      render: (hw: ParentHomework) => (
        <span className="font-medium">{hw.subject}</span>
      ),
    },
    {
      key: "title",
      header: "Titre",
      render: (hw: ParentHomework) => (
        <span className="text-white/80">{hw.title}</span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (hw: ParentHomework) => {
        const statusConfig = {
          a_faire: {
            label: "À faire",
            color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          },
          en_retard: {
            label: "En retard",
            color: "bg-red-500/20 text-red-300 border-red-500/30",
          },
          rendu: {
            label: "Rendu",
            color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
          },
          note: {
            label: hw.grade ? `${hw.grade}/${hw.max}` : "Noté",
            color: "bg-green-500/20 text-green-300 border-green-500/30",
          },
        };

        const config = statusConfig[hw.status];
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
          >
            {config.label}
          </span>
        );
      },
    },
  ];

  // Colonnes pour la table des messages
  const messageColumns = [
    {
      key: "subject",
      header: "Sujet",
      render: (msg: ParentMessage) => (
        <div className="flex items-center gap-2">
          {msg.read ? (
            <MailOpen className="w-4 h-4 text-white/40" />
          ) : (
            <Mail className="w-4 h-4 text-[#b8d070]" />
          )}
          <div className="flex-1 min-w-0">
            <span
              className={`${
                msg.read ? "text-white/80" : "text-white font-medium"
              } truncate block`}
            >
              {msg.subject}
            </span>
            {msg.urgent && <span className="text-red-400 text-xs">Urgent</span>}
          </div>
        </div>
      ),
    },
    {
      key: "from",
      header: "De",
      render: (msg: ParentMessage) => (
        <span className="text-white/60">{msg.from}</span>
      ),
    },
    {
      key: "category",
      header: "Catégorie",
      render: (msg: ParentMessage) => {
        const categoryConfig = {
          info: {
            label: "Info",
            color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          },
          devoir: {
            label: "Devoir",
            color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
          },
          discipline: {
            label: "Discipline",
            color: "bg-red-500/20 text-red-300 border-red-500/30",
          },
          administratif: {
            label: "Admin",
            color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          },
          urgence: {
            label: "Urgent",
            color: "bg-red-600/20 text-red-300 border-red-600/30",
          },
        };

        const config = categoryConfig[msg.category];
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
          >
            {config.label}
          </span>
        );
      },
    },
    {
      key: "date",
      header: "Date",
      render: (msg: ParentMessage) => (
        <span className="text-white/50 text-xs">
          {new Date(msg.date).toLocaleDateString("fr-FR")}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-pulse">
          <div className="h-8 bg-white/20 rounded w-64 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-96"></div>
        </div>

        {/* KPI Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <KpiCardSkeleton key={i} />
          ))}
        </div>

        {/* Content skeleton */}
        <DashboardGrid>
          <div className="col-span-12 lg:col-span-8">
            <DataTableSkeleton rows={5} columns={5} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <DataTableSkeleton rows={6} columns={3} />
          </div>
        </DashboardGrid>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Header Simplifié */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Heart className="w-7 h-7 text-[#b8d070]" />
              Tableau de bord Parent
            </h1>
            <p className="text-white/70">
              Suivi de la scolarité de vos enfants -{" "}
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-white/60 text-sm">Enfants</p>
            <p className="text-3xl font-bold text-[#b8d070]">
              {data.kpi.totalChildren}
            </p>
            <p className="text-white/60 text-sm">sous votre responsabilité</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards avec dimensions uniformes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <KpiCard
            title="Mes enfants"
            value={data.kpi.totalChildren}
            subtitle="Scolarisés à Schola"
            icon={Baby}
            color="brand"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <KpiCard
            title="Devoirs en cours"
            value={data.kpi.pendingHomework}
            subtitle="À faire ou en retard"
            icon={BookOpen}
            color="orange"
            trend="down"
            delta={-2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <KpiCard
            title="Messages non lus"
            value={data.kpi.unreadMessages}
            subtitle="De l'équipe pédagogique"
            icon={MessageCircle}
            color="blue"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <KpiCard
            title="Paiements"
            value={data.kpi.pendingPayments}
            subtitle="Factures en attente"
            icon={CreditCard}
            color="red"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <KpiCard
            title="Moyenne famille"
            value={`${data.kpi.averageGrade}/20`}
            subtitle="Tous enfants confondus"
            icon={GraduationCap}
            color="green"
            trend="up"
            delta={0.3}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <KpiCard
            title="Absences 30j"
            value={data.kpi.totalAbsences}
            subtitle="Tous enfants"
            icon={UserX}
            color="purple"
          />
        </motion.div>
      </div>

      {/* Grille principale */}
      <DashboardGrid>
        {/* Section Mes enfants - Première rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader title="Mes enfants" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.children.map((child, index) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b8d070] to-[#a2c65e] flex items-center justify-center">
                      <span className="text-[#1d8b93] font-bold text-lg">
                        {child.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{child.name}</h3>
                      <p className="text-white/60 text-sm">{child.className}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Moyenne:</span>
                      <span className="text-[#b8d070] font-medium">
                        {child.average}/20
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Absences 30j:</span>
                      <span
                        className={
                          child.absences30d > 3
                            ? "text-red-400"
                            : "text-green-400"
                        }
                      >
                        {child.absences30d}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Devoirs:</span>
                      <span
                        className={
                          child.pendingHomework > 0
                            ? "text-orange-400"
                            : "text-green-400"
                        }
                      >
                        {child.pendingHomework}
                      </span>
                    </div>
                    {child.nextClass && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-white/50 text-xs mb-1">
                          Prochain cours:
                        </p>
                        <p className="text-white text-xs font-medium">
                          {child.nextClass.subject} • {child.nextClass.time}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Section Devoirs urgents - Deuxième rangée */}
        <div className="col-span-12 lg:col-span-8">
          <SectionCard>
            <SectionHeader
              title="Devoirs urgents"
              actions={
                <div className="flex items-center gap-2">
                  <select
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm"
                  >
                    <option value="all" className="bg-[#1d8b93]">
                      Tous les enfants
                    </option>
                    {data.children.map((child) => (
                      <option
                        key={child.id}
                        value={child.id}
                        className="bg-[#1d8b93]"
                      >
                        {child.name}
                      </option>
                    ))}
                  </select>
                  <button className="text-[#b8d070] hover:text-[#a2c65e] text-sm font-medium">
                    Voir tout
                  </button>
                </div>
              }
            />
            <DataTable
              columns={homeworkColumns}
              rows={filteredHomeworks}
              emptyMessage="Aucun devoir en cours"
            />
          </SectionCard>
        </div>

        {/* Section Messages récents - Deuxième rangée */}
        <div className="col-span-12 lg:col-span-4">
          <SectionCard>
            <SectionHeader
              title="Messages récents"
              actions={
                <button className="text-[#b8d070] hover:text-[#a2c65e] text-sm font-medium">
                  Voir tous
                </button>
              }
            />
            <DataTable
              columns={messageColumns}
              rows={recentMessages}
              emptyMessage="Aucun message récent"
            />
          </SectionCard>
        </div>

        {/* Section Paiements - Troisième rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader title="Situation financière" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.invoices.map((invoice, index) => {
                const statusConfig = {
                  due: {
                    label: "À payer",
                    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                    icon: Clock,
                  },
                  overdue: {
                    label: "En retard",
                    color: "bg-red-500/20 text-red-300 border-red-500/30",
                    icon: AlertTriangle,
                  },
                  paid: {
                    label: "Payé",
                    color: "bg-green-500/20 text-green-300 border-green-500/30",
                    icon: CheckCircle,
                  },
                  pending: {
                    label: "En traitement",
                    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                    icon: Clock,
                  },
                };

                const config = statusConfig[invoice.status];
                const StatusIcon = config.icon;

                return (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium text-sm">
                        {invoice.period}
                      </span>
                      <StatusIcon className="w-4 h-4 text-white/60" />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-white">
                        {(invoice.amount / 1000000).toFixed(1)}M
                      </span>
                      <span className="text-white/60 text-xs">GNF</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-white/50 text-xs">
                        {new Date(invoice.dueDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>

                    <p className="text-white/60 text-xs">
                      {invoice.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Section Événements à venir - Quatrième rangée */}
        <div className="col-span-12">
          <SectionCard>
            <SectionHeader title="Événements à venir" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.events.map((event, index) => {
                const typeConfig = {
                  meeting: {
                    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                    icon: User,
                  },
                  exam: {
                    color: "bg-red-500/20 text-red-300 border-red-500/30",
                    icon: GraduationCap,
                  },
                  event: {
                    color: "bg-green-500/20 text-green-300 border-green-500/30",
                    icon: Calendar,
                  },
                  vacation: {
                    color:
                      "bg-purple-500/20 text-purple-300 border-purple-500/30",
                    icon: Heart,
                  },
                };

                const config = typeConfig[event.type];
                const TypeIcon = config.icon;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1.2 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TypeIcon className="w-4 h-4 text-white/60" />
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
                      >
                        {event.type === "meeting"
                          ? "Réunion"
                          : event.type === "exam"
                          ? "Examen"
                          : event.type === "event"
                          ? "Événement"
                          : "Vacances"}
                      </span>
                    </div>

                    <h3 className="font-semibold text-white text-sm mb-1">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-1 mb-2">
                      <Calendar className="w-3 h-3 text-white/50" />
                      <span className="text-white/60 text-xs">
                        {new Date(event.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-white/50" />
                        <span className="text-white/50 text-xs">
                          {event.location}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </DashboardGrid>
    </div>
  );
};

export default ParentDashboardPage;
