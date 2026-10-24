'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Shield,
  ShieldCheck,
  Lock,
  Globe,
  Sparkles,
  CheckCircle2,
  FileText,
  X,
  ArrowUpRight,
  Server,
  EyeOff,
  UserCheck,
  Mic,
} from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Synthesis',
    question: 'How does VoxDeck convert raw voice brain-dumps into structured pitch decks?',
    answer:
      'VoxDeck captures your unscripted voice notes and synthesizes them using proprietary investor-deck synthesis prompts tuned specifically for venture evaluation. The engine analyzes your rambling thoughts, identifies the core problem, unique value proposition, business model, target market, and traction, and formats them into the standard 10-slide Y Combinator narrative structure with clear bullet points and metrics.',
  },
  {
    id: 'faq-2',
    category: 'Languages',
    question: 'Can I dictate in multiple languages, accents, or regional dialects?',
    answer:
      'Yes! VoxDeck natively supports multilingual and mixed-dialect prompts — including Indian English, Hindi, Punjabi (Gurmukhi), Marathi (Devanagari), Tamil, Japanese, and European languages. The engine comprehends natural regional code-switching, cultural nuances, and slang, translating your thoughts into crisp, standardized international investor English.',
  },
  {
    id: 'faq-3',
    category: 'Teleprompter',
    question: 'What is included in the 60-Second Investor Pitch Script?',
    answer:
      'Alongside your 10 visual slides, VoxDeck generates a high-impact, 60-second elevator pitch script calibrated at 130–150 spoken words. It features an integrated teleprompter with word pacing, slide-timed cues, and speech synthesis preview so you can practice delivering your hook, solution, and investor ask with natural founder conviction.',
  },
  {
    id: 'faq-4',
    category: 'Security',
    question: 'Is my proprietary startup idea and voice data kept private?',
    answer:
      'Absolutely. Your voice recordings and transcripts are processed ephemerally with zero data retention for AI training. We implement strict client-side encryption and never train public or foundational models on your confidential startup IP or pitch drafts. All generated materials remain 100% your intellectual property.',
  },
  {
    id: 'faq-5',
    category: 'Export',
    question: 'How can I export, share, or edit my generated pitch deck?',
    answer:
      'You can instantly export your complete pitch deck as structured Markdown, copy individual slide cards, download formatted summaries, or paste the content directly into PowerPoint, Google Slides, Notion, Keynote, or investor follow-up emails with a single click.',
  },
];

interface FooterSectionProps {
  onNavigateToWorkspace?: () => void;
  onNavigateToRegional?: () => void;
}

export default function FooterSection({
  onNavigateToWorkspace,
  onNavigateToRegional,
}: FooterSectionProps) {
  // Accordion state: default open first item
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24 pt-12 pb-8">
      {/* ===================================================================== */}
      {/* 1. FREQUENTLY ASKED QUESTIONS (5 Interactive Accordion Cards)         */}
      {/* ===================================================================== */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121318] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We&apos;ve Got Answers.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Everything you need to know about VoxDeck, voice brain-dump synthesis, regional dialect
            support, and data security.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0B0C10] border-white/20 shadow-xl'
                    : 'bg-[#0A0B0E] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[52px] px-4 sm:px-6 py-4 flex items-center justify-between text-left gap-3 focus:outline-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-md border shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-neutral-900 border-white/5 text-neutral-400'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-white truncate sm:overflow-visible">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? 'bg-white/10 border-white/20 text-white rotate-180'
                        : 'bg-white/5 border-white/10 text-neutral-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. ABOUT US SECTION (Matching Theme of Pic 2 - Clean Sleek Dark)      */}
      {/* ===================================================================== */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0A0B0E] border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl backdrop-blur-2xl">
          {/* Subtle Ambient Glow matching dashboard */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 bg-[#121318] border border-white/10 rounded-full px-3 py-1 text-xs text-neutral-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                  <span>About VoxDeck</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
                  Built for founders who think at the speed of speech.
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 bg-[#121318] border border-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
                Venture Tech • Est. 2026
              </span>
            </div>

            <p className="text-xs sm:text-sm sm:leading-relaxed text-neutral-400">
              Founders lose weeks of precious traction wrestling with slide template designs, bullet
              point formatting, and writer&apos;s block. Yet their most articulate, electric ideas
              flow effortlessly when pacing across a room, leaving voice notes, or pitching a friend.
              VoxDeck exists to bridge that creative gap: turn raw, rambling voice brain-dumps into
              pristine, 10-slide Y Combinator-grade investor decks and spoken pitch scripts in
              seconds.
            </p>

            {/* 3 Pillars Grid (Lively Smooth Zoom-In & Color-Graded Borders on Circled Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2">
              {/* Pillar 1: Emerald / Green Theme */}
              <div className="group/card relative rounded-2xl p-5 sm:p-6 space-y-3.5 bg-gradient-to-b from-emerald-950/30 via-[#0e1218] to-[#0A0B0E] border border-emerald-500/35 hover:border-emerald-400/90 transition-all duration-500 ease-out hover:scale-[1.045] hover:-translate-y-2.5 cursor-pointer shadow-xl hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.35)] overflow-hidden">
                {/* Top glowing edge line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent pointer-events-none" />
                {/* Ambient radial blur zoom */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover/card:scale-150 group-hover/card:bg-emerald-500/30 transition-all duration-700" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center group-hover/card:scale-110 group-hover/card:rotate-3 group-hover/card:bg-emerald-500/20 group-hover/card:border-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-950/50">
                    <Mic className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    01 • SYNTHESIS
                  </span>
                </div>

                <div className="space-y-1.5 relative z-10">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover/card:text-emerald-300 transition-colors">
                    Voice-First Synthesis
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed group-hover/card:text-neutral-300 transition-colors">
                    Dictate naturally without self-censoring. Our engine automatically organizes
                    stream-of-consciousness audio into battle-tested venture frameworks.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Cyan / Blue Theme */}
              <div className="group/card relative rounded-2xl p-5 sm:p-6 space-y-3.5 bg-gradient-to-b from-cyan-950/30 via-[#0e1218] to-[#0A0B0E] border border-cyan-500/35 hover:border-cyan-400/90 transition-all duration-500 ease-out hover:scale-[1.045] hover:-translate-y-2.5 cursor-pointer shadow-xl hover:shadow-[0_20px_45px_-10px_rgba(6,182,212,0.35)] overflow-hidden">
                {/* Top glowing edge line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent pointer-events-none" />
                {/* Ambient radial blur zoom */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none group-hover/card:scale-150 group-hover/card:bg-cyan-500/30 transition-all duration-700" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center group-hover/card:scale-110 group-hover/card:rotate-3 group-hover/card:bg-cyan-500/20 group-hover/card:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-950/50">
                    <Globe className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                    02 • MULTILINGUAL
                  </span>
                </div>

                <div className="space-y-1.5 relative z-10">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover/card:text-cyan-300 transition-colors">
                    Multilingual Inclusivity
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed group-hover/card:text-neutral-300 transition-colors">
                    Great ideas aren&apos;t confined to Silicon Valley English. We support native
                    regional scripts and dialect code-switching with zero semantic loss.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Indigo / Violet Theme */}
              <div className="group/card relative rounded-2xl p-5 sm:p-6 space-y-3.5 bg-gradient-to-b from-indigo-950/30 via-[#0e1218] to-[#0A0B0E] border border-indigo-500/35 hover:border-indigo-400/90 transition-all duration-500 ease-out hover:scale-[1.045] hover:-translate-y-2.5 cursor-pointer shadow-xl hover:shadow-[0_20px_45px_-10px_rgba(99,102,241,0.35)] overflow-hidden">
                {/* Top glowing edge line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent pointer-events-none" />
                {/* Ambient radial blur zoom */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover/card:scale-150 group-hover/card:bg-indigo-500/30 transition-all duration-700" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center group-hover/card:scale-110 group-hover/card:rotate-3 group-hover/card:bg-indigo-500/20 group-hover/card:border-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-950/50">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-indigo-400">
                    03 • SOVEREIGNTY
                  </span>
                </div>

                <div className="space-y-1.5 relative z-10">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover/card:text-indigo-300 transition-colors">
                    Founder Sovereignty
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed group-hover/card:text-neutral-300 transition-colors">
                    Your proprietary IP is your moat. We operate with strict zero data retention and
                    never train public AI models on your unpublished startup ideas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. PRIVACY POLICY SECTION (Theme of Pic 2 - Clean Sleek Dark)         */}
      {/* ===================================================================== */}
      <section id="privacy" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0A0B0E] border border-white/10 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl backdrop-blur-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#121318] border border-white/10 flex items-center justify-center text-neutral-300">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Founder Privacy &amp; Data Protection Policy
                </h3>
                <p className="text-xs text-neutral-400">
                  Transparent, uncompromising protection for your unreleased startup IP.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPrivacyModalOpen(true)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-[#121318] border border-white/10 hover:border-white/20 hover:bg-[#16171d] transition flex items-center gap-1.5 self-start sm:self-auto active:scale-95"
            >
              <span>Read Full Legal Policy</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
            {/* Card 1: Emerald / Green Theme */}
            <div className="group/c relative p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-emerald-950/30 via-[#0e1218] to-[#0A0B0E] border border-emerald-500/35 hover:border-emerald-400/90 space-y-2 hover:scale-[1.045] hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-[0_16px_36px_-8px_rgba(16,185,129,0.35)] cursor-pointer overflow-hidden">
              {/* Top glowing edge line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent pointer-events-none" />
              {/* Ambient radial blur zoom */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover/c:scale-150 group-hover/c:bg-emerald-500/30 transition-all duration-700" />

              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase font-bold tracking-wider relative z-10">
                <EyeOff className="w-3.5 h-3.5 group-hover/c:scale-110 text-emerald-400 transition-transform" />
                <span>Zero AI Training</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed group-hover/c:text-neutral-200 transition-colors relative z-10">
                Your voice audio and prompts are never used to train or fine-tune public foundation
                models.
              </p>
            </div>

            {/* Card 2: Cyan / Blue Theme */}
            <div className="group/c relative p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-cyan-950/30 via-[#0e1218] to-[#0A0B0E] border border-cyan-500/35 hover:border-cyan-400/90 space-y-2 hover:scale-[1.045] hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-[0_16px_36px_-8px_rgba(6,182,212,0.35)] cursor-pointer overflow-hidden">
              {/* Top glowing edge line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent pointer-events-none" />
              {/* Ambient radial blur zoom */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none group-hover/c:scale-150 group-hover/c:bg-cyan-500/30 transition-all duration-700" />

              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase font-bold tracking-wider relative z-10">
                <Server className="w-3.5 h-3.5 group-hover/c:scale-110 text-cyan-400 transition-transform" />
                <span>Ephemeral Buffers</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed group-hover/c:text-neutral-200 transition-colors relative z-10">
                Audio streams are converted in volatile memory and purged immediately after deck
                generation.
              </p>
            </div>

            {/* Card 3: Amber / Gold Theme */}
            <div className="group/c relative p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-amber-950/30 via-[#0e1218] to-[#0A0B0E] border border-amber-500/35 hover:border-amber-400/90 space-y-2 hover:scale-[1.045] hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-[0_16px_36px_-8px_rgba(245,158,11,0.35)] cursor-pointer overflow-hidden">
              {/* Top glowing edge line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent pointer-events-none" />
              {/* Ambient radial blur zoom */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none group-hover/c:scale-150 group-hover/c:bg-amber-500/30 transition-all duration-700" />

              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase font-bold tracking-wider relative z-10">
                <UserCheck className="w-3.5 h-3.5 group-hover/c:scale-110 text-amber-400 transition-transform" />
                <span>100% IP Ownership</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed group-hover/c:text-neutral-200 transition-colors relative z-10">
                You retain sole copyright and legal ownership of all synthesized slides, scripts,
                and summaries.
              </p>
            </div>

            {/* Card 4: Indigo / Purple Theme */}
            <div className="group/c relative p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-indigo-950/30 via-[#0e1218] to-[#0A0B0E] border border-indigo-500/35 hover:border-indigo-400/90 space-y-2 hover:scale-[1.045] hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-[0_16px_36px_-8px_rgba(99,102,241,0.35)] cursor-pointer overflow-hidden">
              {/* Top glowing edge line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent pointer-events-none" />
              {/* Ambient radial blur zoom */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover/c:scale-150 group-hover/c:bg-indigo-500/30 transition-all duration-700" />

              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase font-bold tracking-wider relative z-10">
                <Shield className="w-3.5 h-3.5 group-hover/c:scale-110 text-indigo-400 transition-transform" />
                <span>Local Sandbox</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed group-hover/c:text-neutral-200 transition-colors relative z-10">
                Saved pitches stay isolated inside your browser&apos;s local sandbox until you clear
                them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. MAIN SITE FOOTER                                                   */}
      {/* ===================================================================== */}
      <footer className="border-t border-white/10 bg-[#07080B] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand & Bio */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M 43 23 C 31 24 22 35 22 50 C 22 65 31 76 43 77 C 45.8 77 46.8 74.2 45.9 71.5 C 43.2 62 43.2 38 45.9 28.5 C 46.8 25.8 45.8 23 43 23 Z"
                      fill="#07080B"
                    />
                    <path
                      d="M 57 23 C 69 24 78 35 78 50 C 78 65 69 76 57 77 C 54.2 77 53.2 74.2 54.1 71.5 C 56.8 62 56.8 38 54.1 28.5 C 53.2 25.8 54.2 23 57 23 Z"
                      fill="#07080B"
                    />
                  </svg>
                </div>
                <span className="font-bold text-lg text-white tracking-tight">VoxDeck</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Zero-latency voice synthesis engine for early-stage founders. Transform raw voice
                brain-dumps into YC-ready 10-slide decks and pitch scripts.
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#121318] border border-white/5 text-[11px] text-neutral-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Engine Active • Gemini 3.5</span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Platform
              </h5>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={onNavigateToWorkspace}
                    className="hover:text-emerald-400 transition"
                  >
                    Voice Input Studio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onNavigateToWorkspace}
                    className="hover:text-emerald-400 transition"
                  >
                    10-Slide Deck Viewer
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onNavigateToWorkspace}
                    className="hover:text-emerald-400 transition"
                  >
                    60s Teleprompter
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onNavigateToRegional}
                    className="hover:text-emerald-400 transition"
                  >
                    Regional Prompt Showcase
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust & Company */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Company &amp; Trust
              </h5>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="hover:text-white transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('faq')}
                    className="hover:text-white transition"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('privacy')}
                    className="hover:text-white transition"
                  >
                    Privacy Commitments
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="hover:text-emerald-400 transition"
                  >
                    Full Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Compliance & Certifications */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Founder Security
              </h5>
              <div className="p-3.5 rounded-xl bg-[#0B0C10] border border-white/5 hover:border-white/15 space-y-2 text-xs text-neutral-400 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-neutral-300 shrink-0" />
                  <span className="text-neutral-200">Encrypted &amp; Sovereign</span>
                </div>
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  TLS 1.3 in-transit encryption, client-side isolation, and strict no-training data
                  guarantees for all voice audio.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p>© {new Date().getFullYear()} VoxDeck Studio, Inc. All rights reserved.</p>
              <div className="hidden sm:block w-px h-3 bg-white/10" />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  className="hover:text-neutral-300 transition underline underline-offset-2"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-neutral-300 transition"
                >
                  FAQs
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="hover:text-neutral-300 transition"
                >
                  About
                </button>
              </div>
            </div>

            <p className="text-xs text-neutral-400">
              Crafted by{' '}
              <span className="font-semibold text-white tracking-wide">
                Adarsh Kamat
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* ===================================================================== */}
      {/* 5. PRIVACY POLICY MODAL DIALOG                                        */}
      {/* ===================================================================== */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0B0C10] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 text-neutral-300 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#121318] border border-white/10 flex items-center justify-center text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">VoxDeck Privacy Policy</h4>
                  <p className="text-[11px] font-mono text-neutral-400">Effective: 2026 Edition</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition active:scale-95"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 leading-relaxed pr-1">
              <div>
                <h5 className="font-semibold text-white text-sm mb-1">
                  1. Zero Model Training Commitment
                </h5>
                <p className="text-neutral-400">
                  We acknowledge that your startup pitches, ideas, and metrics constitute critical
                  trade secrets. VoxDeck strictly enforces a zero-training covenant: your audio
                  recordings, typed brain-dumps, and generated pitch decks are never used to train,
                  tune, or evaluate public or proprietary AI models.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white text-sm mb-1">
                  2. Ephemeral Audio Processing
                </h5>
                <p className="text-neutral-400">
                  When you record audio or paste transcripts into VoxDeck, the content is transmitted
                  via TLS 1.3 encrypted channels directly to our synthesis worker in volatile RAM.
                  Once the structured 10-slide deck and 60-second script are generated, the raw
                  transcription buffers are completely discarded.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white text-sm mb-1">
                  3. Client-Side Browser Storage
                </h5>
                <p className="text-neutral-400">
                  To provide continuity without cloud tracking, your active pitch deck is cached
                  locally on your machine via standard HTML5 LocalStorage. You retain total control:
                  clicking &ldquo;Reset / New Pitch&rdquo; immediately wipes this data from your
                  device.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-white text-sm mb-1">
                  4. Intellectual Property &amp; Commercial Rights
                </h5>
                <p className="text-neutral-400">
                  You maintain 100% ownership, copyright, and commercial rights over every slide,
                  summary, script, and business model generated through VoxDeck. We claim no license,
                  equity, or claim over ventures conceptualized on this platform.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="min-h-[40px] px-5 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition active:scale-95"
              >
                Close &amp; Return to VoxDeck
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
