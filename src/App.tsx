import { useState } from 'react';
import { Skull } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { JobInput } from './components/JobInput';
import { ToxicButton } from './components/ToxicButton';
import { RoastConsole } from './components/RoastConsole';

interface RoastResult {
  roast: string;
  missingKeywords: string[];
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [loadingText, setLoadingText] = useState('INITIALIZING...');

  const loadingMessages = [
    "Judging your GPA...",
    "Laughing at your skills...",
    "Finding reasons to reject you...",
    "Comparing you to an intern...",
    "Generating emotional damage...",
    "Scanning for competence (0 found)..."
  ];

  const handleRoast = async () => {
    if (!file || !jobDescription) {
      alert("UPLOAD THE RESUME AND JOB DESCRIPTION, YOU IDIOT.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    let msgIdx = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingMessages[msgIdx % loadingMessages.length]);
      msgIdx++;
    }, 1500);

    try {
      // Convert file to Base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix (e.g., "data:application/pdf;base64,")
          const base64Clean = result.split(',')[1];
          resolve(base64Clean);
        };
        reader.onerror = error => reject(error);
      });

      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeBase64: base64,
          jobDescription,
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON:", responseText);
        throw new Error(`Server Error: ${responseText.slice(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Server crashed laughing at you.');
      }

      setResult(data);

    } catch (error: any) {
      console.error(error);
      alert(`ERROR: ${error.message}`);
    } finally {
      setIsLoading(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 text-zinc-100 flex flex-col font-sans selection:bg-error selection:text-white">

      {/* Header */}
      <header className="flex items-center justify-center gap-4 mb-12">
        <Skull className="w-10 h-10 text-error animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase glitch-text" style={{ fontFamily: '"Fira Code", monospace' }}>
          Resume <span className="text-error">Roaster</span>
        </h1>
        <Skull className="w-10 h-10 text-error animate-pulse" />
      </header>

      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column: Input */}
        <div className="flex flex-col gap-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 text-zinc-400 font-mono border-l-4 border-error pl-4">
              STEP 1: UPLOAD YOUR FAILURE
            </h2>
            <FileUpload onFileSelect={setFile} />
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 text-zinc-400 font-mono border-l-4 border-error pl-4">
              STEP 2: THE UNREACHABLE DREAM
            </h2>
            <JobInput value={jobDescription} onChange={setJobDescription} />
          </div>

          <ToxicButton
            onClick={handleRoast}
            isLoading={isLoading}
            disabled={!file || !jobDescription}
          />
        </div>

        {/* Right Column: Output */}
        <div className="h-[600px] lg:h-auto min-h-[500px]">
          <RoastConsole
            result={result}
            isLoading={isLoading}
            loadingText={loadingText}
          />
        </div>

      </main>

      <footer className="mt-12 text-center text-zinc-600 font-mono text-xs">
        © {new Date().getFullYear()} RESUME ROASTER INC. WE HATE YOU.
      </footer>
    </div>
  );
}

export default App;
