import SignupForm from "@/components/auth/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - Fiinor",
  description:
    "Créez votre compte Fiinor et rejoignez notre plateforme de gestion scolaire innovante.",
};

export default function SignupPage() {
  return <SignupForm />;
}
