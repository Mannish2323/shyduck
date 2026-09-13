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

### Intended product stack

| Layer | Intended technology |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Animation | Framer Motion, GSAP |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Testing | Vitest, Playwright |
| Deployment | Vercel |
| Version control | Git, GitHub |

### Current prototype stack

The repository currently contains a framework-free prototype using HTML, CSS, JavaScript, local image assets and browser-native interactions. The intended product stack above is a roadmap direction, not an assertion about the current implementation.

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

This is the planned application architecture. The checked-in prototype is currently a static front-end surface.

## Data model

```text
Users
│
├── Profiles
├── Stories
│   └── Chapters
│       └── Chapter Versions
├── Followers
├── Bookmarks
├── Reading Progress
├── Reading Lists
├── Comments
├── Reactions
└── Notifications
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

### Writer publishes a chapter

```text
Writer
  ↓
Story Editor
  ↓
Autosave
  ↓
Preview
  ↓
Publish
  ↓
PostgreSQL
  ↓
Followers identified
  ↓
Notifications
  ↓
Reader opens chapter
  ↓
Reading Progress
  ↓
Analytics Event
  ↓
Creator Dashboard
```

The relational model is intended to keep users, followers, stories, chapters, comments, reading progress and analytics connected without turning the reader experience into a disconnected content feed.

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

The repository currently contains the product README and Git ignore configuration. The application implementation has not yet been checked in here.

The following are not yet implemented in this repository: a Next.js application, Supabase integration, database migrations, real authentication, writer routes, reader routes, creator analytics, community services, visual assets and automated test scripts.

## Getting started

This repository currently has no `package.json` or npm scripts. There is no runnable application checked in yet:

```bash
git clone <repository-url>
cd shyduck
```

The commands above only clone the repository. The application setup below is planned for the Next.js implementation.

### Planned application setup

When the Next.js application is introduced, the intended workflow will be:

```bash
npm install
npm run dev
```

```text
http://localhost:3000
```

Do not run those commands against the current repository expecting npm scripts to exist yet.

### Planned local environment

Actual Supabase values must be supplied locally when that integration is implemented. Never commit secrets.

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

No automated test scripts are currently defined. Once the application stack exists, the intended commands are:

```bash
npm run test
npm run test:e2e
```

They should be added to `package.json` before being presented as runnable repository commands.

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
