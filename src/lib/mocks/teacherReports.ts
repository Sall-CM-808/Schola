// Mock data for teacher reports

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export interface ActivityReport {
  date: string;
  elementsCreated: number;
  elementsPublished: number;
  studentsInteractions: number;
}

export interface StatusReport {
  status: string;
  count: number;
  percentage: number;
}

export interface ClassSummary {
  className: string;
  studentsCount: number;
  averageGrade: number;
  attendanceRate: number;
}

export interface ReportAggregates {
  activityByWeek: ActivityReport[];
  elementsByStatus: StatusReport[];
  classesSummary: ClassSummary[];
}

export interface ExportOptions {
  format: "pdf" | "excel" | "csv";
  period: string;
  reportType: string;
}

// Mock data
const activityData: ActivityReport[] = [
  {
    date: "2024-01-08",
    elementsCreated: 3,
    elementsPublished: 2,
    studentsInteractions: 45,
  },
  {
    date: "2024-01-15",
    elementsCreated: 5,
    elementsPublished: 4,
    studentsInteractions: 67,
  },
  {
    date: "2024-01-22",
    elementsCreated: 2,
    elementsPublished: 3,
    studentsInteractions: 52,
  },
  {
    date: "2024-01-29",
    elementsCreated: 4,
    elementsPublished: 1,
    studentsInteractions: 38,
  },
];

const statusDistribution: StatusReport[] = [
  {
    status: "Publié",
    count: 24,
    percentage: 54.5,
  },
  {
    status: "Brouillon",
    count: 12,
    percentage: 27.3,
  },
  {
    status: "Archivé",
    count: 8,
    percentage: 18.2,
  },
];

const classesSummary: ClassSummary[] = [
  {
    className: "L2 Mathématiques - Groupe A",
    studentsCount: 45,
    averageGrade: 13.2,
    attendanceRate: 87,
  },
  {
    className: "L3 Mathématiques - Analyse",
    studentsCount: 38,
    averageGrade: 14.8,
    attendanceRate: 92,
  },
  {
    className: "M1 Statistiques",
    studentsCount: 22,
    averageGrade: 15.6,
    attendanceRate: 95,
  },
  {
    className: "L1 Mathématiques - Groupe B",
    studentsCount: 52,
    averageGrade: 11.4,
    attendanceRate: 78,
  },
  {
    className: "Prépa MPSI",
    studentsCount: 35,
    averageGrade: 16.2,
    attendanceRate: 98,
  },
  {
    className: "L3 Informatique - Maths",
    studentsCount: 28,
    averageGrade: 13.9,
    attendanceRate: 84,
  },
];

// API simulation functions
export async function getReportAggregates(): Promise<ReportAggregates> {
  await simulateLoading();

  return {
    activityByWeek: activityData,
    elementsByStatus: statusDistribution,
    classesSummary: classesSummary,
  };
}

export async function getActivityReport(
  startDate: string,
  endDate: string
): Promise<ActivityReport[]> {
  await simulateLoading();

  // Filter activity data by date range
  return activityData.filter((activity) => {
    const activityDate = new Date(activity.date);
    return (
      activityDate >= new Date(startDate) && activityDate <= new Date(endDate)
    );
  });
}

export async function getStatusReport(): Promise<StatusReport[]> {
  await simulateLoading();
  return statusDistribution;
}

export async function getClassesSummaryReport(): Promise<ClassSummary[]> {
  await simulateLoading();
  return classesSummary;
}

export async function exportReport(
  reportType: string,
  options: ExportOptions
): Promise<{ success: boolean; filename: string }> {
  await simulateLoading(2000); // Longer delay to simulate export generation

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  const filename = `${reportType}_${options.period}_${timestamp}.${options.format}`;

  return {
    success: true,
    filename,
  };
}

// Helper functions
export const getReportTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    activity: "Activité récente",
    status: "Éléments par statut",
    classes: "Classes & effectifs",
  };
  return labels[type] || type;
};

export const getPeriodLabel = (period: string): string => {
  const labels: Record<string, string> = {
    week: "Cette semaine",
    month: "Ce mois",
    quarter: "Ce trimestre",
    year: "Cette année",
  };
  return labels[period] || period;
};

export const getFormatLabel = (format: string): string => {
  const labels: Record<string, string> = {
    pdf: "PDF",
    excel: "Excel (XLSX)",
    csv: "CSV",
  };
  return labels[format] || format;
};
