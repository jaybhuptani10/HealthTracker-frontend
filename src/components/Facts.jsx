import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import healthFacts from "./fact.json";

const Facts = () => {
  const getRandomFacts = () => {
    const indexes = new Set();
    while (indexes.size < 3) {
      indexes.add(Math.floor(Math.random() * healthFacts.length));
    }
    const randomFacts = [...indexes].map((index) => healthFacts[index]);

    return {
      fact1: randomFacts[0],
      fact2: randomFacts[1],
      fact3: randomFacts[2],
    };
  };

  const [facts, setFacts] = useState(getRandomFacts());

  useEffect(() => {
    const interval = setInterval(() => {
      setFacts(getRandomFacts());
    }, 10000); // Change facts every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4  rounded-lg shadow-lg w-full mx-auto mt-10">
      <h2 className="text-xl font-bold text-center text-blue-600">
        Health Facts
      </h2>

      <AnimatePresence mode="wait">
        {[facts.fact1, facts.fact2].map((fact, index) => (
          <motion.div
            key={fact?.question} // Unique key to trigger animation
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-white/30  rounded-lg shadow-md"
          >
            <p className="text-gray-800 font-semibold">
              <strong>Q:</strong> {fact?.question}
            </p>
            <p className="text-gray-600">
              <strong>A:</strong> {fact?.answer}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Facts;
