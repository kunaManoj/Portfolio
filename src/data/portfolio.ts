export type Category = "language" | "framework" | "stack";

export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  language: { label: "Languages", color: "#fcb64b" },
  framework: { label: "Frameworks", color: "#2dd4bf" },
  stack: { label: "Databases & Tools", color: "#8fb3ff" },
};

export interface Skill {
  id: string;
  code: string;
  label: string;
  category: Category;
  blurb: string;
}

export const SKILLS: Record<string, Skill> = {
  c: { id: "c", code: "C", label: "C", category: "language", blurb: "The bedrock — pointers, memory layout and everything happening under the hood." },
  cpp: { id: "cpp", code: "C++", label: "C++", category: "language", blurb: "Weapon of choice for competitive programming and the DSA grind on LeetCode." },
  py: { id: "py", code: "PY", label: "Python", category: "language", blurb: "From EEG deep-learning pipelines in research to quick automation scripts." },
  java: { id: "java", code: "JAVA", label: "Java", category: "language", blurb: "OOP-heavy coursework, Android experiments and JVM fundamentals." },
  js: { id: "js", code: "JS", label: "JavaScript", category: "language", blurb: "The lingua franca — async patterns, the event loop and everything between." },
  ts: { id: "ts", code: "TS", label: "TypeScript", category: "language", blurb: "Typed safety nets across React frontends and gRPC-backed services." },
  sql: { id: "sql", code: "SQL", label: "SQL", category: "language", blurb: "Query tuning, joins and schema design that survives real traffic." },
  go: { id: "go", code: "GO", label: "Golang", category: "language", blurb: "Concurrent microservices over gRPC — forged during the One Assure internship." },
  html: { id: "html", code: "HTML", label: "HTML", category: "language", blurb: "Semantic, accessible markup — the skeleton of everything I ship." },
  css: { id: "css", code: "CSS", label: "CSS", category: "language", blurb: "From raw keyframes to Tailwind utility orchestration and 3D transforms." },

  react: { id: "react", code: "REACT", label: "React", category: "framework", blurb: "Component architecture, hooks and the beating heart of my frontend stack." },
  next: { id: "next", code: "NEXT", label: "Next.js", category: "framework", blurb: "App Router, SSR/SSG and production deploys on Vercel." },
  node: { id: "node", code: "NODE", label: "Node.js", category: "framework", blurb: "Event-driven APIs, realtime Socket.io servers and worker queues." },
  exp: { id: "exp", code: "EXPR", label: "Express", category: "framework", blurb: "Lean REST layers with clean middleware pipelines." },
  django: { id: "django", code: "DJNG", label: "Django", category: "framework", blurb: "Powered Fusion — the college ERP serving hundreds of students on PostgreSQL." },
  tw: { id: "tw", code: "TWND", label: "Tailwind CSS", category: "framework", blurb: "Design systems at utility speed — this very page included." },
  three: { id: "three", code: "THREE", label: "Three.js", category: "framework", blurb: "WebGL scenes and the spark behind this space-themed portfolio." },
  zustand: { id: "zustand", code: "ZUST", label: "Zustand", category: "framework", blurb: "Tiny stores, zero boilerplate — global state without the ceremony." },
  recharts: { id: "recharts", code: "RCHT", label: "Recharts", category: "framework", blurb: "Interactive dashboards that make numbers actually legible." },

  mysql: { id: "mysql", code: "MYSQL", label: "MySQL", category: "stack", blurb: "Relational workhorse for transactional client projects." },
  pg: { id: "pg", code: "PGRS", label: "PostgreSQL", category: "stack", blurb: "From ERP modules to Supabase backends — my default relational store." },
  mongo: { id: "mongo", code: "MONGO", label: "MongoDB", category: "stack", blurb: "Flexible document models behind SkillShare and MeritMaze." },
  docker: { id: "docker", code: "DOCKR", label: "Docker", category: "stack", blurb: "Containerised services that run the same everywhere." },
  git: { id: "git", code: "GIT", label: "Git", category: "stack", blurb: "Disciplined branching, clean history, fearless rebases." },
  gh: { id: "gh", code: "GTHB", label: "GitHub", category: "stack", blurb: "Actions-powered CI/CD pipelines shipping on every push." },
  postman: { id: "postman", code: "POSTM", label: "Postman", category: "stack", blurb: "Contract-first API design with collections that double as docs." },
  anaconda: { id: "anaconda", code: "CNDA", label: "Anaconda", category: "stack", blurb: "Conda environments for reproducible ML and data-science research." },
  vscode: { id: "vscode", code: "VSCD", label: "VS Code", category: "stack", blurb: "The cockpit — extensions, keymaps and debug sessions that fly." },
  android: { id: "android", code: "ANDR", label: "Android Studio", category: "stack", blurb: "Where the malware-detection research met real APK sandboxes." },
};

export const KEY_ROWS: string[][] = [
  ["c", "cpp", "py", "java", "js", "ts", "sql", "go", "html", "css"],
  ["react", "next", "node", "exp", "django", "tw", "three", "zustand", "recharts"],
  ["mysql", "pg", "mongo", "docker", "git", "gh", "postman", "anaconda", "vscode", "android"],
];

/** Physical QWERTY rows map 1:1 onto the deck rows */
export const QWERTY_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

export const MARQUEE_ITEMS = [
  "React", "TypeScript", "Golang", "Node.js", "Next.js", "MongoDB",
  "PostgreSQL", "Docker", "Three.js", "Django", "Tailwind", "Supabase",
  "Socket.io", "gRPC", "Python",
];

export const SOFT_SKILLS = [
  "Team Collaboration",
  "Analytical Thinking",
  "Quick Adaptability",
  "Communication Skills",
  "Problem Solving",
];

export const COURSEWORK = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Computer Networks",
  "System Design",
  "Data Science",
  "OOPs in Java",
  "Operating Systems",
  "Machine Learning",
];

export const VOLUNTEER = {
  org: "Jagrati — Community Volunteer",
  text: "Active volunteer mentoring rural students (grades 3–10) and preparing them for exams like Navodaya — educational outreach beyond the terminal.",
};

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  tag: string;
  link?: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "One Assure",
    role: "Software Development Intern",
    period: "May 2026 — Jul 2026",
    tag: "InsurTech",
    bullets: [
      "Developed end-to-end quoteless & quoted insurance workflows for Health and Term Insurance using TypeScript and Golang, with multi-step flows over gRPC-based service communication.",
      "Implemented MFA-based proposal confirmation via OTP verification — Kaleyra integration with database-backed generation and validation.",
      "Built proposal submission and status-tracking across the full application lifecycle; enhanced quoted flows for sharper quote selection.",
    ],
  },
  {
    company: "Nexa Solutions LLC",
    role: "Full Stack Developer Intern",
    period: "Jan 2026 — Mar 2026",
    tag: "Client Work",
    bullets: [
      "Designed and built responsive full-stack websites for 5+ clients across industries with React.js, Node.js and MongoDB — owning the lifecycle from requirement gathering to deployment.",
      "Cut average page load time by 30% through code-splitting and asset optimisation while resolving 40+ bugs on live client sites.",
    ],
  },
  {
    company: "Fusion — ERP Portal of College",
    role: "Core Contributor",
    period: "Aug 2024 — May 2025",
    tag: "Campus · Open Source",
    link: "https://fusion.iiitdmj.ac.in/",
    bullets: [
      "Architected a scalable ERP system supporting 500+ students, streamlining academic and administrative workflows on ReactJS, Django and PostgreSQL.",
      "Implemented an Inventory Management module automating asset lifecycle tracking and improving resource visibility.",
    ],
  },
];

export interface ResearchItem {
  title: string;
  period: string;
  viz: "eeg" | "radar";
  badge: string;
  stats: { v: string; l: string }[];
  bullets: string[];
}

export const RESEARCH: ResearchItem[] = [
  {
    title: "Schizophrenia Detection using EEG Signals",
    period: "Aug 2024 — Aug 2025",
    viz: "eeg",
    badge: "Submitted to IEEE",
    stats: [
      { v: "92%", l: "subject-dependent acc." },
      { v: "85%", l: "subject-independent acc." },
      { v: "+14%", l: "vs conventional CNNs" },
    ],
    bullets: [
      "Developed an attention-enhanced deep learning model (SEBlock · CBAM · ECA) for schizophrenia detection from EEG signals.",
      "Converted EEG signals into scalograms and spectrograms, beating conventional CNN baselines by 14% in classification accuracy.",
    ],
  },
  {
    title: "Android Malware Detection — Dynamic Analysis + ML",
    period: "Aug 2024 — Apr 2025",
    viz: "radar",
    badge: "Deployable framework",
    stats: [
      { v: "76%", l: "detection accuracy" },
      { v: "2×", l: "analysis paradigms benchmarked" },
      { v: "1", l: "behavior-based framework shipped" },
    ],
    bullets: [
      "Systematically evaluated dynamic vs. static analysis techniques on a standardized benchmark.",
      "Translated findings into a deployable behavior-based detection framework for Android ecosystems.",
    ],
  },
];

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  image: string;
  url: string;
  year: string;
  tech: string[];
  bullets: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "careerhub",
    index: "01",
    name: "CareerHub",
    tagline: "Full-cycle job portal — publish, browse, filter, save & apply.",
    image: "/projects/careerhub.png",
    url: "https://careerhub-eight.vercel.app/",
    year: "Aug 2026",
    tech: ["React", "TypeScript", "Supabase", "Vercel", "GitHub Actions"],
    bullets: [
      "Full-featured job portal where employers publish openings and candidates browse, filter, save and apply through a live database-driven workflow.",
      "Complete recruitment lifecycle — job posting, application submission, status tracking, resume-based matching and CI/CD-automated production deploys.",
    ],
  },
  {
    id: "skillshare",
    index: "02",
    name: "SkillShare",
    tagline: "MERN skill marketplace with live video, chat & payments.",
    image: "/projects/skillshare.png",
    url: "https://skill-share-flame.vercel.app/",
    year: "Jan 2026",
    tech: ["MERN", "Clerk", "Socket.io", "ZegoCloud", "RazorPay"],
    bullets: [
      "Full-stack marketplace with Clerk authentication, secure RazorPay processing, wallet integration and end-to-end booking workflows.",
      "Real-time chat plus peer-to-peer video on Socket.io and ZEGOCLOUD — low-latency messaging with reliable session management.",
    ],
  },
  {
    id: "finance",
    index: "03",
    name: "Finance Dashboard",
    tagline: "Drag-and-drop market analytics — widgets, charts & themes.",
    image: "/projects/finance.png",
    url: "https://finances-rosy-five.vercel.app/",
    year: "Jan 2026",
    tech: ["Next.js", "Tailwind CSS", "Zustand", "Recharts"],
    bullets: [
      "Responsive financial analytics dashboard with a drag-and-drop interface for customizable stock and market monitoring.",
      "Global state via Zustand and interactive Recharts visualizations supporting real-time data updates and dark/light themes.",
    ],
  },
  {
    id: "meritmaze",
    index: "04",
    name: "MeritMaze",
    tagline: "Collaborative learning — study rooms, notes, forums & AI.",
    image: "/projects/meritmaze.png",
    url: "https://pr-five-green.vercel.app/",
    year: "Mar 2025",
    tech: ["ReactJS", "NodeJS", "MongoDB", "OAuth", "Vercel", "Render"],
    bullets: [
      "Collaborative learning platform with group study rooms, smart note-taking, community forums and real-time progress tracking.",
      "AI chatbot and adaptive quiz engine on the Gemini API for personalised learning and engagement.",
    ],
  },
];

export const SOCIALS = [
  { id: "github", label: "GitHub", handle: "@kunaManoj", href: "https://github.com/kunaManoj" },
  { id: "linkedin", label: "LinkedIn", handle: "kuna-manoj", href: "https://www.linkedin.com/in/kuna-manoj-72444625b" },
  { id: "leetcode", label: "LeetCode", handle: "Coder033", href: "https://leetcode.com/u/Coder033/" },
];

export const EMAIL = "manojkuna2005@gmail.com";
export const PHONE = "+91 90145 47622";
export const PHONE_HREF = "tel:+919014547622";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kuna-manoj-72444625b";
export const GITHUB_URL = "https://github.com/kunaManoj";
export const PORTFOLIO_URL = "https://portfolio-iota-plum-45.vercel.app/";

export const NAV_ITEMS = [
  { id: "skills", label: "Skill Deck" },
  { id: "experience", label: "Trajectory" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
