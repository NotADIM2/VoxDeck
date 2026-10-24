'use client';

import React, { useState, useEffect } from 'react';
import { PitchData, PitchSlide } from '../types/pitch';
import RegionalPromptShowcase, {
  REGIONAL_PROMPT_SHOWCASE_DATA,
} from '../components/RegionalPromptShowcase';
import FooterSection from '../components/FooterSection';
import {
  Mic,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Presentation,
  FileText,
  Target,
  DollarSign,
  Lightbulb,
  AlertCircle,
  Layers,
  Clock,
  Download,
  Volume2,
  ArrowLeft,
  Zap,
  CheckCircle2,
  RotateCcw,
  LayoutGrid,
  Trash2,
  Play,
  Pause,
  Share2,
  Search,
  Bell,
  Globe,
  Menu,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  Shield,
  Layers2,
  X,
} from 'lucide-react';

const STORAGE_KEY_PITCH = 'voxdeck_saved_pitch';
const STORAGE_KEY_TRANSCRIPT = 'voxdeck_saved_transcript';

interface VoiceSample {
  id: string;
  title: string;
  category: string;
  duration: string;
  date: string;
  prompt: string;
}

const VOICE_SAMPLES: VoiceSample[] = [
  {
    id: 'rollcall',
    title: 'RollCall AI (Attendance)',
    category: 'EdTech • University',
    duration: '1:12',
    date: 'Today',
    prompt: `Okay, so basically we are building an AI-powered attendance and student engagement system for colleges called RollCall AI. Right now, professors waste like 10 to 15 minutes every single lecture taking roll call manually or passing around paper sheets where students just fake proxy signatures for their friends. It's completely broken and colleges lose thousands of hours every semester. 

Our solution is a discreet, privacy-first 360-degree sensor and mobile app that uses localized Bluetooth LE and multi-factor biometric facial recognition to verify attendance in literally 3 seconds as students walk into the lecture hall. It integrates directly with Canvas, Blackboard, and Banner ERP so attendance is instantly recorded with zero teacher effort.

The market is huge. There are over 4,000 degree-granting colleges in the US alone and over 25,000 worldwide. We're initially targeting mid-sized engineering and state universities where lecture sizes are 100+ students. 

For the business model, we do a B2B SaaS annual subscription charging $5 per student per year, plus a $200 hardware installation fee per lecture hall. For a university with 15,000 students, that's $75,000 in ARR. We already ran a pilot at our campus across 8 engineering classes with 1,200 students, achieving 99.4% accuracy and zero proxy attendance. We're raising a $500k pre-seed round to scale manufacturing and expand to 15 partner campuses by next fall.`,
  },
  {
    id: 'pawswalk',
    title: 'PawsWalk (On-Demand Pet Care)',
    category: 'Marketplace • Consumer',
    duration: '0:56',
    date: 'Yesterday',
    prompt: `So here's what we're building: a mobile app for pet owners called PawsWalk that matches busy dog owners with trusted local walkers on-demand within 15 minutes. The big problem right now is that existing apps like Rover take hours to confirm bookings, and working professionals often get stuck in late meetings with no emergency care for their dogs.

Our product gives pet parents instant on-demand walker matching with live GPS walk tracking, automated photo check-ins, and biometric smart lock integration so walkers can enter securely. All walkers are background-checked, bonded, and certified in pet first-aid.

The pet care industry is booming, over $130 billion in the US with 65 million dog-owning households. We take a 20% commission on every walk, averaging $6 take-rate per $30 30-minute walk, plus an optional $15/month PawsWalk+ subscription for free same-hour rush bookings and pet insurance discounts. In our beta in Austin, we booked 3,400 walks in 60 days with 68% repeat weekly retention. We're raising $750k to expand to Denver and Seattle.`,
  },
  {
    id: 'medscript',
    title: 'MedScript (Ambient Voice EHR)',
    category: 'Healthcare • B2B SaaS',
    duration: '1:04',
    date: '2d ago',
    prompt: `Listen, emergency room doctors spend more than half their shift typing clinical notes into clunky electronic health record systems instead of actually caring for sick patients. It causes massive physician burnout and increases ER wait times by hours.

MedScript is an ambient AI clinical documentation copilot that runs silently on an iPad or Apple Watch. As the doctor speaks naturally with the patient, MedScript captures the conversation, filters out small talk, extracts ICD-10 billing codes, and drafts completed SOAP notes directly into Epic and Cerner with zero doctor typing.

There are over 6,000 hospitals in North America and 140 million annual ER visits. We charge a flat $400/month SaaS fee per physician license. Our initial pilot across 3 regional emergency departments reduced documentation time from 18 minutes per patient to 90 seconds, saving each doctor 2.5 hours per shift. We are raising $1M seed to complete our HIPAA SOC2 Type II audit and scale hospital deployments.`,
  },
];

const LOADING_STEPS = [
  'Listening to your voice brain-dump...',
  'Extracting market opportunity & core problem...',
  'Architecting 10-slide YC-grade narrative...',
  'Synthesizing revenue model & competitive moat...',
  'Drafting high-conviction 60-second investor pitch...',
  'Finalizing executive deck...',
];

/**
 * Official VoxDeck Circular Soundwave Logo.
 * Matches the reference asset with dual symmetrical soundwave aperture lobes.
 */
function VoxDeckLogo({
  size = 36,
  variant = 'white',
  className = '',
}: {
  size?: number;
  variant?: 'white' | 'dark' | 'transparent';
  className?: string;
}) {
  const bgFill =
    variant === 'white'
      ? '#ffffff'
      : variant === 'dark'
        ? '#121318'
        : 'transparent';

  const glyphFill =
    variant === 'white'
      ? '#07080B'
      : '#ffffff';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="VoxDeck Logo"
    >
      {variant !== 'transparent' && (
        <circle
          cx="50"
          cy="50"
          r="48"
          fill={bgFill}
          stroke={variant === 'dark' ? 'rgba(255,255,255,0.1)' : 'transparent'}
          strokeWidth="2"
        />
      )}
      {/* Left Symmetrical Soundwave / Aperture Lobe */}
      <path
        d="M 43 23 C 31 24 22 35 22 50 C 22 65 31 76 43 77 C 45.8 77 46.8 74.2 45.9 71.5 C 43.2 62 43.2 38 45.9 28.5 C 46.8 25.8 45.8 23 43 23 Z"
        fill={glyphFill}
      />
      {/* Right Symmetrical Soundwave / Aperture Lobe */}
      <path
        d="M 57 23 C 69 24 78 35 78 50 C 78 65 69 76 57 77 C 54.2 77 53.2 74.2 54.1 71.5 C 56.8 62 56.8 38 54.1 28.5 C 53.2 25.8 54.2 23 57 23 Z"
        fill={glyphFill}
      />
    </svg>
  );
}

/**
 * Minimalist Soundwave Aperture Icon for buttons and inline badges.
 */
function VoxDeckIcon({
  className = 'w-4 h-4',
  fill = 'currentColor',
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 43 23 C 31 24 22 35 22 50 C 22 65 31 76 43 77 C 45.8 77 46.8 74.2 45.9 71.5 C 43.2 62 43.2 38 45.9 28.5 C 46.8 25.8 45.8 23 43 23 Z"
        fill={fill}
      />
      <path
        d="M 57 23 C 69 24 78 35 78 50 C 78 65 69 76 57 77 C 54.2 77 53.2 74.2 54.1 71.5 C 56.8 62 56.8 38 54.1 28.5 C 53.2 25.8 54.2 23 57 23 Z"
        fill={fill}
      />
    </svg>
  );
}

export default function VoxDeckPage() {
  // Input state
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Result state
  const [pitchData, setPitchData] = useState<PitchData | null>(null);
  const [activeCenterTab, setActiveCenterTab] = useState<'deck' | 'overview' | 'script'>('deck');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideViewMode, setSlideViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Persistence & feedback
  const [hasSavedHistory, setHasSavedHistory] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedFullMarkdown, setCopiedFullMarkdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [playingSampleId, setPlayingSampleId] = useState<string | null>(null);

  // Identify currently loaded sample (standard tech sample or regional native prompt)
  const loadedSample = VOICE_SAMPLES.find(
    (s) => s.id === selectedSampleId || (transcript.trim().length > 0 && s.prompt.trim() === transcript.trim())
  );
  const loadedRegionalPrompt = REGIONAL_PROMPT_SHOWCASE_DATA.find(
    (r) => r.id === selectedSampleId || (transcript.trim().length > 0 && r.prompt.trim() === transcript.trim())
  );

  // Show temporary toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3200);
  };

  // Restore cached pitch on mount
  useEffect(() => {
    try {
      const savedTranscript = localStorage.getItem(STORAGE_KEY_TRANSCRIPT);
      if (savedTranscript) setTranscript(savedTranscript);

      const savedPitch = localStorage.getItem(STORAGE_KEY_PITCH);
      if (savedPitch) {
        const parsed = JSON.parse(savedPitch) as PitchData;
        if (parsed?.startupName && Array.isArray(parsed.slides) && parsed.slides.length > 0) {
          setPitchData(parsed);
          setHasSavedHistory(true);
          showToast(`Restored saved pitch: ${parsed.startupName}`);
        }
      }
    } catch (e) {
      console.warn('LocalStorage restore error:', e);
    }
  }, []);

  // Cycle loading steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Generate pitch handler
  const handleGeneratePitch = async () => {
    const trimmed = transcript.trim();
    if (!trimmed) {
      setError('Please dictate or paste your startup idea before generating.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStepIdx(0);

    try {
      const response = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate pitch deck. Please try again.');
      }

      setPitchData(data);
      setCurrentSlideIndex(0);
      setActiveCenterTab('deck');
      setHasSavedHistory(true);

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY_PITCH, JSON.stringify(data));
        localStorage.setItem(STORAGE_KEY_TRANSCRIPT, trimmed);
      } catch (cacheErr) {
        console.warn('LocalStorage cache error:', cacheErr);
      }

      showToast(`Pitch deck for "${data.startupName}" created!`);
      const targetEl = document.getElementById('workspace-panel');
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Pitch generation error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load sample brain dump into center input box
  const handleLoadSample = (sample: VoiceSample) => {
    // If pitch was already generated, reset to input view so user can see and edit the loaded text
    if (pitchData) {
      setPitchData(null);
    }
    setTranscript(sample.prompt);
    setSelectedSampleId(sample.id);
    setError(null);
    showToast(`Loaded sample: ${sample.title}. Click "Generate Pitch Deck" below to test!`);

    // Smoothly focus textarea
    const textareaEl = document.getElementById('transcript-input') as HTMLTextAreaElement | null;
    if (textareaEl) {
      textareaEl.focus();
      textareaEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Reset to input view
  const handleReset = () => {
    setPitchData(null);
    setCurrentSlideIndex(0);
    setError(null);
    setSelectedSampleId(null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingSampleId(null);
    }
  };

  // Clear history
  const handleClearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_PITCH);
      localStorage.removeItem(STORAGE_KEY_TRANSCRIPT);
    } catch (e) {
      console.warn('Clear error:', e);
    }
    setPitchData(null);
    setTranscript('');
    setSelectedSampleId(null);
    setHasSavedHistory(false);
    setError(null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingSampleId(null);
    }
    showToast('Saved pitch history cleared.');
  };

  // Copy 60s script
  const handleCopyScript = () => {
    if (!pitchData) return;
    navigator.clipboard.writeText(pitchData.pitchScript);
    setCopiedScript(true);
    showToast('60-Second Investor Pitch Script copied!');
    setTimeout(() => setCopiedScript(false), 2000);
  };

  // Copy full markdown
  const handleCopyFullPitchMarkdown = () => {
    if (!pitchData) return;

    const fullMarkdown = [
      `# ${pitchData.startupName}`,
      `> ${pitchData.tagline}`,
      '',
      '---',
      '',
      '## 📌 Executive Overview',
      `- **Problem:** ${pitchData.problem}`,
      `- **Solution:** ${pitchData.solution}`,
      `- **Target Market:** ${pitchData.targetMarket}`,
      `- **Revenue Model:** ${pitchData.revenueModel}`,
      '',
      '---',
      '',
      '## 📊 10-Slide Investor Pitch Deck',
      '',
      ...pitchData.slides.map(
        (slide) =>
          `### Slide ${slide.slideNumber}: ${slide.title}\n${slide.content}\n`
      ),
      '---',
      '',
      '## 🎙️ 60-Second Investor Pitch Script',
      `"${pitchData.pitchScript}"`,
      '',
      '---',
      '*Generated with VoxDeck — Voice Brain-Dump to Investor Pitch Deck*',
    ].join('\n');

    navigator.clipboard.writeText(fullMarkdown);
    setCopiedFullMarkdown(true);
    showToast('Full Pitch Markdown copied to clipboard!');
    setTimeout(() => setCopiedFullMarkdown(false), 2500);
  };

  // Download JSON
  const handleDownloadJSON = () => {
    if (!pitchData) return;
    const blob = new Blob([JSON.stringify(pitchData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pitchData.startupName.toLowerCase().replace(/\s+/g, '-')}-pitch-deck.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON deck file downloaded.');
  };

  // Toggle audio preview play / pause for sample dumps
  const handleTogglePlaySample = (sample: VoiceSample, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // If textarea doesn't have this sample loaded, populate it
    if (transcript.trim() !== sample.prompt.trim()) {
      if (pitchData) setPitchData(null);
      setTranscript(sample.prompt);
      setSelectedSampleId(sample.id);
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.');
      return;
    }

    // If this sample is already playing, pause it
    if (playingSampleId === sample.id) {
      window.speechSynthesis.cancel();
      setPlayingSampleId(null);
      showToast(`Paused preview: ${sample.title}`);
      return;
    }

    // Stop any previous speech and start this sample
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sample.prompt);
    utterance.rate = 1.05;

    utterance.onstart = () => {
      setPlayingSampleId(sample.id);
    };

    utterance.onend = () => {
      setPlayingSampleId(null);
    };

    utterance.onerror = () => {
      setPlayingSampleId(null);
    };

    window.speechSynthesis.speak(utterance);
    setPlayingSampleId(sample.id);
    showToast(`Playing audio preview: ${sample.title}`);
  };

  // Listen via Web Speech Synthesis for teleprompter
  const handleListenVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingSampleId(null);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
      showToast('Playing voice speech preview...');
    }
  };

  // Cancel any ongoing speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07080B] text-neutral-100 font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Subtle Gradient & Cosmic Star Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent blur-3xl" />
        <div className="absolute top-[20%] left-1/4 w-96 h-96 bg-purple-900/[0.06] rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-1/4 w-96 h-96 bg-blue-900/[0.05] rounded-full blur-[140px]" />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-[#121318]/95 border border-white/10 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION HEADER (Matching Screenshot Centered Floating Pill) */}
      {/* ========================================================================= */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 flex items-center justify-between gap-3">
        {/* Left: Brand Icon + Name */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="shadow-lg shadow-white/10 rounded-full">
            <VoxDeckLogo size={36} variant="white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">VoxDeck</span>
        </div>

        {/* Center: Floating Pill Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121318]/80 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-md shadow-inner">
          <button
            type="button"
            onClick={() => {
              if (pitchData) handleReset();
              const el = document.getElementById('workspace-panel');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${!pitchData ? 'bg-[#22242c] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
          >
            Studio
          </button>
          <button
            type="button"
            onClick={() => {
              if (pitchData) setActiveCenterTab('overview');
              const el = document.getElementById('workspace-panel');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${pitchData && activeCenterTab === 'overview' ? 'bg-[#22242c] text-white' : 'text-neutral-400 hover:text-white'
              }`}
          >
            Executive Summary
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition"
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition"
          >
            About
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Quick Resume Button if history exists */}
          {!pitchData && hasSavedHistory && (
            <button
              type="button"
              onClick={() => {
                const saved = localStorage.getItem(STORAGE_KEY_PITCH);
                if (saved) {
                  setPitchData(JSON.parse(saved));
                  showToast('Resumed saved pitch');
                }
              }}
              className="hidden sm:inline-flex min-h-[38px] items-center text-xs text-neutral-300 hover:text-white bg-[#121318] border border-white/10 px-3.5 py-1.5 rounded-full transition active:scale-95"
            >
              Resume Deck
            </button>
          )}

          {/* Notifications / Status Bell */}
          <button
            type="button"
            onClick={() => showToast('VoxDeck Engine active • Gemini 3.5 Flash')}
            className="w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-[#121318] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white relative transition active:scale-95"
            title="Engine Status"
            aria-label="Engine Status"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2.5 right-2.5 ring-2 ring-[#121318]" />
          </button>

          {/* Menu / Clean Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-white flex items-center justify-center text-black hover:bg-neutral-200 transition active:scale-95"
            title="Toggle Menu"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-3 sm:px-6 pb-4 animate-in slide-in-from-top-2 duration-200">
          <div className="rounded-2xl bg-[#121318]/95 border border-white/10 p-3 sm:p-4 shadow-2xl backdrop-blur-xl space-y-1.5">
            <button
              type="button"
              onClick={() => {
                if (pitchData) handleReset();
                setMobileMenuOpen(false);
                const el = document.getElementById('workspace-panel');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${!pitchData ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-neutral-900'
                }`}
            >
              <span className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>Voice Input Studio</span>
              </span>
              {!pitchData && <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-mono">Active</span>}
            </button>

            {pitchData && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCenterTab('deck');
                    setMobileMenuOpen(false);
                    const el = document.getElementById('workspace-panel');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${activeCenterTab === 'deck' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Presentation className="w-4 h-4" />
                    <span>10-Slide Pitch Deck</span>
                  </span>
                  {activeCenterTab === 'deck' && <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-mono">Viewing</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveCenterTab('script');
                    setMobileMenuOpen(false);
                    const el = document.getElementById('workspace-panel');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${activeCenterTab === 'script' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>60s Pitch Script</span>
                  </span>
                  {activeCenterTab === 'script' && <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-mono">Viewing</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveCenterTab('overview');
                    setMobileMenuOpen(false);
                    const el = document.getElementById('workspace-panel');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${activeCenterTab === 'overview' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Executive Summary</span>
                  </span>
                  {activeCenterTab === 'overview' && <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-mono">Viewing</span>}
                </button>
              </>
            )}



            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('faq');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Frequently Asked Questions</span>
              </span>
              <span className="text-[10px] bg-neutral-850 text-neutral-400 px-2 py-0.5 rounded-full font-mono">
                5 FAQs
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>About VoxDeck</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('privacy');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Privacy &amp; Security</span>
              </span>
            </button>

            {hasSavedHistory && !pitchData && (
              <button
                type="button"
                onClick={() => {
                  const saved = localStorage.getItem(STORAGE_KEY_PITCH);
                  if (saved) {
                    setPitchData(JSON.parse(saved));
                    showToast('Resumed saved pitch');
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/40"
              >
                <span>↺ Resume Saved Pitch</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Exact Typography & Badge from Reference Photo) */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 lg:pt-16 pb-10 sm:pb-14 text-center space-y-5 sm:space-y-6">
        {/* Sleek Pill Badge (Matching [• We are on top] style) */}
        <div className="inline-flex items-center gap-2 bg-[#121318] border border-white/10 rounded-full p-1 pl-1.5 pr-3 sm:pr-4 text-xs shadow-lg max-w-full flex-wrap justify-center">
          <span className="bg-white text-black font-semibold rounded-full px-2.5 py-0.5 text-[11px] flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            Voice to Pitch Deck
          </span>
          <span className="text-neutral-300 font-medium text-[11px] sm:text-xs truncate sm:overflow-visible">
            Zero Latency Brain-Dump Synthesis
          </span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.14] sm:leading-[1.08] px-2">
          <span className="text-emerald-400">Instant</span> Response &amp; <span className="text-emerald-400">Zero</span>
          <br className="hidden sm:inline" />{' '}
          Latency Pitch Engine
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
          Eliminate pitch preparation friction entirely with an engine designed to process raw, rambling voice brain-dumps and deliver structured 10-slide decks and pitch scripts in seconds.
        </p>

        {/* Primary CTA (White rounded pill button matching screenshot) */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('transcript-input');
              if (el) {
                el.focus();
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="min-h-[48px] bg-white text-black font-semibold px-7 py-3 rounded-full hover:bg-neutral-200 transition shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 text-sm sm:text-base"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* REGIONAL PROMPT SHOWCASE (Visual Moving Ticker Track) */}
      {/* ========================================================================= */}
      <div id="regional-showcase">
        <RegionalPromptShowcase />
      </div>

      {/* ========================================================================= */}
      {/* 3. MULTI-PANE WORKSPACE (Responsive Mobile-Stack + Desktop 3-Column Layout) */}
      {/* ========================================================================= */}
      <section id="workspace-panel" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16 sm:pb-20 dashboard-3d-perspective">

        {/* Mobile View Switcher (Visible on small screens when pitch is generated) */}
        {pitchData && (
          <div className="lg:hidden flex items-center gap-1.5 p-1 rounded-2xl bg-[#0e0f14] border border-white/10 mb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveCenterTab('deck')}
              className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shrink-0 active:scale-95 ${activeCenterTab === 'deck' ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>10 Slides</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCenterTab('script')}
              className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shrink-0 active:scale-95 ${activeCenterTab === 'script' ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>60s Pitch</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCenterTab('overview')}
              className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shrink-0 active:scale-95 ${activeCenterTab === 'overview' ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Summary</span>
            </button>
          </div>
        )}

        <div className="dashboard-3d-floating rounded-2xl sm:rounded-[28px] bg-[#0A0B0E] border border-white/10 shadow-2xl p-2.5 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 backdrop-blur-2xl relative overflow-hidden">

          {/* ----------------------------------------------------------------------- */}
          {/* PANE 2: CENTER MAIN STAGE (Order-1 on mobile so action is at top) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="order-1 lg:order-2 lg:col-span-6 bg-[#0B0C10] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden min-h-[480px] sm:min-h-[560px]">
            {/* Subtle background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            {/* STATE A: INPUT VIEW (Before Pitch Generation) */}
            {!pitchData ? (
              <div className="space-y-5 sm:space-y-6 flex-1 flex flex-col justify-between z-10">
                {/* Central Futuristic Orb Icon with Custom VoxDeck Circular Soundwave Logo */}
                <div className="text-center space-y-3 pt-2">
                  <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-950 p-[1.5px] shadow-2xl shadow-white/10 mx-auto group hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1c1e28] to-[#0c0d12] flex items-center justify-center border border-white/15 p-2">
                      <VoxDeckLogo size={36} variant="white" className="shadow-lg" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Unlock the power of Voice AI
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-1 leading-relaxed px-1">
                      Dictate with your preferred voice tool (or type) your raw, unstructured startup idea below.
                    </p>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5 shadow-lg">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-0.5">
                      <p className="font-semibold text-rose-100">Generation Error</p>
                      <p className="text-rose-300 leading-relaxed">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setError(null)}
                      className="text-rose-400 hover:text-rose-200 text-xs underline min-h-[32px] flex items-center"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Main Voice Textarea Card */}
                <div className="space-y-2.5">
                  {/* Active Loaded Sample Banner / Helper Hint */}
                  {(loadedSample || loadedRegionalPrompt) && (
                    <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs shadow-lg animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                        <span className="truncate">
                          Loaded sample:{' '}
                          <strong className="text-white font-semibold">
                            {loadedRegionalPrompt
                              ? `${loadedRegionalPrompt.label} (${loadedRegionalPrompt.nativeScriptTag})`
                              : loadedSample?.title}
                          </strong>
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-900/50 border border-emerald-700/50 px-2 py-0.5 rounded-full shrink-0 ml-2">
                        Click &ldquo;Generate Pitch Deck&rdquo; ↓
                      </span>
                    </div>
                  )}

                  <div className="relative rounded-2xl bg-[#121318] border border-white/10 p-3.5 sm:p-4 shadow-xl focus-within:border-white/30 transition">
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-medium text-neutral-300">Voice Brain-Dump Input</span>
                      </span>
                      <span className="font-mono text-[11px]">
                        {transcript.trim() ? `${transcript.trim().split(/\s+/).length} words` : '0 words'}
                      </span>
                    </div>

                    <textarea
                      id="transcript-input"
                      value={transcript}
                      onChange={(e) => {
                        setTranscript(e.target.value);
                        if (selectedSampleId && e.target.value !== (loadedSample?.prompt || loadedRegionalPrompt?.prompt)) {
                          setSelectedSampleId(null);
                        }
                      }}
                      placeholder="Speak or paste your rambling startup idea here... (e.g., We are building an AI-powered attendance system for colleges...)"
                      rows={5}
                      disabled={isLoading}
                      className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none resize-none text-base leading-relaxed min-h-[140px] sm:min-h-[170px]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1 gap-2">
                    <span className="truncate">
                      {loadedRegionalPrompt
                        ? `💡 Loaded "${loadedRegionalPrompt.label}" in authentic native script. Edit freely or click Generate below.`
                        : loadedSample
                          ? `💡 Loaded "${loadedSample.title}". Edit freely or click Generate below.`
                          : '💡 Tip: Ramble freely in English, Punjabi, Marathi, Tamil or Japanese.'}
                    </span>
                    {transcript && (
                      <button
                        type="button"
                        onClick={() => {
                          setTranscript('');
                          setSelectedSampleId(null);
                        }}
                        className="text-neutral-400 hover:text-white transition shrink-0 min-h-[30px] flex items-center"
                      >
                        Clear Text
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGeneratePitch}
                    disabled={isLoading || !transcript.trim()}
                    className={`w-full min-h-[50px] py-3.5 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${isLoading || !transcript.trim()
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5'
                      : 'bg-white text-black hover:bg-neutral-200 shadow-white/10 hover:scale-[1.01] active:scale-[0.98]'
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span className="truncate">{LOADING_STEPS[loadingStepIdx]}</span>
                      </>
                    ) : (
                      <>
                        <VoxDeckIcon className="w-4 h-4 fill-black" />
                        <span>Generate Pitch Deck</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* STATE B: OUTPUT STAGE (Interactive 10-Slide Deck Carousel / Script / Overview) */
              <div className="space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between z-10 animate-in fade-in duration-300">
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      {activeCenterTab === 'deck'
                        ? `Slide ${currentSlideIndex + 1} of ${pitchData.slides.length}`
                        : activeCenterTab === 'script'
                          ? 'Investor Pitch Script'
                          : 'Executive Overview'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate max-w-sm sm:max-w-md">
                      {pitchData.startupName}
                    </h3>
                  </div>

                  {/* Mode Toggle Button */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    {activeCenterTab === 'deck' && (
                      <button
                        type="button"
                        onClick={() => setSlideViewMode(slideViewMode === 'carousel' ? 'grid' : 'carousel')}
                        className="min-h-[38px] px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 hover:text-white transition flex items-center gap-1.5 active:scale-95"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>{slideViewMode === 'carousel' ? 'Grid View' : 'Carousel'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Content according to activeCenterTab */}
                {activeCenterTab === 'deck' ? (
                  slideViewMode === 'carousel' ? (
                    pitchData.slides[currentSlideIndex] && (
                      <div className="flex-1 flex flex-col justify-between rounded-xl sm:rounded-2xl bg-[#121318] border border-white/10 p-4 sm:p-6 lg:p-8 min-h-[320px] sm:min-h-[360px] shadow-2xl relative overflow-hidden">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-neutral-300 shrink-0">
                              SLIDE 0{pitchData.slides[currentSlideIndex].slideNumber}
                            </span>
                            <span className="text-xs text-neutral-500 font-mono truncate">
                              {pitchData.tagline}
                            </span>
                          </div>

                          <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                            {pitchData.slides[currentSlideIndex].title}
                          </h4>

                          <div className="text-neutral-300 text-xs sm:text-sm lg:text-base leading-relaxed space-y-2 whitespace-pre-line border-l-2 border-white/20 pl-3 sm:pl-4 py-1">
                            {pitchData.slides[currentSlideIndex].content}
                          </div>
                        </div>

                        {/* Navigation Carousel Controls */}
                        <div className="pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentSlideIndex((prev) =>
                                prev > 0 ? prev - 1 : pitchData.slides.length - 1
                              )
                            }
                            className="min-h-[44px] flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 transition active:scale-95"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Prev</span>
                          </button>

                          {/* Dot indicator */}
                          <div className="hidden sm:flex items-center gap-1">
                            {pitchData.slides.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentSlideIndex(idx)}
                                className={`h-1.5 rounded-full transition-all ${idx === currentSlideIndex
                                  ? 'w-6 bg-white'
                                  : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                                  }`}
                                aria-label={`Slide ${idx + 1}`}
                              />
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setCurrentSlideIndex((prev) =>
                                prev < pitchData.slides.length - 1 ? prev + 1 : 0
                              )
                            }
                            className="min-h-[44px] flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition shadow-lg active:scale-95"
                          >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4 text-black" />
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    /* Grid Mode */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                      {pitchData.slides.map((slide, idx) => (
                        <div
                          key={slide.slideNumber}
                          onClick={() => {
                            setCurrentSlideIndex(idx);
                            setSlideViewMode('carousel');
                          }}
                          className={`p-3.5 sm:p-4 rounded-xl border transition cursor-pointer text-left space-y-2 active:scale-98 ${idx === currentSlideIndex
                            ? 'bg-[#181a22] border-white/30'
                            : 'bg-[#121318] border-white/5 hover:border-white/20'
                            }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                            <span>#{slide.slideNumber}</span>
                            <span className="truncate max-w-[140px] font-semibold text-white">{slide.title}</span>
                          </div>
                          <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                            {slide.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )
                ) : activeCenterTab === 'script' ? (
                  /* 60s Script Center View */
                  <div className="flex-1 flex flex-col justify-between rounded-xl sm:rounded-2xl bg-[#121318] border border-white/10 p-4 sm:p-6 min-h-[320px] shadow-2xl space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                        <span>ESTIMATED TIME: ~60 SECONDS</span>
                        <span>{pitchData.pitchScript.split(/\s+/).length} WORDS</span>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto p-4 rounded-xl bg-neutral-900/60 border border-white/5 text-neutral-200 text-sm sm:text-base leading-relaxed font-serif italic whitespace-pre-line">
                        &ldquo;{pitchData.pitchScript}&rdquo;
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
                      <button
                        type="button"
                        onClick={handleCopyScript}
                        className="flex-1 min-h-[44px] flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition shadow-md active:scale-98"
                      >
                        {copiedScript ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
                        <span>{copiedScript ? 'Copied Script!' : 'Copy Pitch Script'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleListenVoice(pitchData.pitchScript)}
                        className="min-h-[44px] px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/10 flex items-center gap-2 text-xs sm:text-sm transition active:scale-95"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Listen Aloud</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Executive Overview Center View */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
                    <div className="p-4 rounded-xl bg-[#121318] border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-rose-400 font-mono uppercase">
                        <span>The Problem</span>
                        <AlertCircle className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{pitchData.problem}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121318] border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-emerald-400 font-mono uppercase">
                        <span>The Solution</span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{pitchData.solution}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121318] border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-cyan-400 font-mono uppercase">
                        <span>Target Market</span>
                        <Target className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{pitchData.targetMarket}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121318] border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono uppercase">
                        <span>Revenue Model</span>
                        <DollarSign className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{pitchData.revenueModel}</p>
                    </div>
                  </div>
                )}

                {/* Bottom Slide Strip (Visible in deck mode) */}
                {activeCenterTab === 'deck' && (
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
                    {pitchData.slides.map((slide, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCurrentSlideIndex(idx);
                          setSlideViewMode('carousel');
                        }}
                        className={`min-h-[40px] sm:min-h-[36px] p-2 rounded-lg text-center text-xs font-mono font-bold border transition flex items-center justify-center active:scale-95 ${idx === currentSlideIndex
                          ? 'bg-white text-black font-bold border-white shadow-md'
                          : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800'
                          }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* PANE 3: RIGHT SIDEBAR (Order-2 on mobile for quick samples/script) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="order-2 lg:order-3 lg:col-span-3 bg-[#0e0f14] border border-white/5 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between space-y-4 sm:space-y-5">
            {/* Right Sidebar Top Bar (VoxDeck Studio Badge + Share Button) */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 gap-2">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <VoxDeckLogo size={32} variant="white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-[#0e0f14]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">VoxDeck Studio</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5 font-mono">Voice Synthesis</p>
                </div>
              </div>

              {/* Share / Export Full Markdown Pill Button */}
              {pitchData ? (
                <button
                  type="button"
                  onClick={handleCopyFullPitchMarkdown}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm active:scale-95 shrink-0"
                  title="Copy Full Pitch as Markdown"
                >
                  {copiedFullMarkdown ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="text-[11px] font-mono text-neutral-500">
                  Ready
                </div>
              )}
            </div>

            {/* Content Area in Right Sidebar */}
            {!pitchData ? (
              /* INPUT STATE: Voice Brain-Dump Cards */
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-medium">
                    <span>Sample Voice Dumps</span>
                    <span className="text-[10px] font-mono text-neutral-500">3 Demos</span>
                  </div>

                  <div className="space-y-2.5">
                    {VOICE_SAMPLES.map((sample) => {
                      const isLoaded = loadedSample?.id === sample.id;
                      const isPlaying = playingSampleId === sample.id;

                      return (
                        <div
                          key={sample.id}
                          onClick={() => handleLoadSample(sample)}
                          className={`group p-3 sm:p-3.5 rounded-xl transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-0.5 cursor-pointer space-y-2.5 text-left relative ${isLoaded
                            ? 'bg-gradient-to-b from-[#151822] to-[#10121a] border border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
                            : 'bg-gradient-to-b from-[#121318] to-[#0E1015] border border-white/10 hover:border-emerald-500/35 hover:shadow-lg'
                            }`}
                        >
                          <div className="flex items-center justify-between text-[11px] gap-2">
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className={`font-semibold transition truncate ${isLoaded ? 'text-white font-bold' : 'text-neutral-200 group-hover:text-white'
                                  }`}
                              >
                                {sample.title}
                              </span>
                              {isLoaded && (
                                <span className="text-[10px] font-mono bg-white text-black font-bold px-1.5 py-0.5 rounded-md shadow-sm shrink-0">
                                  Loaded
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono shrink-0">{sample.date}</span>
                          </div>

                          {/* Audio Waveform Player Strip */}
                          <div
                            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl border transition ${isPlaying
                              ? 'bg-emerald-950/30 border-emerald-500/30 ring-1 ring-emerald-500/20'
                              : isLoaded
                                ? 'bg-neutral-900 border-white/10'
                                : 'bg-neutral-900/80 border-white/5'
                              }`}
                          >
                            <button
                              type="button"
                              onClick={(e) => handleTogglePlaySample(sample, e)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition shadow-sm active:scale-90 ${isPlaying
                                ? 'bg-emerald-400 text-black hover:bg-emerald-300 ring-2 ring-emerald-400/40'
                                : 'bg-white text-black hover:bg-neutral-200'
                                }`}
                              title={isPlaying ? 'Pause audio preview' : 'Play audio preview'}
                              aria-label={isPlaying ? `Pause ${sample.title}` : `Play ${sample.title}`}
                            >
                              {isPlaying ? (
                                <Pause className="w-3.5 h-3.5 fill-black" />
                              ) : (
                                <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                              )}
                            </button>

                            {/* Animated sound wave bars */}
                            <div className="flex-1 flex items-center gap-[2.5px] h-3.5">
                              <span
                                className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 bg-emerald-400 animate-pulse' : 'h-1.5 bg-neutral-600'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-200 ${isPlaying ? 'h-2 bg-emerald-400 animate-pulse delay-75' : 'h-3 bg-neutral-400'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 bg-emerald-400 animate-pulse delay-150' : 'h-2 bg-neutral-500'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-150 ${isPlaying ? 'h-2 bg-emerald-400 animate-pulse delay-100' : 'h-3 bg-white'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-200 ${isPlaying ? 'h-3 bg-emerald-400 animate-pulse delay-200' : 'h-1.5 bg-neutral-500'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'h-2.5 bg-emerald-400 animate-pulse delay-75' : 'h-2.5 bg-neutral-400'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-150 ${isPlaying ? 'h-3.5 bg-emerald-400 animate-pulse delay-300' : 'h-1 bg-neutral-600'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-200 ${isPlaying ? 'h-1.5 bg-emerald-400 animate-pulse delay-150' : 'h-2 bg-neutral-400'
                                  }`}
                              />
                              <span
                                className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'h-3 bg-emerald-400 animate-pulse delay-100' : 'h-3 bg-neutral-300'
                                  }`}
                              />
                            </div>

                            <span
                              className={`text-[10px] font-mono shrink-0 font-medium ${isPlaying ? 'text-emerald-400 font-bold' : 'text-neutral-400'
                                }`}
                            >
                              {isPlaying ? 'Playing...' : sample.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/50 border border-white/5 text-[11px] text-neutral-400 leading-relaxed">
                  🎙️ Tap any sample above to simulate a founder voice brain-dump without speaking into your mic.
                </div>
              </div>
            ) : (
              /* OUTPUT STATE: 60-Second Investor Pitch Script Teleprompter */
              <div className="space-y-4 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>60s Pitch Script</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {pitchData.pitchScript.split(/\s+/).length} Words
                    </span>
                  </div>

                  {/* Teleprompter Card */}
                  <div className="rounded-xl bg-[#121318] border border-white/10 p-3.5 max-h-[300px] sm:max-h-[340px] overflow-y-auto space-y-2 text-left">
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-serif italic">
                      &ldquo;{pitchData.pitchScript}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Teleprompter Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyScript}
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl bg-white text-black hover:bg-neutral-200 transition shadow-md active:scale-98"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>Copied Script!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-black" />
                        <span>Copy Pitch Script</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleListenVoice(pitchData.pitchScript)}
                      className="min-h-[42px] flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/5 transition active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadJSON}
                      className="min-h-[42px] flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/5 transition active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>JSON</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* PANE 1: LEFT SIDEBAR (Order-3 on mobile, Order-1 on desktop) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="order-3 lg:order-1 lg:col-span-3 bg-[#0e0f14] border border-white/5 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-4 sm:space-y-5">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <VoxDeckLogo size={26} variant="white" />
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>VoxDeck Studio</span>
                    </h3>
                    <p className="text-[11px] text-neutral-500">Voice Synthesis Engine</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 text-xs">
                  ←
                </div>
              </div>

              {/* Navigation List */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-medium px-2 py-1">
                  <span>Navigation</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (pitchData) {
                      setActiveCenterTab('deck');
                      const el = document.getElementById('workspace-panel');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full min-h-[42px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition active:scale-98 ${activeCenterTab === 'deck'
                    ? 'bg-[#181a22] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                    }`}
                >
                  <Presentation className="w-4 h-4 text-neutral-300" />
                  <span>10-Slide Deck</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (pitchData) {
                      setActiveCenterTab('overview');
                      const el = document.getElementById('workspace-panel');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full min-h-[42px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition active:scale-98 ${activeCenterTab === 'overview'
                    ? 'bg-[#181a22] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                    }`}
                >
                  <Layers className="w-4 h-4 text-neutral-300" />
                  <span>Executive Overview</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (pitchData) {
                      setActiveCenterTab('script');
                      const el = document.getElementById('workspace-panel');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full min-h-[42px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition active:scale-98 ${activeCenterTab === 'script'
                    ? 'bg-[#181a22] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                    }`}
                >
                  <MessageSquare className="w-4 h-4 text-neutral-300" />
                  <span>60s Investor Script</span>
                </button>
              </div>

              {/* Pitch Info or Capabilities */}
              {pitchData ? (
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    Active Startup
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                    <p className="font-bold text-xs text-white truncate">{pitchData.startupName}</p>
                    <p className="text-[11px] text-neutral-400 line-clamp-2 italic leading-relaxed">
                      &ldquo;{pitchData.tagline}&rdquo;
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    Engine Capabilities
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-400">
                    <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-neutral-900/40">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>10-Slide YC Narrative</span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-neutral-900/40">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>60-Sec Spoken Pitch</span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-neutral-900/40">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>TAM / Business Model</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Bottom Actions */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              {pitchData && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/5 transition active:scale-98"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Brain-Dump</span>
                </button>
              )}

              {hasSavedHistory && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="w-full min-h-[40px] flex items-center justify-center gap-2 text-xs font-medium py-2 px-3 rounded-xl text-neutral-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Saved History</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EXECUTIVE OVERVIEW METRICS (When Pitch is Generated) */}
      {/* ========================================================================= */}
      {pitchData && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 space-y-4 sm:space-y-6 animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Executive Pitch Overview</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Core venture pillars distilled from your voice transcript.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyFullPitchMarkdown}
              className="min-h-[40px] text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 underline self-start sm:self-auto active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export Full Markdown Deck</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Problem */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0A0B0E] border border-white/10 p-4 sm:p-5 space-y-2 hover:border-white/20 transition">
              <div className="flex items-center justify-between text-xs text-rose-400 font-mono uppercase">
                <span>The Problem</span>
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {pitchData.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0A0B0E] border border-white/10 p-4 sm:p-5 space-y-2 hover:border-white/20 transition">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono uppercase">
                <span>The Solution</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {pitchData.solution}
              </p>
            </div>

            {/* Target Market */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0A0B0E] border border-white/10 p-4 sm:p-5 space-y-2 hover:border-white/20 transition">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono uppercase">
                <span>Target Market</span>
                <Target className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {pitchData.targetMarket}
              </p>
            </div>

            {/* Revenue Model */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0A0B0E] border border-white/10 p-4 sm:p-5 space-y-2 hover:border-white/20 transition">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono uppercase">
                <span>Revenue Model</span>
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {pitchData.revenueModel}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. FOOTER, 5 FAQS, ABOUT US & PRIVACY POLICY                              */}
      {/* ========================================================================= */}
      <FooterSection
        onNavigateToWorkspace={() => {
          const el = document.getElementById('workspace-panel');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateToRegional={() => {
          const el = document.getElementById('regional-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
