# SmartLogix Admin Panel

A modern SaaS Admin Dashboard built with React, Vite, Tailwind CSS, TanStack Router, React Query, and Radix UI.

## Features

* Modern SaaS Dashboard
* Account Management
* AI Jobs Management
* Analytics & Reporting
* Notifications Center
* Settings & Preferences
* Responsive Design
* Dark Mode UI
* Reusable Component Architecture

## Tech Stack

### Frontend

* React 19
* Vite 8
* TanStack Router
* TanStack React Query
* Tailwind CSS 4
* Radix UI
* Framer Motion
* Zustand
* Axios
* Recharts
* React Hook Form
* Zod

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd smartlogix-admin-panel
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── dashboard/
│   ├── ui/
│   └── shared/
├── routes/
├── hooks/
├── services/
├── store/
├── lib/
├── assets/
└── styles/
```

## Deployment

### Vercel

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

Install Command:

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://api.example.com
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Performance Notes

The project currently builds successfully. Some bundle chunks exceed 500 KB after minification. This is a warning only and does not affect deployment. Future optimization can be achieved through code splitting and lazy loading.

## License

Proprietary © SmartLogix AI Pvt Ltd

```
```
