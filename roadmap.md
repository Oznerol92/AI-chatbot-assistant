# Roadmap – AI Assistant SaaS Platform

## Phase 1 – Core Infrastructure (MVP Foundations)

### 1. Database Layer

Purpose:

- User accounts & authentication
- Assistant configurations (prompt templates, personality, triggers)
- Chat history & context (long-term memory)
- Event/reminder storage

Recommended stack:

- **PostgreSQL** – relational, scalable
- **Prisma ORM** – schema-first, TypeScript-friendly, easy migrations
- **Optional complements**:
  - MongoDB – flexible storage for chat logs
  - Redis – for caching & job queues

---

### 2. Modular Assistant Architecture

Structure:

- **Core service** – routing, session management, message handling
- **Assistant modules** – each self-contained with:
  - Triggers (message, schedule, keyword)
  - Actions (summarize, alert, task creation)
  - Prompt templates

Example Modules:

- Trader Summarizer
- Reminder Scheduler
- News/Market Watcher
- Quick Actions (email, Slack, Telegram commands)

---

### 3. Event & Message Listening

Integrations:

- Telegram Bot API
- Discord Bot API
- Email (IMAP listener or Gmail API)

Workflow:

1. Receive raw messages via API/webhook
2. Pass to AI for summarization or processing
3. Return proposed reply buttons/text
4. Log in DB

---

### 4. Scheduling & Reminders

- Use **BullMQ** (Redis-backed) or **Agenda** for scheduling
- Store in DB:
  - Date/time
  - Recurrence rules
  - Assigned assistant
  - Delivery channel
- On trigger → send via correct integration

---

### 5. Persistent Memory & Context

- Store conversation **summaries** (reduce token usage)
- Vector search for semantic recall (Pinecone, Weaviate, pgvector)
- Allow assistants to pull from past automatically

---

### 6. Multi-Platform Deployment

- **Telegram Bot**: per-assistant bots or commands
- **Discord Bot**: dedicated channels
- **Web App**: chat frontend + sidebar for assistant selection
- **Email Gateway**: offline interaction

---

### 7. Business Layer

- Subscription tiers (free/paid, limits/custom assistants)
- Usage tracking per user
- Stripe integration for billing
- Admin dashboard (manage assistants, users, logs)

---

## Phase 2 – MVP Features

- **Trader Summarizer**:
  1. Telegram webhook → listener
  2. Message → DB storage
  3. Summarization via AI
  4. Push notification with:
     - Summary
     - Quick reply buttons
  5. User clicks → send via bot

---

## Phase 3 – Growth & Expansion

- Launch marketplace for custom assistant modules
- Low-code builder for prompt templates & triggers
- Advanced context graph for richer recall
- Observability & analytics dashboard
- Mobile offline-first client

---

## Notes

- Security: OAuth, encryption at rest, GDPR compliance
- Cost control: model selection, batching jobs, per-user limits
- Reliability: isolate modules, handle race conditions
