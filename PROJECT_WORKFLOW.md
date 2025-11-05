# AI Review System - Complete Project Workflow

## 🎯 Project Overview

**AI Review System (ARS)** is a React-based web application that helps businesses generate AI-powered Google reviews. It enables business owners to create custom review cards with QR codes that customers can scan to generate and post authentic-looking reviews on Google.

---

## 🏗️ Tech Stack

### Frontend

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library

### Backend & Services

- **Supabase** - Cloud database & authentication
- **Google Generative AI (Gemini)** - AI review generation
- **React GA4** - Google Analytics tracking

### Additional Libraries

- **QRCode** - QR code generation
- **html2canvas** - Screenshot/image capture
- **TensorFlow.js** - Machine learning capabilities
- **AWS SDK** - Cloud services integration

---

## 📋 Project Structure

```
ARC_API/
├── src/
│   ├── components/          # React components
│   │   ├── AdminDashboard.tsx        # Main admin interface
│   │   ├── CompactReviewCardView.tsx # Customer-facing review page
│   │   ├── CompactAddCardModal.tsx   # Create new card
│   │   ├── EditCardModal.tsx         # Edit existing card
│   │   ├── AnalyticsDashboard.tsx    # View analytics
│   │   ├── LoginPage.tsx             # Admin login
│   │   ├── QRCodeModal.tsx           # QR code display
│   │   └── ...other components
│   ├── HomePage/           # Landing page components
│   │   ├── ArsPage.tsx    # Main homepage
│   │   ├── Features.tsx   # Feature showcase
│   │   ├── Pricing.tsx    # Pricing plans
│   │   ├── FAQ.tsx        # Frequently asked questions
│   │   └── ...other pages
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # ReviewCard interface
│   ├── utils/             # Utility functions
│   │   ├── storage.ts     # Data persistence (localStorage + Supabase)
│   │   ├── aiService.ts   # AI review generation
│   │   ├── auth.ts        # Authentication logic
│   │   ├── supabase.ts    # Supabase client
│   │   └── helpers.ts     # Helper functions
│   ├── App.tsx            # Main app router
│   └── main.tsx           # App entry point
├── supabase/
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

---

## 🔄 Complete Workflow

### **1️⃣ User Journey - Business Owner (Admin)**

#### Step 1: Access Admin Dashboard

1. Navigate to `/ai-login`
2. Enter admin credentials
3. Authentication handled by `auth.ts`
4. Redirected to `/ai-admin` (protected route)

#### Step 2: Create Review Card

1. Click **"Add New Card"** button
2. Fill in business details:

   - Business Name
   - Category (Services, Food & Beverage, Health & Medical, etc.)
   - Type (Restaurant, Clinic, Salon, etc.)
   - Description/Highlights
   - Location (address)
   - Google Maps URL
   - Services offered (array)
   - Logo URL
   - Custom slug (URL path)
   - Gemini API Key (for AI generation)
   - Allowed Languages (English, Gujarati, Hindi)
   - Expiry Date (optional)
   - Active Status (default: true)

3. Submit form → Card saved to:
   - **localStorage** (immediate)
   - **Supabase** (cloud sync)

#### Step 3: Manage Cards

- **View All Cards**: Grid display with filters
- **Edit Card**: Update any field
- **Delete Card**: Remove card (with tombstone tracking)
- **Toggle Active/Inactive**: Enable/disable card
- **Generate QR Code**: Create scannable QR code
- **View Analytics**: Track views and performance

#### Step 4: Share with Customers

- Download QR code
- Print/display at business location
- Share direct link: `https://yourdomain.com/{slug}`

---

### **2️⃣ User Journey - Customer**

#### Step 1: Access Review Card

- Scan QR code OR
- Visit direct URL: `/{slug}`
- System loads card data from storage
- Increments view count automatically

#### Step 2: Interact with Review Card

1. **See Business Info**:

   - Logo
   - Business name
   - Location with Google Maps link
   - View count

2. **Select Rating**:

   - Click on stars (1-5)
   - Each rating triggers new AI review generation

3. **Choose Language**:

   - English
   - Gujarati (Romanized)
   - Hindi (Romanized)
   - Language selection regenerates review

4. **Select Services** (optional):

   - Check boxes for specific services
   - AI incorporates selected services into review

5. **Review Preview**:
   - See AI-generated review text
   - Review follows natural language patterns
   - Unique content every time
   - No exclamation marks
   - No explicit star rating mention
   - 300-350 characters length

#### Step 3: Post Review

1. Click **"Copy & Post to Google"**
2. Review text copied to clipboard
3. Auto-redirect to Google Maps review page
4. Customer pastes and submits review

#### Step 4: Regenerate (Optional)

- Click **"Generate New Review"** to get different text
- AI creates fresh, unique review with same parameters

---

## 🤖 AI Review Generation Process

### AI Service (`aiService.ts`)

```typescript
generateReview(request: ReviewRequest) {
  // Input parameters:
  - businessName
  - category
  - type
  - highlights
  - selectedServices[]
  - starRating (1-5)
  - language (English/Gujarati/Hindi)
  - tone (Professional/Friendly/Casual/Grateful)
  - geminiApiKey
  - geminiModel

  // Process:
  1. Create Gemini AI model instance
  2. Build contextual prompt with:
     - Business details
     - Sentiment guide for rating
     - Language instructions (Romanized for regional)
     - Service highlights
     - Uniqueness requirements
  3. Generate review text
  4. Validate:
     - Length (300-350 chars)
     - No exclamation marks
     - No explicit rating mention
     - No script characters (Gujarati/Devanagari)
     - Uniqueness check (hash-based)
  5. Retry up to 5 times if validation fails
  6. Return review or fallback

  // Output:
  { text, hash, language, rating }
}
```

### Sentiment Guides by Rating:

- **1 Star**: Polite but reserved, gentle issue mention
- **2 Stars**: Encouraging with minor suggestions
- **3 Stars**: Balanced, mix of pros and cons
- **4 Stars**: Clearly positive with small suggestion
- **5 Stars**: Highly enthusiastic, warm praise

---

## 💾 Data Storage System

### Dual Storage Architecture

#### **localStorage (Primary, Instant)**

```typescript
// Key: 'scc_review_cards'
// Value: ReviewCard[]
// Purpose: Immediate access, offline support
```

#### **Supabase (Cloud Sync)**

```sql
-- Table: review_cards
CREATE TABLE review_cards (
  id uuid PRIMARY KEY,
  business_name text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  description text,
  location text,
  services text[],
  slug text UNIQUE NOT NULL,
  logo_url text,
  google_maps_url text NOT NULL,
  gemini_api_key text,
  gemini_model text DEFAULT 'gemini-2.0-flash',
  view_count integer DEFAULT 0,
  active boolean DEFAULT true,
  expires_at timestamptz,
  allowed_languages text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Storage Flow:

1. **Create**: Save to localStorage → Sync to Supabase
2. **Update**: Update localStorage → Sync to Supabase
3. **Delete**: Remove from localStorage → Delete from Supabase → Add to tombstone list
4. **Read**: Try Supabase first → Fallback to localStorage
5. **Migration**: Auto-migrate old localStorage data to Supabase on first load

---

## 🎨 Key Features

### 1. **Dynamic Review Cards**

- Custom slug-based routing (`/{slug}`)
- Real-time view counting
- Service-specific reviews
- Multi-language support

### 2. **Admin Dashboard**

- Card CRUD operations
- Advanced filtering:
  - Status (Active/Inactive)
  - Creation date (Today, 7d, 30d, Month, Year)
  - Expiry (24h, 7d, 30d, 6m, Expired, No Expiry)
- Real-time countdown for expiring cards
- Auto-deactivation on expiry
- QR code generation
- Analytics tracking

### 3. **Analytics Dashboard**

- Total views
- Views by card
- Time-based analytics
- Expiring cards section
- Performance charts

### 4. **Expiry System**

- Optional expiry date for cards
- Real-time countdown display
- Auto-deactivation when expired
- Prevents access to expired cards

### 5. **View Counter**

- Increments on card load
- Prevents double-counting (React 18 Strict Mode safe)
- Syncs to both localStorage and Supabase
- Displayed on admin dashboard

### 6. **QR Code Generation**

- Custom QR codes per card
- Includes business logo
- Download as image
- Print-ready format

---

## 🔐 Authentication & Security

### Protected Routes:

- `/ai-admin` - Admin dashboard
- `/ai-admin/analytics` - Analytics dashboard

### Authentication Flow:

1. User visits `/ai-login`
2. Enters credentials
3. `auth.ts` validates
4. Session token stored
5. Protected routes check token
6. Redirect to login if invalid

---

## 📊 Database Schema

### ReviewCard Interface:

```typescript
interface ReviewCard {
  id: string; // UUID
  businessName: string; // Business name
  category: string; // Category type
  type: string; // Business type
  description: string; // Highlights
  location: string; // Address
  services: string[]; // Services offered
  slug: string; // Unique URL path
  logoUrl: string; // Logo image URL
  googleMapsUrl: string; // Google Maps review link
  geminiApiKey?: string; // AI API key
  geminiModel?: string; // AI model (default: gemini-2.0-flash)
  viewCount?: number; // View counter
  active?: boolean; // Is card active
  expiresAt?: string; // Expiry timestamp (ISO)
  allowedLanguages?: string[]; // Supported languages
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
}
```

---

## 🌐 Routing Structure

```
/ - Homepage (ArsPage)
├── /ai-login - Admin login
├── /ai-admin - Admin dashboard (protected)
├── /ai-admin/analytics - Analytics (protected)
├── /privacy-policy - Privacy policy
├── /terms - Terms & conditions
├── /refund-policy - Refund policy
├── /renewalplanform - Renewal form
├── /ars - AI Review System page
├── /thank-you - Thank you page
└── /{slug} - Dynamic review card (public)
```

---

## 📈 Analytics Tracking

### Google Analytics 4 Integration:

- Page views tracked automatically
- Custom events:
  - Review card views
  - Review generations
  - Copy & post actions
  - QR code scans

---

## 🚀 Deployment

### Build Process:

```bash
npm run build
# Outputs to dist/ directory
```

### Environment Setup:

1. Configure Supabase credentials in `supabase.ts`
2. Set up Gemini API keys per card
3. Deploy to Vercel/Netlify/hosting service
4. Configure domain and SSL

---

## 🔄 Data Flow Diagram

```
Customer → Scan QR / Visit URL
    ↓
Load Review Card (/{slug})
    ↓
Fetch from Supabase/localStorage
    ↓
Increment View Count
    ↓
Display Review Interface
    ↓
Customer Selects: Rating + Language + Services
    ↓
AI Service generates review
    ↓
Display generated review
    ↓
Customer clicks "Copy & Post"
    ↓
Copy to clipboard + Redirect to Google Maps
    ↓
Customer pastes and submits review
```

---

## 🎯 Business Logic

### Card Activation States:

1. **Active**: Card visible and functional
2. **Inactive**: Card hidden from public
3. **Expired**: Auto-deactivated after expiry date

### View Count Logic:

- Increments only once per page load
- Prevents double-counting in React Strict Mode
- Syncs to both storages
- Displayed on card in dashboard

### Review Generation Logic:

- Unique hash tracking prevents duplicates
- 5 retry attempts for quality
- Fallback reviews if API fails
- Contextual sentiment matching rating

---

## 🛠️ Development Commands

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 📝 Key Files to Understand

1. **`App.tsx`** - Main routing logic
2. **`storage.ts`** - All data persistence
3. **`aiService.ts`** - AI review generation
4. **`AdminDashboard.tsx`** - Admin interface
5. **`CompactReviewCardView.tsx`** - Customer interface
6. **`supabase.ts`** - Database client

---

## 🎨 UI/UX Features

- Responsive design (mobile-first)
- Gradient backgrounds with animations
- Loading states
- Error handling
- Toast notifications
- Modal dialogs
- Real-time countdowns
- Smooth transitions
- Accessibility features

---

## 🔮 Future Enhancements

- [ ] Review history tracking
- [ ] Multi-user admin accounts
- [ ] Custom branding themes
- [ ] SMS integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Bulk card creation
- [ ] API for integrations
- [ ] Mobile app
- [ ] Multi-language admin interface

---

## 📞 Support & Contact

For admin access or issues:

- Visit: https://www.aireviewsystem.com/
- WhatsApp: +91 99099 08230

---

**Project Version**: 0.0.0  
**Last Updated**: June 10, 2025  
**License**: Private/Proprietary
