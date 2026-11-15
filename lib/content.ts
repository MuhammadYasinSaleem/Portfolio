export const profile = {
  name: "Muhammad Yasin",
  title: "Software Engineer · AI/ML Researcher",
  tagline: "Building scalable software. Exploring practical AI.",
  intro:
    "I build production-ready SaaS platforms and intelligent applications, with a particular interest in computer vision, deep learning and medical AI.",
  badge: "Gold Medalist, BS Computer Science",
  email: "m.yaseensalim@gmail.com",
  github: "https://github.com/MuhammadYasinSaleem",
  linkedin: "https://www.linkedin.com/in/muhammadyasinsaleem/",
  medium: "https://medium.com/@m.yaseensalim",
  cv: "/Muhammad_Yasin_CV.pdf",
}

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
]

export const stats = [
  { v: "37,000+", l: "invoices migrated" },
  { v: "13", l: "platform modules" },
  { v: "98%", l: "test accuracy" },
  { v: "≥0.99", l: "AUC" },
]

export const work = [
  {
    n: "01",
    kind: "SaaS platform · 13 modules",
    title: "Peoplance",
    summary: "HR and operations platform being architected for multi-tenant SaaS.",
    bullets: [
      "Configurable leave-policy engine: probation, carry-forward, notice-period rules",
      "Kanban CRM with drag-and-drop pipelines; invoicing and purchase orders with branded PDFs",
      "Custom e-signature system: sequential multi-recipient signing with audit trail",
    ],
    tags: ["JWT", "Google OAuth 2.0", "RBAC", "Google Workspace"],
    link: { label: "View case study", href: "/work/peoplance", external: false },
  },
  {
    n: "02",
    kind: "Business platform · Australia",
    title: "Advanced Alloys",
    summary: "Automotive business management platform replacing WorkflowMax, HubSpot CRM and Asana.",
    bullets: [
      "Xero API integration with real-time webhook reconciliation",
      "37,000+ historical invoices backfilled",
      "AWS (S3, EC2), Nginx and GitHub Actions with zero-downtime deploys",
    ],
    tags: ["Django REST", "PostgreSQL", "Redis", "Celery", "AWS"],
    link: { label: "advancedalloys.com.au", href: "https://advancedalloys.com.au", external: true },
  },
  {
    n: "03",
    kind: "Medical AI",
    title: "Med-AI",
    summary: "AI-assisted healthcare for patient triage and structured clinical reporting.",
    bullets: [
      "AI-driven triage workflow to flag emergency and high-risk situations early",
      "15-minute AI-powered patient interview",
      "Generates structured SOAP reports for doctors",
    ],
    tags: ["Triage", "SOAP reports", "LLM"],
    link: { label: "GitHub", href: "https://github.com/MuhammadYasinSaleem/Med-AI", external: true },
  },
  {
    n: "04",
    kind: "Open source",
    title: "More on GitHub",
    summary: "Full-stack apps, ML notebooks and experiments, all in one place.",
    bullets: ["Medical-imaging models and their apps", "Full-stack practice projects"],
    tags: ["GitHub"],
    link: { label: "github.com/MuhammadYasinSaleem", href: "https://github.com/MuhammadYasinSaleem", external: true },
  },
]

export const research = {
  diagnosense: {
    kind: "Thesis · Lung cancer detection",
    title: "DiagnoSense",
    summary:
      "Hybrid ResNet50V2 + Vision Transformer with two-stage transfer learning on PET/CT scans. Full-stack app (React, Express, FastAPI) with LIME explainability and an AI chatbot.",
    tags: ["ResNet50V2", "Vision Transformer", "Transfer Learning", "LIME", "React", "Express", "FastAPI"],
    links: [
      { label: "Thesis PDF", href: "https://github.com/MuhammadYasinSaleem/Lung_Cancer_Detection_App/blob/main/model_code/Diagnosense_Thesis.pdf" },
      { label: "Model notebook", href: "https://github.com/MuhammadYasinSaleem/Lung_Cancer_Detection_App/blob/main/model_code/1_Restnet50_%2B_ViT_.ipynb" },
      { label: "GitHub", href: "https://github.com/MuhammadYasinSaleem/Lung_Cancer_Detection_App" },
    ],
    metrics: [
      { v: "98%", l: "Test accuracy" },
      { v: "0.98", l: "Macro F1" },
      { v: "≥0.99", l: "AUC" },
    ],
    image: "/diagno_sense.png",
  },
  brain: {
    kind: "MRI · 4-class",
    title: "Brain Tumor Classification",
    sub: "(EffViT-Hybrid)",
    summary:
      "EfficientNetB0 + ViT-Tiny classifying MRI into glioma, meningioma, pituitary and no tumor. FastAPI, Grad-CAM explanations, CPU-efficient inference.",
    tags: ["EfficientNetB0", "ViT-Tiny", "FastAPI", "Grad-CAM"],
    image: "/brain_tumor_classification.png",
    href: "https://github.com/MuhammadYasinSaleem/Brain-Tumor-App",
  },
  text: {
    title: "AI-Generated Text Detection",
    sub: "NLP classifier",
    href: "https://github.com/MuhammadYasinSaleem/Detecting-AI-Generated-text",
  },
}

export const timeline = [
  {
    kind: "Experience",
    title: "Software Engineer",
    org: "Innovaxel · Aug 2025 – Present",
    body: "Enterprise SaaS platforms and backend systems. Core developer on Peoplance and Advanced Alloys: Django REST APIs, Celery workers, Xero integration and AWS deployments.",
    tags: ["Django", "FastAPI", "React", "PostgreSQL", "AWS"],
  },
  {
    kind: "Education",
    title: "BS Computer Science",
    org: "Bahria University · 2021 – 2025 · Gold Medalist",
    body: "Thesis: DiagnoSense, lung cancer detection from PET/CT scans.",
    tags: ["Computer Vision", "Deep Learning"],
  },
]

export const fallbackArticles = [
  {
    title: "Setting Up Google Admin SDK in Django REST Framework",
    snippet: "Integrating Google Workspace Admin SDK with Django REST Framework using service accounts and domain-wide delegation.",
    link: "https://medium.com/@m.yaseensalim/setting-up-google-admin-sdk-in-django-rest-framework-69d14ec8eec8",
  },
  {
    title: "Stop Writing Custom Permission Classes: One DRF Pattern for Roles + Ownership",
    snippet: "Reusable Django REST Framework permissions for role-based access, object ownership and privileged users.",
    link: "https://medium.com/@m.yaseensalim/stop-writing-custom-permission-classes-one-drf-pattern-for-roles-ownership-1062de886bed",
  },
  {
    title: "How to Setup Pre-Commit in React TypeScript Using Husky & lint-staged",
    snippet: "Automating code quality checks with Husky, lint-staged, ESLint and Prettier.",
    link: "https://medium.com/@m.yaseensalim/how-to-setup-pre-commit-in-react-typescript-using-husky-lint-staged-40dde4da036f",
  },
]

export const stack = [
  { name: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++"] },
  {
    name: "AI / ML",
    items: ["TensorFlow", "Keras", "PyTorch", "scikit-learn", "Pandas", "NumPy", "OpenCV", "LangChain"],
    concepts: ["CNNs", "Vision Transformers", "Transfer Learning", "LIME", "Grad-CAM", "RAG", "NLP"],
  },
  { name: "Backend & Frontend", items: ["Django REST", "FastAPI", "Express", "React", "Next.js", "Redux Toolkit"] },
  { name: "Data, Cloud & DevOps", items: ["PostgreSQL", "MongoDB", "Redis", "Celery", "AWS", "Docker", "Nginx", "GitHub Actions"] },
  { name: "Integrations", items: ["Google OAuth 2.0", "Slack API", "Xero API", "JWT", "Git", "Postman"] },
]

export const contactLinks = [
  { name: "Email", sub: "Write directly", href: `mailto:${profile.email}` },
  { name: "LinkedIn", sub: "Connect", href: profile.linkedin },
  { name: "GitHub", sub: "Code", href: profile.github },
  { name: "Medium", sub: "Articles", href: profile.medium },
]

export const peoplance = {
  title: "Peoplance",
  kind: "SaaS platform · Web + Mobile",
  summary:
    "A comprehensive HR management platform built at Innovaxel: employee management, leave and attendance, daily standups, payroll, a CRM, finance, applicant tracking, e-signature, IT assets and Slack integration, with a React web app, a Django REST API and a React Native companion app.",
  facts: [
    { v: "13", l: "Platform modules" },
    { v: "~454", l: "API routes" },
    { v: "26", l: "Django apps" },
    { v: "~205k", l: "Lines (web + backend)" },
  ],
  factNote: "Platform scale measured 15 Nov 2026. I work on it as a core developer alongside the engineering lead.",
  architecture: [
    {
      name: "Backend",
      items: [
        "Django 5.2 and Django REST Framework, Python 3.11+, PostgreSQL",
        "JWT (SimpleJWT) and Google OAuth 2.0",
        "Celery with Redis and DB-backed periodic schedules",
        "OpenAPI docs with drf-spectacular; pytest-django and factory_boy",
        "Docker Compose across local, staging and production",
      ],
    },
    {
      name: "Web",
      items: [
        "React 19 with Vite 7, React Router 7",
        "Redux Toolkit with redux-persist",
        "Atomic design system (atoms, molecules, compounds, pages)",
        "dnd-kit for kanban boards, Chart.js for reports",
        "Permission-gated UI rendering",
      ],
    },
    {
      name: "Mobile",
      items: [
        "React Native on Expo with NativeWind",
        "Drawer and per-module stacks, role-gated navigation",
        "Google sign-in with secure JWT storage",
        "Module parity with the web app, with documented deliberate simplifications",
      ],
    },
  ],
  highlights: [
    {
      title: "Configurable leave-policy engine",
      body: "Per-leave-type rules cover annual quota, carry-forward, probation eligibility, advance notice, maximum consecutive days and lifetime limits. Eligibility, balance reservation, charging and reversal all go through one engine, with idempotent annual carry-forward.",
    },
    {
      title: "HR-recorded leave with employee acknowledgement",
      body: "HR previews the impact, the employee acknowledges, and a single finalisation step makes it effective with atomic revalidation. A 14-day hold reserves days without charging them, reminders escalate on a schedule, and every step lands in an activity log.",
    },
    {
      title: "In-house e-signature",
      body: "Typed or drawn signatures, sequential multi-recipient routing and a per-recipient audit trail (IP, user agent, timestamp), with no per-signature fees compared with third-party providers.",
    },
    {
      title: "Multi-tenancy and authorization",
      body: "Workspace scoping with a fail-closed base for workspace-owned models, a model registry enforced by tests and per-workspace Celery jobs. A central role-permission catalogue is guarded by an authorization-matrix test that fails for any endpoint missing from the register.",
    },
    {
      title: "Google Workspace provisioning",
      body: "New-hire accounts are created through domain-wide delegation, with a welcome email sent via Celery and a rollback if the local user cannot be created. Login is domain-gated.",
    },
    {
      title: "Audit trail and observability",
      body: "Field-level diff audit logging, correlation-ID request tracing, structured JSON logs in staging and production, and soft delete with UUID primary keys throughout.",
    },
  ],
  modules: [
    "Employee management and onboarding",
    "Leave and attendance",
    "Daily standups",
    "Payroll and provident fund",
    "Vector CRM",
    "Clients, suppliers and invoicing",
    "Applicant tracking",
    "Documents and e-signature",
    "Announcements and blog",
    "IT assets",
    "Slack integrations",
    "Requests, alerts and notifications",
    "Mobile companion app",
  ],
  stackTags: ["Django", "DRF", "PostgreSQL", "Celery", "Redis", "React 19", "Redux Toolkit", "React Native", "Docker", "ReportLab", "Slack API", "Google OAuth"],
}
