import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import { PitchData } from '../../../types/pitch';

/**
 * Strict JSON schema for the Gemini response adhering to the PitchData TypeScript interface.
 * Using @google/genai SDK responseSchema guarantees valid structured JSON output.
 */
const pitchDataSchema: Schema = {
  type: Type.OBJECT,
  description: 'Structured 10-slide startup pitch deck and investor pitch script generated from a raw voice transcript.',
  properties: {
    startupName: {
      type: Type.STRING,
      description: 'The name of the startup. If not explicitly specified in the transcript, formulate an inventive, modern startup name.',
    },
    tagline: {
      type: Type.STRING,
      description: 'A punchy, memorable one-sentence value proposition.',
    },
    problem: {
      type: Type.STRING,
      description: 'Clear, concise summary of the primary pain point and friction experienced by the target customer.',
    },
    solution: {
      type: Type.STRING,
      description: 'How the product uniquely and effectively solves the problem and provides immediate value.',
    },
    targetMarket: {
      type: Type.STRING,
      description: 'The target audience, ideal customer profile (ICP), and total addressable market opportunity.',
    },
    revenueModel: {
      type: Type.STRING,
      description: 'Monetization strategy and business model (e.g. B2B SaaS tiers, marketplace take-rate, usage-based pricing).',
    },
    slides: {
      type: Type.ARRAY,
      description: 'An exact 10-slide professional startup pitch deck covering the complete founder narrative.',
      items: {
        type: Type.OBJECT,
        properties: {
          slideNumber: {
            type: Type.INTEGER,
            description: 'Slide sequence index strictly from 1 to 10.',
          },
          title: {
            type: Type.STRING,
            description: 'Slide title (e.g., Slide 1: Vision, Slide 2: Problem, etc.).',
          },
          content: {
            type: Type.STRING,
            description: 'Actionable slide content, key takeaways, bullet points, and core metrics.',
          },
        },
        required: ['slideNumber', 'title', 'content'],
      },
    },
    pitchScript: {
      type: Type.STRING,
      description: 'A high-energy, persuasive 60-second spoken pitch script for investors (~130-160 words).',
    },
  },
  required: [
    'startupName',
    'tagline',
    'problem',
    'solution',
    'targetMarket',
    'revenueModel',
    'slides',
    'pitchScript',
  ],
};

/**
 * System prompt forcing Gemini to act as a world-class startup incubator director
 * and parse the messy transcript into the required pitch structure.
 */
const SYSTEM_PROMPT = `You are VoxDeck AI, a world-class startup mentor, Y Combinator pitch coach, and venture capital partner.
Your mission is to take raw, messy, unstructured, rambling voice brain-dump transcripts (which may be dictated in English, regional languages including Punjabi, Marathi, Tamil, Hindi, Japanese, or mixed multilingual dialects) and synthesize them into an investor-ready startup pitch deck and a 60-second spoken elevator pitch script in clear, compelling, professional English (retaining authentic venture names, regional nuances, and cultural references).

Your output MUST be a single, valid JSON object conforming strictly to the defined schema with NO markdown fences, no conversational preambles, and no trailing commentary.

Guidelines for distillation:
1. Executive Summary:
   - startupName: Extract or coin a crisp, memorable startup brand name.
   - tagline: A punchy, one-sentence value proposition.
   - problem: Synthesize the core customer pain points and inefficiencies.
   - solution: Explain the product value proposition and unfair advantage.
   - targetMarket: Define the ICP, target audience, and market opportunity.
   - revenueModel: Detail the business model and monetization strategy.

2. Professional 10-Slide Pitch Deck:
   You must produce EXACTLY 10 slides (slideNumber 1 through 10):
   - Slide 1: Company Name, Vision & Hook
   - Slide 2: The Problem & Current Friction
   - Slide 3: The Solution & Unique Value Proposition
   - Slide 4: Target Market & Opportunity (TAM / SAM / SOM / ICP)
   - Slide 5: The Product & Core Features / Architecture
   - Slide 6: Business Model & Monetization Strategy
   - Slide 7: Traction, Validation & Key Milestones
   - Slide 8: Competitive Landscape & Moat / Unfair Advantage
   - Slide 9: Go-To-Market (GTM) & Growth Engine
   - Slide 10: The Ask, Use of Funds & Long-Term Roadmap

3. 60-Second Investor Pitch Script:
   - A captivating, spoken elevator pitch designed for the founder to speak aloud to angel investors or VCs in 60 seconds (130-160 words).
   - Follows an emotional hook: The Hook -> The Problem -> The Solution -> Market & Traction -> The Call to Action / The Ask.

Rules:
- Elevate informal or colloquial regional speech into crisp, professional, high-conviction venture terminology.
- Accurately decode native scripts (Gurmukhi, Devanagari, Tamil, Japanese kanji/kana) into clear, high-impact English venture narratives.
- If specific data points are omitted in the voice dump, extrapolate realistic, coherent startup metrics aligned with the founder's vision.
- Return ONLY valid JSON matching the schema.`;

export async function POST(req: NextRequest) {
  try {
    // 1. Verify GEMINI_API_KEY environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'GEMINI_API_KEY is not configured in the environment variables.',
        },
        { status: 500 }
      );
    }

    // 2. Parse and validate request JSON body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload in request body.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || !('transcript' in body)) {
      return NextResponse.json(
        { error: 'Missing required field "transcript" in request body.' },
        { status: 400 }
      );
    }

    const { transcript } = body as { transcript: unknown };

    if (typeof transcript !== 'string' || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'The "transcript" field must be a non-empty string.' },
        { status: 400 }
      );
    }

    // 3. Initialize the official Google Gen AI client
    const ai = new GoogleGenAI({ apiKey });

    // 4. Call Gemini Flash with structured output configuration
    const userPrompt = `Transform the following raw voice brain-dump transcript into the structured pitch deck and 60-second pitch script:\n\n"""\n${transcript.trim()}\n"""`;

    // Stable Gemini Flash models with fallback (avoiding gemini-3.8-flash which currently experiences 503 capacity overload)
    const candidateModels = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
    let response;
    let lastError: unknown = null;

    for (const model of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: pitchDataSchema,
            temperature: 0.2, // Low temperature for consistent, high-fidelity structuring
          },
        });
        if (response?.text) break;
      } catch (err) {
        lastError = err;
        console.warn(`Model ${model} call encountered an issue, trying fallback...`, err);
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error('Failed to obtain a response from Gemini API.');
    }

    const rawResponseText = response.text?.trim() || '';

    if (!rawResponseText) {
      return NextResponse.json(
        { error: 'Received an empty response from Gemini API.' },
        { status: 502 }
      );
    }

    // 5. Clean potential markdown wraps defensively and parse JSON
    let cleanedText = rawResponseText;
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText
        .replace(/^```(?:json)?\s*\n?/, '')
        .replace(/\n?\s*```$/, '')
        .trim();
    }

    let pitchData: PitchData;
    try {
      pitchData = JSON.parse(cleanedText) as PitchData;
    } catch (parseError) {
      console.error('Failed to parse Gemini output as JSON:', rawResponseText);
      return NextResponse.json(
        {
          error: 'Failed to parse Gemini model output as valid JSON.',
          details: parseError instanceof Error ? parseError.message : String(parseError),
        },
        { status: 502 }
      );
    }

    // 6. Validate essential structural fields
    if (
      !pitchData.startupName ||
      !pitchData.slides ||
      !Array.isArray(pitchData.slides) ||
      pitchData.slides.length === 0 ||
      !pitchData.pitchScript
    ) {
      return NextResponse.json(
        {
          error: 'The generated pitch deck data is incomplete.',
          details: 'Missing one or more required fields from the PitchData schema.',
        },
        { status: 502 }
      );
    }

    // 7. Return the structured pitch data
    return NextResponse.json(pitchData, { status: 200 });

  } catch (error: unknown) {
    console.error('Error in /api/generate-pitch:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred while generating the pitch.';

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
