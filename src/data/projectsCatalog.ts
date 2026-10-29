import type { InterestArea, CodingLevel, StudentGoal, ProjectRecommendation } from '../types';

export const PROJECTS_CATALOG: ProjectRecommendation[] = [
  // 1. Productivity & Personal Assistants
  {
    id: 'proj_task_assistant',
    title: 'Personal AI Task & Schedule Assistant',
    tag: 'Productivity AI',
    interestMatch: 'productivity',
    minCodingLevel: 'beginner',
    difficulty: 'Beginner',
    timeToPrototype: '45-60 mins',
    shortDesc:
      'A natural-language command runner that converts messy daily thoughts into structured to-do items with priorities and calendar blocks.',
    matchReason:
      'Matches your interest in personal productivity and gives you a tangible tool you will use every day during placement preparation.',
    implementationSteps: [
      'Parse conversational text inputs using structured JSON extraction prompts.',
      'Map extracted tasks into a clean local SQLite or browser state with due dates.',
      'Connect a 1-click export to Google Calendar or Notion markdown.',
    ],
    suggestedTech: ['Python / TypeScript', 'FastAPI or Express', 'OpenAI/Gemini API', 'Tailwind UI'],
    learningOutcomes: [
      'Prompt structuring and deterministic JSON output parsing',
      'State management for conversational task trackers',
      'Building utility micro-apps with zero server maintenance',
    ],
    portfolioExtension:
      'Add voice-to-text input via browser Web Speech API and automatic WhatsApp summary alerts.',
    shareHook: 'I just generated my AI Project Passport: "Personal AI Task Assistant"! Building my first AI project in 60 minutes.',
  },
  {
    id: 'proj_email_copilot',
    title: 'Smart Placement Email & Cover Letter Copilot',
    tag: 'Productivity AI',
    interestMatch: 'productivity',
    minCodingLevel: 'basics',
    difficulty: 'Intermediate',
    timeToPrototype: '60 mins',
    shortDesc:
      'An intelligent drafting tool that ingests job descriptions and candidate skills to tailor personalized cold emails and cover letters.',
    matchReason:
      'Directly solves your placement application fatigue by generating hyper-targeted outreach drafts with high response potential.',
    implementationSteps: [
      'Extract key recruiter requirements from pasted job descriptions using semantic filtering.',
      'Match candidate project keywords against required skills.',
      'Generate 3 tone variants (Formal, Enthusiastic, Founder-direct) ready for clipboard copy.',
    ],
    suggestedTech: ['React', 'Node.js', 'LLM Prompt Engineering', 'Zod Schema Validation'],
    learningOutcomes: [
      'Context stuffing techniques and token budget management',
      'Dynamic template synthesis for employment outreach',
      'Client-side clipboard interactions and rich text styling',
    ],
    portfolioExtension:
      'Integrate LinkedIn public profile parsing to auto-personalize the recipient opener.',
    shareHook: 'I got matched with the "Smart Placement Email Copilot" on Project Launchpad! Ready to build in 60 mins.',
  },

  // 2. Computer Vision & Image Understanding
  {
    id: 'proj_visual_finder',
    title: 'Visual Object Finder & Campus Asset Tagger',
    tag: 'Computer Vision',
    interestMatch: 'computervision',
    minCodingLevel: 'beginner',
    difficulty: 'Beginner',
    timeToPrototype: '50-60 mins',
    shortDesc:
      'An in-browser vision app that identifies everyday engineering lab equipment, components, and tools using live webcam or uploaded images.',
    matchReason:
      'Gives you instant visual feedback and practical exposure to modern vision models without complex GPU setup.',
    implementationSteps: [
      'Capture video frames or uploaded photos via HTML5 Canvas API.',
      'Send image data (Base64) to a multi-modal vision endpoint for bounding box tags.',
      'Render interactive bounding boxes and safety guidelines directly on top of the image.',
    ],
    suggestedTech: ['JavaScript / Python', 'HTML5 Canvas', 'Vision API (Gemini/CLIP)', 'Vite'],
    learningOutcomes: [
      'Multi-modal prompt construction with images',
      'Client-side image compression and canvas overlay mathematics',
      'Handling visual inference latency with graceful optimistic UI',
    ],
    portfolioExtension:
      'Add component pricing lookup and PDF datasheet generation for detected lab components.',
    shareHook: 'Check out my AI Project Passport: "Visual Object Finder"! Excited for NxtWave\'s 60-minute workshop.',
  },
  {
    id: 'proj_smart_attendance',
    title: 'Automated Face & Badge Recognition Attendance System',
    tag: 'Computer Vision',
    interestMatch: 'computervision',
    minCodingLevel: 'basics',
    difficulty: 'Intermediate',
    timeToPrototype: '60 mins',
    shortDesc:
      'A classroom or lab attendance logging tool that recognizes student face embeddings or college ID badges and updates a live ledger.',
    matchReason:
      'Perfect for final-year project exhibitions with clear hardware-software integration and undeniable real-world utility.',
    implementationSteps: [
      'Extract lightweight face embedding vectors using client-side models.',
      'Compare euclidean distance against a pre-registered student vector index.',
      'Log time-stamped attendance records into a tamper-evident audit spreadsheet.',
    ],
    suggestedTech: ['Python / OpenCV', 'Face-API.js', 'SQLite / Google Sheets API'],
    learningOutcomes: [
      'Vector embeddings and cosine similarity thresholds',
      'Camera stream processing and privacy-first local processing',
      'Preventing spoofing with basic blink or motion verification',
    ],
    portfolioExtension:
      'Add automatic email alerts to students with attendance percentages below 75%.',
    shareHook: 'Building a "Smart Attendance Face Tagger" project blueprint with NxtWave! Here is my Project Passport.',
  },

  // 3. Education & Learning
  {
    id: 'proj_study_buddy',
    title: 'AI Exam Prep Study Buddy & Flashcard Engine',
    tag: 'EdTech AI',
    interestMatch: 'education',
    minCodingLevel: 'beginner',
    difficulty: 'Beginner',
    timeToPrototype: '45-60 mins',
    shortDesc:
      'Converts dense engineering textbook chapters or lecture PDFs into spaced-repetition flashcards and interactive quiz questions.',
    matchReason:
      'Directly assists your semester exams while demonstrating how Retrieval-Augmented Generation (RAG) simplifies academic comprehension.',
    implementationSteps: [
      'Chunk textbook notes into 500-token paragraphs using text splitting.',
      'Generate multiple-choice questions with automated explanations for incorrect options.',
      'Track student accuracy over time using Leitner spaced-repetition logic.',
    ],
    suggestedTech: ['React', 'TypeScript', 'LangChain / Simple RAG', 'Local Storage'],
    learningOutcomes: [
      'Text chunking strategies and semantic retrieval',
      'Designing self-grading educational feedback loops',
      'Gamification techniques with micro-streak trackers',
    ],
    portfolioExtension:
      'Enable speech-based oral viva testing where the AI tests you orally before your lab exams.',
    shareHook: 'My Project Passport: "AI Exam Prep Study Buddy"! Building real AI projects in 60 minutes with NxtWave.',
  },
  {
    id: 'proj_code_explainer',
    title: 'Code Concept Visualizer & DSA Walkthrough Bot',
    tag: 'EdTech AI',
    interestMatch: 'education',
    minCodingLevel: 'basics',
    difficulty: 'Intermediate',
    timeToPrototype: '60 mins',
    shortDesc:
      'Transforms complex algorithms (Recursion, Dynamic Programming, Graphs) into step-by-step visual ASCII/SVG traces with memory states.',
    matchReason:
      'Solidifies your own Data Structures and Algorithms foundation while giving you an exceptional talking point in technical interviews.',
    implementationSteps: [
      'Parse code snippets to identify pointer movements and variable reassignments.',
      'Synthesize step-by-step execution frames as structured state arrays.',
      'Render animated memory stack diagrams in an interactive step-through viewer.',
    ],
    suggestedTech: ['React', 'Monaco Code Editor', 'Mermaid.js / SVG rendering', 'TypeScript'],
    learningOutcomes: [
      'Abstract Syntax Tree (AST) basics and code representation',
      'Translating textual explanations into visual state machines',
      'Interview communication skills for algorithm explanation',
    ],
    portfolioExtension:
      'Add Big-O time and space complexity benchmarking against actual runtime execution.',
    shareHook: 'I just generated my AI Project Passport: "Code Concept Visualizer"! Check it out.',
  },

  // 4. Business & Customer Support
  {
    id: 'proj_support_bot',
    title: 'Domain-Trained Customer Query Support Assistant',
    tag: 'Conversational AI',
    interestMatch: 'business',
    minCodingLevel: 'beginner',
    difficulty: 'Beginner',
    timeToPrototype: '45 mins',
    shortDesc:
      'An intelligent FAQ bot that handles customer complaints, returns, and FAQs using a customized business knowledge base.',
    matchReason:
      'Every startup and enterprise needs customer support automation, making this one of the highest-demand portfolio projects for recruiters.',
    implementationSteps: [
      'Index company policies and FAQs into structured searchable context.',
      'Inject retrieved policy segments into an empathetic prompt persona.',
      'Provide fallback human ticket escalation when sentiment drops below threshold.',
    ],
    suggestedTech: ['JavaScript', 'Express.js', 'Vector Store / Simple JSON Match', 'Tailwind CSS'],
    learningOutcomes: [
      'System prompt framing for brand safety and hallucination prevention',
      'Fallback logic and graceful human-in-the-loop escalation',
      'User satisfaction (CSAT) score collection after chats',
    ],
    portfolioExtension:
      'Add multi-lingual support for Indian regional languages (Hindi, Telugu, Tamil).',
    shareHook: 'Just mapped my next project: "Domain-Trained Customer Query Assistant"! Join the free NxtWave workshop.',
  },
  {
    id: 'proj_sentiment_analyzer',
    title: 'Product Review Sentiment & Feature Gap Intelligence',
    tag: 'Business Analytics',
    interestMatch: 'business',
    minCodingLevel: 'basics',
    difficulty: 'Intermediate',
    timeToPrototype: '60 mins',
    shortDesc:
      'Scrapes or ingests hundreds of e-commerce/app store reviews and generates an executive dashboard of top customer complaints and feature requests.',
    matchReason:
      'Combines data analytics with generative AI to demonstrate product management and engineering maturity.',
    implementationSteps: [
      'Ingest customer reviews from CSV or public API.',
      'Classify sentiment (Positive, Neutral, Critical) and tag problem categories (UI, Speed, Billing).',
      'Synthesize high-priority action items with sample quotes for product teams.',
    ],
    suggestedTech: ['Python / Pandas', 'Recharts / Chart.js', 'FastAPI', 'Vite'],
    learningOutcomes: [
      'Batch LLM processing with concurrency limits',
      'Aggregating qualitative feedback into quantitative business charts',
      'Extracting actionable product roadmaps from raw consumer noise',
    ],
    portfolioExtension:
      'Add competitor comparison benchmark charts directly into an executive PDF report generator.',
    shareHook: 'Excited to build my "Product Review Sentiment Analyzer" project blueprint! Free 60-min workshop.',
  },

  // 5. Developer Tools & Automation
  {
    id: 'proj_doc_helper',
    title: 'Developer Documentation & API Assistant',
    tag: 'DevTools AI',
    interestMatch: 'devtools',
    minCodingLevel: 'beginner',
    difficulty: 'Beginner',
    timeToPrototype: '45-60 mins',
    shortDesc:
      'An interactive terminal or web CLI that reads API documentation or GitHub READMEs and produces working copy-paste code snippets in 5 languages.',
    matchReason:
      'Shows developers that you understand developer experience (DX) and know how to eliminate friction for other engineers.',
    implementationSteps: [
      'Ingest Swagger/OpenAPI specifications or Markdown documentation.',
      'Accept natural-language user queries like "How do I authenticate with Bearer tokens?".',
      'Output syntax-highlighted code snippets with inline comments and error-handling.',
    ],
    suggestedTech: ['TypeScript', 'Node CLI or React UI', 'Prism.js / Highlight.js', 'REST API'],
    learningOutcomes: [
      'OpenAPI specification parsing and endpoint mapping',
      'Multi-language code synthesis and formatting',
      'Building fast search interfaces with keyboard shortcuts',
    ],
    portfolioExtension:
      'Package as an official VS Code extension published to the Visual Studio Marketplace.',
    shareHook: 'My AI Project Passport match: "Developer Documentation Helper"! Discover yours in 45 seconds.',
  },
  {
    id: 'proj_pr_bot',
    title: 'Git Commit & Pull Request Summary Bot',
    tag: 'DevTools AI',
    interestMatch: 'devtools',
    minCodingLevel: 'basics',
    difficulty: 'Intermediate',
    timeToPrototype: '60 mins',
    shortDesc:
      'Inspects `git diff` changes and automatically generates conventional commits, semantic PR descriptions, and security vulnerability checklists.',
    matchReason:
      'Immediately catches the eye of senior engineering interviewers because it directly automates their most tedious daily workflow.',
    implementationSteps: [
      'Read staged git diffs using local git hooks or GitHub Webhook payloads.',
      'Analyze file modifications and summarize the architectural intent.',
      'Format output following Conventional Commits format (`feat:`, `fix:`, `refactor:`).',
    ],
    suggestedTech: ['Node.js', 'GitHub REST / Octokit API', 'Git CLI integration'],
    learningOutcomes: [
      'Working with Git diff structures and unified patch formats',
      'Webhook handling, signature verification, and event payloads',
      'Automated code change summarization with bulletproof formatting',
    ],
    portfolioExtension:
      'Add automated test case generation for modified functions in the diff.',
    shareHook: 'Just got my AI Project Passport for "Git PR Summary Bot"! Building my first AI project with NxtWave.',
  },
  {
    id: 'proj_resume_feedback',
    title: 'AI Resume & Portfolio ATS Feedback Engine',
    tag: 'Career Tech',
    interestMatch: 'productivity',
    minCodingLevel: 'beginner',
    difficulty: 'Beginner',
    timeToPrototype: '45 mins',
    shortDesc:
      'Analyzes a student resume against target tech company job roles, scoring keyword match, impact quantification (XYZ formula), and formatting.',
    matchReason:
      'Directly addresses your final-year placement readiness while showcasing practical NLP and structured heuristic evaluation.',
    implementationSteps: [
      'Parse plain text from uploaded PDF resume.',
      'Evaluate bullet points against Google\'s "Accomplished [X] by doing [Y] resulting in [Z]" rule.',
      'Produce an instant 100-point score card with 3 immediate action items.',
    ],
    suggestedTech: ['JavaScript', 'PDF.js', 'Vite', 'Tailwind CSS'],
    learningOutcomes: [
      'Text extraction from unstructured document formats',
      'Heuristic rule engines paired with LLM reasoning',
      'Building clean scorecard and progress meter UI components',
    ],
    portfolioExtension:
      'Add simulated mock interview questions based on the candidate\'s actual listed projects.',
    shareHook: 'Discovered my AI project: "AI Resume & ATS Feedback Engine" on Project Launchpad! Ready for NxtWave\'s 60-min session.',
  },
];

/**
 * Deterministic recommendation algorithm.
 * Guarantees a matching, coherent project based on student inputs
 * without faking an AI model call.
 */
export function getRecommendedProject(
  interest: InterestArea,
  codingLevel: CodingLevel,
  goal: StudentGoal
): ProjectRecommendation {
  // Filter by interest area first
  const interestMatches = PROJECTS_CATALOG.filter((p) => p.interestMatch === interest);

  if (interestMatches.length === 0) {
    // Fallback if not found
    return PROJECTS_CATALOG[0];
  }

  // If student is beginner, prioritize beginner projects
  if (codingLevel === 'beginner') {
    const beginnerMatch = interestMatches.find((p) => p.difficulty === 'Beginner');
    if (beginnerMatch) return adaptProjectForGoal(beginnerMatch, codingLevel, goal);
  }

  // If student is comfortable, prioritize intermediate or advanced
  if (codingLevel === 'comfortable') {
    const advancedMatch = interestMatches.find((p) => p.difficulty === 'Intermediate' || p.difficulty === 'Advanced');
    if (advancedMatch) return adaptProjectForGoal(advancedMatch, codingLevel, goal);
  }

  // If goal is resume, choose resume/placement oriented project
  if (goal === 'resume') {
    const resumeMatch = interestMatches.find(
      (p) => p.id.includes('resume') || p.id.includes('pr_bot') || p.id.includes('copilot') || p.difficulty === 'Intermediate'
    );
    if (resumeMatch) return adaptProjectForGoal(resumeMatch, codingLevel, goal);
  }

  return adaptProjectForGoal(interestMatches[0], codingLevel, goal);
}

/**
 * Refines the recommendation copy deterministically based on coding level and student goal
 */
function adaptProjectForGoal(
  base: ProjectRecommendation,
  codingLevel: CodingLevel,
  goal: StudentGoal
): ProjectRecommendation {
  const customized = { ...base };

  if (codingLevel === 'beginner') {
    customized.matchReason = `${base.matchReason} Since you're starting out, we've calibrated this with no prior AI experience required—focusing on intuitive APIs and instant visual gratification.`;
  } else if (codingLevel === 'comfortable') {
    customized.matchReason = `${base.matchReason} With your coding foundation, you can bypass the basics and build a production-grade architecture that stands out in technical interviews.`;
  }

  if (goal === 'resume') {
    customized.portfolioExtension = `${base.portfolioExtension} (Optimized for your resume: emphasizes system design, metrics, and deployment on GitHub/Vercel).`;
  } else if (goal === 'explore') {
    customized.portfolioExtension = `${base.portfolioExtension} (Focus on creative exploration and experimenting with multiple model parameters).`;
  }

  return customized;
}
