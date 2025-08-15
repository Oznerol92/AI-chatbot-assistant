# TODO – AI Assistant SaaS Platform (MERN + Scalable Setup)

## 1. Backend Setup (Express)

- [ ] Create `controllers/` for separating request logic from routes
- [ ] Create `middleware/` for:
  - [ ] Error handling
  - [ ] Request validation
  - [ ] Auth (JWT)
- [ ] Connect MongoDB/PostgreSQL (see tech-stack.md)
- [ ] Add `models/` for:
  - [ ] User
  - [ ] AssistantConfig
  - [ ] ChatHistory
  - [ ] Reminder/Event
- [ ] Update `server/routes/api.js` to import controllers instead of direct service calls
- [ ] Add `.env` for secrets (OpenAI key, DB URI, JWT secret)
- [ ] Implement logging (Winston or pino)

## 2. OpenAI Service Integration

- [ ] Refactor `openaiService.js` to:
  - [ ] Support multiple models
  - [ ] Handle retries & rate limits
- [ ] Add caching layer (Redis) for recent prompts/responses

## 3. Frontend Setup (React + Vite + TS)

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
