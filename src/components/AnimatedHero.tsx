import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ['malussé', 'résilié', 'suspendu', 'sans bonus', 'jeune conducteur'], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber(titleNumber === titles.length - 1 ? 0 : titleNumber + 1);
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="flex flex-col">
      <h1 className="font-display text-[clamp(38px,5.5vw,68px)] font-black leading-[0.9] tracking-[-3px] text-ink">
        Assurance auto
        <span className="relative flex w-full overflow-hidden h-[1.15em] mt-1">
          {titles.map((title, index) => (
            <motion.span
              key={index}
              className="absolute text-brand"
              initial={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 80, damping: 16 }}
              animate={
                titleNumber === index
                  ? { y: 0, opacity: 1 }
                  : { y: titleNumber > index ? -60 : 60, opacity: 0 }
              }
            >
              {title}.
            </motion.span>
          ))}
        </span>
      </h1>
    </div>
  );
}
