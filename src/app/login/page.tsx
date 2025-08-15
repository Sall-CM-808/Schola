import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - Schola",
  description:
    "Connectez-vous à votre compte Schola pour accéder à votre plateforme de gestion scolaire.",
};

export default function LoginPage() {
  return <LoginForm />;
}
