# Resume Roaster 💀

> **"Destroy your career before a recruiter does."**

Resume Roaster is a full-stack web application that uses AI to provide brutally honest, comedic feedback on resumes. Designed with a "Neon Brutalism" aesthetic, it combines a high-performance React frontend with serverless Node.js functions to analyze PDF resumes against specific job descriptions.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

*   **AI-Powered Analysis**: Utilizes Large Language Models (LLMs) via CometAPI/OpenAI to generate context-aware critiques.
*   **PDF Parsing Engine**: Custom serverless implementation to extract text from PDF documents on the fly.
*   **Neon Brutalism UI**: A distinctive, high-contrast design language using Tailwind CSS v4 variables and custom animations.
*   **Real-time Feedback**: Interactive "Terminal" style console with typewriter effects for roast delivery.
*   **Serverless Architecture**: Built on Vercel Serverless Functions for scalable, cost-effective backend logic.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React 19 + Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4 (using modern CSS variables @theme configuration)
*   **Icons**: Lucide React
*   **Animations**: Framer Motion

### Backend
*   **Runtime**: Node.js (Vercel Serverless Functions)
*   **AI Integration**: OpenAI SDK (configured for CometAPI)
*   **PDF Processing**: `pdf-parse`

### DevOps & Tooling
*   **Linting**: ESLint + TypeScript-ESLint
*   **Deployment**: Vercel
*   **Package Manager**: npm

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
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
    Create a `.env` file in the root directory and add your API key:
    ```env
    COMET_API_KEY=your_api_key_here
    ```

4.  **Run Locally**
    Start the full-stack development environment (Frontend + Serverless Functions):
    ```bash
    npm run dev:full
    ```
    The application will be available at `http://localhost:3000`.

## 📂 Project Structure

```
resume-roaster/
├── api/                # Serverless functions (Backend)
│   └── roast.js        # Main API endpoint for handling roasts
├── src/                # Frontend source code
│   ├── components/     # Reusable React components (FileUpload, JobInput, etc.)
│   ├── App.tsx         # Main application logic
│   └── index.css       # Global styles & Tailwind v4 config
├── public/             # Static assets
└── vercel.json         # Vercel routing and function configuration
```

## 🔮 Future Improvements

*   **Resume Scoring**: Add a numerical score (0-100) based on ATS (Applicant Tracking System) compatibility.
*   **History Mode**: Save previous roasts using local storage or a database.
*   **Direct PDF Export**: Allow users to download their "Roast Report".
*   **Multi-Model Support**: Toggle between different roast personas (e.g., "Passive Aggressive HR", "Tech Bro", "Boomer Boss").

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with toxicity and ❤️ by Asif Hossain.*
