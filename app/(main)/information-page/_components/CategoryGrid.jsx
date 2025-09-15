'use client'

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CategoryCard } from "./CategoryCard"; // <-- Import the small card component
import { categories } from "@/data/InformationData/informationPageData";

export function CategoryGrid() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="h-full"
        >
          {category.link ? (
            <Link href={category.link} className="block h-full">
              <CategoryCard category={category} />
            </Link>
          ) : (
            <CategoryCard
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}