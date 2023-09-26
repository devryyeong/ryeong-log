import React from 'react'

interface TagHeroSectionProps {
  subtitle?: string;
  title?: string;
}

const TagHeroSection = ({
  subtitle = "Tag collection",
  title = "All Tags",
}: TagHeroSectionProps) => {
  return (
    <section>
      <div className="w-4/5 mx-auto max-w-5xl py-16 flex flex-col gap-4">
        <p className="font-medium text-gray-700 text-2xl">{subtitle}</p>
        <h2 className="font-bold text-6xl">{title}</h2>
      </div>
    </section>
  );
};

export default TagHeroSection;