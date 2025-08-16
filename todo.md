# TODO – AI Assistant SaaS Platform (MERN + Scalable Setup)

## 1. Backend Setup (Express)

- [ ] Connect MongoDB/PostgreSQL (see tech-stack.md)
- [ ] Add `models/` for:
  - [ ] User
  - [ ] AssistantConfig
  - [ ] ChatHistory
  - [ ] Reminder/Event
- [ ] Implement logging (Winston or pino)

## 2. OpenAI Service Integration

- [ ] Refactor `openaiService.js` to:
  - [ ] Support multiple models
  - [ ] Handle retries & rate limits
- [ ] Add caching layer (Redis) for recent prompts/responses

## 3. Frontend Setup (React + Vite + TS)

```
src/
├── components/       # UI components (reusable & feature-specific)
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthSwitcher.tsx
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   └── MessageInput.tsx
│   └── layout/
│       └── Navbar.tsx
│
├── pages/            # Top-level views
│   ├── AuthPage.tsx
│   └── ChatPage.tsx
│
├── services/         # API and business logic
│   ├── api.ts        # generic fetch wrapper
│   ├── authService.ts
│   └── chatService.ts
│
├── context/          # Global state (AuthContext, ChatContext)
│   ├── AuthContext.tsx
│   └── ChatContext.tsx
│
├── hooks/            # Custom React hooks
│   ├── useAuth.ts
│   └── useChat.ts
│
├── types/            # Shared TypeScript types/interfaces
│   ├── auth.ts
│   ├── chat.ts
│   └── index.ts
│
├── App.tsx           # routes + context providers
├── main.tsx
└── index.css
```

- [ ] Create `src/components/ChatWindow.tsx`
- [ ] Create `src/components/AssistantSelector.tsx`
- [ ] API helper in `src/services/api.ts` for backend calls
- [ ] State management (Zustand or Redux Toolkit)
- [ ] Loading/error UI states

## 4. Authentication

- [ ] JWT-based login/signup
- [ ] Password hashing (bcrypt)
- [ ] Auth middleware on backend routes
- [ ] Auth context/provider on frontend

## 5. Database & Persistence

- [ ] Schema setup in chosen DB
- [ ] Local dev DB (Docker container)
- [ ] Cloud DB for staging/production
- [ ] Automated backups (cloud + local)

## 6. Hosting & DevOps

- [ ] Dockerize frontend & backend
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Deploy:
  - [ ] Backend → Render/Fly.io/AWS ECS
  - [ ] Frontend → Vercel/Netlify
  - [ ] DB → Managed service (Supabase, Neon, MongoDB Atlas)
- [ ] Environment-based config (dev, staging, prod)

## 7. Phase 1 Features

- [ ] `/chat` endpoint → AI assistant response
- [ ] `/summarize` endpoint → summarized text
- [ ] Telegram integration (webhook listener)
- [ ] Discord integration (bot listener)

## 8. QA & Scaling Prep

- [ ] Unit tests (Jest)
- [ ] Integration tests for routes
- [ ] Load testing (k6 or Artillery)
- [ ] Monitor metrics (Prometheus + Grafana)
