"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import imageHero from "../assets/imageHero.png";

const SchoolIcon = () => (
  <svg
    className="w-6 h-6 text-[#b8d070]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l-9-5v6l9 5 9-5v-6l-9 5z"
    />
  </svg>
);

const SatisfactionIcon = () => (
  <svg
    className="w-6 h-6 text-[#b8d070]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-6 h-6 text-[#b8d070]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 0c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-8 6v6h4v-6H4zm16 0v6h-4v-6h4z"
    />
  </svg>
);

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = [titleRef, sloganRef, subtitleRef, ctaRef, imageRef].map(
      (ref) => ref.current
    );
    elements.forEach((el) => el && observer.observe(el));
    return () => elements.forEach((el) => el && observer.unobserve(el!));
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-[92vh] pt-20 pb-8 md:pt-24 md:pb-10 bg-[#1d8b93] overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 -left-20 w-72 h-72 md:w-96 md:h-96 bg-[#b8d070] rounded-full mix-blend-soft-light animate-blob animation-delay-2000"></div>
        <div className="absolute top-36 -right-20 w-64 h-64 md:w-80 md:h-80 bg-[#ffffff] rounded-full mix-blend-soft-light animate-blob"></div>
        <div className="absolute bottom-8 left-1/4 w-56 h-56 md:w-72 md:h-72 bg-[#b8d070] rounded-full mix-blend-soft-light animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <div className="text-center lg:text-left flex flex-col justify-center">
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-[2.8rem] xl:text-[3.2rem] font-bold leading-tight opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              <span className="block text-white">Réinventez</span>
              <span className="block mt-1 md:mt-2 text-[#b8d070] drop-shadow-sm">
                l&apos;excellence éducative
              </span>
            </h1>

            <p
              ref={sloganRef}
              className="mt-4 md:mt-6 text-base md:text-lg font-semibold text-white/90 italic opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out"
            >
              &quot;Propulsez votre école dans l&apos;ère digitale&quot;
            </p>

            <p
              ref={subtitleRef}
              className="mt-6 md:mt-8 text-base md:text-lg text-gray-100 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out"
            >
              Offrez à votre école les outils des établissements d&apos;élite. <span className="font-semibold text-[#b8d070]">Fiinor</span> fusionne technologie de pointe et simplicité d&apos;usage pour créer une expérience éducative fluide, transparente et inspirante.
            </p>

            <div
              ref={ctaRef}
              className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-2 md:gap-3 justify-center lg:justify-start opacity-0 translate-y-8 transition-all duration-700 delay-400 ease-out"
            >
              <Link
                href="/start"
                className="px-6 py-3 md:px-7 md:py-3.5 rounded-lg md:rounded-xl bg-gradient-to-r from-[#b8d070] to-[#a2c65e] text-[#1d8b93] font-bold text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#b8d070]/30 text-sm md:text-base"
              >
                Démarrer gratuitement
              </Link>
              <Link
                href="/fonctionnalites"
                className="px-6 py-3 md:px-7 md:py-3.5 rounded-lg md:rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 text-sm md:text-base"
              >
                Découvrir Fiinor
              </Link>
            </div>
          </div>

          <div className="relative flex items-end justify-center mt-12 lg:mt-8 lg:pb-8">
            <div
              ref={imageRef}
              className="relative opacity-0 translate-x-8 transition-all duration-1000 delay-300 ease-out"
            >
              <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl shadow-[#0d5a61]/40 transition-all duration-500 hover:scale-[1.02] w-full max-w-2xl h-auto">
                <Image
                  src="/images/imageHero.png"
                  alt="Étudiante utilisant Fiinor"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[600px] object-cover"
                  style={{
                    imageRendering: "crisp-edges",
                    filter: "contrast(1.05) brightness(1.05)",
                  }}
                />

                <div className="absolute top-3 right-3 w-16 h-16 md:top-4 md:right-4 md:w-20 md:h-20 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-[#b8d070] rounded-tr-2xl md:rounded-tr-3xl opacity-80 animate-border-pulse"></div>
                <div className="absolute bottom-3 left-3 w-12 h-12 md:bottom-4 md:left-4 md:w-14 md:h-14 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-white rounded-bl-2xl md:rounded-bl-3xl opacity-60 animate-border-pulse animation-delay-2000"></div>
              </div>
            </div>

            <div className="hidden sm:flex absolute right-0 top-0 h-full flex-col justify-center gap-4 md:gap-6 pr-2 md:pr-4">
              <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm transition-all duration-300 hover:bg-white/15 hover:scale-105">
                <SchoolIcon />
                <div>
                  <div className="text-base md:text-xl font-bold text-[#b8d070]">
                    500+
                  </div>
                  <div className="text-xs md:text-sm text-white">Écoles</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm transition-all duration-300 hover:bg-white/15 hover:scale-105">
                <SatisfactionIcon />
                <div>
                  <div className="text-base md:text-xl font-bold text-[#b8d070]">
                    95%
                  </div>
                  <div className="text-xs md:text-sm text-white">
                    Satisfaction
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm transition-all duration-300 hover:bg-white/15 hover:scale-105">
                <UsersIcon />
                <div>
                  <div className="text-base md:text-xl font-bold text-[#b8d070]">
                    10k+
                  </div>
                  <div className="text-xs md:text-sm text-white">
                    Utilisateurs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;