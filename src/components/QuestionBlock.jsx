import { motion } from "framer-motion";

export default function QuestionBlock({ id, title, flip, children, testid }) {
  return (
    <section id={id} data-testid={testid} className="relative border-t border-slate-200 bg-white overflow-x-clip">
      <div className="portfolio-section max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center" style={{ perspective: 1400 }}>
        <motion.div
          initial={{ opacity: 0, x: flip ? 110 : -110, rotateY: flip ? 12 : -12, skewY: flip ? 1.5 : -1.5 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, skewY: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", transformOrigin: flip ? "right center" : "left center" }}
        >
          <h2 data-testid={`${id}-heading`} className="font-display font-extrabold leading-tight text-3xl sm:text-4xl max-w-3xl mx-auto">
            {title}
          </h2>
          <div className="mt-8 sm:mt-10">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
