## Meme Policy Generator

Meme Policy Generator is a web-based AI tool that converts complex political or policy documents into easy-to-understand memes and infographic cards.

**Goal:** Help users quickly understand and share dense policy content in a fun, visual, and engaging format suitable for hackathon demos.

### Features

- **Text & File Input**: Paste long policy text or upload PDF/TXT files.
- **AI Processing**:
  - Summarize into 3–5 key points in simple language.
  - Generate meme-style captions and infographic headlines.
  - Maintain neutral, educational tone (no political persuasion).
- **Meme Generator**:
  - Pre-defined meme templates (e.g. Drake, Distracted Boyfriend, Brain Expansion).
  - Auto-map key points to captions.
  - Real-time preview.
- **Infographic Generator**:
  - Square, mobile-first cards (Instagram-ready).
  - Bold colors, minimal text, large typography.
- **UI/UX**:
  - Dark mode with neon highlights.
  - Simple flow: Upload → Generate → Preview → Download.
  - Smooth transitions and loading animations.
- **Ethics & Safety**:
  - Disclaimer: “Memes are for educational purposes only.”
  - AI prompt tuned to avoid misinformation, hate speech, or targeted persuasion.
  - All content clearly labeled as AI-generated.

### Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: OpenAI API (or compatible) via a simple REST endpoint
- **Rendering**: HTML/CSS with `html2canvas` for PNG export

---

## Project Structure

```text
.
├─ client/              # React + Vite frontend
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ PolicyInput.jsx
│  │  │  ├─ MemePreview.jsx
│  │  │  ├─ InfographicPreview.jsx
│  │  │  ├─ LoadingOverlay.jsx
│  │  │  └─ layout/
│  │  │     ├─ TopBar.jsx
│  │  │     └─ FlowStepper.jsx
│  │  ├─ data/
│  │  │  └─ memeTemplates.js
│  │  ├─ lib/
│  │  │  └─ api.js
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ styles.css
│  ├─ index.html
│  ├─ tailwind.config.cjs
│  └─ postcss.config.cjs
└─ server/              # Node.js backend
   ├─ index.js
   ├─ openaiClient.js
   └─ .env.example
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI-compatible API key

### 1. Install dependencies

From the project root:

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure environment

In the `server` folder, copy the example env file and add your API key:

```bash
cd server
cp .env.example .env
```

Edit `.env`:

```bash
OPENAI_API_KEY=your_api_key_here
PORT=4000
```

### 3. Run the backend

```bash
cd server
npm run dev
```

This starts the API server on `http://localhost:4000`.

### 4. Run the frontend

In a separate terminal:

```bash
cd client
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

---

## API Overview

### `POST /api/generate`

**Body:**

```json
{
  "rawText": "Full policy text...",
  "options": {
    "maxPoints": 5
  }
}
```

**Response (shape):**

```json
{
  "summaryPoints": [
    "Simple explanation of key point 1",
    "..."
  ],
  "memes": [
    {
      "templateId": "drake",
      "topText": "When the policy is 300 pages...",
      "bottomText": "But all it really does is X"
    }
  ],
  "infographics": [
    {
      "title": "What this policy actually does",
      "icon": "scale",
      "body": "Short, neutral explanation..."
    }
  ]
}
```

The backend uses carefully commented prompt engineering to:

- Extract 3–5 neutral, factual key points.
- Generate meme captions that are playful but not hateful or targeted.
- Generate short infographic titles and blurbs for educational purposes.

---

## Ethics & Safety Notes

- The tool is educational and should **not** be used for targeted political persuasion.
- All generated content is labeled as AI-created.
- Prompts are tuned to avoid:
  - Hate speech or harassment.
  - Advocacy for real-world harm.
  - Misleading factual claims.

You are encouraged to review and adjust the prompts and add additional content filters if needed for production environments.

---

## Hackathon Demo Tips

- Prepare 1–2 sample policy snippets to showcase:
  - Before: dense paragraph.
  - After: 3–5 point summary + 2–3 memes + infographic cards.
- Emphasize:
  - **Clarity**: “This turns intimidating PDFs into snackable visuals.”
  - **Shareability**: “One click to download meme cards for social.”
  - **Neutrality**: “Designed to explain, not persuade.”

