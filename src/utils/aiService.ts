import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ReviewRequest {
  businessName: string;
  category: string;
  type: string;
  highlights?: string;
  selectedServices?: string[];
  starRating: number;
  language?: string;
  tone?: "Professional" | "Friendly" | "Grateful";
  useCase?: "Customer review" | "Student feedback" | "Patient experience";
  geminiApiKey?: string;
  geminiModel?: string;
}

export interface GeneratedReview {
  text: string;
  hash: string;
  language: string;
  rating: number;
}

// Store used review hashes to prevent duplicates
const usedReviewHashes = new Set<string>();

export class AIReviewService {
  private createModel(apiKey: string, modelName: string = "gemini-2.0-flash") {
    if (!apiKey) return null;
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      return genAI.getGenerativeModel({ model: modelName });
    } catch (error) {
      console.error("Error creating Gemini model:", error);
      return null;
    }
  }

  // Generate a simple hash for review content
  private generateHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // force 32-bit
    }
    return Math.abs(hash).toString(36);
  }

  // Check if review is unique
  private isReviewUnique(content: string): boolean {
    const hash = this.generateHash(content);
    return !usedReviewHashes.has(hash);
  }

  // Mark review as used
  private markReviewAsUsed(content: string): void {
    const hash = this.generateHash(content);
    usedReviewHashes.add(hash);
  }

  // Basic validation for key constraints we care about
  private validateReview(
    text: string,
    lang: string,
    minChars = 250,
    maxChars = 300
  ): boolean {
    const t = text.trim();

    // Length
    if (t.length < minChars || t.length > maxChars) return false;

    // No exclamation marks
    if (/[!]/.test(t)) return false;

    // Don't mention star rating explicitly
    if (/\b([1-5]\s*stars?|one|two|three|four|five\s*stars?)\b/i.test(t)) return false;

    // Romanization checks: disallow Gujarati/Devanagari scripts in any language
    const hasGujarati = /[\u0A80-\u0AFF]/.test(t);
    const hasDevanagari = /[\u0900-\u097F]/.test(t);
    if (lang === "Gujarati" && (hasGujarati || hasDevanagari)) return false;
    if (lang === "Hindi" && (hasGujarati || hasDevanagari)) return false;
    if (lang === "English" && (hasGujarati || hasDevanagari)) return false;

    return true;
  }

  async generateReview(
    request: ReviewRequest,
    maxRetries: number = 5
  ): Promise<GeneratedReview> {
    const { geminiApiKey, geminiModel = "gemini-2.0-flash" } = request;

    const model = this.createModel(geminiApiKey || "", geminiModel);
    if (!model) {
      console.warn("Gemini API key not provided or invalid, using fallback review");
      return this.getFallbackReview(request);
    }

    const {
      businessName,
      category,
      type,
      highlights,
      selectedServices,
      starRating,
      language,
      tone,
      useCase,
    } = request;

    const sentimentGuide = {
      1: "Polite but reserved- highlights one or two issues gently, while still appreciating the effort or environment. Sounds constructive, not harsh.",
      2: "Encouraging with minor suggestions-points out areas for improvement but emphasises positive aspects more strongly.",
      3: "Balanced review - mentions a mix of pros and small cons, but overall keeps the tone supportive and fair.",
      4: "Clearly positive- praises good service or experience, maybe with one small suggestion.",
      5: "Highly enthusiastic- warm, detailed praise, showing full satisfaction.",
    };

    const languageOptions = ["English", "Gujarati", "Hindi"];
    const selectedLanguage =
      language || languageOptions[Math.floor(Math.random() * languageOptions.length)];
    const selectedTone = tone || "Professional";
    const selectedUseCase = useCase || "Customer review";

    let serviceInstructions = "";
    if (selectedServices && selectedServices.length > 0) {
      serviceInstructions = `
Customer specifically wants to highlight these services: ${selectedServices.join(", ")}
- Mention these services naturally in the review context
- Don't list them generically, weave them into the experience narrative
- Focus on how these specific aspects contributed to the ${starRating}-star experience
- Use authentic language that reflects real customer experience with these services`;
    }

    let languageInstruction = "";
    switch (selectedLanguage) {
      case "English":
        languageInstruction =
          "Write the review ONLY in English. Do NOT use any Gujarati, Hindi, or Marathi words. The entire review must be in English.";
        break;
      case "Gujarati":
        languageInstruction =
          "Write the review in Gujarati language, but use only English letters (Romanized Gujarati). Do NOT use Gujarati script. Example: 'Hu khush chu.'";
        break;
      case "Hindi":
        languageInstruction =
          "Write the review in Hindi language, but use only English letters (Romanized Hindi). Do NOT use Hindi script. Example: 'Main khush hoon.'";
        break;
    }

    // Removed undefined-producing parts
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const prompt = `Generate a realistic Google review for "${businessName}" which is a ${type} in the ${category} category.

Star Rating: ${starRating}/5
Sentiment: ${sentimentGuide[starRating as keyof typeof sentimentGuide]}
Tone: ${selectedTone}
Use Case: ${selectedUseCase}
${highlights ? `Customer highlights: ${highlights}` : "" }
${serviceInstructions}

Strict instructions:
- Review must be between 300 and 350 characters.
- No repetition of ideas or sentence structures.
- First sentence must always be different.
- Use fresh adjectives and sentence tone.
- Tone: Human, real, warm, and natural.
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark

Requirements:
- ${businessName} is shown always different place in review
- Sound natural and human-like with regional authenticity
- DO NOT repeat phrasing or meaning from previous reviews
- not write any place name in the review.
- Avoid overused lines like "I felt safe", "highly recommend", "Dr. is amazing".
- Mention 1 unique point in each review (emotional detail).
- Match the ${starRating}-star sentiment exactly
- Be specific to the business type (${type}) and category (${category})
- Use realistic customer language for ${selectedUseCase}
- No fake exaggeration, keep it credible and locally relevant
- Don't mention the star rating in the text
- Make it unique - avoid common phrases or structures
${highlights ? `- Try to incorporate these highlights naturally: ${highlights}` : "" }
${selectedServices && selectedServices.length > 0 ? `- Naturally incorporate these service experiences: ${selectedServices.join(", ")}` : "" }
- ${languageInstruction}
- Use authentic regional expressions and terminology
- Avoid generic templates or repetitive structures
- Return only the review text, no quotes, no instructions, no extra formatting, and no introductory sentences.`;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reviewText = response.text().trim();

        // // Validate constraints
        // if (!this.validateReview(reviewText, selectedLanguage)) {
        //   console.log(`Attempt ${attempt + 1}: Validation failed, retrying...`);
        //   continue;
        // }

        // Uniqueness
        if (this.isReviewUnique(reviewText)) {
          this.markReviewAsUsed(reviewText);
          return {
            text: reviewText,
            hash: this.generateHash(reviewText),
            language: selectedLanguage,
            rating: starRating,
          };
        }

        console.log(`Attempt ${attempt + 1}: Generated duplicate review, retrying...`);
      } catch (error) {
        console.error(`AI Review Generation Error (attempt ${attempt + 1}):`, error);
      }
    }

    return this.getFallbackReview(request);
  }

  private getFallbackReview(request: ReviewRequest): GeneratedReview {
    const {
      businessName,
      starRating,
      language,
    } = request;

    const fallbacks: Record<number, Record<string, string[]>> = {
      4: {
        English: [
          `Professional service and quality work, just a minor wait time. Team stayed helpful and the process felt smooth from start to finish.`,
          `Good experience overall with attentive staff and neat handling. A tiny delay, but the outcome showed care and consistency.`,
          `Friendly approach and reliable work made the visit easy. One small area to improve, yet the value was clear.`,
        ],
        Gujarati: [
          `Seva sari ane kaam ni quality pan jamti hati. Thodu wait karvu padiyu, pan staff madadru hato ane process saral lagi.`,
          `${businessName} par anubhav saru rahyo. Team vinamra hati, ane karya shantithi puru thayu. Nanakdu sudharo shakya che.`,
        ],
        Hindi: [
          `${businessName} par anubhav accha raha. Staff sahayak tha aur kaam dhang se hua. Bas thoda intezar karna pada.`,
          `Seva badhiya lagi, prakriya bhi asan rahi. Chhota sa sudhar ho sakta hai, par kul mila kar santusht hoon.`,
        ],
      },
      5: {
        English: [
          `Warm service, clear guidance, and careful work made the whole experience effortless and genuinely satisfying. Staff stayed attentive and respectful throughout.`,
          `Excellent care with smooth coordination and thoughtful follow-up. Everything felt simple, timely, and genuinely customer-focused from start to end.`,
          `From greeting to finish, the process felt easy and precise. Courteous team, clean handling, and result matched expectation well.`,
        ],
        Gujarati: [
          `Namr service, spasht margdarshan ane dhyanpurvak kaam thi anubhav saral ane santoshjanak lagyo. Team lagatar dhyanma rahi.`,
          `Saras care, yogya samay par kaam ane vinamra vyavhar. Badhu saral rite thayu ane grahak par kendrit rahyu.`,
        ],
        Hindi: [
          `Namr seva, spasht nirdesh aur dhyan se kiya gaya kaam. Puri prakriya aaram se aur samay par puri hui, anubhav santoshjanak raha.`,
          `Shuruaat se ant tak sab kuchh aasan aur samay par raha. Team vinamra rahi aur parinam ummeed ke anuroop the.`,
        ],
      },
    };

    const ratingFallbacks = fallbacks[starRating] || fallbacks[4];
    const langKey = language && ratingFallbacks[language] ? language : "English";
    const languageFallbacks = ratingFallbacks[langKey];
    const randomIndex = Math.floor(Math.random() * languageFallbacks.length);
    const selectedFallback = languageFallbacks[randomIndex].trim();

    // Mark as used and return consistent hash based on content
    this.markReviewAsUsed(selectedFallback);
    return {
      text: selectedFallback,
      hash: this.generateHash(selectedFallback),
      language: langKey,
      rating: starRating,
    };
  }

  // Generate tagline for business
  async generateTagline(
    businessName: string,
    category: string,
    type: string,
    geminiApiKey?: string,
    geminiModel?: string
  ): Promise<string> {
    const prompt = `Generate a catchy, professional tagline for "${businessName}" which is a ${type} in the ${category} category.

- Keep it under 8 words
- Make it memorable and professional
- Reflect the business type and category
- Use action words or emotional appeal
- Avoid clichés like "Your trusted partner"
- Make it unique and specific to the business

Return only the tagline, no quotes or extra text.`;

    const model = this.createModel(
      geminiApiKey || "",
      geminiModel || "gemini-2.0-flash"
    );

    if (!model) {
      console.warn("Gemini API key not provided, using fallback tagline");
      // Return fallback tagline
      const fallbackTaglines: Record<string, string[]> = {
        Services: [
          "Excellence in Every Service",
          "Your Service Solution",
          "Quality You Can Trust",
        ],
        "Food & Beverage": [
          "Taste the Difference",
          "Fresh & Delicious Always",
          "Where Flavor Meets Quality",
        ],
        "Health & Medical": [
          "Your Health, Our Priority",
          "Caring for Your Wellness",
          "Expert Care Always",
        ],
        Education: [
          "Learning Made Easy",
          "Knowledge for Success",
          "Education Excellence",
        ],
        "Professional Businesses": [
          "Professional Solutions",
          "Expert Services",
          "Business Excellence",
        ],
      };

      const categoryTaglines =
        fallbackTaglines[category] || fallbackTaglines["Services"];
      return categoryTaglines[
        Math.floor(Math.random() * categoryTaglines.length)
      ];
    }

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error("Tagline generation error:", error);
      // Fallback taglines based on category
      const fallbackTaglines: Record<string, string[]> = {
        Services: [
          "Excellence in Every Service",
          "Your Service Solution",
          "Quality You Can Trust",
        ],
        "Food & Beverage": [
          "Taste the Difference",
          "Fresh & Delicious Always",
          "Where Flavor Meets Quality",
        ],
        "Health & Medical": [
          "Your Health, Our Priority",
          "Caring for Your Wellness",
          "Expert Care Always",
        ],
        Education: [
          "Learning Made Easy",
          "Knowledge for Success",
          "Education Excellence",
        ],
        "Professional Businesses": [
          "Professional Solutions",
          "Expert Services",
          "Business Excellence",
        ],
      };

      const categoryTaglines =
        fallbackTaglines[category] || fallbackTaglines["Services"];
      return categoryTaglines[
        Math.floor(Math.random() * categoryTaglines.length)
      ];
    }
  }

  // Clear used hashes (for testing or reset)
  clearUsedHashes(): void {
    usedReviewHashes.clear();
  }

  // Get usage statistics
  getUsageStats(): { totalGenerated: number } {
    return {
      totalGenerated: usedReviewHashes.size,
    };
  }
}

export const aiService = new AIReviewService();
