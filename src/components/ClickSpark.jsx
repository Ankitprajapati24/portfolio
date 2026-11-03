import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const COLORS = ["#0A0A0A", "#FF6B00", "#FFC400", "#E11D48", "#2563EB", "#16A34A", "#7C3AED"];
const RAYS = 10;

/** A burst of lines wherever the visitor clicks. */
export default function ClickSpark() {
  const reduced = useReducedMotion();
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    if (reduced) return;
    const onDown = (e) => {
      const id = `${Date.now()}-${Math.random()}`;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      // Uneven angles and lengths so each burst looks hand-drawn.
      const rays = Array.from({ length: RAYS }, (_, i) => ({
        angle: (360 / RAYS) * i + (Math.random() * 16 - 8),
        length: 12 + Math.random() * 20,
        reach: 34 + Math.random() * 34,
      }));
      setSparks((s) => [...s, { id, x: e.clientX, y: e.clientY, color, rays }]);
      setTimeout(() => setSparks((s) => s.filter((sp) => sp.id !== id)), 650);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {sparks.map((sp) => (
        <span key={sp.id} className="absolute" style={{ left: sp.x, top: sp.y }}>
          {sp.rays.map((r, i) => (
            <span
              key={i}
              className="spark-ray absolute left-0 top-0 rounded-full"
              style={{
                width: 3,
                height: r.length,
                background: sp.color,
                "--a": `${r.angle}deg`,
                "--reach": `${-r.reach}px`,
              }}
            />
          ))}
        </span>
      ))}
    </div>
  );
}
