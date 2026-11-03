// Static-hosting version: Echo answers from the portfolio content in the browser.
// The original Emergent build streamed replies from a FastAPI backend; that backend
// is not available outside Emergent, so answers are matched locally instead.
import { CONTACT, EXPERIENCE, EDUCATION, HACKATHON_BADGES, PROJECTS, SKILL_GROUPS } from "../data/content";

const projectLine = (p) => `${p.title}: ${p.desc}${p.award ? ` (${p.award})` : ""}`;

const TOPICS = [
  { keys: ["signecho", "sign language", "sign", "gesture"], answer: () => projectLine(PROJECTS.find((p) => p.title === "SignEcho")) },
  { keys: ["sera", "sih", "smart india", "power", "fault"], answer: () => projectLine(PROJECTS.find((p) => p.title === "SERA")) },
  { keys: ["backend pilot", "code generat", "generator"], answer: () => projectLine(PROJECTS.find((p) => p.title === "Backend Pilot")) },
  { keys: ["eduvote", "voting", "election"], answer: () => projectLine(PROJECTS.find((p) => p.title === "EduVote")) },
  { keys: ["saathi", "medicine", "dispenser", "health"], answer: () => projectLine(PROJECTS.find((p) => p.title === "Saathi")) },
  { keys: ["project", "built", "build", "made"], answer: () => `Ankit has built ${PROJECTS.map((p) => p.title).join(", ")}. Ask me about any one of them.` },
  { keys: ["research", "iit madras", "intern", "reinforcement", "working on", "right now", "currently"], answer: () => `${EXPERIENCE[0].role} at ${EXPERIENCE[0].org} (${EXPERIENCE[0].period}). ${EXPERIENCE[0].note}` },
  { keys: ["klover", "experience", "work", "job"], answer: () => EXPERIENCE.map((e) => `${e.role} at ${e.org} (${e.period}).`).join(" ") },
  { keys: ["skill", "stack", "tech", "language", "python", "know"], answer: () => SKILL_GROUPS.map((g) => `${g.title}: ${g.items.join(", ")}`).join(". ") + "." },
  { keys: ["hackathon", "award", "win", "won", "achievement", "certificate"], answer: () => HACKATHON_BADGES.map((b) => `${b.title}, ${b.sub}`).join("; ") + "." },
  { keys: ["study", "college", "degree", "education", "graduat", "iist"], answer: () => EDUCATION.map((e) => `${e.degree}, ${e.org} (${e.period})`).join("; ") + "." },
  { keys: ["from", "where", "yourself", "who", "about"], answer: () => "Ankit is from Bada Malhera, a small town in Chhatarpur, Madhya Pradesh, and lives in Indore. He's doing a B.Tech in CSE at IIST Indore and a BS in Data Science at IIT Madras." },
  { keys: ["contact", "email", "reach", "hire", "phone", "linkedin"], answer: () => `You can reach Ankit at ${CONTACT.email} or ${CONTACT.phone}. LinkedIn: ${CONTACT.linkedin.href}` },
];

function answerFor(message) {
  const q = message.toLowerCase();
  const hit = TOPICS.find((t) => t.keys.some((k) => q.includes(k)));
  return hit ? hit.answer() : `I don't have that detail. You can ask Ankit directly at ${CONTACT.email}. Try asking about his projects, research, skills or hackathons.`;
}

export async function streamEcho({ message, onDelta, onDone, onError }) {
  try {
    await new Promise((r) => setTimeout(r, 350));
    onDelta(answerFor(message));
    onDone("local");
  } catch (err) { onError(err); }
}

export async function voiceRequest() {
  throw new Error("AI voice isn't available on this version of the site. Using your browser's voice instead.");
}
