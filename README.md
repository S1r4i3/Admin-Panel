SMARTLOGIX ADMIN PANEL

A modern admin dashboard for the Smartlogix AI platform built with React and Vite.


TECH STACK

  - React 19 + Vite 8
  - React Router v7
  - TanStack React Query v5
  - Tailwind CSS v4
  - Recharts (charts and graphs)
  - Framer Motion (animations)
  - Axios (API requests)
  - Zustand (state management)
  - Zod + React Hook Form (form validation)


PREREQUISITES

  - Node.js v18 or higher
  - npm v9 or higher
  - Django backend running on the network


HOW TO RUN

Step 1 - Install dependencies

    npm install

Step 2 - Configure backend URL

  Open vite.config.js and set your backend IP:

    target: "http://<BACKEND_IP>:8000"

  Same machine    ->  http://localhost:8000
  Other laptop    ->  http://192.168.1.25:8000  (use actual IP)
  Production URL  ->  https://backend.translive.ai

Step 3 - Start the dev server

    npm run dev

  App opens at:  http://localhost:3000


BACKEND SETUP

Start Django with this command (not 127.0.0.1):

    python manage.py runserver 0.0.0.0:8000

Also allow port 8000 through Windows Firewall on the backend machine.


AVAILABLE COMMANDS


  npm run dev        Start development server (port 3000)
  npm run build      Build for production
  npm run preview    Preview production build
  npm run lint       Run ESLint
  npm run format     Format code with Prettier


PROJECT STRUCTURE


  src/
    api/              API call functions per module
    components/
      dashboard/      AppShell, Sidebar, TopBar, all page widgets
      ui/             Reusable UI components (shadcn)
    contexts/         AuthContext with JWT handling
    hooks/            React Query hooks per module
    lib/              Query client, utils, placeholder data
    routes/           One file per page
    services/         dashboard.js - main data service
    main.jsx          App entry point


API ENDPOINTS


  POST  /api/token/                   Login (returns JWT tokens)
  GET   /api/analytics/               Dashboard analytics
  GET   /api/auth/users/              User list
  GET   /api/ai-jobs/                 AI job queue
  GET   /api/payments/transactions/   Transactions
  GET   /api/subscriptions/           Active subscriptions
  GET   /api/subscriptions/plans/     Subscription plans
  GET   /api/notifications/           Notifications
  GET   /api/api-keys/                API keys
  GET   /api/credits/                 Credit purchases
  GET   /api/cms/pages/               CMS pages
  GET   /api/cms/blogs/               CMS blogs
  GET   /api/cms/faqs/                CMS FAQs
  GET   /api/cms/banners/             CMS banners

  Note: Dashboard shows static placeholder data when backend is offline.


AUTHENTICATION


  Uses Django SimpleJWT. Tokens saved in browser localStorage:

    smartlogix_access_token
    smartlogix_refresh_token
    smartlogix_user
