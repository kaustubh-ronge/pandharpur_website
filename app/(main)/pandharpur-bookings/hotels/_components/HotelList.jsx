'use client'

import { motion } from "framer-motion";
import { HotelCard } from "./HotelCard";

export function HotelList({ hotels }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {hotels.map((hotel, index) => (
        <motion.div
          key={hotel._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <HotelCard hotel={hotel} />
        </motion.div>
      ))}
    </div>
  );
}