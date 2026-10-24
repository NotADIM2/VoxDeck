/**
 * Pitch Data Structure and Types for VoxDeck
 * 
 * Defines the structured output generated from raw voice brain-dump transcripts
 * using the Google Gemini API.
 */

export interface PitchSlide {
  /** The sequence index of the slide (1 through 10) */
  slideNumber: number;
  /** Compelling, concise title for the slide */
  title: string;
  /** Structured slide content, bullet points, and key metrics */
  content: string;
}

export interface PitchData {
  /** The name of the startup extracted or suggested from the transcript */
  startupName: string;
  /** A memorable, high-impact one-sentence value proposition */
  tagline: string;
  /** Clear summary of the primary pain point and problem being addressed */
  problem: string;
  /** The core solution, product capability, and unique value delivered */
  solution: string;
  /** Target audience, ideal customer profile (ICP), and addressable market */
  targetMarket: string;
  /** Monetization strategy, pricing structure, and business model */
  revenueModel: string;
  /** Professional 10-slide pitch deck covering the core startup narrative */
  slides: PitchSlide[];
  /** High-energy 60-second spoken elevator pitch script for investors */
  pitchScript: string;
}

/**
 * Payload sent to POST /api/generate-pitch
 */
export interface GeneratePitchRequest {
  transcript: string;
}

/**
 * Error response payload returned by /api/generate-pitch
 */
export interface GeneratePitchErrorResponse {
  error: string;
  details?: string;
}
