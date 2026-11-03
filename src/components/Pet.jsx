import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PET } from "../data/content";
import { useStory } from "../lib/story";

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

// How often each mood is picked.
const MOODS = [["walk", 34], ["sit", 14], ["hop", 10], ["sleep", 7], ["spin", 8], ["chase", 10], ["zoomies", 8], ["peek", 9]];
const nextMood = () => {
  let r = Math.random() * MOODS.reduce((s, [, w]) => s + w, 0);
  for (const [m, w] of MOODS) if ((r -= w) < 0) return m;
  return "walk";
};

const petSize = () => (window.innerWidth < 640 ? { w: 54, h: 64 } : { w: 68, h: 81 });

/** Echo the cat: wanders around the whole screen and plays like a little kid. */
export default function Pet() {
  const reduced = useReducedMotion();
  const { status } = useStory();
  const storyRef = useRef(status);
  storyRef.current = status;

  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const st = useRef({ x: 24, y: 300, tx: 0, ty: 0, speed: 80, mood: "sit", start: 0, until: 0, facing: 1, laps: 0, hold: 0, mouse: null });
  const [bubble, setBubble] = useState(null);
  const [sleeping, setSleeping] = useState(false);
  const [hearts, setHearts] = useState([]);
  const bubbleTimer = useRef();

  const say = (text, ms = 2200) => {
    const x = st.current.x;
    const align = x < 110 ? "left" : x > window.innerWidth - 180 ? "right" : "center";
    setBubble({ text, align });
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  };
  const sayRef = useRef(say);
  sayRef.current = say;

  useEffect(() => {
    const track = (e) => { st.current.mouse = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("pointermove", track);
    const hello = setTimeout(() => sayRef.current(PET.quips[0], 2600), 1800);
    return () => { window.removeEventListener("pointermove", track); clearTimeout(hello); clearTimeout(bubbleTimer.current); };
  }, []);

  useEffect(() => {
    const s = st.current;
    const { h } = petSize();
    s.x = 24;
    s.y = window.innerHeight - h - 24;
    const place = (lift = 0, rot = 0, sx = 1, sy = 1) => {
      if (rootRef.current) rootRef.current.style.transform = `translate3d(${s.x}px, ${s.y + lift}px, 0)`;
      if (bodyRef.current) bodyRef.current.style.transform = `rotate(${rot}deg) scale(${s.facing * sx}, ${sy})`;
    };
    if (reduced) { place(); return; }

    const bounds = () => {
      const { w, h } = petSize();
      return { minX: 8, maxX: window.innerWidth - w - 8, minY: 72, maxY: window.innerHeight - h - 12 };
    };
    const randomSpot = () => { const b = bounds(); return [rand(b.minX, b.maxX), rand(b.minY, b.maxY)]; };

    const begin = (mood, now) => {
      s.mood = mood;
      s.start = now;
      s.until = Infinity;
      s.hold = 0;
      setSleeping(mood === "sleep");
      const say = sayRef.current;
      switch (mood) {
        case "walk": [s.tx, s.ty] = randomSpot(); s.speed = rand(60, 95); break;
        case "zoomies": [s.tx, s.ty] = randomSpot(); s.speed = 300; s.laps = 4; say("Zoomies!!", 1400); break;
        case "sit": s.until = now + rand(2000, 4500); break;
        case "hop": s.until = now + 1800; break;
        case "sleep": s.until = now + rand(6000, 9000); break;
        case "spin": s.until = now + 900; break;
        case "chase": s.until = now + 4500; s.speed = 160; say("Here I come!", 1400); break;
        case "peek": {
          const { w } = petSize();
          const left = Math.random() < 0.5;
          s.tx = left ? -w * 0.55 : window.innerWidth - w * 0.45;
          s.ty = rand(bounds().minY, bounds().maxY);
          s.speed = 120;
          break;
        }
        case "listen": {
          const { h } = petSize();
          s.tx = 16; s.ty = window.innerHeight - h - 150; s.speed = 160;
          say("🎧 Listening!", 1600);
          break;
        }
        default: break;
      }
      if (["walk", "sit", "hop", "spin"].includes(mood) && Math.random() < 0.22) say(pick(PET.quips));
    };

    const moveToward = (dt, stopAt) => {
      const dx = s.tx - s.x;
      const dy = s.ty - s.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= stopAt) return true;
      const step = Math.min(dist - stopAt, s.speed * dt);
      s.x += (dx / dist) * step;
      s.y += (dy / dist) * step;
      if (Math.abs(dx) > 2) s.facing = dx > 0 ? 1 : -1;
      return false;
    };

    let raf;
    let last = performance.now();
    begin("sit", last);

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      let lift = 0, rot = 0, sx = 1, sy = 1;

      const story = storyRef.current !== "idle";
      if (story && s.mood !== "listen") begin("listen", now);
      if (!story && s.mood === "listen") begin("sit", now);

      switch (s.mood) {
        case "walk":
        case "zoomies":
        case "peek":
        case "listen":
        case "chase": {
          if (s.mood === "chase" && s.mouse) {
            const { w, h } = petSize();
            s.tx = s.mouse.x - w / 2;
            s.ty = s.mouse.y - h / 2;
          }
          const arrived = moveToward(dt, s.mood === "chase" ? 50 : 2);
          if (!arrived) {
            const f = s.mood === "zoomies" ? 24 : 12;
            rot = Math.sin(t * f) * 8;
            lift = -Math.abs(Math.sin(t * f)) * 5;
          } else if (s.mood === "walk") {
            begin(nextMood(), now);
          } else if (s.mood === "zoomies") {
            if (--s.laps > 0) [s.tx, s.ty] = randomSpot();
            else { sayRef.current("Phew! 😮‍💨", 1400); begin("sit", now); }
          } else if (s.mood === "peek") {
            if (!s.hold) { s.hold = now + 2600; sayRef.current(pick(["Peekaboo!", "👀"]), 1500); }
            else if (now > s.hold) { s.mood = "walk"; [s.tx, s.ty] = randomSpot(); }
          } else if (s.mood === "listen") {
            rot = Math.sin(t * 3.2) * 7;
            lift = -Math.abs(Math.sin(t * 3.2)) * 3;
          }
          if (s.mood === "chase" && now > s.until) { sayRef.current("Caught you! 😸", 1800); begin("sit", now); }
          break;
        }
        case "hop": {
          const p = (now - s.start) / 1000;
          lift = -Math.abs(Math.sin(p * 7)) * 34;
          sy = 1 + Math.sin(p * 14) * 0.05;
          break;
        }
        case "sit": sy = 1 + Math.sin(t * 2.5) * 0.025; break;
        case "sleep": sy = 0.9 + Math.sin(t * 1.5) * 0.02; rot = -8; break;
        case "spin": rot = ((now - s.start) / 900) * 360; break;
        default: break;
      }
      if (now > s.until && s.mood !== "chase") begin(nextMood(), now);

      if (s.mood !== "peek") {
        const b = bounds();
        s.x = Math.min(Math.max(s.x, b.minX), b.maxX);
        s.y = Math.min(Math.max(s.y, b.minY), b.maxY);
      }
      place(lift, rot, sx, sy);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const tickle = () => {
    say(pick(PET.tickled), 1800);
    const s = st.current;
    if (!reduced) { s.mood = "hop"; s.start = performance.now(); s.until = s.start + 1500; setSleeping(false); }
    const burst = Array.from({ length: 5 }, (_, i) => ({ id: `${Date.now()}-${i}`, dx: rand(-30, 30), delay: i * 70 }));
    setHearts((h) => [...h, ...burst]);
    setTimeout(() => setHearts((h) => h.filter((x) => !burst.includes(x))), 1400);
  };

  const { w, h } = typeof window !== "undefined" ? petSize() : { w: 68, h: 81 };
  const bubblePos = { left: "left-0", right: "right-0", center: "left-1/2 -translate-x-1/2" };

  return (
    <div ref={rootRef} className="fixed left-0 top-0 z-50 will-change-transform" style={{ width: w, height: h }}>
      {bubble && (
        <div className={`pet-pop absolute bottom-full mb-2 ${bubblePos[bubble.align]} whitespace-nowrap rounded-2xl border-2 border-ink bg-white px-3 py-1.5 text-sm font-semibold shadow-[3px_3px_0_#FFC400]`}>
          {bubble.text}
        </div>
      )}
      {sleeping && <span className="pet-zzz absolute -top-4 right-0 font-display font-black text-accent text-lg" aria-hidden>z Z</span>}
      {hearts.map((ht) => (
        <span key={ht.id} className="pet-heart absolute left-1/2 top-0 text-lg" style={{ "--dx": `${ht.dx}px`, animationDelay: `${ht.delay}ms` }} aria-hidden>
          🧡
        </span>
      ))}
      <button onClick={tickle} aria-label={`${PET.name} the cat. Click to play.`} className="block w-full h-full cursor-pointer">
        <img ref={bodyRef} src="assets/pet-cat.png" alt="" draggable="false" className="w-full h-full object-contain drop-shadow-md select-none" style={{ imageRendering: "pixelated" }} />
      </button>
    </div>
  );
}
