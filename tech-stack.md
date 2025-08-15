# Tech Stack – AI Assistant SaaS Platform (Scalable)

## Backend

- **Framework**: Node.js + Express
- **Language**: TypeScript
- **Architecture**: MVC (Models, Controllers, Middleware, Routes, Services)
- **API**: REST (possible GraphQL later)

## Frontend

- **Framework**: React + Vite + TypeScript
- **UI**: TailwindCSS + ShadCN/UI
- **State**: Zustand or Redux Toolkit

## Database

- **Primary**: PostgreSQL (pgvector extension for AI memory)
- **Alternative**: MongoDB for flexible schema
- **ORM**: Prisma
- **Vector DB**: pgvector (self-hosted) or Pinecone (managed)
- **Backups**:
  - Automated daily backups to cloud (AWS S3)
  - Weekly local backups for disaster recovery

## Caching & Queue

- **Redis**:
  - Caching AI responses
  - BullMQ for scheduled jobs (reminders, delayed actions)

## Hosting

- **Frontend**: Vercel or Netlify (auto-deploy from GitHub)
- **Backend**: Render, Fly.io, or AWS ECS (Dockerized)
- **Database**: Supabase (Postgres) or MongoDB Atlas (managed)
- **Vector DB**: Same cloud provider or Pinecone

## DevOps & Scaling

- **CI/CD**: GitHub Actions (test → build → deploy)
- **Containerization**: Docker + docker-compose
- **Monitoring**: Prometheus + Grafana
- **Logging**: Winston or pino (JSON logs for scaling)
- **Env Management**: dotenv + per-environment configs

## Security & Compliance

- HTTPS everywhere
- JWT auth
- OAuth for 3rd party API access
- Encryption at rest & in transit
- GDPR-compliant data retention policies

## Development Flow

1. Local dev with Dockerized DB + backend + frontend
2. Push to GitHub → CI runs tests → auto deploy to staging
3. Manual approval → deploy to production
