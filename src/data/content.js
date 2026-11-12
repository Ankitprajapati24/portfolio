// Shared portfolio copy. Keep visible text, spoken answers, and the resume consistent.
// `title` is the section heading. `speak` is what "Know about me" reads aloud.

export const NAME = "Ankit Prajapati";

export const SURNAME_SCRIPTS = [
  { text: "प्रजापति", lang: "Hindi" },
  { text: "ಪ್ರಜಾಪತಿ", lang: "Kannada" },
  { text: "প্রজাপতি", lang: "Bengali" },
  { text: "ప్రజాపతి", lang: "Telugu" },
  { text: "પ્રજાપતિ", lang: "Gujarati" },
  { text: "Prajapati", lang: "English" },
];

export const HERO = {
  "tagline": "AI engineering · Computer vision · LLM applications",
  "speak": "Hi! Let me tell you a little about myself."
};

export const ABOUT = {
  "label": "About",
  "title": "A bit about me",
  "stickerWords": [
    "voice",
    "vision",
    "edge devices",
    "backends"
  ],
  "answer": [
    "I'm Ankit Prajapati, a computer science and data science student pursuing a B.Tech in Computer Science Engineering at IIST Indore alongside a BS in Data Science at IIT Madras.",
    "I build AI applications and explore how agents learn to make decisions. My work spans computer vision, LLM applications, and reinforcement learning, with a focus on turning ideas into useful software."
  ]
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
  "label": "Stack",
  "title": "What I work with",
  "speak": "I use Python for AI and research experiments, with OpenCV, MediaPipe, PyTorch, and TensorFlow for computer vision and machine learning. I build applications with Flask, FastAPI, Django, React, and Node.js, and use Git and Linux throughout development."
};

export const NOW = {
  "label": "Now",
  "title": "My current research",
  "script": [
    {
      "cmd": "whoami",
      "out": [
        "ankit_prajapati — AI applications · Computer vision · Reinforcement learning",
        "B.Tech CSE, IIST Indore · BS Data Science, IIT Madras"
      ]
    },
    {
      "cmd": "cat now.txt",
      "out": [
        "role      → Undergraduate Research Intern, IIT Madras (Jul 2026 – Dec 2026)",
        "guide     → Prof. Rahul H. Meshram, Dept. of Electrical Engineering",
        "topics    → MDPs · dynamic programming · Safe Q-learning",
        "built     → a Python grid-world comparing planning and model-free learning"
      ]
    }
  ],
  "speak": "I'm an undergraduate research intern at IIT Madras, working with Professor Rahul H. Meshram in the Department of Electrical Engineering. My internship runs from July to December 2026, and my work focuses on dynamic programming and Safe Q-learning for Markov decision processes, using Python grid-world experiments."
};

export const PROJECTS = [
  {
    "id": "signecho",
    "title": "SignEcho",
    "app": {
      "icon": "hand",
      "tone": "sun",
      "line": "Gesture interface · Prototype"
    },
    "desc": "Gesture recognition and speech prototypes built with Python, MediaPipe, and OpenCV, with 79.6% reported model accuracy. The linked ANANTAH web interface demonstrates simulated translation.",
    "tags": [
      "Python",
      "OpenCV",
      "MediaPipe"
    ],
    "award": "Apratim Srajan 2025 · Winner",
    "href": "https://friendly-beignet-24aabc.netlify.app/",
    "linkLabel": "UI prototype (simulated)",
    "images": [
      "assets/projects/signecho-cover.jpg"
    ]
  },
  {
    "id": "archflow",
    "title": "ArchFlow",
    "latest": true,
    "desc": "Turns software requirements into architecture diagrams, SQL schemas, and software requirements documents, with export options for PDF, DOCX, PNG, and SQL.",
    "tags": [
      "AI",
      "System design",
      "UML",
      "Mermaid.js",
      "SQL"
    ],
    "href": "https://arcflow.codebread.fun",
    "linkLabel": "Visit project",
    "images": [
      "assets/projects/archflow.jpg",
      "assets/projects/archflow-2.jpg"
    ],
    "app": {
      "icon": "workflow",
      "tone": "ink"
    }
  },
  {
    "id": "backend-pilot",
    "title": "Backend Pilot",
    "desc": "Generates backend API code, project structure, and tests from natural-language requirements using Groq APIs and structured prompt pipelines.",
    "tags": [
      "LLMs",
      "Groq API",
      "Code generation"
    ],
    "href": "https://backendpilot.onrender.com/",
    "linkLabel": "Visit project",
    "images": [
      "assets/projects/backend-pilot.jpg",
      "assets/projects/backend-pilot-cover.jpg"
    ],
    "app": {
      "icon": "server",
      "tone": "accent"
    }
  },
  {
    "id": "ninja-rider",
    "title": "Ninja Rider",
    "desc": "A 90-second browser game built with Three.js. Ride through a cherry-blossom field, jump hurdles, collect spirit orbs, and slash targets, with an online leaderboard and music generated in code.",
    "tags": [
      "Three.js",
      "WebGL",
      "Web Audio",
      "Netlify Functions",
      "PostgreSQL"
    ],
    "href": "https://games.codebread.fun",
    "linkLabel": "Live demo",
    "images": [
      "assets/projects/ninja-rider-cover.jpg"
    ],
    "app": {
      "icon": "swords",
      "tone": "sun",
      "line": "3D game · Online leaderboard"
    }
  },
  {
    "id": "sera",
    "title": "SERA",
    "desc": "Monitoring dashboard for the SIH-winning SERA power-line safety prototype, with node telemetry and phase-command interfaces. The public snapshot does not include the fault-detection model or physical isolation hardware integration.",
    "tags": [
      "IoT",
      "Edge AI",
      "LSTM"
    ],
    "award": "SIH 2025 · Winner",
    "href": "https://github.com/Ankitprajapati24/sera_dashboard_main",
    "linkLabel": "Dashboard source",
    "images": [
      "assets/projects/sera-cover.jpg"
    ],
    "app": {
      "icon": "zap",
      "tone": "ink",
      "line": "Edge AI · Power-line safety"
    }
  },
  {
    "id": "eduvote",
    "title": "EduVote",
    "desc": "Student election administration prototype with Firebase sign-in, student and candidate management, and Firestore-backed dashboard statistics. The published student voting flow is incomplete.",
    "tags": [
      "React",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions"
    ],
    "href": "https://ewsc-chi.vercel.app/",
    "linkLabel": "Live demo",
    "images": [
      "assets/projects/election-cover.jpg"
    ],
    "app": {
      "icon": "vote",
      "tone": "sun",
      "line": "Election administration · Prototype"
    }
  },
  {
    "id": "saathi",
    "title": "Saathi",
    "desc": "An IoT medicine-dispenser and health-monitoring prototype with reminders, sensor data, and caregiver alerts. I contributed backend logic and sensor integration.",
    "tags": [
      "ESP32",
      "TensorFlow",
      "Flutter",
      "Firebase"
    ],
    "href": "https://saathi.flutterflow.app/",
    "linkLabel": "Visit project",
    "images": [
      "assets/projects/saathi-cover.jpg"
    ],
    "app": {
      "icon": "heart-pulse",
      "tone": "accent",
      "line": "Health companion · IoT"
    }
  },
  {
    "id": "watch-tower",
    "title": "Watch Tower",
    "desc": "A campus-security prototype that reads vehicle number plates using Python, OpenCV, and EasyOCR, with a web interface for the recognition workflow.",
    "tags": [
      "Python",
      "OpenCV",
      "EasyOCR",
      "React",
      "Next.js"
    ],
    "award": "Cognizance, IIT Roorkee · Runner-up",
    "href": "https://colab.research.google.com/drive/1I5jV6qwSMCu3N1rFhje7H3uC7sAwGAhv?usp=sharing",
    "linkLabel": "Visit project",
    "source": "https://github.com/Ankitprajapati24/Watch-Tower-Security-System-for-the-Institute-",
    "images": [
      "assets/projects/watch-tower-cover.jpg"
    ],
    "app": {
      "icon": "cctv",
      "tone": "ink",
      "line": "Number plates · OCR"
    }
  },
  {
    "id": "sahara",
    "title": "SAHARA",
    "desc": "Website for SAHARA, the social welfare society of the IIT Madras BS degree program. It brings together the society's mission, activities, events, and team.",
    "tags": [
      "HTML",
      "Tailwind CSS",
      "JavaScript",
      "Flask",
      "MySQL"
    ],
    "href": "https://sahara-society.github.io/Sahara/",
    "linkLabel": "Visit project",
    "images": [
      "assets/projects/sahara-cover.jpg"
    ],
    "app": {
      "icon": "hand-heart",
      "tone": "accent",
      "line": "Social welfare society"
    }
  },
  {
    "id": "jarvis",
    "title": "Jarvis",
    "desc": "A Python desktop assistant that responds to voice commands, searches Wikipedia, opens websites and applications, plays music, and speaks replies.",
    "tags": [
      "Python",
      "Speech Recognition",
      "pyttsx3",
      "Wikipedia API"
    ],
    "href": "https://github.com/Ankitprajapati24/Jarvis",
    "linkLabel": "View source",
    "images": [
      "assets/projects/jarvis-cover.jpg"
    ],
    "app": {
      "icon": "mic",
      "tone": "ink",
      "line": "Voice assistant · Desktop"
    }
  }
];
export const FEATURED = PROJECTS[0];
export const OTHER_PROJECTS = PROJECTS.slice(1);

export const PROUD = {
  "label": "Featured",
  "title": "A project I care about",
  "image": "assets/projects/signecho-cover.jpg",
  "pipeline": [
    "Camera interface",
    "Simulated translation",
    "Text output"
  ],
  "speak": "SignEcho explores gesture recognition and speech output using Python, MediaPipe, and OpenCV. The reported model accuracy is 79.6 percent. It won Apratim Srajan 2025 at IIST Indore, and the linked web interface demonstrates simulated translation separately."
};

export const BUILT = {
  "label": "Projects",
  "title": "Projects I've built",
  "speak": "My projects explore AI applications, connected devices, and web software. ArchFlow generates architecture diagrams and requirements documents, while Backend Pilot generates backend code. SERA is a power-line monitoring prototype, EduVote supports election administration, and Saathi connects medicine reminders with health monitoring. I also build beyond AI, including Ninja Rider, a browser game, and the website for the SAHARA social welfare society."
};

export const ACHIEVEMENTS = {
  "label": "Achievements",
  "title": "Milestones along the way",
  "results": [
    {
      "title": "Winner",
      "event": "Smart India Hackathon",
      "place": null,
      "year": "2025",
      "project": "SERA",
      "href": "https://drive.google.com/file/d/1YKdYIWOJF4H6yAqfipCRtujbSSY5QZrv/view?usp=sharing"
    },
    {
      "title": "Winner",
      "event": "Apratim Srajan",
      "place": "IIST Indore",
      "year": "2025",
      "project": "SignEcho",
      "href": "https://drive.google.com/file/d/1R9o6EwuZOOrk80raAnE0N3ViaA9hMpTP/view?usp=drive_link"
    },
    {
      "title": "Finalist",
      "event": "Hacksagon",
      "place": "ABV-IIITM Gwalior",
      "year": "2025",
      "href": "https://drive.google.com/drive/folders/1haNkRVWD4txV2-kD69WT6gGzA2aleYr1?usp=drive_link"
    },
    {
      "title": "Finalist",
      "event": "S&T IISF",
      "place": "IIT Guwahati",
      "year": "2024",
      "href": "https://drive.google.com/file/d/1I2Gldni2k94B1yxdMMZ-XsJxkE3F3mV3/view?usp=sharing"
    },
    {
      "title": "Runner-up",
      "event": "Cognizance Watch Tower",
      "place": "IIT Roorkee",
      "year": "2023"
    }
  ],
  "speak": "I won Smart India Hackathon 2025 with SERA and Apratim Srajan 2025 at IIST Indore with SignEcho. I was a finalist at Hacksagon at ABV-IIITM Gwalior and at S and T IISF at IIT Guwahati. I was also runner-up at Cognizance Watch Tower at IIT Roorkee. Several certificates are linked here."
};

// Latest first.
export const TIMELINE = [
  {
    "org": "IIT Madras",
    "role": "Undergraduate Research Intern",
    "period": "Jul 2026 – Dec 2026",
    "note": "Working with Prof. Rahul H. Meshram in the Department of Electrical Engineering on dynamic programming and Safe Q-learning for Markov decision processes. Built Python grid-world experiments to compare planning and model-free learning.",
    "current": true
  },
  {
    "org": "Klover.AI",
    "role": "AI Engineer Intern",
    "period": "Jan 2025 – Apr 2025",
    "note": "Contributed AI agent prototypes to Klover's open-source initiative through team meetings and iterative development assignments."
  },
  {
    "org": "Graduating",
    "role": "IIST Indore · B.Tech in Computer Science Engineering",
    "period": "2023 – 2027",
    "note": "Expected to complete a B.Tech in Computer Science Engineering at IIST Indore in June 2027.",
    "future": true
  }
];

export const EXPERIENCE = {
  "label": "Experience",
  "title": "Research and experience",
  "speak": "I'm currently an undergraduate research intern at IIT Madras, working on dynamic programming and Safe Q-learning. From January to April 2025, I was an AI engineer intern at Klover AI, contributing AI agent prototypes through team meetings and iterative assignments. I expect to complete my B.Tech in Computer Science Engineering at IIST Indore and BS in Data Science at IIT Madras in 2027."
};

export const HOW = {
  "label": "Behind the scenes",
  "title": "How I built this",
  "answer": "I built this portfolio with React and Tailwind CSS, using Framer Motion for animations and Lenis for smooth scrolling. Narration uses generated voice recordings, with browser speech synthesis as a fallback. Music is available through internet radio and Spotify.",
  "specs": [
    "React",
    "Tailwind",
    "Framer Motion",
    "Lenis",
    "Web Speech API",
    "Wispr Flow",
    "Emergent"
  ]
};

export const PLAY = {
  "label": "Play",
  "title": "Take a quick break",
  "intro": "Take a break with a game. Best scores for the mini games stay in this browser, and Echo cheers when you beat them. Ninja Rider has its own online leaderboard.",
  "speak": "Try a quick game: squash bugs, match the cards from my tech stack, or identify the Indian scripts used in my surname. For a longer challenge, ride, jump, and slash in Ninja Rider.",
  "games": [
    {
      "id": "ninja",
      "name": "Ninja Rider",
      "blurb": "Ride, jump and slash for 90 seconds. Online leaderboard."
    },
    {
      "id": "bugs",
      "name": "Bug Squash",
      "blurb": "Squash bugs before the deploy. Don't touch my coffee."
    },
    {
      "id": "match",
      "name": "Stack Match",
      "blurb": "Flip the cards and pair up my tech stack."
    },
    {
      "id": "scripts",
      "name": "Name in Scripts",
      "blurb": "My surname in six Indian scripts. Can you tell them apart?"
    }
  ]
};

export const CONTACT = {
  "label": "Contact",
  "title": "Let's work together",
  "email": "ankitp2412@gmail.com",
  "phone": "+91 7389018024",
  "phoneHref": "+917389018024",
  "github": "https://github.com/Ankitprajapati24",
  "linkedin": "https://www.linkedin.com/in/ankitprajapati04/",
  "resume": "assets/Ankit_Prajapati_Resume.pdf",
  "web3formsKey": "70c679d7-19ee-40e4-814d-e1030a26d649",
  "answer": "I'm open to AI engineering opportunities, research collaborations, and projects where I can build and learn with a team. If my work fits what you're doing, I'd like to hear from you.",
  "speak": "I'm open to AI engineering opportunities, research collaborations, and projects where I can build and learn with a team. If my work fits what you're doing, I'd like to hear from you. Email me, connect on LinkedIn, or use the Let's talk form. Thanks for visiting."
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
  { id: "play", speak: PLAY.speak },
  { id: "contact", speak: CONTACT.speak },
];

// "Ask me anything": visitors ask by voice or text; the best-matching answer is spoken
// in the same recorded voice. Answers use only facts from this page.
// keys: words that point to a topic (more matches = better). section: where to scroll.
export const ASK = {
  "suggestions": [
    "What do you build?",
    "Tell me about your research",
    "What is SignEcho?",
    "What is ArchFlow?",
    "What have you won?",
    "How can I contact you?"
  ],
  "topics": [
    {
      "id": "hello",
      "keys": [
        "hello",
        "hi",
        "hey",
        "namaste",
        "good morning",
        "good evening"
      ],
      "section": null,
      "answer": "Hi, I'm Ankit. Ask me about my AI projects, research, technical skills, or hackathon work."
    },
    {
      "id": "about",
      "keys": [
        "who are you",
        "about you",
        "yourself",
        "introduce",
        "who is ankit",
        "tell me about you",
        "background"
      ],
      "section": "about",
      "answer": "I'm Ankit Prajapati, a computer science and data science student pursuing a B.Tech in Computer Science Engineering at IIST Indore alongside a BS in Data Science at IIT Madras. I build AI applications and explore how agents learn to make decisions. My work spans computer vision, LLM applications, and reinforcement learning, with a focus on turning ideas into useful software."
    },
    {
      "id": "now",
      "keys": [
        "working on",
        "right now",
        "currently",
        "research",
        "intern",
        "internship",
        "iit madras",
        "q-learning",
        "reinforcement",
        "mdp",
        "markov",
        "safe q-learning",
        "safe q learning"
      ],
      "section": "now",
      "answer": "I'm an undergraduate research intern at IIT Madras, working with Professor Rahul H. Meshram in the Department of Electrical Engineering. My internship runs from July to December 2026, and my work focuses on dynamic programming and Safe Q-learning for Markov decision processes, using Python grid-world experiments."
    },
    {
      "id": "stack",
      "keys": [
        "stack",
        "skills",
        "tech",
        "language",
        "languages",
        "framework",
        "tools",
        "python",
        "react",
        "pytorch",
        "know"
      ],
      "section": "stack",
      "answer": "I use Python for AI and research experiments, with OpenCV, MediaPipe, PyTorch, and TensorFlow for computer vision and machine learning. I build applications with Flask, FastAPI, Django, React, and Node.js, and use Git and Linux throughout development."
    },
    {
      "id": "signecho",
      "keys": [
        "signecho",
        "sign echo",
        "sign language",
        "sign",
        "deaf",
        "mediapipe",
        "proud"
      ],
      "section": "proud",
      "answer": "SignEcho explores gesture recognition and speech output using Python, MediaPipe, and OpenCV. The reported model accuracy is 79.6 percent. It won Apratim Srajan 2025 at IIST Indore, and the linked web interface demonstrates simulated translation separately."
    },
    {
      "id": "archflow",
      "keys": [
        "archflow",
        "arch flow",
        "arc flow",
        "arcflow",
        "latest",
        "system design",
        "uml",
        "srs"
      ],
      "section": "projects",
      "answer": "ArchFlow turns a software idea into architecture diagrams, SQL schemas, and a software requirements document. It supports exports including PDF, DOCX, PNG, and SQL."
    },
    {
      "id": "backend-pilot",
      "keys": [
        "backend pilot",
        "pilot",
        "generate backend",
        "code generation",
        "prompt to backend"
      ],
      "section": "projects",
      "answer": "Backend Pilot uses Groq APIs and structured prompt pipelines to generate backend API code, project structure, and tests from natural-language requirements."
    },
    {
      "id": "sera",
      "keys": [
        "sera",
        "power line",
        "power-line",
        "fault",
        "smart india",
        "sih",
        "lstm",
        "edge ai"
      ],
      "section": "projects",
      "answer": "SERA is a power-line monitoring prototype that won Smart India Hackathon 2025 for KSEBL. The public repository contains the Flask dashboard and telemetry interfaces; model and physical isolation integration are not included in that snapshot."
    },
    {
      "id": "eduvote",
      "keys": [
        "eduvote",
        "edu vote",
        "voting",
        "vote",
        "election"
      ],
      "section": "projects",
      "answer": "EduVote is a student election administration prototype built with React, Firebase Authentication, and Firestore. It includes administration pages and dashboard statistics, while the published student voting flow is incomplete."
    },
    {
      "id": "saathi",
      "keys": [
        "saathi",
        "sathi",
        "medicine",
        "health",
        "dispenser",
        "fall detection"
      ],
      "section": "projects",
      "answer": "Saathi is an IoT medicine-dispenser and health-monitoring prototype with reminders, sensor data, and caregiver alerts. I contributed backend logic and sensor integration."
    },
    {
      "id": "projects",
      "keys": [
        "projects",
        "built",
        "build",
        "portfolio of work",
        "what have you made",
        "apps"
      ],
      "section": "projects",
      "answer": "My projects cover computer vision, LLM applications, connected devices, and web software. SignEcho explores gesture recognition, Backend Pilot generates backend code, and SERA monitors power-line telemetry. Open a project card for its description, screenshots, and source or demonstration link."
    },
    {
      "id": "ninja-rider",
      "keys": [
        "ninja rider",
        "ninja",
        "horse",
        "3d game",
        "three js",
        "threejs",
        "leaderboard"
      ],
      "section": "play",
      "answer": "Ninja Rider is a browser game I built with Three.js. You have 90 seconds to ride, jump hurdles, collect spirit orbs, and slash targets, with scores on an online leaderboard. Try it in the Play section."
    },
    {
      "id": "watch-tower",
      "keys": [
        "watch tower",
        "watchtower",
        "number plate",
        "license plate",
        "licence plate",
        "ocr",
        "cognizance",
        "security"
      ],
      "section": "projects",
      "answer": "Watch Tower uses Python, OpenCV, and EasyOCR to read vehicle number plates for campus security. The project was runner-up at Cognizance, IIT Roorkee."
    },
    {
      "id": "sahara",
      "keys": [
        "sahara",
        "social welfare",
        "society",
        "ngo",
        "volunteer"
      ],
      "section": "projects",
      "answer": "I built the website for SAHARA, the social welfare society of the IIT Madras BS degree program. It shares the society's mission, activities, events, and team."
    },
    {
      "id": "jarvis",
      "keys": [
        "jarvis",
        "voice assistant",
        "desktop assistant",
        "assistant"
      ],
      "section": "projects",
      "answer": "Jarvis is a Python desktop assistant controlled by voice. It searches Wikipedia, opens websites and applications, plays music, tells the time, and speaks its replies."
    },
    {
      "id": "wins",
      "keys": [
        "won",
        "win",
        "wins",
        "award",
        "awards",
        "hackathon",
        "hackathons",
        "achievement",
        "achievements",
        "finalist",
        "prize"
      ],
      "section": "achievements",
      "answer": "I won Smart India Hackathon 2025 with SERA and Apratim Srajan 2025 with SignEcho. I was also a finalist at Hacksagon and S and T IISF, and runner-up at Cognizance, IIT Roorkee. Several certificates are linked in the achievements section."
    },
    {
      "id": "experience",
      "keys": [
        "experience",
        "work",
        "worked",
        "job",
        "klover",
        "company",
        "companies"
      ],
      "section": "experience",
      "answer": "I'm currently an undergraduate research intern at IIT Madras, working on dynamic programming and Safe Q-learning. From January to April 2025, I was an AI engineer intern at Klover AI, contributing AI agent prototypes through team meetings and iterative assignments."
    },
    {
      "id": "education",
      "keys": [
        "education",
        "study",
        "studying",
        "college",
        "degree",
        "university",
        "graduate",
        "graduation",
        "iist",
        "student"
      ],
      "section": "experience",
      "answer": "I'm pursuing a B.Tech in Computer Science Engineering at IIST Indore alongside a BS in Data Science at IIT Madras. My expected graduation is in 2027."
    },
    {
      "id": "contact",
      "keys": [
        "contact",
        "email",
        "reach",
        "hire",
        "phone",
        "linkedin",
        "github",
        "talk",
        "connect",
        "resume"
      ],
      "section": "contact",
      "answer": "You can email me at ankitp2412 at gmail dot com, connect on LinkedIn, or use the Let's talk form. My resume is linked on this page."
    },
    {
      "id": "blog",
      "keys": [
        "blog",
        "blogs",
        "vlog",
        "vlogs",
        "write",
        "writing",
        "articles",
        "posts",
        "videos"
      ],
      "section": null,
      "answer": "My blog covers the things I build and learn along the way. Open Blog at the top of the page to read the available posts."
    },
    {
      "id": "play",
      "keys": [
        "game",
        "games",
        "play",
        "fun",
        "bored",
        "bug squash",
        "memory game",
        "quiz"
      ],
      "section": "play",
      "answer": "Try a quick game: squash bugs, match the cards from my tech stack, or identify the Indian scripts used in my surname. For a longer challenge, ride, jump, and slash in Ninja Rider."
    },
    {
      "id": "how",
      "keys": [
        "how did you build",
        "how was this built",
        "this site",
        "this website",
        "voice",
        "sarvam",
        "wispr",
        "made this"
      ],
      "section": "how",
      "answer": "I built this portfolio with React and Tailwind CSS, using Framer Motion for animations and Lenis for smooth scrolling. Narration uses generated voice recordings, with browser speech synthesis as a fallback. Music is available through internet radio and Spotify."
    }
  ],
  "fallback": "I don't have a prepared answer to that question. You can email me at ankitp2412 at gmail dot com."
};
