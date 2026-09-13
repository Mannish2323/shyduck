# 🦆 Shyduck Tales — Technical Architecture & Recommended Stack

## Overview

Shyduck Tales is an India-first digital storytelling platform designed for novelists, anime-inspired creators, serialized fiction writers, and avid readers.

This document outlines the planned technical stack, database architecture, data flow lifecycles, scaling strategies, and developer learning roadmap.

---

## 🛠️ Recommended Production Stack

| Layer | Technology | Role / Responsibility |
|---|---|---|
| 🖥️ **Frontend** | **TypeScript** | Primary programming language for fullstack type safety |
| ⚛️ **UI Library** | **React** | Component-driven interactive user interfaces |
| 🌐 **Framework** | **Next.js** | Server-Side Rendering (SSR), Server Actions, App Router, API routes |
| 🎨 **Styling** | **CSS / Tailwind CSS** | Responsive layouts, design tokens, dark/light themes |
| ✨ **Micro-Animations** | **Framer Motion** | UI layout transitions, state morphing, tactile interactions |
| 🌀 **Cinematic Effects** | **GSAP** | Scroll-triggered chapter animations and hero storytelling effects |
| 🗄️ **Database** | **PostgreSQL** | Relational data: users, stories, chapters, comments, follows |
| 🔥 **Backend Platform** | **Supabase** | Managed PostgreSQL, Auth, Storage, Edge Functions, Realtime |
| 🔐 **Authentication** | **Supabase Auth** | Google OAuth, email/password credentials, session tokens |
| 📁 **File Storage** | **Supabase Storage** | Story covers, character art, user avatars, media assets |
| 🔒 **Security** | **PostgreSQL RLS** | Row-Level Security: fine-grained user, author, and admin permissions |
| 🔎 **Search** | **PostgreSQL Full-Text Search** | Initial indexed search for stories, authors, and genre tags |
| ⚡ **Cache (Future)** | **Redis** | High-traffic feed caching and rate limiting |
| 📊 **Analytics** | **PostgreSQL + Custom Events** | Reads, completion rates, followers, reader retention metrics |
| 🔔 **Realtime** | **Supabase Realtime** | Instant notifications, live reader count, community updates |
| 📱 **PWA** | **Next.js PWA Setup** | Installable, offline-resilient web application |
| 🧪 **Testing** | **Vitest + Playwright** | Unit, component, and end-to-end browser testing |
| 🔧 **Version Control** | **Git + GitHub** | Source code management and CI/CD pipelines |
| 🚀 **Deployment** | **Vercel** | Global edge hosting and automated preview deployments |

### Core Recommendation

> **Next.js + TypeScript + React + Tailwind CSS + Supabase + PostgreSQL + Framer Motion + GSAP + Vercel**
>
> *This combination gives you frontend, backend, database, authentication, social relationships, and publishing capabilities in a single coherent ecosystem.*

---

## 💻 Essential Languages & Skills

1. **TypeScript ⭐⭐⭐⭐⭐** — Primary language. Strong typing eliminates runtime errors and connects frontend props with database models. *(Note: TypeScript is a superset of JavaScript; separate plain JavaScript mastery is not required).*
2. **SQL ⭐⭐⭐⭐⭐** — Fundamental for relational modeling, foreign keys, aggregations, and Row-Level Security policies.
3. **HTML ⭐⭐⭐⭐** — Semantic document markup, accessibility (ARIA), and SEO tags.
4. **CSS ⭐⭐⭐⭐** — Responsive typography, grid/flexbox layouts, and custom properties.

---

## 🧠 Database Architecture (PostgreSQL)

Relational models are strictly superior for Shyduck Tales because stories, chapters, reader progress, and social connections are inherently relational:

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

Social graph:
```text
users ↕ follows ↕ users
```

### Table Inventory

#### 1. Identity & Users
- `users` — Authentication identity (Supabase auth.users)
- `profiles` — Public author/reader personas, bios, avatars, social links

#### 2. Stories & Publishing
- `stories` — Title, synopsis, cover image, status (draft/published), maturity rating
- `chapters` — Chapter number, title, body content, word count, publication date
- `chapter_versions` — Editorial revision history and rollback snapshots

#### 3. Taxonomy & Categorization
- `genres` — Core classifications (Fantasy, Sci-Fi, Romance, Slice of Life)
- `tags` — Micro-tags (isekai, slow-burn, cyberpunk, martial-arts)
- `story_tags` — Many-to-many junction table linking stories to tags

#### 4. Social & Community
- `follows` — User-to-user follows
- `story_follows` — Readers subscribing to updates for a specific story

#### 5. Reading Experience & Progress
- `bookmarks` — Saved story reference points
- `reading_lists` — User-curated public or private collections
- `reading_list_items` — Junction table of stories in lists
- `reading_progress` — Exact scroll position, last read chapter, and percent completion

#### 6. Engagement & Feedback
- `comments` — Per-chapter reader comments
- `comment_replies` — Nested discussions
- `reactions` — Hearts, thumbs-up, emoji sentiment on chapters and comments

#### 7. Notifications & Assets
- `notifications` — New chapter releases, author announcements, replies
- `media` — Uploaded imagery and artwork
- `media_usage` — References tracking where media is embedded

#### 8. Moderation & Governance
- `reports` — User-flagged inappropriate content or copyright claims
- `moderation_actions` — Admin action audit logs

#### 9. Analytics & Discovery
- `analytics_events` — Raw reads, unique reader sessions, chapter completions
- `featured_content` — Editorial carousel selections
- `collections` — Curated seasonal or themed showcases
- `admin_audit_logs` — Security and role modification records

#### 10. Future Monetization & Adaptations
- `funding_campaigns` — Creator patron/crowdfunding initiatives
- `funding_supporters` — Backer records and perk tiers
- `adaptation_projects` — Comic, audio drama, or animation projects
- `adaptation_milestones` — Production updates and backer deliverables

---

## ⚡ Smooth Event Lifecycle: Chapter Publishing

How data flows through the stack when a writer publishes a new chapter:

```text
Writer publishes Chapter 12
        ↓
PostgreSQL: chapters (status = 'published')
        ↓
Identify followers: SELECT user_id FROM story_follows WHERE story_id = $1
        ↓
Generate notifications: INSERT INTO notifications (...)
        ↓
Reader Web App receives Supabase Realtime event
        ↓
Reader opens chapter
        ↓
Update reading_progress (chapter_id, scroll_percentage, updated_at)
        ↓
Log analytics event: chapter_view
        ↓
Writer Dashboard updates: live reader counts, retention curve, views
```

---

## 🚀 Scaling Strategy: Monolith First

Avoid premature microservices. Start with a clean, high-performance monolith:

```text
Next.js (App Router + Server Actions)
   ↓
Supabase (Managed Auth + Storage + Realtime)
   ↓
PostgreSQL (Relational Core + Row-Level Security)
```

### What to Avoid Early:
- ❌ Microservices architectures
- ❌ Java / Rust / Go / Python secondary backends
- ❌ MongoDB / document database sprawl
- ❌ Kubernetes clusters

A clean TypeScript + PostgreSQL architecture will comfortably support your initial release up to millions of reads. Introduce Redis caching and dedicated search clusters only when real traffic metrics require them.

---

## 🎯 Recommended Developer Learning Path

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
