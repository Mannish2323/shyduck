<div align="center">

<div aria-label="Shyduck Tales logo" role="img" style="font-size: 48px;">🦆</div>

# SHYDUCK TALES

### Where Stories Come Alive.

**Stories deserve worlds.**

A modern home for original novels, anime-inspired stories, storytellers and readers.

[![Status: early development](https://img.shields.io/badge/status-early%20development-d8a84e?style=for-the-badge&labelColor=171827)](#roadmap)
[![Prototype: static web](https://img.shields.io/badge/prototype-static%20web-8d9cff?style=for-the-badge&labelColor=171827)](#current-repository-state)
[![License: TBD](https://img.shields.io/badge/license-to%20be%20determined-8d9cff?style=for-the-badge&labelColor=171827)](#license)

<br />

<a href="#what-is-shyduck-tales">Explore Stories</a> &nbsp; · &nbsp;
<a href="#become-a-writer">Become a Writer</a> &nbsp; · &nbsp;
<a href="https://github.com/Mannish2323/shyduck">GitHub</a>

</div>

<br />

<p align="center"><em>🎞️ Cinematic intro placeholder — add <code>docs/assets/shyduck-intro.gif</code> when the first product capture is ready.</em></p>

<p align="center"><em>Every story begins with a blank page.</em></p>

Shyduck Tales is an India-first digital storytelling platform for writers, novelists, anime-story creators and readers. The first version is focused on the essential loop: writing, publishing, discovering and reading. Over time, the most loved stories can grow into richer experiences — comics, audio, motion stories and other adaptations.

> **V1 principle:** build a beautiful home for stories before building everything around them.

## Contents

- [What is Shyduck Tales?](#what-is-shyduck-tales)
- [Core features](#core-features)
- [Technology](#technology)
- [Architecture](#architecture)
- [Data model](#data-model)
- [Data flow](#data-flow)
- [Developer learning path](#developer-learning-path)
- [Design system](#design-system)
- [Responsive experience](#responsive-experience)
- [Current repository state](#current-repository-state)
- [Getting started](#getting-started)
- [Security foundation](#security-foundation)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Future vision](#future-vision)
- [India-first](#india-first)
- [Screenshots](#screenshots)
- [The Shyduck](#the-shyduck)
- [Contributing](#contributing)
- [License](#license)

## What is Shyduck Tales?

Shyduck Tales is designed around a simple creative journey:

```text
WRITE
  ↓
PUBLISH
  ↓
DISCOVER
  ↓
READ
  ↓
CONNECT
  ↓
BUILD A COMMUNITY
  ↓
SUPPORT
  ↓
BRING STORIES TO LIFE
```

Writers should be able to make a world one chapter at a time. Readers should be able to find stories worth staying with. Communities should form around the worlds people care about.

Animation is a future direction, not a V1 dependency. The foundation is the story, the creator and the reader relationship.

## Core features

### Story publishing

The creator experience is planned around:

- Story and chapter creation
- Draft management and autosave
- Rich text editing and preview
- Scheduled publishing
- Story metadata, covers, genres and tags
- Ongoing, completed and hiatus status
- Version history as the product matures

### Premium reader

- Distraction-free reading
- Reading progress and continue reading
- Chapter navigation and bookmarks
- Dark and light reading modes
- Font and reading-width controls
- Mobile-first reading layouts

### Story discovery

- Story and author search
- Genre and tag discovery
- Trending, new, featured and rising-writer surfaces
- Completed novels and reading lists
- A foundation for personalized recommendations

### Creator profiles

Writers can build an identity beyond a single story:

- Profile and bio
- Published stories and collections
- Followers and author information
- Story-level statistics as analytics mature

### Story universe

Advanced stories can gradually become complete fictional worlds:

```text
STORY
├── Characters
├── Locations
├── Factions
├── Lore
└── Timeline
```

### Community

- Follow authors and stories
- Comments, replies and reactions
- Discussions and notifications
- Spoiler protection
- Reading lists

### Creator analytics

The planned analytics surface will help writers understand reads, unique readers, followers, bookmarks, comments, chapter views, completion rate, retention and growth.

These are product goals, not claims that the current static prototype already measures them.

### Creator protection

The platform architecture is intended to provide a foundation for original-work declarations, copyright reporting, content reports, plagiarism reports, moderation, version history and audit logs. Shyduck Tales makes no unsupported legal or copyright guarantees.

## Technology

### Recommended product stack

| Layer | Technology | Role / Responsibility |
|---|---|---|
| 🖥️ Frontend | **TypeScript** | Primary programming language |
| ⚛️ UI | **React** | Interactive UI components |
| 🌐 Framework | **Next.js** | Frontend + Server-Side Rendering (SSR) & API routes |
| 🎨 Styling | **CSS / Tailwind CSS** | Responsive styling and design tokens |
| ✨ Animation | **Framer Motion** | UI layout transitions and micro-interactions |
| 🌀 Advanced Animation | **GSAP** | Cinematic story effects and hero animations |
| 🗄️ Database | **PostgreSQL** | Relational data: users, stories, chapters, comments, follows |
| 🔥 Backend Platform | **Supabase** | Managed PostgreSQL, Auth, Storage, and Realtime API |
| 🔐 Authentication | **Supabase Auth** | Google OAuth, email/password, session management |
| 📁 File Storage | **Supabase Storage** | Story covers, user avatars, and illustration assets |
| 🔒 Security | **PostgreSQL RLS** | Row-Level Security: user, creator, and admin permissions |
| 🔎 Search | **PostgreSQL Full-Text Search** | Initial search for stories, authors, and genre tags |
| ⚡ Cache | **Redis** *(Future)* | High-concurrency query caching |
| 📊 Analytics | **PostgreSQL + Custom Events** | Reads, completion rates, followers, retention metrics |
| 🔔 Realtime | **Supabase Realtime** | Instant notifications and community interaction updates |
| 📱 PWA | **Next.js PWA Setup** | Installable, offline-resilient web application |
| 🧪 Testing | **Vitest + Playwright** | Unit, component, and end-to-end browser testing |
| 🔧 Version Control | **Git + GitHub** | Source code management and CI/CD workflows |
| 🚀 Deployment | **Vercel** | Global edge hosting and deployment for Next.js |

> **Core Stack Recommendation:**  
> **Next.js + TypeScript + React + Tailwind CSS + Supabase + PostgreSQL + Framer Motion + GSAP + Vercel**  
> *This stack provides frontend, backend, database, authentication, social relationships, and publishing capabilities within a cohesive ecosystem.*

### Essential languages

1. **TypeScript ⭐⭐⭐⭐⭐** — Primary programming language for fullstack safety (superset of JavaScript).
2. **SQL ⭐⭐⭐⭐⭐** — Relational queries, schema design, and Row-Level Security policies.
3. **HTML ⭐⭐⭐⭐** — Semantic document structure and accessibility foundations.
4. **CSS ⭐⭐⭐⭐** — Responsive layout, typography, and visual styling.

### Current prototype stack

The repository now contains a runnable Next.js/TypeScript product foundation. Supabase, persistence and production authentication remain roadmap work.

## Architecture

```text
                         ┌───────────────────┐
                         │   SHYDUCK TALES   │
                         └─────────┬─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
          READERS              WRITERS                ADMINS
              │                    │                    │
       Discover / Read      Write / Publish      Manage Platform
              └────────────────────┼────────────────────┘
                                   ▼
                           Next.js / React
                                   │
                                   ▼
                              Supabase API
                     ┌─────────────┼─────────────┐
                     ▼             ▼             ▼
                PostgreSQL      Storage          Auth
                     │
                     ▼
          Analytics / Relationships / Content
```

### Scaling principle: Monolith first

Avoid premature microservices or multi-database complexity early on. A cohesive monolith is ideal:

```text
Next.js
   ↓
Supabase (Auth + Storage + Realtime)
   ↓
PostgreSQL (Relational core + RLS)
```

**Avoid early over-engineering:**
- ❌ Premature microservices
- ❌ Java / Rust / Python secondary backends
- ❌ MongoDB / NoSQL sprawl
- ❌ Kubernetes clusters

A clean, strongly-typed TypeScript + PostgreSQL architecture will comfortably scale from MVP to high traction. Separate microservices, Redis caches, and dedicated search engines should only be introduced when traffic bottlenecks genuinely warrant them.

## Data model

The relational database is the backbone of Shyduck Tales. User accounts, reading progress, publications, and social relationships map naturally to relational schemas:

```text
users
   ↓
profiles
   ↓
stories
   ↓
chapters
   ↓
comments
```

User social graph:
```text
users ↕ follows ↕ users
```

### Core database tables

```text
-- Identity & Users
users
profiles

-- Stories & Publishing
stories
chapters
chapter_versions

-- Taxonomy
genres
tags
story_tags

-- Social & Relationships
follows
story_follows

-- Reading Experience
bookmarks
reading_lists
reading_list_items
reading_progress

-- Engagement & Community
comments
comment_replies
reactions

-- Notifications & Assets
notifications
media
media_usage

-- Moderation & Governance
reports
moderation_actions

-- Analytics & Administration
analytics_events
featured_content
collections
admin_audit_logs
```

Future expansion tables (crowdfunding & multimedia adaptations):
```text
funding_campaigns
funding_supporters
adaptation_projects
adaptation_milestones
```

Advanced story-world relationships:
```text
Stories
├── Genres
├── Tags
├── Characters
├── Locations
├── Factions
├── Lore
└── Timeline
```

## Data flow

### Publishing and reader lifecycle

```text
Writer publishes Chapter 12
        ↓
PostgreSQL: chapters (status = 'published')
        ↓
Identify followers: story_follows
        ↓
Generate notifications: notifications table
        ↓
Reader web app: "New Chapter Available" alert
        ↓
Reader opens chapter
        ↓
Update reading_progress
        ↓
Log analytics event: chapter_view
        ↓
Writer dashboard updates: views, readers, completion rate
```

The relational model keeps users, followers, stories, chapters, comments, reading progress and analytics connected without turning the reader experience into a disconnected content feed.

## Developer learning path

Recommended learning order for building Shyduck Tales:

```text
HTML
  ↓
CSS
  ↓
JavaScript fundamentals
  ↓
TypeScript ⭐
  ↓
React
  ↓
Next.js ⭐
  ↓
SQL ⭐
  ↓
PostgreSQL ⭐
  ↓
Supabase
  ↓
Authentication
  ↓
Row-Level Security (RLS)
  ↓
API design
  ↓
Testing (Vitest / Playwright)
  ↓
Deployment (Vercel)
```

## Design system

Shyduck Tales should feel like a premium editorial product: cinematic enough to invite imagination, quiet enough to let the story lead.

| Principle | Meaning |
|---|---|
| **Cinematic** | Stories should feel immersive without relying on visual noise. |
| **Editorial** | Typography and spacing should make long-form reading comfortable. |
| **Minimal** | The interface should never overpower the story. |
| **Responsive** | Mobile and desktop are first-class experiences. |
| **Accessible** | Readable typography, contrast, keyboard navigation and semantic HTML are foundational. |

The intended interface uses a midnight palette with cream, warm gold, soft blue and purple atmosphere, plus the Shyduck mascot as a restrained visual signature.

## Responsive experience

```text
Desktop  →  Tablet  →  Mobile  →  PWA
```

The product is intended to support:

- Responsive story cards
- A focused mobile reader
- Mobile navigation and touch-friendly controls
- A responsive writer studio
- A responsive admin panel

## Current repository state

The repository contains a runnable Next.js/TypeScript foundation with fictional demo content and these routes:

| Route | Purpose |
|---|---|
| `/` | Editorial home with featured stories and genre entry points |
| `/discover` | Search-shaped discovery surface |
| `/stories/[slug]` | Story hero, metadata and chapter list |
| `/stories/[slug]/chapters/[chapter]` | Focused chapter reader |
| `/writer` and `/writer/new` | Writer studio and create-story preview |
| `/admin` | Admin operations preview shell |

Deferred features include Supabase integration, migrations, real authentication, persistent reading progress, writer autosave, analytics, community, moderation, media management and automated end-to-end tests.

## Getting started

Install the checked-in Next.js application:

```bash
git clone <repository-url>
cd shyduck
```

```bash
npm install
npm run dev
```

```text
http://localhost:3000
```

### Planned local environment

Supabase values are not required for the current demo routes. They will be required when persistence and authentication are connected. Never commit secrets.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Security foundation

The planned application should include:

- Supabase Row Level Security for user-owned data
- Server-side authorization for protected operations
- Protected writer and admin routes
- Explicit storage policies for covers and creator uploads
- Input validation and safe rich-text handling
- Environment variables for configuration and secrets
- No secrets in Git history

These are architecture requirements for the product, not controls that the current static prototype can enforce.

## Testing

TypeScript validation currently passes with:

```bash
npx tsc --noEmit
```

Automated test scripts are planned for the persistence-backed product:

```bash
npm run test
npm run test:e2e
```

They should be added to `package.json` with the test suite before being presented as runnable repository commands.

## Roadmap

Progress is intentionally described as direction, not fabricated completion percentages.

```text
PHASE 01  ██████████  Foundation
PHASE 02  ████████░░  Story Platform
PHASE 03  ██████░░░░  Creator Studio
PHASE 04  ████░░░░░░  Community
PHASE 05  ███░░░░░░░  Admin & Moderation
PHASE 06  ██░░░░░░░░  Analytics
PHASE 07  ░░░░░░░░░░  Creator Support
PHASE 08  ░░░░░░░░░░  Adaptation Ecosystem
```

Current implementation status is the static prototype described in [Current repository state](#current-repository-state). The bars above are sequencing guidance, not measured project completion.

## Future vision

```text
                 📖 NOVEL
                    │
                    ▼
                 👥 READERS
                    │
                    ▼
                ❤️ COMMUNITY
                    │
                    ▼
                💰 SUPPORT
              ┌─────┼─────┐
              ▼     ▼     ▼
            📕 Comic 🎧 Audio 🎞 Motion
                                  │
                                  ▼
                               🎬 Anime
```

The long-term vision is to help exceptional stories move beyond the page. That does not mean every story becomes an anime. It means creators have a stronger path from an original world to the formats and communities that fit it.

## India-first

Shyduck Tales is designed with Indian creators and readers in mind, with a foundation for:

**English · Hindi · Telugu · Tamil · Kannada · Malayalam · Marathi · Bengali · Gujarati · Punjabi · more to come**

Language support, readable typography, affordable access patterns and local creator ecosystems should be treated as product foundations rather than late-stage localization work.

## Screenshots

Actual product screenshots will be added as the application surfaces are implemented. No screenshots are fabricated in this README.

Planned asset directory:

```text
docs/assets/
├── home.png
├── discover.png
├── story.png
├── reader.png
├── writer-studio.png
├── editor.png
├── profile.png
├── community.png
└── admin.png
```

When available, images can be embedded with GitHub-compatible local paths:

```md
![Story discovery](./docs/assets/discover.png)
```

## The Shyduck

Shyduck is the friendly visual identity of the platform: cute, mysterious, creative and premium. The mascot should make the product feel welcoming without making the experience childish or distracting from the work of the writer.

<p align="center"><em>Mascot artwork placeholder — add an approved local asset under <code>docs/assets/</code> when available.</em></p>

## Become a writer

The creator journey starts simply: bring an idea, shape it into chapters, publish at your own pace and find the readers who want to stay in that world.

The writer studio, analytics and community tools are planned product surfaces and will be documented here as they become real, testable features.

## Contributing

Contributions are welcome as the product takes shape.

1. Fork the repository.
2. Create a focused feature branch.
3. Make and document your changes.
4. Run the relevant checks available in the repository.
5. Commit with a clear message.
6. Push your branch.
7. Open a pull request with context and screenshots for visual changes.

Contribution guidelines will be formalized as the application architecture and test suite are introduced.

## License

License to be determined.

## Support the project

If you believe stories deserve better places to live, consider [starring the repository](https://github.com/Mannish2323/shyduck) and sharing Shyduck Tales with other creators.

[⭐ Star](https://github.com/Mannish2323/shyduck) · [🐛 Issues](https://github.com/Mannish2323/shyduck/issues) · [💡 Discussions](https://github.com/Mannish2323/shyduck/discussions)

<br />

<div align="center">

## Every great world begins with a story.

# 🦆 Shyduck Tales

### Write. Publish. Discover. Read. Build a World.

> **Stories deserve worlds.**

</div>
