# TODO – AI Assistant SaaS Platform (MERN + Scalable Setup)

## OpenAI Service Integration

- [ ] Refactor `openaiService.js` to:
  - [ ] Support multiple models
  - [ ] Handle retries & rate limits
- [ ] Add caching layer (Redis) for recent prompts/responses

## Frontend Setup (React + Vite + TS)

- [ ] Loading/error UI states

## Authentication

- [ ] JWT-based login/signup
- [ ] Password hashing (bcrypt)
- [ ] Auth middleware on backend routes
- [ ] Auth context/provider on frontend

## Database & Persistence

- [ ] Schema setup in chosen DB
- [ ] Local dev DB (Docker container)
- [ ] Cloud DB for staging/production
- [ ] Automated backups (cloud + local)

## Hosting & DevOps

- [ ] Dockerize frontend & backend
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Deploy:
  - [ ] Backend → Render/Fly.io/AWS ECS
  - [ ] Frontend → Vercel/Netlify
  - [ ] DB → Managed service (Supabase, Neon, MongoDB Atlas)
- [ ] Environment-based config (dev, staging, prod)

## Phase 1 Features

- [ ] `/chat` endpoint → AI assistant response
- [ ] `/summarize` endpoint → summarized text
- [ ] Telegram integration (webhook listener)
- [ ] Discord integration (bot listener)

## QA & Scaling Prep

- [ ] Unit tests (Jest)
- [ ] Integration tests for routes
- [ ] Load testing (k6 or Artillery)
- [ ] Monitor metrics (Prometheus + Grafana)
