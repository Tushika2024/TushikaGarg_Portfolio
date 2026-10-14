import type {
  Profile, Stage, Project, CaseStudy, Experience, Education, Honour,
  TargetRole, OtherProjects, Certification, LabelledPair,
} from '../types';

// ─────────────────────────────────────────────────────────────
//  Single source of truth. Edit copy here, never in components.
//
//  ⚠ Search "REPLACE" before deploying — repo URLs, the demo link,
//  the LeetCode handle and the GSSoC credential ID are placeholders.
//  Also add public/Tushika-Garg-Resume.pdf and public/tushika.jpg.
// ─────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: 'Tushika Garg',
  role: 'Software Engineer | Data & ML',
  roleSub: 'Python · Backend · Applied ML',
  tagline: 'Software · Data · ML',
  headline: [
    'I build explainable ML systems and the backends that serve them, ',
    'from the pipeline that cleans the data to the interface that justifies the answer.'
  ],
  email: 'gargtushikabsr@gmail.com',
  phone: '+91 70783 23902',
  github: 'https://github.com/Tushika2024',
  linkedin: 'https://www.linkedin.com/in/tushika-garg-84a488318/',
  leetcode: 'https://leetcode.com/u/Tushika_garg/', // REPLACE if handle differs
  codolio: 'https://codolio.com/profile/tushika_garg',
  photo: '/tushika.jpg',
  resume: '/Tushika-Garg-Resume.pdf',
};

export const STAGES: readonly Stage[] = [
  { id: 'intro',      start: 0,    label: 'Introduction',   files: ['',             'tushika@portfolio — ~/', ''] },
  { id: 'background', start: 0.10, label: 'Background',     files: ['honours.md',   'background.md',    'extra.md'] },
  { id: 'work',       start: 0.22, label: 'Skills & work',  files: ['skills.txt',   'experience.log',   'projects/'] },
  { id: 'proj1',      start: 0.34, label: 'CreditShield',   files: ['stack.txt',    'creditshield.py',  'eval/roc'] },
  { id: 'proj2',      start: 0.46, label: 'CITY-AI',        files: ['stack.txt',    'anpr_worker.py',   'eval/trajectory'] },
  { id: 'proj3',      start: 0.58, label: 'Sleep → T2DM',   files: ['stack.txt',    'sleep_t2dm.ipynb', 'eval/signal'] },
  { id: 'contact',    start: 0.70, label: 'Get in touch',   files: ['leetcode.log', 'contact.md',       'target-roles.md'] },
] as const;

export const skills: readonly LabelledPair[] = [
  ['Python · SQL · C++ · C',     'LANG'],
  ['FastAPI · MySQL · REST',     'BACKEND'],
  ['Scikit-learn · Supervised & Unsupervised Learning',     'ML'],
  ['Optuna · SHAP',              'TUNING'],
  ['Transformers · HuggingFace', 'NLP'],
  ['Pandas · NumPy · ETL',       'DATA'],
  ['Git · GitHub · VS Code · Streamlit',     'TOOLS'],
] as const;

export const experience: Experience = {
  role: 'Software Developer Intern',
  org: 'Kanha Milk Testing Equipments Pvt. Ltd. · Bulandshahr, UP',
  period: 'Jun 2026 – Jul 2026',
  pipeline: [
    { cmd: 'read',  colour: 'blue',  arg: 'excel_records.xlsx', out: '→ 10,000+ rows' },
    { cmd: 'clean', colour: 'red',   arg: 'schema_mismatch',    out: '→ formats normalised' },
    { cmd: 'load',  colour: 'green', arg: 'mysql://complaints', out: '→ integrity ok' },
    { cmd: 'serve', colour: 'green', arg: 'fastapi /dashboard', out: '→ trends live' },
  ],
};

export const education: Education = {
  school: 'Thapar Institute of Engineering & Technology',
  degree: 'B.E. Computer Science and Business Systems',
  period: 'Aug 2024 – May 2028 · Patiala',
  cgpa: '9.78',
  prior: '',
  note: "Third-year Computer Science undergraduate at Thapar Institute, ranked first in my branch. Most of what I build sits across the whole path of a data problem rather than one slice of it- ETL and a FastAPI service on production data, a credit model at ROC-AUC 0.82 that explains every decision, a multi-tenant platform where five companies share one database and none can see another's.\n\nI care most about the last mile. A model nobody can question isn't finished, and a service nobody can use isn't shipped.",
  stats: [['9.78', 'CGPA / 10.0'], ['Rank 1', 'in branch'], ['300+', 'DSA solved']],
};

export const honours: readonly Honour[] = [
  {
    title: 'Rank 1 in Branch',
    year: '2024–25',
    detail: 'Merit I Scholarship, for placing first in Computer Science and Business Systems in first year at Thapar Institute.',
  },
  {
    title: 'Best Student of the Year',
    year: '2022–23',
    detail: 'Renaissance School, Bulandshahr- awarded for all-round excellence across academics, activities and leadership.',
  },
] as const;

export const targetRoles: readonly TargetRole[] = [
  { n: '01', title: 'Software Engineering Intern', note: 'services, systems, product code' },
  { n: '02', title: 'Backend Engineering Intern',  note: 'APIs, databases, data pipelines' },
  { n: '03', title: 'ML / Data Science Intern',     note: 'modelling, analysis, explainability' },
] as const;

export const extras: readonly LabelledPair[] = [
  ['Institution of Engineers (IEI)', 'Former Technical department member'],
  ['Student Council', 'Batch representative- relaying student concerns to faculty'],
  ['Design Thinking', 'Empathy interviews with 20+ students in a 4-member team'],
] as const;

export const projects: readonly Project[] = [
  {
    key: 'creditshield',
    n: '01',
    file: 'creditshield.py',
    title: 'CreditShield',
    blurb: 'credit underwriting',
    metric: '0.82',
    period: 'Apr 2026 – Jun 2026 · credit underwriting pipeline',
    stack: [['XGBoost', 'MODEL'], ['Optuna', 'TUNING'], ['SHAP', 'EXPLAIN'], ['Scikit-learn', 'PIPELINE'], ['Streamlit', 'DEPLOY']],
    stackNote: ['Apr 2026 – Jun 2026', 'cloud-deployed · live demo'],
    bullets: [
      'Architected a credit underwriting pipeline across 30,000+ records achieving ROC-AUC 0.82, applying reject inference to correct approved-only sampling bias.',
      'Engineered 15+ behavioural risk features to support data-driven decisioning rather than threshold guesswork.',
      'Formulated a risk-segmented limit engine with SHAP explainability and configurable policy guardrails.',
    ],
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'Optuna', 'SHAP', 'Streamlit'],
    stats: [['0.82', 'ROC-AUC'], ['30K+', 'records'], ['15+', 'risk features']],
    detail: [
      'Architected a credit underwriting pipeline on 30,000+ records using an Optuna-tuned XGBoost model, reaching ROC-AUC 0.82 with reject inference applied to correct for approved-only sampling bias.',
      'Credit data only records outcomes for applicants who were approved. Training on that naively builds a model confident about a population it has never seen- correcting for it lowered the headline number and made it real.',
      'Engineered 15+ behavioural risk features, then formulated a risk-segmented credit limit engine with SHAP explainability and configurable policy guardrails, so every decision is auditable and compliance-ready.',
      'Deployed as a cloud-hosted Streamlit application- a reviewer can change an applicant profile and watch the decision and its explanation update.',
    ],
    links: [
      { kind: 'github', url: 'https://github.com/Tushika2024/CreditShield-AI-Credit-Risk-Limit-Optimization', label: 'Source' },    // REPLACE
      { kind: 'live',   url: 'https://creditshield-ai-credit-risk-limit-optimization-c3jlu47twpokmub.streamlit.app/',          label: 'Live demo' }, // REPLACE
    ],
  },
  {
    key: 'cityai',
    n: '02',
    file: 'anpr_worker.py',
    title: 'CITY-AI',
    blurb: 'ANPR surveillance · SIH 2026',
    metric: '90.4%',
    period: 'Sep 2026 – Oct 2026 · Smart India Hackathon 2026',
    stack: [['YOLO11 · CRNN', 'VISION'], ['PyTorch', 'OCR'], ['Node · Express', 'BACKEND'], ['SQLite', 'STORE'], ['React · Leaflet', 'FRONTEND']],
    stackNote: ['Sep 2026 – Oct 2026', 'SIH 2026 · team build'],
    bullets: [
      'Built a city-scale ANPR platform that reads number plates from CCTV feeds and tracks vehicles across 30 cameras over 106,000+ sightings.',
      'Reached 90.4% plate accuracy on degraded footage by voting across 8 frames per tracked vehicle- up from 69.1% on a single frame.',
      'Shipped trajectory reconstruction, cloned-plate alerts and a co-presence search that finds vehicles seen at two crime scenes inside a time window.',
    ],
    tags: ['Python', 'YOLO11', 'PyTorch', 'CRNN', 'Node.js', 'SQLite', 'React', 'Leaflet'],
    stats: [['90.4%', 'plate accuracy'], ['106K+', 'sightings'], ['30', 'cameras']],
    detail: [
      'CITY-AI is a terminal-style surveillance dashboard for traffic authorities, built in a team for Smart India Hackathon 2026. It reads number plates from CCTV feeds and lets an operator follow a vehicle across the city, catch cloned plates and run reverse investigations on crime scenes.',
      'The OCR path is YOLO11 tracking, plate detection, a PyTorch CRNN reader, then voting. A single clean frame reads 93.6% of plates exactly; on deliberately degraded frames that falls to 69.1%. Voting across 8 frames of the same tracked vehicle recovers it to 90.4%- a 21-point gain from treating a vehicle as a sequence rather than a snapshot.',
      'Trajectories are stitched from 106,000+ sightings across 30 cameras using 258 learned camera-to-camera links. Each link carries its own normal travel time, so a hop that is impossibly fast flags a cloned plate, and a link slower than its own median flags congestion.',
      'A misread is not thrown away: a 1-character OCR variant seen at the expected time on a learned link is attached as an inferred sighting, with lower OCR confidence making the misread more likely rather than less.',
      'The operator UI is a React + Leaflet console with function-key navigation across seven modules, live OCR on uploaded footage, and English and Hindi support, served by an Express API over SQLite.',
    ],
    links: [
      { kind: 'github', url: 'https://github.com/kunal-motwani/sih-_final2026', label: 'Source' },
    ],
  },
  {
    key: 'sleep',
    n: '03',
    file: 'sleep_t2dm.ipynb',
    title: 'Sleep Behaviour → T2DM',
    blurb: 'wearable health data',
    metric: '0.84',
    period: 'Nov 2025 – Jan 2026 · wearable health modelling',
    stack: [['Pandas · NumPy', 'WRANGLE'], ['Scikit-learn', 'MODEL'], ['AI-READI dataset', 'SOURCE'], ['Statistical EDA', 'METHOD']],
    stackNote: ['Nov 2025 – Jan 2026', 'presented · ICCIS 2026 (Springer)'],
    bullets: [
      'Engineered a Type-2 Diabetes risk classifier reaching ROC-AUC 0.75 and F1-score 0.84 from raw AI-READI wearable sensor streams.',
      'Formulated a statistical modelling approach converting raw sensor data into structured, decision-ready features.',
      'Presented the paper at ICCIS 2026, BITS Pilani K K Birla Goa Campus (Springer proceedings).',
    ],
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'AI-READI'],
    stats: [['0.75', 'ROC-AUC'], ['0.84', 'F1 score'], ['ICCIS', '2026 · presented']],
    detail: [
      'Engineered a Type-2 Diabetes risk classifier reaching ROC-AUC 0.75 and F1-score 0.84, built entirely on scikit-learn- no neural network anywhere in it.',
      'Formulated the feature layer first: converting raw AI-READI wearable sensor streams into structured, decision-ready features took considerably longer than the modelling that followed.',
      'The paper, "Pattern Recognition in Wearable Sleep Data for Type 2 Diabetes Risk Assessment Using Machine Learning" (with Ravneet Kaur and Gagandeep Kaur), was presented at the 8th International Conference on Communication and Intelligent Systems (ICCIS 2026), BITS Pilani K K Birla Goa Campus, on 26–27 September 2026.',
    ],
    links: [
      { kind: 'github', url: 'https://github.com/Tushika2024/Sleep_T2DM_AI-readai-dataset', label: 'Source' }, // REPLACE
      { kind: 'paper',  url: '/ICCIS_2026_Presentation_Certificate.pdf', label: 'ICCIS certificate' },
    ],
  },
] as const;

export const kanhaCase: CaseStudy = {
  key: 'kanha',
  file: 'kanha_etl.py',
  title: 'Software Developer Intern- Kanha Milk Testing Equipments',
  tags: ['Python', 'ETL', 'MySQL', 'FastAPI', 'pandas'],
  stats: [['10K+', 'records migrated'], ['Jun–Jul', '2026'], ['1', 'service shipped']],
  detail: [
    'Engineered a Python ETL pipeline migrating 10,000+ legacy Excel records into a normalised MySQL schema, reconciling inconsistent date formats, mismatched column headers and duplicate entries.',
    'Developed a FastAPI backend service with validated request models and auto-generated API documentation, applying REST design practice so analytics could be built against a stable contract rather than ad-hoc queries.',
    'Delivered automated analytics dashboards giving stakeholders data-driven visibility that previously required manual spreadsheet review.',
  ],
  links: [],
};

export const otherProjects: readonly OtherProjects[] = [
  {
    key: 'complainthub',
    n: '01',
    title: 'Complaint Hub',
    blurb: 'multi-tenant platform · metric: 5 companies',
    period: 'Full-stack · multi-tenant complaint management',
    bullets: [
      'Architected a multi-tenant complaint platform serving 5 companies and 631 records from one database, enforcing isolation through signed JWT claims validated in the service layer rather than the UI.',
      'Engineered passwordless email OTP authentication with an SMTP service handling OTP delivery and complaint status notifications.',
      'Formulated company-scoped CRUD and analytics APIs, plus an admin-gated Excel importer applying date normalisation, header mapping and duplicate handling row by row.',
    ],
    tags: ['FastAPI', 'React', 'TypeScript', 'MySQL', 'JWT', 'SQLAlchemy', 'pandas', 'SMTP'],
    links: [
      { kind: 'github', url: 'https://github.com/Tushika2024/Complaint_Hub', label: 'Source' }
    ],
  },
  {
    key: 'transitops',
    n: '02',
    title: 'TransitOps',
    blurb: 'fleet operations · hackathon · metric: 4 roles',
    period: 'Odoo Hackathon · team of 2',
    bullets: [
      'Built a fleet operations platform covering vehicle and driver registries, trip dispatch with conflict-free assignment, maintenance and fuel logging, and expense tracking linked to trips.',
      'Engineered JWT authentication across four distinct roles- Fleet Manager, Dispatcher, Safety Officer and Financial Analyst- with a daily scheduled job emailing licence and document expiry reminders.',
      'Formulated a seeding strategy that populates demo data through the app\'s own service functions rather than raw inserts, so every business rule and status invariant holds exactly as if a person had clicked through the UI.',
    ],
    tags: ['FastAPI', 'React', 'Vite', 'SQLAlchemy', 'MySQL', 'JWT', 'APScheduler'],
    links: [
      { kind: 'github', url: 'https://github.com/Tushika2024/TransitOps-smart-transport-operations-plaatforrm', label: 'Source' }
    ],
  },
  {
    key: 'multimodal-video',
    n: '03',
    title: 'Multimodal Video Representation Learning',
    blurb: 'contrastive learning · retrieval · metric: 0.96 cosine',
    period: 'Video representation & retrieval pipeline',
    bullets: [
      'Investigates whether the semantic embedding of a full video can be approximated from only a single static frame and its audio track.',
      'Architected a fusion pipeline mapping 512-D CLIP frame embeddings and 128-D MFCC audio features into a 640-D input, trained to predict 768-D VideoMAE video targets across 529 videos.',
      'Engineered and benchmarked four approaches- MLP baseline, Transformer with InfoNCE contrastive loss, a hybrid Transformer combining MSE, cosine and InfoNCE objectives, and ImageBind zero-shot.',
      'Formulated the hybrid loss (α=1.0, β=1.0, γ=0.5), finding that the 1.4M-parameter MLP reached the best reconstruction at cosine 0.9583 and MSE 0.0202 while running 300× faster than ImageBind\'s 1.2B parameters- which nonetheless dominated retrieval at Recall@1 62.5%.',
    ],
    tags: ['PyTorch', 'CLIP', 'VideoMAE', 'ImageBind', 'InfoNCE', 'Librosa', 'NumPy'],
    links: [
      { kind: 'github', url: 'https://github.com/Tushika2024/MultiModal_AI', label: 'Source' }
    ],
  },
  {
    key: 'sentinel',
    n: '04',
    title: 'SentinelLabel',
    blurb: 'label auditing · NLP · metric: 82% precision',
    period: 'Feb 2026 – Apr 2026 · semantic label auditing',
    bullets: [
      'Engineered a semantic label auditing framework across a 14,000+ sample NLP corpus, surfacing 268 mislabelled examples at 82% precision- a 3.6x improvement over random sampling.',
      'The transformer never predicts the label. It produces the embedding space in which a wrong label becomes geometrically obvious- a measuring instrument rather than a classifier.',
      'Architected a UMAP reduction plus HDBSCAN clustering layer to isolate structural inconsistencies that had already survived human review.',
      'Written with modular, object-oriented design so individual components stay testable and reusable across other corpora.',
    ],
    tags: ['Transformers', 'NLP', 'Cross-encoders', 'UMAP', 'HDBSCAN', 'Scikit-learn'],
    links: [
      { kind: 'github', url: 'https://github.com/Tushika2024/data_label_auditor', label: 'Source' }
    ],
  },
  {
    key: 'mota-sankalp',
    n: '05',
    title: 'MoTA-SANKALP',
    blurb: 'scholarship scrutiny · SIH 2026 · metric: 6-stage AI check',
    period: 'Smart India Hackathon 2026 · Ministry of Tribal Affairs',
    bullets: [
      'Built in a team an administrator-side platform for Ministry of Tribal Affairs scholarship and fellowship schemes, taking an application from document upload through scrutiny to a sanction PDF.',
      'Engineered a scrutiny pipeline chaining OCR (English and Hindi), field extraction, YOLO document detection, RapidFuzz name matching, pHash duplicate detection and an IsolationForest anomaly check into one call.',
      'Formulated scheme eligibility as YAML rules read by a generic evaluator, so a new scheme is a config file rather than new code.',
      'Designed it so AI flags and explains but never decides- a deterministic resolution agent proposes fixes, the officer approves or rejects with a mandatory reason, and every AI and human step lands in an audit log.',
    ],
    tags: ['FastAPI', 'React', 'SQLAlchemy', 'JWT', 'YOLOv8', 'EasyOCR', 'RapidFuzz', 'scikit-learn'],
    links: [
      { kind: 'github', url: 'https://github.com/ShreyaSinghal12/MoTA-Sankalp', label: 'Source' }
    ],
  },
];

/**
 * ⚠ Only list credentials you actually hold. The section hides itself when
 * this array is empty — an absent section reads better than a padded one.
 */
export const certifications: readonly Certification[] = [
  {
    name: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI · Coursera',
    mark: 'ML',
    date: 'Aug 2025',
    credentialId: '50H4N2I0GMW8',
    url: 'https://coursera.org/share/701079c9ebf2019e2cb2cffd4ecf298f',
    skills: ['Supervised learning', 'Classification', 'Feature engineering', 'Model evaluation'],
  },
  {
    name: 'HackVega 2.0',
    issuer: 'MyCareernet',
    mark: 'HV',
    date: 'Jul 2026',
    url: '/hackvega_certificate.png',
    skills: ['Problem solving', 'Competitive coding'],
  },
  {
    name: 'Women Who Master — Participation',
    issuer: 'Unstop',
    mark: 'WM',
    date: 'Jul 2026',
    credentialId: 'b2a36787-2c94-4361-8cac-d0b977c49f0c',
    url: 'https://unstop.com/certificate-preview/b2a36787-2c94-4361-8cac-d0b977c49f0c',
    skills: ['Problem solving', 'Technical assessment'],
  },
  {
    name: 'ICCIS 2026 — Certificate of Presentation',
    issuer: 'BITS Pilani K K Birla Goa Campus · SCRS · Springer',
    mark: 'IC',
    date: 'Sep 2026',
    credentialId: 'SCRS/ICCIS 2026/PC/1565',
    url: '/ICCIS_2026_Presentation_Certificate.pdf',
    skills: ['Research', 'Machine learning', 'Wearable health data'],
  },
  {
    name: 'American Express Campus Challenge 2026 — Product Track',
    issuer: 'American Express · Unstop',
    mark: 'AX',
    date: '2026',
    credentialId: '45ce88ca-6aa3-404d-b7dc-80043f176771',
    url: 'https://unstop.com/certificate-preview/45ce88ca-6aa3-404d-b7dc-80043f176771',
    skills: ['Product thinking', 'Problem solving'],
  },
] as const;

export const faqs: readonly LabelledPair[] = [
  ['What kind of roles are you looking for?',
   'Software engineering first- backends, services, and data systems. Data and ML after that. My internship was backend and ETL; CreditShield was modelling and deployment. Both felt like the same job to me: take something messy and make it work for a person at the other end.'],
  ["Isn't targeting more than one field unfocused?",
   "I'd argue it's the opposite. The thread through everything I've built is taking a problem from messy raw data through to something a person can actually use- pipeline, model, service, interface. That's one skill set, not three. It happens to be legible to more than one hiring team."],
  ['Are you available right now?',
   '<strong>Yes, for internships.</strong> I graduate in May 2028, so I&rsquo;m looking for internships through 2026 and 2027 and full-time roles after that.'],
  ['Which project should I look at first?',
   "<strong>CreditShield.</strong> It's the one with a live demo you can poke at, and it's where I made the decisions I'm most willing to defend- reject inference to correct sampling bias, SHAP for auditability, and reporting an ROC-AUC of 0.82 instead of the flattering number I'd have got by ignoring both."],
  ['Can I see your code?',
   'Everything public is on GitHub at Tushika2024, linked from each project. The sleep behaviour paper was presented at ICCIS 2026 and its analysis code is public too. CITY-AI and MoTA-SANKALP were team builds for SIH 2026 and live in teammates&rsquo; repositories.'],
  ['Have you worked with production data?',
   'Yes- at Kanha Milk I migrated 10,000+ Excel records into MySQL. That was my first encounter with data that fails in ways benchmark datasets never do. More lines of that pipeline went to reconciling inconsistent formats than to the actual load, which taught me more than any clean public dataset has.'],
  ['What are you learning next?',
   "Deep learning properly- I've used transformers as embedding models but haven't trained architectures from scratch, and I'd rather say so than imply otherwise. After that, containerisation and CI, then MLOps: orchestration, monitoring, and serving at scale."],
  ["What's the fastest way to reach you?",
   'Email- gargtushikabsr@gmail.com. I reply to everything, usually within a day. LinkedIn works too but email is faster.'],
] as const;

export const availability: readonly (readonly ['green' | 'amber', string])[] = [
  ['green', 'Software engineering, backend, data/ML'],
  ['green', 'Internships and new grad'],
  ['amber', 'Graduating May 2028'],
] as const;