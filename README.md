This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What to Deliver - Answer

**The Basic Idea:** Someone uploads AI-generated text files, and the system automatically creates new pages on your website using Storyblok CMS.

### 1. How We Process Files

When you upload a file:

- The system reads the text and figures out what the title should be
- It creates a unique URL like `/content/some-unique-slug`
- It formats everything properly for Storyblok
- The page goes live on your website

We make sure every page has the same format and good SEO so Google can find it.

### 2. Handling Lots of Files

For big uploads (like 100+ files at once):

- Files get processed in the background so the website doesn't freeze
- We use a queue system so if something breaks, we don't lose your work
- The system waits between uploads so we don't overwhelm Storyblok's servers

### 3. What Could Go Wrong and How We Fix It

**Problem: Storyblok might reject too many requests at once**

- Solution: We slow down and retry automatically

**Problem: AI text might be poorly formatted**

- Solution: We clean it up and check it before publishing

**Problem: Two files might try to use the same URL**

- Solution: Every page gets a truly unique URL. Although my current implementation doesnt check for an existing one but we can have a quick check for this to produce unique URL.

**Problem: The system crashes during a big upload**

- Solution: We save progress and can restart where we left off

## Project Structure Created

```
storyblok-content/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API Routes
│   │   │   ├── upload-content/
│   │   │   │   └── route.ts     # Single content upload endpoint
│   │   │   ├── batch-upload/
│   │   │   │   └── route.ts     # Batch content upload endpoint
│   │   │   └── job-status/
│   │   │       └── [id]/
│   │   │           └── route.ts # Job status checking endpoint
│   │   ├── content/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Dynamic content pages
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Dashboard page component
│   │   └── globals.css          # Global styles
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── config/
│   │   ├── storyblok.ts         # Storyblok configuration
│   │   └── redis.ts             # Redis & queue configuration
│   ├── services/
│   │   ├── content-processor.ts # Content processing logic
│   │   ├── storyblok-client.ts  # Storyblok API client
│   │   └── queue-manager.ts     # Queue management with BullMQ
│   └── utils/
│       ├── validation.ts        # Content validation with Zod
│       ├── slug-generator.ts    # URL slug generation & uniqueness
│       ├── seo-optimizer.ts     # SEO metadata extraction
│       ├── hash-generator.ts    # Content hashing for deduplication
│       └── button-event-handler.tsx # Reusable client components
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies & scripts
└── .env.local                   # Environment variables
```
