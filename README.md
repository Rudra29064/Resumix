# 🤖 AI Resume Analyzer

An AI-powered resume analysis tool built with React, Node.js, and Groq AI that evaluates ATS compatibility, detects missing skills, and provides intelligent resume improvement suggestions.

![AI Resume Analyzer](https://img.shields.io/badge/AI-Resume%20Analyzer-indigo?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![Groq AI](https://img.shields.io/badge/Groq-LLaMA%203.3-orange?style=for-the-badge)

---

## ✨ Features

- 📄 **Resume Upload** — Drag & drop PDF or DOCX files
- 🎯 **ATS Score** — Get an ATS compatibility score out of 100
- 💼 **Internship Readiness Score** — Know how ready you are for internships
- ✅ **Strengths Detection** — See what your resume does well
- ⚠️ **Weakness Analysis** — Identify areas that need improvement
- 🔑 **Missing Skills** — Discover skills recruiters expect
- 💡 **Improvement Suggestions** — Actionable tips to improve your resume
- 🔍 **Keyword Suggestions** — ATS-friendly power words to add
- 📝 **Job Description Matcher** — Paste a JD and get a match score
- 🤖 **AI Resume Rewriter** — Rewrite weak bullet points instantly
- 🎤 **Interview Question Generator** — Practice questions based on your resume

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Router DOM
- React Dropzone

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Mammoth (DOCX text extraction)

### AI
- Groq API (LLaMA 3.3 70B)

---

## 📁 Project Structure

```
resume-analyzer/
│
├── client/                     # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── ScoreCard.jsx
│       │   └── ListCard.jsx
│       ├── pages/
│       │   ├── UploadPage.jsx
│       │   └── ResultsPage.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       └── index.js
│
├── server/                     # Node.js backend
│   ├── controllers/
│   │   └── analyzeController.js
│   ├── routes/
│   │   └── analyzeRoute.js
│   ├── utils/
│   │   ├── extractText.js
│   │   └── analyzeWithAI.js
│   ├── uploads/
│   ├── .env
│   └── index.js
│
└── README.md
```

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `/` | Upload page with drag & drop |
| `/results` | Full AI analysis dashboard |

---

## 🌐 Deployment

### Frontend — Vercel
```bash
cd client
npm run build
# Deploy to Vercel via GitHub
```

### Backend — Render
- Push `server/` to GitHub
- Connect repo on [render.com](https://render.com)
- Add environment variables in Render dashboard

---

## 📄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/upload` | Upload resume for analysis |
| POST | `/api/match` | Match resume against job description |

---

## 🧠 AI Prompt Engineering

The AI analyzes resumes and returns structured JSON with:

```json
{
  "atsScore": 78,
  "strengths": ["Strong technical skills"],
  "weaknesses": ["Missing measurable achievements"],
  "missingSkills": ["Docker", "Redux", "Jest"],
  "keywords": ["optimized", "scalable", "RESTful APIs"],
  "suggestions": ["Add numbers to achievements"],
  "internshipReadiness": 72,
  "overallFeedback": "Your resume shows good potential..."
}
```

---

## 👨‍💻 Author

**Rudra**
- GitHub: [Rudra29064](https://github.com/Rudra29064)
- LinkedIn: [Rudra Patel](https://www.linkedin.com/in/rudra-p-27268b345/)

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Show your support

Give a ⭐ if this project helped you!
