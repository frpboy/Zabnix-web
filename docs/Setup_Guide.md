# Environment Setup Guide

This guide details the steps required to clone, configure, build, and run the Zabnix corporate website locally.

---

## 1. Prerequisites
Ensure you have the following tools installed:
* **Node.js**: `v20.x` or later (Next.js 15 recommendation)
* **npm**: `v10.x` or later
* **Git**: `v2.x` or later

---

## 2. Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/zabnix/Zabnix-web.git
cd Zabnix-web
```

### 2. Install Dependencies
This project uses standard npm package resolution. Install all modules:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the template to create a local environment file:
```bash
cp .env.example .env.local
```
Fill in the credentials (e.g. database connections, mailers, analytics keys).

---

## 3. Environment Variables Mappings

Create a `.env.local` file at the root of the project with the following configuration:

```env
# ─── DATABASE SETTINGS ───
# Connection string for Neon PostgreSQL database
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# ─── MAILER SETTINGS ───
# API key for Resend email notifications (e.g. contact form, demo requests)
RESEND_API_KEY="re_123456789_abcdefg"

# ─── SYSTEM URLS ───
# Canonical deployment domain (used for metadata Base URL and sitemap generation)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# ─── MICROSOFT CLARITY ───
# Project token ID for Clarity analytics tracking (auto-injected by layout Script)
NEXT_PUBLIC_CLARITY_ID="x1wa2stzts"
```

---

## 4. Development & Build Scripts

Execute scripts via the terminal using `npm run <script>`:

* **Start Local Dev Server**:
  ```bash
  npm run dev
  ```
  Runs Next.js in hot-reloading development mode at `http://localhost:3000`.

* **Lint Codebase**:
  ```bash
  npm run lint
  ```
  Runs ESLint to verify codebase styling and rule violations.

* **Build Production Bundle**:
  ```bash
  npm run build
  ```
  Compiles the application, checks TypeScript integrity, and pre-renders static routes for production deployment.

* **Start Production Server**:
  ```bash
  npm run start
  ```
  Runs the compiled production build locally (requires `npm run build` to be completed first).

---

## 5. Troubleshooting & Caching

### Webpack Cache & Version Collision
If you get compilation failures such as `Failed to read a RSC payload created by a development version of React...` or `500 Internal Server Errors` on dynamic routes:
1. Stop your active terminal server process (`Ctrl + C`).
2. Delete the Next.js cache directory to clear webpack state:
   ```bash
   # Windows PowerShell
   Remove-Item -Recurse -Force .next
   
   # macOS/Linux
   rm -rf .next
   ```
3. Boot the development server fresh:
   ```bash
   npm run dev
   ```

### Module Mismatch
If you get `MODULE_NOT_FOUND` errors, clear node modules and re-resolve:
```bash
rm -rf node_modules package-lock.json
npm install
```
