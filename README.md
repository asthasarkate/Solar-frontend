<div align="center">

# Solara AI — Solar Panel Fault Detection

**AI-powered solar panel inspection platform built with React 19 + Vite**

![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

*Upload a photo of your solar panel and get instant fault detection, severity classification, and maintenance recommendations powered by dual deep-learning models (VGG16 / MobileNetV2).*

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Pushing to GitHub](#pushing-to-github)
- [Design System](#design-system)
- [Key Architecture Decisions](#key-architecture-decisions)
- [Contributing](#contributing)

---

## About the Project

**Solara AI** is a full-featured React web application for solar infrastructure monitoring. Field engineers and fleet operators can:

1. **Upload** inspection photographs or **capture** live camera images of solar panels
2. Run them through an **AI analysis pipeline** powered by dual neural-network models
3. Receive a **fault classification** (Dust, Cracks, Physical Damage, Shading), **severity level** (Low / Medium / High), **confidence score**, and **actionable maintenance recommendations**
4. View a **dashboard** with fleet-wide statistics and recent scan history
5. Browse, search, filter, and sort the full **scan history** log

The app works gracefully without a backend by falling back to realistic mock data for all pages.

---

## Features

| Feature | Description |
|---|---|
| JWT Authentication | Cookie-based login/register with auto token refresh and 401 redirect |
| Image Upload | Drag-and-drop or click-to-browse (JPG/PNG) with an image quality guide |
| Live Camera Capture | Real-time camera feed with HUD crosshair overlay and one-click capture |
| AI Fault Detection | Multi-class CV detection: Dust, Cracks, Physical Damage, Shading |
| Severity Classification | 3-tier risk: Low / Medium / High with color-coded badges |
| Dashboard Analytics | Fleet stats, fault distribution bars, recent scan feed |
| Scan History | Searchable, filterable, sortable paginated table |
| User Profile | Edit name, view scan count, initials/photo avatar toggle |
| Responsive Design | Mobile-first, collapsible sidebar, adaptive layouts |
| Custom Design System | Material Design 3-inspired Tailwind tokens with Inter font |

---

## Tech Stack

### Core

| Library | Version | Purpose |
|---|---|---|
| React | 19.2.8 | UI framework |
| Vite | 8.2.2 | Build tool and dev server |
| React Router DOM | 7.18.3 | Client-side routing |

### Data and Forms

| Library | Version | Purpose |
|---|---|---|
| Axios | 1.20.0 | HTTP client |
| React Hook Form | 7.87.0 | Form state and validation |
| js-cookie | 3.0.8 | Cookie management (JWT token storage) |
| date-fns | 4.4.0 | Date formatting utilities |

### UI and Visualization

| Library | Version | Purpose |
|---|---|---|
| TailwindCSS | 3.4.19 | Utility-first CSS framework |
| React Hot Toast | 2.6.0 | Toast notifications |
| React Icons | 5.7.0 | Icon library |
| Recharts | 3.10.1 | Pie and data charts |
| React Webcam | 7.2.0 | Browser webcam access |

---

## Project Structure

```
Solar-frontend/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── video/
│       └── Video.mp4            # Hero section background video
│
├── src/
│   ├── api/
│   │   ├── axiosInstance.js     # Axios base config + request/response interceptors
│   │   ├── authApi.js           # Login, register, profile API calls
│   │   └── predictionApi.js     # Analyze, history, prediction API calls
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Loader.jsx           # Full-page spinning loader
│   │   │   ├── ProtectedRoute.jsx   # Auth guard (redirects if not logged in)
│   │   │   └── SeverityBadge.jsx    # Colored severity pill badge
│   │   │
│   │   ├── dashboard/
│   │   │   ├── FaultDistributionChart.jsx  # Recharts donut pie chart
│   │   │   ├── RecentScansTable.jsx        # Mini scan history table
│   │   │   └── StatsCard.jsx               # Metric summary card
│   │   │
│   │   ├── home/
│   │   │   ├── CTASection.jsx          # Call-to-action band
│   │   │   ├── FeaturesSection.jsx     # Features grid cards
│   │   │   ├── HeroSection.jsx         # Video hero banner
│   │   │   └── HowItWorksSection.jsx   # 3-step process section
│   │   │
│   │   ├── layout/
│   │   │   ├── AuthLayout.jsx      # Shell for protected pages (Sidebar + TopBar + Outlet)
│   │   │   ├── PublicFooter.jsx    # Footer for public pages
│   │   │   ├── PublicNavbar.jsx    # Navbar for public pages (variant-aware)
│   │   │   ├── Sidebar.jsx         # 220px collapsible left navigation sidebar
│   │   │   └── TopBar.jsx          # Top header with route title and user avatar
│   │   │
│   │   ├── results/
│   │   │   ├── ConfidenceBar.jsx   # Color-coded progress bar for confidence score
│   │   │   └── ResultCard.jsx      # Full analysis result card
│   │   │
│   │   └── upload/
│   │       ├── CameraCapture.jsx   # Webcam live feed + capture (react-webcam)
│   │       └── ImageUploader.jsx   # Drag-and-drop / file browse image uploader
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # React Context: user, token, login(), logout(), register()
│   │
│   ├── pages/
│   │   ├── Home.jsx            # Public landing page (hero, features, how-it-works, CTA)
│   │   ├── Login.jsx           # Split-panel email/password login form
│   │   ├── Register.jsx        # Split-panel registration with password strength meter
│   │   ├── Dashboard.jsx       # Fleet stats + fault distribution + recent scans
│   │   ├── Analyze.jsx         # Image upload + live camera + AI submission
│   │   ├── Results.jsx         # Fault detection result + confidence + recommendation
│   │   ├── History.jsx         # Paginated scan history with search and filters
│   │   ├── Profile.jsx         # User profile editor + scan count + logout
│   │   └── NotFound.jsx        # 404 error page
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx       # All route definitions (public + protected)
│   │
│   ├── utils/
│   │   ├── constants.js        # API_BASE_URL, FAULT_TYPES, SEVERITY_CONFIG, FAULT_COLORS
│   │   └── formatDate.js       # formatDate(), formatDateTime(), formatRelative()
│   │
│   ├── App.jsx                 # Root component — renders AppRoutes
│   ├── main.jsx                # Entry — ReactDOM.createRoot + BrowserRouter + AuthProvider
│   └── index.css               # Tailwind directives + global body resets
│
├── .env                        # Local environment variables (gitignored)
├── .env.example                # Template for contributors (safe to commit)
├── .gitignore                  # Files/folders excluded from git
├── .oxlintrc.json              # Oxlint linter configuration
├── index.html                  # HTML entry (Google Fonts Inter, meta tags, root div)
├── package.json                # Project metadata, dependencies, scripts
├── postcss.config.js           # PostCSS config for Tailwind processing
├── tailwind.config.js          # Custom design system tokens (colors, typography, spacing)
└── vite.config.js              # Vite config with React plugin
```

---

## Pages Overview

| Page | Route | Auth Required | Description |
|---|---|---|---|
| Home | `/` | No | Landing page with video hero, features, how-it-works, CTA band, footer |
| Login | `/login` | No | Split-panel email/password login, redirects to dashboard on success |
| Register | `/register` | No | Split-panel registration with real-time password strength indicator |
| Dashboard | `/dashboard` | Yes | Fleet stats cards, fault distribution chart, recent 5 scans list |
| Analyze | `/analyze` | Yes | Upload image or use live camera, submit to AI backend |
| Results | `/results/:id` | Yes | Bounding-box annotated image, fault details, confidence, recommendation |
| History | `/history` | Yes | Full paginated scan log with search, fault filter, sort, and pagination |
| Profile | `/profile` | Yes | Edit name, read-only email, member since date, scan count, logout |
| Not Found | `*` | No | 404 page with orange "Back to Dashboard" button |

---

## Prerequisites

Make sure you have the following installed on your machine **before** you begin:

| Tool | Minimum Version | Verify |
|---|---|---|
| Node.js | v18.0.0 or higher | `node --version` |
| npm | v9.0.0 or higher | `npm --version` |
| Git | v2.30.0 or higher | `git --version` |

> **Recommended**: Node.js LTS v20+ for best compatibility with React 19 and Vite 8.

**Download Links:**
- Node.js (includes npm): https://nodejs.org/
- Git: https://git-scm.com/

---

## Installation and Setup

### Step 1 — Clone the Repository

```bash
# Replace YOUR_USERNAME/YOUR_REPO_NAME with the actual GitHub repo path
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Enter the project directory
cd YOUR_REPO_NAME
```

### Step 2 — Install All Dependencies

```bash
npm install
```

This downloads and installs every package listed in `package.json` into `node_modules/`.

> First run may take 1–2 minutes. Peer dependency warnings can be safely ignored.

### Step 3 — Configure Environment Variables

Create a `.env` file by copying the example:

**Windows (Command Prompt):**
```bash
copy .env.example .env
```

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

Open `.env` and set your API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> **No backend?** Keep the default. Every page falls back to realistic mock data automatically — the app is fully usable without a running API.

### Step 4 — Start the Development Server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

You should see the Solara AI landing page with video background.

---

## Environment Variables

Place all environment variables in a `.env` file at the project root (same level as `package.json`).

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | No | `http://localhost:5000/api` | Full base URL of your REST API backend |

> All Vite client-side env vars must start with `VITE_`. Do not place private secrets here — this file is bundled into the browser.

**`.env` for local development:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**`.env` for production deployment:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

---

## Running the App

### Development Server

```bash
npm run dev
```

- Hot Module Replacement (HMR) — changes apply instantly without full reload
- Runs at: http://localhost:5173

### Production Build

```bash
npm run build
```

- Compiles, tree-shakes, and minifies all source files
- Output goes to the `dist/` folder
- Deploy `dist/` to: Vercel, Netlify, GitHub Pages, Firebase Hosting, or any static server

### Preview Production Build

```bash
npm run preview
```

- Serves the `dist/` folder locally at http://localhost:4173
- Use this to test the exact production bundle before deploying

### Run Linter

```bash
npm run lint
```

- Runs `oxlint` to catch code quality issues
- oxlint is a Rust-based linter, much faster than ESLint

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at http://localhost:5173 |
| `npm run build` | Build production bundle into `dist/` |
| `npm run preview` | Preview production build at http://localhost:4173 |
| `npm run lint` | Run oxlint code quality checks |

---

## API Endpoints

The Axios instance (`src/api/axiosInstance.js`) automatically:
- Reads `VITE_API_BASE_URL` as the base URL
- Attaches `Authorization: Bearer <token>` from the cookie on every request
- Redirects to `/login` and clears the cookie on any `401 Unauthorized` response

### Authentication

| Method | Endpoint | Request Body | Auth | Description |
|---|---|---|---|---|
| POST | `/auth/login` | `{ email, password }` | No | Log in, receive JWT token + user object |
| POST | `/auth/register` | `{ name, email, password }` | No | Create a new account |
| GET | `/profile` | — | Yes | Fetch current user's profile |
| PUT | `/profile` | `{ name }` | Yes | Update user's display name |

### Predictions

| Method | Endpoint | Request Body | Auth | Description |
|---|---|---|---|---|
| POST | `/analyze` | `FormData` (field: `image`) | Yes | Upload an image for AI fault analysis |
| GET | `/history` | — | Yes | Get all past predictions for current user |
| GET | `/predictions/:id` | — | Yes | Get one prediction by MongoDB `_id` |

### Response Shapes

**POST `/auth/login`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "_id": "user123",
    "name": "Alex Rivera",
    "email": "alex@solara.ai",
    "createdAt": "2024-03-12T00:00:00.000Z"
  }
}
```

**POST `/analyze`** — The frontend reads `res.data.prediction` or `res.data`
```json
{
  "prediction": {
    "_id": "pred_abc123",
    "faultType": "Wafer Micro-Crack",
    "severity": "High",
    "confidence": 96.8,
    "threshold": 85.0,
    "modelVariance": "+-0.4%",
    "recommendation": "Schedule urgent string isolation within 48 hours.",
    "pipeline": "Dual-Core ResNet50 + MobileNet",
    "array": "Array 4 - String B2",
    "imageUrl": "https://storage.example.com/image.jpg",
    "createdAt": "2026-09-07T21:39:00.000Z"
  }
}
```

**GET `/history`** — The frontend reads `res.data.predictions` or `res.data`
```json
{
  "predictions": [
    {
      "_id": "pred_abc123",
      "faultType": "Dust and Fine Soiling",
      "severity": "Low",
      "confidence": 98.4,
      "imageUrl": "https://storage.example.com/image.jpg",
      "createdAt": "2026-09-07T21:39:00.000Z"
    }
  ]
}
```

---

## Pushing to GitHub

### Step 1 — Create a New Repository on GitHub

1. Go to https://github.com/new
2. Enter a repository name, e.g. `solara-ai-frontend`
3. Choose **Public** or **Private**
4. **Do NOT** add a README, `.gitignore`, or license — the project already has them
5. Click **"Create repository"**

### Step 2 — Initialize Git

Run inside your project folder:

```bash
git init
git add .
git commit -m "feat: initial commit - Solara AI frontend"
```

### Step 3 — Connect to GitHub and Push

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

git branch -M main

git push -u origin main
```

### Step 4 — Confirm on GitHub

Visit `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME` — all files should be visible.

---

### Future Updates

After making changes:

```bash
git add .
git commit -m "your commit message here"
git push
```

---

## What is in .gitignore

These paths are already excluded from version control:

```
node_modules/     # npm packages - reinstall with: npm install
dist/             # production build output
.env              # your private environment variables
*.local           # any local override files
```

> Never commit `.env` — it may expose API URLs or secrets. Commit `.env.example` instead with safe placeholder values.

**Recommended `.env.example`:**
```env
# Copy this file to .env and fill in your values
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Design System

Custom Material Design 3-inspired Tailwind tokens are defined in `tailwind.config.js`.

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `primary-container` | `#F26B1D` | Brand orange — CTAs, active sidebar, accents |
| `on-primary` | `#ffffff` | White text on orange buttons |
| `on-surface` | `#1a1b22` | Primary body text |
| `secondary` | `#5f5e61` | Muted / secondary text |
| `surface-container-lowest` | `#ffffff` | Card and panel backgrounds |
| `surface-variant` | `#e3e1ec` | Borders, dividers, input outlines |
| `error` | `#ba1a1a` | Error and destructive states |

### Typography Scale (all Inter)

| Token | Size | Weight | Use |
|---|---|---|---|
| `text-body-sm` | 12px | 400 | Captions, timestamps |
| `text-label-sm` | 11px | 500 | Uppercase micro labels |
| `text-label-md` | 13px | 500 | Button text, nav items |
| `text-body-md` | 14px | 400 | Form fields, paragraphs |
| `text-headline-sm` | 16px | 600 | Card headings |
| `text-headline-lg` | 24px | 600 | Page section headings |
| `text-numeric-metric` | 28px | 600 | Dashboard stat numbers |
| `text-display-lg` | 32px | 600 | Hero display text |

---

## Key Architecture Decisions

**Mock data fallback** — Every page fetches from the live API but silently falls back to hardcoded mock data if the API is unavailable. This makes the app fully demonstrable without a running backend.

**Cookie-based JWT** — The auth token is saved in a 7-day browser cookie via `js-cookie`. The Axios request interceptor attaches it as a `Bearer` header on every call. The response interceptor auto-clears it and redirects to `/login` on any `401 Unauthorized` response.

**Dual route guards** — `PublicRoute` redirects already-logged-in users away from `/login` and `/register` to `/dashboard`. `ProtectedRoute` redirects unauthenticated users from any app page to `/login`.

**React Context for auth state** — No external state library (Redux/Zustand) is used. `AuthContext` provides `user`, `token`, `loading`, `login()`, `logout()`, `register()`, and `updateUser()` globally.

**Native camera API** — `Analyze.jsx` uses `navigator.mediaDevices.getUserMedia` with an HTML5 Canvas element for capture (not `react-webcam`), giving full control over the viewfinder HUD overlays.

**Inline page design** — Dashboard, Analyze, Results, and History build their UI inline for complete layout control. Pre-built components in `components/` are available for future extraction and reuse.

---

## Contributing

1. Fork the repo on GitHub
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes using conventional commit format:
   ```bash
   git commit -m "feat: add CSV export for scan history"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request on GitHub

### Commit Prefixes

| Prefix | When to use |
|---|---|
| `feat:` | New feature or page |
| `fix:` | Bug fix |
| `style:` | CSS/UI-only change |
| `refactor:` | Code restructure, no behavior change |
| `docs:` | Documentation update |
| `chore:` | Config, deps, or tooling change |

---

## License

MIT License — free to use, modify, and distribute with attribution.

---

<div align="center">
  Built for solar infrastructure intelligence
  
  **Solara AI (c) 2026**
</div>