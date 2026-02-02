# Resume Roaster 💀

> **"Destroy your career before a recruiter does."**

Resume Roaster is a full-stack web application that combines brutal honesty with genuine career advice. Using an "AI Hiring Manager" persona, it analyzes your resume against a specific job description to deliver a toxic roast—and a reality check.

**New Feature: Visa & Reality Check** 🌍✈️  
The app now cross-references your current location with the target job country to call out unrealistic applications (e.g., applying for on-site roles in London from overseas without visa support).

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Key Features

*   **🔥 The Roast Console**: A "Terminator-style" terminal that delivers context-aware, humorous critiques of your resume.
*   **💡 Career Fixer Console**: A separate, constructive panel that offers specific action items, skill gap analysis, and formatting tips.
*   **🌍 Visa Reality Check**: Automatically detects location mismatches and warns users about visa sponsorships and relocation hurdles.
*   **📄 Serverless PDF Parsing**: Custom implementation to parse resumes on the fly without heavy backend infrastructure.
*   **🎨 Neon Brutalism UI**: A high-contrast, animated interface built with the latest Tailwind CSS v4.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React 19 + Vite
*   **Styling**: Tailwind CSS v4 (using native CSS variables & @theme)
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

### Backend
*   **Infrastructure**: Vercel Serverless Functions (Node.js)
*   **AI Engine**: CometAPI (OpenAI-compatible)
*   **PDF Engine**: `pdf-parse` (Custom serverless adapter)

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/resume-roaster.git
    cd resume-roaster
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    COMET_API_KEY=your_api_key_here
    ```

4.  **Run Locally**
    Start the full-stack environment:
    ```bash
    npm run dev:full
    ```
    Access the app at `http://localhost:3000`.

## 📂 Project Structure

```
resume-roaster/
├── api/                # Serverless Backend
│   └── roast.js        # Main API (AI + PDF logic)
├── src/                # Frontend
│   ├── components/     # UI Components
│   │   ├── RoastConsole.tsx      # Toxic output
│   │   ├── SuggestionConsole.tsx # Helpful output
│   │   └── JobInput.tsx          # Location/Job data
│   ├── App.tsx         # Main Logic
│   └── index.css       # Tailwind v4 Theme
└── vercel.json         # Deployment Config
```

## 🔮 Roadmap

*   **Resume Scoring**: Numerical ATS score (0-100).
*   **User History**: Local storage for past roasts.
*   **Social Sharing**: Generate "Roast Cards" for Twitter/X.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

*Built with toxicity and ❤️ by Asif Hossain.*
