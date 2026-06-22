# SmartLogix AI SaaS Deployment Guide

## Local Development

1. Install frontend dependencies from the repository root:

```bash
npm install
```

2. Install backend dependencies:

```bash
npm --prefix backend install
```

3. Create environment files:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

4. Start PostgreSQL and update `backend/.env` with `DATABASE_URL`.

5. Generate Prisma client and run migrations:

```bash
npm --prefix backend run prisma:generate
npm --prefix backend run prisma:migrate
npm --prefix backend run prisma:seed
```

Default seeded admin:

```text
admin@smartlogix.ai
Admin@12345
```

6. Run the frontend and backend in separate terminals:

```bash
npm run dev:frontend
npm run dev:backend
```

## Production Build

```bash
npm run build
npm --prefix backend run build
npm --prefix backend run prisma:deploy
```

Serve the Vite `dist/` folder from a static host and run the backend with:

```bash
npm --prefix backend run start
```

## Required Services

- PostgreSQL for Prisma persistence.
- Razorpay keys for subscription orders and payment webhooks.
- Cloudinary credentials for media uploads.
- Redis can be added behind `src/services` for caching and queue adapters; the current API is structured so cache calls can be introduced without changing controllers.

## API Base

Frontend reads `VITE_API_URL`, defaulting to:

```text
http://localhost:4000/api/v1
```

## Security Checklist

- Use long random values for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.
- Set `FRONTEND_URL` to the exact deployed frontend origin.
- Configure HTTPS at the load balancer or hosting layer.
- Restrict database access to the backend network.
- Add Razorpay webhook URL: `/api/v1/payments/webhook`.
