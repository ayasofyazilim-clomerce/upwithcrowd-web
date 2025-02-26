"use client";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";

export default function VolunteerHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-emerald-50 to-teal-100 py-12">
      {/* Animated background shapes */}
      <motion.div
        animate={{opacity: 1}}
        className="absolute inset-0 z-0"
        initial={{opacity: 0}}
        transition={{duration: 1}}>
        <div className="animate-blob absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-200 opacity-70 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-2000 absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-200 opacity-70 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-96 w-96 rounded-full bg-teal-200 opacity-70 mix-blend-multiply blur-xl filter" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h2
          animate={{opacity: 1, y: 0}}
          className="mb-4 text-2xl font-semibold text-emerald-800"
          initial={{opacity: 0, y: 20}}
          transition={{delay: 0.2}}>
          BECOME A VOLUNTEER
        </motion.h2>
        <motion.h1
          animate={{opacity: 1, y: 0}}
          className="mb-8 text-4xl font-bold leading-tight text-gray-900 md:text-6xl"
          initial={{opacity: 0, y: 20}}
          transition={{delay: 0.4}}>
          Join hands with us for a
          <br />
          <span className="text-emerald-600">better life and future</span>
        </motion.h1>
        <motion.div animate={{opacity: 1, y: 0}} initial={{opacity: 0, y: 20}} transition={{delay: 0.6}}>
          <Button size="lg">Discover More</Button>
        </motion.div>
      </div>
    </div>
  );
}
