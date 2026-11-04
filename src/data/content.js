// All portfolio facts live here (transcribed from Ankit_Prajapati_Resume.pdf).
// `title` is the section heading. `speak` is what "Know about me" reads aloud.

export const NAME = "Ankit Prajapati";

export const SURNAME_SCRIPTS = [
  { text: "प्रजापति", lang: "Hindi" },
  { text: "ಪ್ರಜಾಪತಿ", lang: "Kannada" },
  { text: "প্রজাপতি", lang: "Bengali" },
  { text: "ప్రజాపతి", lang: "Telugu" },
  { text: "પ્રજાપતિ", lang: "Gujarati" },
  { text: "பிரஜாபதி", lang: "Tamil" },
  { text: "Prajapati", lang: "English" },
];

export const HERO = {
  tagline: "AI & machine learning · Connected devices · Full-stack",
  speak: "Hi! I'm Ankit Prajapati. Let me tell you a little about myself.",
};

export const ABOUT = {
  label: "About",
  title: "A bit about me",
  stickerWords: ["voice", "vision", "edge devices", "backends"],
  answer: [
    "I'm Ankit Prajapati. I build across AI, connected devices, and full-stack software. I'm pursuing a BS in Data Science at IIT Madras and a B.Tech in Computer Science at IIST, Indore.",
    "My projects turn ideas into working systems: detecting power-line faults at the edge, translating sign language into speech, and generating backends from a prompt. I like owning the whole line, from the model to the product people actually use.",
  ],
};

export const SKILL_GROUPS = [
  { title: "Languages", items: ["Python", "C/C++", "Java", "JavaScript", "SQL"] },
  { title: "Frameworks & tools", items: ["Flask", "Django", "OpenCV", "React", "Node.js", "PyTorch", "TensorFlow"] },
  { title: "Machine learning & AI", items: ["Machine Learning", "Deep Learning", "LLMs", "RAG", "LangChain", "Prompt Engineering"] },
  { title: "Core computer science", items: ["Data Structures & Algorithms", "OOP", "Operating Systems", "System Design"] },
  { title: "Developer toolkit", items: ["Linux", "Git", "FastAPI", "Streamlit", "Hugging Face", "Firebase"] },
];
export const SKILLS = SKILL_GROUPS.flatMap((g) => g.items);

export const STACK = {
  label: "Stack",
  title: "What I work with",
  speak:
    "Here's what I work with. My main languages are Python, C and C plus plus, Java, JavaScript and SQL. I build with Flask, Django, React, Node.js and FastAPI, and for machine learning I use PyTorch, TensorFlow, OpenCV, LangChain and Hugging Face. I'm comfortable with LLMs, RAG and prompt engineering, and I live in Linux and Git every day.",
};

export const NOW = {
  label: "Now",
  title: "What I'm doing right now",
  script: [
    { cmd: "whoami", out: ["ankit_prajapati — AI · IoT · full-stack", "BS Data Science, IIT Madras · B.Tech CSE, IIST Indore"] },
    {
      cmd: "cat now.txt",
      out: [
        "role      → Undergraduate Research Intern, IIT Madras (Jul 2026 – present)",
        "guide     → Prof. Rahul H. Meshram, Dept. of Electrical Engineering",
        "topics    → MDPs · dynamic programming · Q-Learning",
        "built     → a Python grid-world comparing planning and model-free learning",
      ],
    },
  ],
  speak:
    "Right now, I'm an undergraduate research intern at IIT Madras, working with Professor Rahul H. Meshram in the Department of Electrical Engineering. I'm studying Markov decision processes, dynamic programming and Q-Learning, and I built a Python grid-world to compare planning with model-free learning.",
};

export const PROJECTS = [
  { id: "signecho", title: "SignEcho", app: { icon: "hand", tone: "sun", line: "Sign language → speech" }, desc: "Real-time sign language to speech and text, powered by a CNN + MediaPipe pipeline and tested with real users in a web app.", tags: ["OpenCV", "PyTorch", "MediaPipe"], award: "Apratim Srajan 2025 · Winner", href: "https://friendly-beignet-24aabc.netlify.app/", linkLabel: "Live demo", source: "https://github.com/Ankitprajapati24/SignEcho", images: ["assets/projects/signecho-cover.jpg"] },
  { id: "archflow", title: "ArchFlow", latest: true, desc: "Describe a software idea in plain English and get structured architecture designs, UML diagrams (ERD, class, sequence, activity, DFD), SQL schemas and a complete SRS document, ready to export as PDF, DOCX, PNG or SQL.", tags: ["AI", "System design", "UML", "Mermaid.js", "SQL"], href: "https://arcflow.codebread.fun", linkLabel: "Visit project", images: ["assets/projects/archflow.jpg", "assets/projects/archflow-2.jpg"], app: { icon: "workflow", tone: "ink" } },
  { id: "backend-pilot", title: "Backend Pilot", desc: "A natural-language prompt becomes a backend: APIs, folder structure, and tests. Built with LLM-powered generation and structured prompt pipelines.", tags: ["LLMs", "Groq API", "Code generation"], href: "https://backendpilot.onrender.com/", linkLabel: "Visit project", images: ["assets/projects/backend-pilot.jpg", "assets/projects/backend-pilot-cover.jpg"], app: { icon: "server", tone: "accent" } },
  { id: "sera", title: "SERA", desc: "Edge AI for power-line safety. Detects high-impedance faults using an LSTM model, with automatic phase isolation and remote monitoring.", tags: ["IoT", "Edge AI", "LSTM"], award: "SIH 2025 · Winner", href: "https://github.com/Ankitprajapati24/sera_dashboard_main.git", linkLabel: "View source", images: ["assets/projects/sera-cover.jpg"], app: { icon: "zap", tone: "ink", line: "Edge AI · Power-line safety" } },
  { id: "eduvote", title: "EduVote", desc: "A digital voting system for student elections, with secure sign-in, role-based access, and real-time election analytics.", tags: ["React", "Node.js", "MongoDB", "Firebase Auth"], href: "https://ewsc-chi.vercel.app/", linkLabel: "Live demo", images: ["assets/projects/election-cover.jpg"], app: { icon: "vote", tone: "sun", line: "Student elections, online" } },
  { id: "saathi", title: "Saathi", desc: "A smart medicine dispenser and health companion: reminders, heartbeat and fall detection, and caregiver alerts. I contributed backend logic and sensor integration.", tags: ["ESP32", "TensorFlow", "Flutter", "Firebase"], href: "https://saathi.flutterflow.app/", linkLabel: "Visit project", images: ["assets/projects/saathi-cover.jpg"], app: { icon: "heart-pulse", tone: "accent", line: "Health companion · IoT" } },
];
export const FEATURED = PROJECTS[0];
export const OTHER_PROJECTS = PROJECTS.slice(1);

export const PROUD = {
  label: "Featured",
  title: "The one I'm proudest of",
  image: "assets/projects/signecho-cover.jpg",
  pipeline: ["Sign", "MediaPipe", "CNN", "Speech + text"],
  speak:
    "The project I'm proudest of is SignEcho. It translates sign language into speech and text in real time. It runs on a CNN and MediaPipe pipeline, I tested it with real users, and it won Apratim Srajan 2025 at IIST Indore.",
};

export const BUILT = {
  label: "Projects",
  title: "More things I've built",
  speak:
    "I've built a few more things too. My latest is ArchFlow: describe a software idea in plain English, and it designs the architecture, draws the UML diagrams, writes the SQL schema and the full SRS document. Backend Pilot turns a plain-English prompt into a backend, with APIs, folder structure and tests. SERA is edge AI for power-line safety that detects high-impedance faults with an LSTM model, and it won Smart India Hackathon 2025. EduVote is a digital voting system for student elections. And on Saathi, a smart medicine dispenser and health companion, I contributed backend logic and sensor integration.",
};

export const ACHIEVEMENTS = {
  label: "Achievements",
  title: "Wins along the way",
  results: [
    { title: "Winner", event: "Smart India Hackathon", place: null, year: "2025", project: "SERA", href: "https://drive.google.com/file/d/1YKdYIWOJF4H6yAqfipCRtujbSSY5QZrv/view?usp=sharing" },
    { title: "Winner", event: "Apratim Srajan", place: "IIST Indore", year: "2025", project: "SignEcho", href: "https://drive.google.com/file/d/1R9o6EwuZOOrk80raAnE0N3ViaA9hMpTP/view?usp=drive_link" },
    { title: "Finalist", event: "Hacksagon", place: "ABV-IIITM Gwalior", year: "2025", href: "https://drive.google.com/drive/folders/1haNkRVWD4txV2-kD69WT6gGzA2aleYr1?usp=drive_link" },
    { title: "Finalist", event: "S&T IISF", place: "IIT Guwahati", year: "2024", href: "https://drive.google.com/file/d/1I2Gldni2k94B1yxdMMZ-XsJxkE3F3mV3/view?usp=sharing" },
    { title: "Runner-up", event: "Cognizance Watch Tower", place: "IIT Roorkee", year: "2023" },
  ],
  speak:
    "Along the way, I've picked up a few wins. I won Smart India Hackathon 2025 with SERA, and Apratim Srajan 2025 at IIST Indore with SignEcho. I was a finalist at Hacksagon at ABV-IIITM Gwalior, and at S and T IISF at IIT Guwahati. And I was runner-up at Cognizance Watch Tower at IIT Roorkee. The certificates are linked right here.",
};

// Latest first.
export const TIMELINE = [
  { org: "IIT Madras", role: "Undergraduate Research Intern", period: "Jul 2026 – Present", note: "Research with Prof. Rahul H. Meshram, Dept. of EE: MDPs, dynamic programming and Q-Learning. Built a Python grid-world to compare planning and model-free learning.", current: true },
  { org: "Klover.AI", role: "AI Engineer · Open Source Contributor", period: "Jan 2025 – Apr 2025", note: "Built multi-agent workflows for automated decision-making and fault recovery. Collaborated remotely on modular, reusable agents and deployable AI pipelines." },
  { org: "Graduating", role: "IIT Madras · BS in Data Science", period: "2027", note: "BS in Data Science from IIT Madras (May 2027), alongside a B.Tech in Computer Science Engineering from IIST Indore (Jun 2027).", future: true },
];

export const EXPERIENCE = {
  label: "Experience",
  title: "Where I've worked",
  // Three sentences: the timeline slides to the next card on each one.
  speak:
    "Right now, I'm a research intern at IIT Madras, working on Markov decision processes, dynamic programming and Q-Learning. Before that, from January to April 2025, I was an AI engineer and open source contributor at Klover AI, building multi-agent workflows for automated decision-making and fault recovery. And in 2027, I graduate with a BS in Data Science from IIT Madras, alongside my B.Tech in Computer Science from IIST Indore.",
};

export const HOW = {
  label: "Behind the scenes",
  title: "How I built this",
  answer:
    "I built this site by voice with Wispr Flow and Emergent, then rebuilt it with Claude Code. It's React with Tailwind, Framer Motion for the animations, Lenis for smooth scrolling, and the browser's Web Speech API, which is the voice you're hearing. The background music streams from live internet radio stations.",
  specs: ["React", "Tailwind", "Framer Motion", "Lenis", "Web Speech API", "Wispr Flow", "Emergent", "Claude Code"],
};

export const CONTACT = {
  label: "Contact",
  title: "Let's build something",
  email: "ankitp2412@gmail.com",
  phone: "+91 73890 18024",
  phoneHref: "+917389018024",
  github: "https://github.com/Ankitprajapati24",
  linkedin: "https://www.linkedin.com/in/ankitprajapati04/",
  resume: "assets/Ankit_Prajapati_Resume.pdf",
  // Web3Forms access key for the "Let's talk" form (free at web3forms.com, made for public sites).
  web3formsKey: "70c679d7-19ee-40e4-814d-e1030a26d649",
  answer: "From an idea to a working product, that's the part I love. I'm open to research, collaborations, and interesting opportunities.",
  speak:
    "From an idea to a working product, that's the part I love. I'm open to research, collaborations and interesting opportunities. Press Let's talk to send me a message. Thanks for stopping by!",
};

// Background music: live internet radio stations (from the public radio-browser.info directory).
// To change a track, swap its url for any station's stream link from radio-browser.info (HTTPS only).
// If a station is offline, the site falls back to music generated in the browser.
export const MUSIC = {
  // Calm, smooth background music only: no party or film songs.
  stations: [
    { id: "lofi", name: "Lo-fi", station: "Lofi 24/7 · chill beats", url: "https://usa9.fastcast4u.com/proxy/jamz?mp=/1" },
    { id: "raaga", name: "Raaga", badge: "IN", station: "Aural Melodics · Indian instrumental", url: "https://stream.zeno.fm/7fmywrmrga0uv" },
    { id: "jazz", name: "Jazz", station: "Coffee Lounge · smooth jazz", url: "https://0nlineradio.radioho.st/lounge-coffee-bar-lounge" },
  ],
  // Spotify playlists shown under "Top on Spotify" (label = tab name).
  // title and image are optional: if left out, they load from Spotify's link preview.
  spotify: [
    { url: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn", label: "Lo-fi", title: "lofi beats", image: "https://i.scdn.co/image/ab67706f00000002266beb50b0032b0f140a749e" },
    { url: "https://open.spotify.com/playlist/37i9dQZF1DX5q67ZpWyRrZ", label: "Indie India", title: "Indie India", image: "https://i.scdn.co/image/ab67706f00000002656f14776fbb39aa2ae900f0" },
    { url: "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT", label: "Jazz", title: "Jazz Vibes", image: "https://i.scdn.co/image/ab67706f00000002b1275110babf9cdaaea44cef" },
  ],
};

// The pet's little speech bubbles.
export const PET = {
  name: "Echo",
  quips: ["Hi! I'm Echo 🐾", "Wheee!", "Catch me!", "Hehe!", "Have you seen SignEcho?", "Psst… press Know about me!", "Scroll more, I'm bored!", "🎵 la la la", "Boop!", "I'm Ankit's buddy!"],
  tickled: ["Hehe! That tickles!", "Again! Again!", "Meow! 😸", "You found me!", "Boop!"],
};

// Order "Know about me" reads in. Ids match section ids on the page.
export const STORY = [
  { id: "hero", speak: HERO.speak },
  { id: "about", speak: ABOUT.answer.join(" ") },
  { id: "stack", speak: STACK.speak },
  { id: "now", speak: NOW.speak },
  { id: "proud", speak: PROUD.speak },
  { id: "projects", speak: BUILT.speak },
  { id: "achievements", speak: ACHIEVEMENTS.speak },
  { id: "experience", speak: EXPERIENCE.speak },
  { id: "how", speak: HOW.answer },
  { id: "contact", speak: CONTACT.speak },
];

// "Ask me anything": visitors ask by voice or text; the best-matching answer is spoken
// in the same recorded voice. Answers use only facts from this page.
// keys: words that point to a topic (more matches = better). section: where to scroll.
export const ASK = {
  suggestions: ["Who are you?", "What are you working on?", "Tell me about SignEcho", "What is ArchFlow?", "What have you won?", "How can I contact you?"],
  topics: [
    { id: "hello", keys: ["hello", "hi", "hey", "namaste", "good morning", "good evening"], section: null,
      answer: "Hey, nice to meet you! Ask me about my projects, my research, my tech stack or my hackathon wins." },
    { id: "about", keys: ["who are you", "about you", "yourself", "introduce", "who is ankit", "tell me about you", "background"], section: "about",
      answer: "I'm Ankit Prajapati. I build across AI, connected devices and full-stack software. I'm pursuing a BS in Data Science at IIT Madras and a B.Tech in Computer Science at IIST Indore." },
    { id: "now", keys: ["working on", "right now", "currently", "research", "intern", "internship", "iit madras", "q-learning", "reinforcement", "mdp", "markov"], section: "now",
      answer: "Right now I'm an undergraduate research intern at IIT Madras, working with Professor Rahul H. Meshram. I'm studying Markov decision processes, dynamic programming and Q-Learning, and I built a Python grid-world to compare planning with model-free learning." },
    { id: "stack", keys: ["stack", "skills", "tech", "language", "languages", "framework", "tools", "python", "react", "pytorch", "know"], section: "stack",
      answer: "My main languages are Python, C and C plus plus, Java, JavaScript and SQL. I build with Flask, Django, FastAPI, React and Node.js, and for machine learning I use PyTorch, TensorFlow, OpenCV and LangChain." },
    { id: "signecho", keys: ["signecho", "sign echo", "sign language", "sign", "deaf", "mediapipe", "proud"], section: "proud",
      answer: "SignEcho translates sign language into speech and text in real time. It runs on a CNN and MediaPipe pipeline, I tested it with real users, and it won Apratim Srajan 2025 at IIST Indore." },
    { id: "archflow", keys: ["archflow", "arch flow", "arc flow", "arcflow", "latest", "system design", "uml", "srs"], section: "projects",
      answer: "ArchFlow is my latest project. You describe a software idea in plain English, and it designs the architecture, draws the UML diagrams, writes the SQL schema and a full SRS document." },
    { id: "backend-pilot", keys: ["backend pilot", "pilot", "generate backend", "code generation", "prompt to backend"], section: "projects",
      answer: "Backend Pilot turns a plain-English prompt into a backend, with APIs, folder structure and tests, using LLM-powered generation." },
    { id: "sera", keys: ["sera", "power line", "power-line", "fault", "smart india", "sih", "lstm", "edge ai"], section: "projects",
      answer: "SERA is edge AI for power-line safety. It detects high-impedance faults with an LSTM model, isolates the phase automatically and supports remote monitoring. It won Smart India Hackathon 2025." },
    { id: "eduvote", keys: ["eduvote", "edu vote", "voting", "vote", "election"], section: "projects",
      answer: "EduVote is a digital voting system for student elections, with secure sign-in, role-based access and real-time election analytics." },
    { id: "saathi", keys: ["saathi", "sathi", "medicine", "health", "dispenser", "fall detection"], section: "projects",
      answer: "Saathi is a smart medicine dispenser and health companion, with reminders, heartbeat and fall detection, and caregiver alerts. I contributed the backend logic and sensor integration." },
    { id: "projects", keys: ["projects", "built", "build", "portfolio of work", "what have you made", "apps"], section: "projects",
      answer: "My favourite is SignEcho, a sign language translator. I've also built ArchFlow, Backend Pilot, SERA, EduVote and Saathi. Tap any project card to see screenshots and live demos." },
    { id: "wins", keys: ["won", "win", "wins", "award", "awards", "hackathon", "hackathons", "achievement", "achievements", "finalist", "prize"], section: "achievements",
      answer: "I won Smart India Hackathon 2025 with SERA and Apratim Srajan 2025 with SignEcho. I was a finalist at Hacksagon at ABV-IIITM Gwalior and at S and T IISF at IIT Guwahati, and runner-up at Cognizance at IIT Roorkee." },
    { id: "experience", keys: ["experience", "work", "worked", "job", "klover", "company", "companies"], section: "experience",
      answer: "I'm currently a research intern at IIT Madras. Before that, from January to April 2025, I was an AI engineer and open source contributor at Klover AI, building multi-agent workflows for decision-making and fault recovery." },
    { id: "education", keys: ["education", "study", "studying", "college", "degree", "university", "graduate", "graduation", "iist", "student"], section: "experience",
      answer: "I'm doing a BS in Data Science at IIT Madras and a B.Tech in Computer Science at IIST Indore. I graduate in 2027." },
    { id: "contact", keys: ["contact", "email", "reach", "hire", "phone", "linkedin", "github", "talk", "connect", "resume"], section: "contact",
      answer: "The easiest way is email, at ankitp2412 at gmail dot com. Or press Let's talk to send me a message right from this page." },
    { id: "how", keys: ["how did you build", "how was this built", "this site", "this website", "voice", "sarvam", "wispr", "made this"], section: "how",
      answer: "I built this site by voice with Wispr Flow and Emergent, then rebuilt it with Claude Code. The voice you're hearing is recorded with Sarvam AI." },
  ],
  fallback: "Good question, but I don't have an answer for that one here. Email me at ankitp2412 at gmail dot com and I'll reply personally.",
};
