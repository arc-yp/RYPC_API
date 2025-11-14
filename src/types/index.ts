export interface ReviewCard {
  id: string;
  businessName: string;
  category: string;
  type: string;
  description: string;
  location: string;
  services: string[];
  slug: string;
  logoUrl: string;
  googleMapsUrl: string;
  geminiApiKey?: string;
  geminiModel?: string;
  viewCount?: number;
  active?: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  allowedLanguages?: string[]; // NEW
  // Admin control: whether selected services should appear bold/blue in UI
  highlightServices?: boolean; // default true when undefined
  // Admin control: whether to inject and show red spelling mistakes in reviews
  allowSpellingMistakes?: boolean; // default false when undefined
}

export interface ReviewTemplates {
  openings: string[];
  qualities: string[];
  achievements: string[];
  endings: string[];
}

export interface ReviewVariations {
  connectors: string[];
  intensifiers: string[];
  timeframes: string[];
}
