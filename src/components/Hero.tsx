import React from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string; // Tailwind color class
}

export default function Hero({
  title,
  subtitle,
  backgroundColor = "bg-gray-100",
}: HeroProps) {
  return (
    <section className={`${backgroundColor} py-16 text-center`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
