# Janai Landscape Services — Production Readiness Audit

**Audit Date:** 2026-10-10  
**Repository:** D:\LandScap_and_nurtury  
**Status:** Initial audit complete — implementation in progress

---

## 1. Executive Summary

The Janai Landscape Services MERN application is a functional prototype with a working frontend (React 19 + Vite 7), backend (Node.js + Express 5), MongoDB models, and admin dashboard. However, it is **not production-ready**. Critical security vulnerabilities, missing business features, hardcoded secrets, insecure authentication storage, and incomplete deployment configuration must be resolved before public launch.

---

## 2. Existing Features That Work

| Feature | Status | Notes |
|---------|--------|-------|
| Public homepage with hero, services, projects, plants, testimonials | Working | Data fetched from backend APIs |
| 8 seeded services with CRUD | Working | Database-driven via MongoDB |
| Plant catalog with search, filters, matchmaker | Working | Real MongoDB data |
| Project portfolio with before/after toggle | Working | Real MongoDB data |
| Smart estimator with itemized breakdown | Working | Calculates on backend |
| Quote request form with reference ID | Working | Persisted to MongoDB |
| Contact form | Working | Persisted to MongoDB |
| Auth (register/login/logout/me) | Working | JWT + bcryptjs, cookie-based |
| Admin dashboard with real stats | Working | MongoDB aggregations |
| Admin service/plant/project/inquiry/quotation/settings management | Working | CRUD via API |
| Digital quotation generator with GST | Working | Stored in MongoDB |
| Rate limiting on auth and inquiry endpoints | Working | express-rate-limit |
| Health check endpoint | Working | GET /api/health |

---

## 3. Findings by Severity

### CRITICAL

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| C1 | Hardcoded JWT secret in `.env` (development secret committed) | `backend/.env` | Production tokens can be forged |
| C2 | Hardcoded admin credentials in `seed.js` (`admin@janailandscape.com` / `Admin@Janai2026`) | `backend/seed.js:40-46` | Publicly documented production password |
| C3 | Auth tokens stored in `localStorage` (XSS-vulnerable) | `client/src/context/AuthContext.jsx:8,34` | Token theft via XSS |
| C4 | No CSRF protection for cookie-authenticated state-changing requests | `backend/index.js` | Cross-site request forgery |
| C5 | No password reset / email verification flow | `backend/controllers/auth.controller.js` | Account recovery impossible |
| C6 | `.env` file committed to repository (contains real secrets) | `backend/.env` | Secret exposure |
| C7 | No password strength validation | `backend/models/User.js:22` (minlength: 6 only) | Weak passwords allowed |
| C8 | Admin role assignable via public registration | `backend/controllers/auth.controller.js:59` (always customer — OK) | Verified OK, but no protection if changed |

### HIGH

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| H1 | `Database.js` uses `process.env.mongourl` (lowercase) which won't resolve | `backend/models/Database.js:7` | Connection fails if imported |
| H2 | No unique index on slug fields in Service/Project models | `backend/models/services.js`, `backend/models/Project.js` | Duplicate slugs possible |
| H3 | No negative stock validation on Plant model | `backend/models/Plant.js:53` | Invalid negative inventory |
| H4 | No price validation (negative prices allowed) | `backend/models/Plant.js:48` | Invalid pricing |
| H5 | Quotation GST hardcoded at 18% | `backend/models/Quotation.js:48`, `backend/controllers/quotation.controller.js:30` | Not configurable, tax compliance risk |
| H6 | Estimator tax hardcoded at 18% | `backend/controllers/planner.controller.js:162` | Not configurable |
| H7 | Estimator rates hardcoded in frontend | `client/src/pages/SmartEstimator.jsx` | Not database-driven |
| H8 | No pagination on quotations list | `backend/controllers/quotation.controller.js:98` | Unbounded query |
| H9 | No rate limit on planner/estimate endpoint | `backend/routes/planner.routes.js` | Abuse vector |
| H10 | No email notification integration | Multiple controllers | No inquiry confirmations |
| H11 | No image upload validation (file type/size) | `backend/middleware/upload.js` | Unsafe file uploads |
| H12 | `getMe` endpoint returns user but `req.user` not set on all routes | `backend/middleware/auth.js` | Inconsistent auth |
| H13 | No `archived` status on Service/Plant/Testimonial models | Multiple models | Soft delete not possible |
| H14 | Testimonial model lacks status field | `backend/models/Testimonial.js` | No draft/archive workflow |
| H15 | No quotation revision/audit trail | `backend/models/Quotation.js` | Immutable snapshot missing |
| H16 | CORS allows `!origin` requests (mobile apps, curl) | `backend/index.js:51-53` | Less restrictive in production |
| H17 | Error handler leaks stack traces in development only (OK) | `backend/middleware/errorHandler.js:43` | Production-safe, but verify |

### MEDIUM

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| M1 | Missing Privacy Policy page | `client/src/pages/` | Legal compliance gap |
| M2 | Missing Terms and Conditions page | `client/src/pages/` | Legal compliance gap |
| M3 | Missing Cookie Policy page | `client/src/pages/` | Legal compliance gap |
| M4 | No sitemap.xml or robots.txt | `client/` | SEO incomplete |
| M5 | No canonical URLs or Open Graph metadata | Client pages | SEO incomplete |
| M6 | No structured data (LocalBusiness schema) | Client pages | Local SEO weak |
| M7 | Homepage uses unverified statistics (870+ gardens, 48,000+ sq ft, 100% satisfaction) | `client/src/pages/HOME/HomePage.jsx:118-128` | Unverifiable business claims |
| M8 | About page uses unverified "870+ garden projects" claim | `client/src/pages/ABOUT/AboutPage.jsx:97-98` | Unverifiable business claims |
| M9 | No loading/skeleton states on some pages | Client pages | UX gap |
| M10 | No confirmation dialogs for destructive admin actions | Admin pages | Accidental deletion risk |
| M11 | No pagination on plants list | `backend/controllers/plant.controller.js:44` | Unbounded query |
| M12 | No `per-page` limit enforcement on services | `backend/controllers/service.controller.js:22` | Unbounded query |
| M13 | WhatsApp number published without ownership confirmation | Multiple files | Potential misuse |
| M14 | No `VITE_API_URL` `.env.example` for client | `client/` | Missing config docs |
| M15 | `AllServices.jsx` duplicates service data (hardcoded) | `client/src/pages/AllServices.jsx` | Not database-driven |

### LOW

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| L1 | No `favicon.ico` or proper app icons | `client/public/` | Minor branding |
| L2 | No `manifest.json` for PWA | `client/public/` | Minor |
| L3 | Some console.error statements in production code | Client pages | Minor noise |
| L4 | No `docs/` directory exists | Root | Documentation missing |

---

## 4. Prioritized Remediation Checklist

### Phase 1 — Critical Security (Must fix before launch)
- [ ] C1: Replace hardcoded JWT secret with cryptographically strong random value
- [ ] C2: Remove hardcoded admin credentials from `seed.js`; implement one-time admin provisioning
- [ ] C3: Migrate token storage from localStorage to HttpOnly-only cookie (remove localStorage fallback)
- [ ] C4: Add CSRF protection middleware for state-changing requests
- [ ] C5: Implement password reset via email verification workflow (or document as blocked)
- [ ] C6: Add `.env` to `.gitignore`; create `.env.example` with safe placeholders
- [ ] C7: Strengthen password validation (min 8 chars, mixed case, number, symbol)

### Phase 2 — Data Integrity & Business Logic
- [ ] H1: Fix `Database.js` env var reference (`MONGO_URI` not `mongourl`)
- [ ] H2: Add unique indexes on slug fields
- [ ] H3: Add negative stock validation on Plant
- [ ] H4: Add price validation (min 0) on Plant and Service
- [ ] H5: Make GST/tax configurable via SiteSettings
- [ ] H6: Make estimator tax configurable via SiteSettings
- [ ] H7: Drive estimator rates from SiteSettings pricing rules (backend-authoritative)
- [ ] H8: Add pagination to quotations list
- [ ] H9: Add rate limit to planner/estimate
- [ ] H10: Integrate email notification provider (Resend/Nodemailer)
- [ ] H11: Add image upload validation (file type, size limits)
- [ ] H12: Fix `getMe` consistency across routes
- [ ] H13: Add `archived` status to Service, Plant, Testimonial models
- [ ] H14: Add `status` field to Testimonial model
- [ ] H15: Add quotation revision/audit trail
- [ ] H16: Restrict CORS `!origin` in production
- [ ] H17: Verify production error handling doesn't leak stack traces

### Phase 3 — Missing Pages & Legal
- [ ] M1: Create Privacy Policy page
- [ ] M2: Create Terms and Conditions page
- [ ] M3: Create Cookie Policy page
- [ ] M4: Add sitemap.xml and robots.txt
- [ ] M5: Add canonical URLs and Open Graph metadata
- [ ] M6: Add LocalBusiness structured data
- [ ] M7: Remove unverified statistics from homepage
- [ ] M8: Remove unverified claims from About page
- [ ] M9: Add skeleton/loading states
- [ ] M10: Add confirmation dialogs for destructive admin actions

### Phase 4 — Testing & Deployment
- [ ] Add unit tests for estimator calculations
- [ ] Add unit tests for tax and rounding
- [ ] Add unit tests for plant matching
- [ ] Add unit tests for input validation
- [ ] Add unit tests for inquiry reference generation
- [ ] Add unit tests for quotation totals
- [ ] Add unit tests for workflow status transitions
- [ ] Add unit tests for authorization rules
- [ ] Run full test suite and fix failures
- [ ] Create DEPLOYMENT.md, ENVIRONMENT_VARIABLES.md, SECURITY.md, BACKUP_AND_RECOVERY.md, OPERATIONS_RUNBOOK.md, GO_LIVE_CHECKLIST.md
- [ ] Create `.env.example` for backend and client
- [ ] Verify `.env` is in `.gitignore`
- [ ] Deploy to staging and run smoke tests

---

## 5. Required External Credentials

| Service | Purpose | Env Var | Status |
|---------|---------|---------|--------|
| MongoDB Atlas | Production database | `MONGO_URI` | Not configured |
| JWT Secret | Token signing | `JWT_SECRET` | Dev value in `.env` |
| Cloudinary | Image storage | `CLOUD_NAME`, `CLOUD_KEY`, `CLOUD_SECRET` | Placeholder (`xxxx`) |
| Email Provider (Resend/Nodemailer) | Transactional email | `RESEND_API_KEY`, `NOTIFICATION_EMAIL` | Not configured |
| Frontend API URL | Backend base URL | `VITE_API_URL` | Not in `.env.example` |
| CORS Origins | Allowed frontend origins | `ALLOWED_ORIGINS` | Configured for localhost only |

---

## 6. Deployment Blockers

1. **No production `.env.example`** — Missing client environment variable template
2. **No deployment configuration** — No Dockerfile, no Procfile, no platform-specific config
3. **Hardcoded dev secrets** — JWT secret and admin credentials must be rotated
4. **No email provider** — Inquiry confirmations and password reset cannot work
5. **No image storage credentials** — Cloudinary placeholders are `xxxx`
6. **No HTTPS/domain config** — Production CORS and cookie settings need actual domain
7. **No backup strategy** — MongoDB backup/restore not documented

---

## 7. Next Steps

1. Create `docs/` directory with all required documentation files
2. Fix critical security issues (C1-C7)
3. Fix data integrity issues (H1-H17)
4. Add missing legal pages (M1-M3)
5. Add comprehensive unit tests
6. Create `.env.example` files
7. Run tests and fix regressions
8. Prepare deployment documentation