# Tushika Garg — Portfolio

**Software Engineer · Data & ML**
Third-year Computer Science and Business Systems student at Thapar Institute of Engineering & Technology, **Rank 1 in branch with a 9.78 CGPA**.

I build explainable ML systems and the backends that serve them, from the pipeline that cleans the data to the interface that justifies the answer.

**[View the live site →](https://tushikagarg.dev/)** &nbsp;·&nbsp;
[Resume](public/Tushika-Garg-Resume.pdf) &nbsp;·&nbsp;
[LinkedIn](https://www.linkedin.com/in/tushika-garg-84a488318/) &nbsp;·&nbsp;
[GitHub](https://github.com/Tushika2024) &nbsp;·&nbsp;
[LeetCode](https://leetcode.com/u/Tushika_garg/) &nbsp;·&nbsp;
[Codolio](https://codolio.com/profile/tushika_garg)

> Open to **Software Engineering, Backend and ML / Data Science internships**.
> Graduating May 2028. The fastest way to reach me is email: **gargtushikabsr@gmail.com**

---

## At a glance

| | |
|---|---|
| 🎓 **Education** | B.E. Computer Science and Business Systems, Thapar Institute · 2024–2028 · CGPA 9.78 · Rank 1 |
| 💼 **Experience** | Software Developer Intern, Kanha Milk Testing Equipments · Jun–Jul 2026 · Python ETL, MySQL, FastAPI |
| 📄 **Research** | Paper presented at **ICCIS 2026**, BITS Pilani K K Birla Goa Campus (Springer) |
| 🧠 **Problem solving** | 300+ DSA problems solved |

---

## Featured projects

### 01 · CreditShield: explainable credit underwriting
**ROC-AUC 0.82 · 30K+ records · live demo**
A credit underwriting pipeline using an Optuna-tuned XGBoost model, with reject inference to correct for approved-only sampling bias. A risk-segmented limit engine uses SHAP so every decision can be explained and audited.
`XGBoost` `Optuna` `SHAP` `Scikit-learn` `Streamlit`
[Source](https://github.com/Tushika2024/CreditShield-AI-Credit-Risk-Limit-Optimization) · [Live demo](https://creditshield-ai-credit-risk-limit-optimization-c3jlu47twpokmub.streamlit.app/)

### 02 · CITY-AI: smart city ANPR surveillance *(Smart India Hackathon 2026, team build)*
**90.4% plate accuracy · 106K+ sightings · 30 cameras**
Reads number plates from CCTV feeds and tracks vehicles across a city camera network. It also flags cloned plates and finds vehicles seen at two crime scenes within a time window. Voting across 8 frames of the same vehicle raises plate accuracy on degraded footage from 69.1% to 90.4%.
`YOLO11` `PyTorch CRNN` `Node.js` `Express` `SQLite` `React` `Leaflet`
[Source](https://github.com/kunal-motwani/sih-_final2026)

### 03 · Sleep Behaviour → Type 2 Diabetes risk
**ROC-AUC 0.75 · F1 0.84 · presented at ICCIS 2026**
A diabetes risk classifier built from raw AI-READI wearable sensor streams. Most of the work went into turning noisy sensor data into structured, decision-ready features.
`Python` `Pandas` `NumPy` `Scikit-learn`
[Source](https://github.com/Tushika2024/Sleep_T2DM_AI-readai-dataset) · [ICCIS certificate](public/ICCIS_2026_Presentation_Certificate.pdf)

---

## Other projects

| Project | What it is | Stack | Link |
|---|---|---|---|
| **Complaint Hub** | Multi-tenant complaint platform: 5 companies share one database with JWT-enforced isolation and email OTP login | FastAPI · React · TypeScript · MySQL | [Source](https://github.com/Tushika2024/Complaint_Hub) |
| **TransitOps** | Fleet operations platform with four role types and scheduled expiry reminders *(Odoo Hackathon)* | FastAPI · React · SQLAlchemy · APScheduler | [Source](https://github.com/Tushika2024/TransitOps-smart-transport-operations-plaatforrm) |
| **Multimodal Video Representation** | Predicts full-video embeddings from one frame plus audio; compares an MLP, Transformers and ImageBind | PyTorch · CLIP · VideoMAE · ImageBind | [Source](https://github.com/Tushika2024/MultiModal_AI) |
| **SentinelLabel** | Finds mislabelled NLP data: 268 errors at 82% precision across 14K+ samples, 3.6× better than random | Transformers · UMAP · HDBSCAN | [Source](https://github.com/Tushika2024/data_label_auditor) |
| **MoTA-SANKALP** | AI-assisted scholarship scrutiny for the Ministry of Tribal Affairs: OCR, document detection, duplicate and anomaly checks, with a human officer making the final call *(SIH 2026, team build)* | FastAPI · React · YOLOv8 · EasyOCR · scikit-learn | [Source](https://github.com/ShreyaSinghal12/MoTA-Sankalp) |

---

## Research

**Pattern Recognition in Wearable Sleep Data for Type 2 Diabetes Risk Assessment Using Machine Learning**
Tushika Garg, Ravneet Kaur, Gagandeep Kaur
Presented at the *8th International Conference on Communication and Intelligent Systems (ICCIS 2026)*, BITS Pilani K K Birla Goa Campus, 26–27 September 2026 · Springer

---

## Certifications

- **Supervised Machine Learning: Regression and Classification** — DeepLearning.AI · Coursera · Aug 2025
- **ICCIS 2026 Certificate of Presentation** — BITS Pilani Goa · SCRS · Sep 2026
- **American Express Campus Challenge 2026, Product Track** — Unstop
- **HackVega 2.0** — MyCareernet · Jul 2026
- **Women Who Master** — Unstop · Jul 2026

---

## Skills

| Area | Tools |
|---|---|
| Languages | Python · SQL · C++ · C |
| Backend | FastAPI · MySQL · REST · SQLAlchemy · JWT |
| Machine learning | Scikit-learn · XGBoost · Optuna · SHAP |
| NLP & vision | Transformers · HuggingFace · YOLO |
| Data | Pandas · NumPy · ETL |
| Tools | Git · GitHub · VS Code · Streamlit |

---

## About this site

The portfolio is a scroll-driven, three-screen 3D layout. Each project gets its own stage with a small animated visual: a ROC curve drawing itself, a vehicle path lighting up across cameras, and a sleep signal waveform.

- **React 18 · TypeScript (strict) · Vite**, with no animation library, router or UI kit
- The 3D effect is plain CSS transforms driven by a `requestAnimationFrame` loop, so all text stays real, selectable and searchable
- About 61 kB gzipped in total
- Light and dark themes, plus a `Ctrl + K` / `⌘K` search across every section, project and FAQ
- Accessible: narrow screens and reduced-motion settings get a normal stacked page, colours meet WCAG AA, and the dialogs are keyboard-friendly

### Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
git clone https://github.com/Tushika2024/TushikaGarg_Portfolio.git
cd TushikaGarg_Portfolio
npm install
npm run dev        # open http://localhost:5173
```

Other commands:

```bash
npm run build      # type-check and build into dist/
npm run preview    # serve the production build
```

All site text and links live in [`src/data/content.ts`](src/data/content.ts).

---

## Contact

📧 **gargtushikabsr@gmail.com** · 💼 [LinkedIn](https://www.linkedin.com/in/tushika-garg-84a488318/) · 🐙 [GitHub](https://github.com/Tushika2024)

I reply to every message, usually within a day.
