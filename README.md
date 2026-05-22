# HOUSE — Luxury Real Estate Management System

A modern, full-stack luxury real estate platform with 3D animations, property management, booking system, and analytics dashboard.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 16, Tailwind CSS v4, Framer Motion, Three.js, GSAP, Recharts |
| Backend | Next.js API Routes, Node.js, MongoDB, Mongoose |
| Auth | JWT (httpOnly cookies), bcrypt password hashing |

## Features

- **5 Pages**: Home, Properties, Property Details, Dashboard, Contact
- **3D UI**: Three.js animated house hero, 360° property preview
- **Property System**: Search, filters, sorting, pagination
- **Booking**: Schedule property viewings
- **Authentication**: Login, Signup, Forgot Password, protected APIs
- **Dashboard**: Sales/revenue charts, stats, recent bookings
- **Design**: Luxury dark theme, glassmorphism, neon glow effects

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

```env
MONGODB_URI=mongodb://127.0.0.1:27017/house
JWT_SECRET=your-super-secret-jwt-key
```

> **Note**: The app works without MongoDB using built-in mock data. Connect MongoDB for full auth and CRUD.

### 3. Seed database (optional)

```bash
npx tsx src/scripts/seed.ts
```

Default accounts:
- `admin@house.com` / `admin123` (admin)
- `agent@house.com` / `admin123` (agent)
- `user@house.com` / `admin123` (user)

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Pages & API routes
│   ├── api/          # REST API endpoints
│   ├── properties/   # Property listing & details
│   ├── dashboard/    # Analytics dashboard
│   ├── contact/      # Contact page
│   └── login/        # Auth pages
├── components/       # Reusable UI components
├── sections/         # Page sections (home)
├── dashboard/        # Dashboard widgets
├── animations/       # Animation utilities
├── hooks/            # Custom React hooks
├── lib/              # Utilities, DB, auth
├── models/           # Mongoose schemas
└── types/            # TypeScript types
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Current user |
| GET | `/api/properties` | List properties (with filters) |
| POST | `/api/properties` | Add property (admin/agent) |
| GET | `/api/properties/[id]` | Property details |
| POST | `/api/bookings` | Create booking |
| GET | `/api/dashboard/stats` | Dashboard analytics |
| POST | `/api/contact` | Contact form |

## Color Palette

| Purpose | Color |
|---------|-------|
| Primary | `#7C3AED` |
| Secondary | `#06B6D4` |
| Accent | `#F43F5E` |
| Background | `#0F172A` |

## Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## License

MIT
