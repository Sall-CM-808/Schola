"use client";

import React from "react";
import { UnitProvider } from "@/contexts/UnitContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <UnitProvider>{children}</UnitProvider>;
}
