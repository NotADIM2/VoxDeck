'use client';

import React from 'react';
import { Globe, Radio, Sparkles } from 'lucide-react';

export interface RegionalPromptItem {
  id: string;
  cardIndex: number;
  label: string;
  nativeScriptTag: string;
  langCode: string;
  conceptTitle: string;
  category: string;
  duration: string;
  prompt: string;
  summaryTranslation: string;
}

export const REGIONAL_PROMPT_SHOWCASE_DATA: RegionalPromptItem[] = [
  {
    id: 'punjabi-ghar-diyan-gallan',
    cardIndex: 1,
    label: 'PUNJABI PROMPT',
    nativeScriptTag: 'ਪੰਜਾਬੀ • Gurmukhi',
    langCode: 'pa',
    conceptTitle: 'Ghar Diyan Gallan (ਘਰ ਦੀਆਂ ਗੱਲਾਂ)',
    category: 'Hyperlocal FoodTech • Home Chefs',
    duration: '0:48',
    prompt:
      'ਓਏ ਸੁਣੋ ਯਾਰ, ਇਕਦਮ ਜਬਰਦਸਤ ਆਈਡੀਆ ਹੈ। ਘਰ ਦੀਆਂ ਗੱਲਾਂ ਐਪ ਉਨ ਟੈਲੈਂਟਡ ਸਰਦਾਰਣੀ ਆਂਟਸ ਕੋ ਕਨੈਕਟ ਕਰੇਗੀ ਜੋ ਆਥੈਂਟਿਕ ਪੰਜਾਬੀ ਖਾਨਾ ਬਣਾਤੀ ਹੈਂ...',
    summaryTranslation:
      'A marketplace app empowering talented home-chef Sardarnis to deliver authentic homemade Punjabi meals to busy professionals and students.',
  },
  {
    id: 'marathi-kisan-vada-pav',
    cardIndex: 2,
    label: 'MARATHI PROMPT',
    nativeScriptTag: 'मराठी • Devanagari',
    langCode: 'mr',
    conceptTitle: 'Kisan & Vada-Pav Supply (शेतकरी आणि विक्रेता)',
    category: 'AgriSupply • Micro-Vendors',
    duration: '1:02',
    prompt:
      'अरे ऐका ना भाऊ, आपल्या शेतात कष्ट करणारा किसन आणि गल्लीत गरम-गरम वडा-पाव बनवणारा आपला स्थानिक विक्रेता, हे दोन्ही आपल्या अर्थव्यवस्थेचे खारे खांबे आहेत!',
    summaryTranslation:
      'A direct-to-street-vendor farm supply chain bridging rural farmers with local hot vada-pav stalls to cut out middlemen.',
  },
  {
    id: 'tamil-kisan-hostel-mess',
    cardIndex: 3,
    label: 'TAMIL PROMPT',
    nativeScriptTag: 'தமிழ் • Tamil Script',
    langCode: 'ta',
    conceptTitle: 'Kisan & Hostel Mess Connect (உணவு & மாணவர்கள்)',
    category: 'EdMess Logistics • Farm Direct',
    duration: '0:56',
    prompt:
      'அண்ணா, ஒரு நல்ல விஷயம் சொல்றேன் கேள்! நம்ம ஊரு பக்கம் இருக்க கிசான்களும், ஹோஸ்டல் ல தாங்கி படிக்கிற ஸ்டூடென்ட்களும் படுகிற கஷ்டம் எனக்கு நல்ல புரியும்...',
    summaryTranslation:
      'A localized distribution network linking regional farmers directly with student hostels for fresh, affordable mess food.',
  },
  {
    id: 'japanese-expat-desi-tiffin',
    cardIndex: 4,
    label: 'JAPANESE EXPAT PROMPT',
    nativeScriptTag: '日本語 • Japanese Script',
    langCode: 'ja',
    conceptTitle: 'Tokyo Desi Tiffin (日本での本格インド料理)',
    category: 'Cross-Border • Expat Meal Service',
    duration: '1:10',
    prompt:
      '日本にいるインドの皆さん、こんにちは！日本で生活していると、母さんの作った本場のインド料理や温かいティフィンが恋しくなりますよね。',
    summaryTranslation:
      'Authentic mother-style Indian tiffin subscription service tailored for the Indian expat & diaspora community living in Tokyo.',
  },
];

/**
 * Purely Visual Regional Prompt Showcase Marquee.
 * A non-functional, moving ticker track gliding smoothly across the screen,
 * displaying authentic native script cards (Punjabi, Marathi, Tamil, Japanese)
 * with dark card UI, emerald accents, and glassmorphism styling.
 */
export default function RegionalPromptShowcase() {
  // Triple the list to create a seamless infinite loop on any screen resolution
  const tickerItems = [
    ...REGIONAL_PROMPT_SHOWCASE_DATA,
    ...REGIONAL_PROMPT_SHOWCASE_DATA,
    ...REGIONAL_PROMPT_SHOWCASE_DATA,
  ];

  return (
    <section
      aria-label="Regional Prompt Showcase Ticker"
      className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-2 pb-10 sm:pb-14 select-none relative overflow-hidden"
    >
      {/* Visual Ticker Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 mb-4 sm:mb-5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Multilingual Stream</span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-neutral-300 tracking-tight">
            Regional Prompt Showcase
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-neutral-400 bg-[#121318]/80 border border-white/5 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md">
          <Globe className="w-3 h-3 text-emerald-400" />
          <span>4 Sample Scripts</span>
        </div>
      </div>

      {/* Marquee Wrapper with Smooth Left & Right Gradient Masks */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#07080B] to-transparent z-20" />

        {/* Right Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#07080B] to-transparent z-20" />

        {/* Smooth Gliding CSS Marquee Track */}
        <div className="animate-marquee flex gap-4 sm:gap-5">
          {tickerItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[290px] sm:w-[350px] shrink-0 rounded-2xl p-4 sm:p-5 flex flex-col justify-between bg-[#0e0f14]/85 border border-white/10 hover:border-emerald-500/30 backdrop-blur-xl transition-all duration-300 relative shadow-xl overflow-hidden group cursor-default"
            >
              {/* Emerald Subtle Ambient Highlight Sheen */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-3 relative z-10">
                {/* Card Top Pill & Script Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                    CARD 0{item.cardIndex} • {item.label.split(' ')[0]}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 bg-neutral-900/80 px-2 py-0.5 rounded-md border border-white/5 truncate">
                    {item.nativeScriptTag}
                  </span>
                </div>

                {/* Concept Title & Category */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1">
                    {item.conceptTitle}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-medium truncate mt-0.5">
                    {item.category}
                  </p>
                </div>

                {/* Authentic Native Script Text Block */}
                <div
                  lang={item.langCode}
                  className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-white/5 text-[13px] sm:text-[13.5px] leading-relaxed text-neutral-200 line-clamp-3 font-sans shadow-inner selection:bg-emerald-400 selection:text-black"
                >
                  &ldquo;{item.prompt}&rdquo;
                </div>

                {/* Context Brief */}
                <p className="text-[11px] text-neutral-400 line-clamp-1 leading-relaxed italic border-l border-emerald-500/30 pl-2">
                  {item.summaryTranslation}
                </p>
              </div>

              {/* Purely Visual Bottom Status Bar (No Buttons / Handlers) */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between gap-2 relative z-10 text-[10px] font-mono text-neutral-400">
                {/* Visual Audio Waveform Graphic */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-[2.5px] h-3">
                    <span className="w-0.5 h-3 bg-emerald-400 animate-pulse rounded-full" />
                    <span className="w-0.5 h-2 bg-emerald-400/80 animate-pulse delay-75 rounded-full" />
                    <span className="w-0.5 h-3.5 bg-emerald-400 animate-pulse delay-150 rounded-full" />
                    <span className="w-0.5 h-1.5 bg-emerald-400/70 animate-pulse delay-100 rounded-full" />
                    <span className="w-0.5 h-2.5 bg-emerald-400/90 animate-pulse delay-200 rounded-full" />
                  </div>
                  <span className="text-emerald-400/90 font-medium">Voice Stream</span>
                </div>

                {/* Decorative Duration Tag */}
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-white/5 text-neutral-400">
                  {item.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
