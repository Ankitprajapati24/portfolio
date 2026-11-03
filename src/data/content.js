// Portfolio facts transcribed from Ankit_Prajapati_Resume.pdf.
export const NAME = "Ankit Prajapati";
export const SURNAME_SCRIPTS = [
  { text: "Prajapati", lang: "English" }, { text: "प्रजापति", lang: "Hindi" },
  { text: "প্রজাপতি", lang: "Bengali" }, { text: "ಪ್ರಜಾಪತಿ", lang: "Kannada" },
  { text: "ప్రజాపతి", lang: "Telugu" }, { text: "પ્રજાપતિ", lang: "Gujarati" },
  { text: "普拉贾帕蒂", lang: "Chinese" }, { text: "프라자파티", lang: "Korean" },
];
export const ABOUT = {
  greeting: "Hello",
  answer: [
    "I'm Ankit Prajapati — I build across AI, connected devices, and full-stack software. I'm pursuing a BS in Data Science at IIT Madras and a B.Tech in Computer Science at IIST, Indore.",
    "My projects turn ideas into working systems: detecting power-line faults at the edge, translating sign language into speech, and generating backends from a prompt. I like owning the whole line — from the model to the product people actually use.",
  ],
  sticker: "Vision → Devices → Backend",
};
export const SKILL_GROUPS = [
  { title: "Languages", items: ["Python", "C/C++", "Java", "JavaScript", "SQL"] },
  { title: "Frameworks & tools", items: ["Flask", "Django", "OpenCV", "React", "Node.js", "PyTorch", "TensorFlow"] },
  { title: "Machine learning & AI", items: ["Machine Learning", "Deep Learning", "LLMs", "RAG", "LangChain", "Prompt Engineering"] },
  { title: "Core computer science", items: ["Data Structures & Algorithms", "OOP", "Operating Systems", "System Design"] },
  { title: "Developer toolkit", items: ["Linux", "Git", "FastAPI", "Streamlit", "Hugging Face", "Firebase"] },
];
export const SKILLS = SKILL_GROUPS.flatMap((g) => g.items);
export const TERMINAL_SCRIPT = [
  { cmd: "whoami", out: ["ankit_prajapati — AI · IoT · full-stack", "BS Data Science, IIT Madras · B.Tech CSE, IIST"] },
  { cmd: "cat research.txt", out: ["focus     → sequential decision-making & MDPs", "exploring → value iteration, policy iteration, Q-Learning", "workflow  → Python · TensorBoard · Git · Linux"] },
  { cmd: "python proud.py", out: ["SERA → Smart India Hackathon 2025 winner", "SignEcho → Apratim Srajan 2025 winner"] },
];
export const PROJECTS = [
  { id: "01", title: "Backend Pilot", desc: "A natural-language prompt becomes a backend: APIs, folder structure, and tests. Built with LLM-powered generation and structured prompt pipelines.", tags: ["LLMs", "Groq API", "Code generation"], href: "https://backendpilot.onrender.com/", linkLabel: "Visit project" },
  { id: "02", title: "SERA", desc: "Edge AI for power-line safety. Detects high-impedance faults using an LSTM model, with automatic phase isolation and remote monitoring.", tags: ["IoT", "Edge AI", "LSTM"], award: "SIH 2025 · Winner", href: "https://github.com/Ankitprajapati24/sera_dashboard_main.git", linkLabel: "View source" },
  { id: "03", title: "SignEcho", desc: "Real-time sign language to speech and text. A CNN + MediaPipe pipeline achieved 79.6% accuracy in a user-tested web app.", tags: ["OpenCV", "PyTorch", "MediaPipe"], award: "Apratim 2025 · Winner", href: "https://github.com/Ankitprajapati24/SignEcho", linkLabel: "View source" },
  { id: "04", title: "EduVote", desc: "A digital voting system for student elections, with secure sign-in, role-based access, and real-time election analytics.", tags: ["React", "Node.js", "MongoDB", "Firebase Auth"], href: null },
  { id: "05", title: "Saathi", desc: "A smart medicine dispenser and health companion: reminders, heartbeat and fall detection, and caregiver alerts. I contributed backend logic and sensor integration.", tags: ["ESP32", "TensorFlow", "Flutter", "Firebase"], href: "https://saathi.flutterflow.app/", linkLabel: "Visit project" },
];
export const HACKATHON_BADGES = [
  { title: "Winner", sub: "Smart India Hackathon · 2025", href: "https://drive.google.com/file/d/1YKdYIWOJF4H6yAqfipCRtujbSSY5QZrv/view?usp=sharing" },
  { title: "Winner", sub: "Apratim Srajan, IIST Indore · 2025", href: "https://drive.google.com/file/d/1R9o6EwuZOOrk80raAnE0N3ViaA9hMpTP/view?usp=drive_link" },
  { title: "Finalist", sub: "Hacksagon, ABV-IIITM Gwalior · 2025", href: "https://drive.google.com/drive/folders/1haNkRVWD4txV2-kD69WT6gGzA2aleYr1?usp=drive_link" },
  { title: "Finalist", sub: "S&T IISF, IIT Guwahati · 2024", href: "https://drive.google.com/file/d/1I2Gldni2k94B1yxdMMZ-XsJxkE3F3mV3/view?usp=sharing" },
  { title: "Runner-up", sub: "Cognizance Watch Tower, IIT Roorkee · 2023" },
];
export const EXPERIENCE = [
  { org: "IIT Madras", role: "Undergraduate Research Intern", period: "Jul 2026 – Present", note: "Research with Prof. Rahul H. Meshram, Dept. of EE: MDPs, dynamic programming and Q-Learning. Built a Python grid-world to compare planning and model-free learning." },
  { org: "Klover.AI", role: "AI Engineer · Open Source Contributor", period: "Jan 2025 – Apr 2025", note: "Built multi-agent workflows for automated decision-making and fault recovery. Collaborated remotely on modular, reusable agents and deployable AI pipelines." },
];
export const EDUCATION = [
  { org: "IIT Madras", degree: "BS in Data Science", period: "May 2023 – May 2027" },
  { org: "IIST, Indore", degree: "B.Tech in Computer Science Engineering", period: "Aug 2023 – Jun 2027" },
  { org: "Delhi Public School, Sagar", degree: "Higher Secondary · PCM + Informatics Practices", period: "Apr 2021 – 2022" },
];
export const BUILD_SPECS = ["React", "Tailwind", "Framer Motion", "Lenis", "Web Speech API", "Built by voice with Wispr Flow + Emergent"];
export const CONTACT = {
  email: "ankitp2412@gmail.com", phone: "+91 73890 18024", phoneHref: "+917389018024",
  github: { label: "GitHub", href: "https://github.com/Ankitprajapati24" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/ankitprajapati04/" },
  showcase: null,
  resume: "assets/Ankit_Prajapati_Resume.pdf",
};
export const MARQUEE_ITEMS = ["AI & Full-Stack", "Vision → Devices → Backend", "SIH 2025 Winner", "Open Source", "Data Science"];
export const ECHO_QUIPS = [
  "Hi! I'm Echo — ask me about Ankit.",
  "Curious about SERA? That's a good story.",
  "Type a question, or let's talk.",
];
export const ECHO_GREETING = "Hey, I'm Echo! Ankit's little sidekick. What would you like to know — his projects, research, or tech stack?";
export const ECHO_OFFLINE_REPLIES = ["My AI connection is unavailable. Ankit's projects, experience, and résumé are all on this page. You can reach him at ankitp2412@gmail.com."];
