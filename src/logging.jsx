import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import React from "react";

function Logging() {
  const pawCount = 16;
  const radius = 100;

  return (
    <>
    <div className="fixed inset-0 flex flex-col gap-10 items-center  justify-center bg-[#0F0F0F]">
      <div className="relative h-48 w-48">
        {[...Array(pawCount)].map((_, i) => {
          const angle = (i / pawCount) * 360;
          const rad = (angle * Math.PI) / 180;

          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-19"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear",
              }}
              style={{
                transform: `
                  translate(-50%, -50%)
                  translate(${x}px, ${y}px)
                  rotate(${angle + 90}deg)
                `,
              }}
            >
              <PawPrint size={15} className="text-[#E7000C] text-600"/>
            </motion.div>
            
          );
        })}
      </div>
      <h1 className='font-semibold text-white text-2xl'>Logging You In...</h1>
    </div>
    
    </>
  );
}

export default Logging;
