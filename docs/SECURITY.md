# Security Policy — Janai Landscape Services

## Supported Versions

| Version | Status |
|---------|--------|
| 1.0.x | Supported |

## Authentication

- **Session tokens**: JWT stored in HttpOnly, Secure, SameSite cookies only — never in `localStorage`
- **Token lifetime**: 7 days
- **Cookie-only**: No token returned in response body; set via `Set-Cookie` header
- **Password policy**: Minimum 8 characters, hashed with bcryptjs (12 salt rounds)
- **Admin role**: Never assigned via public registration; only via seed script with `ADMIN_INITIAL_PASSWORD`
- **Account enumeration protection**: Generic error messages for login/register/forgot-password

## CSRF Protection

- Double-submit cookie pattern: `csrf_token` cookie + `X-CSRF-Token` header
- Applied to all POST/PUT/PATCH/DELETE requests
- Exempt: `GET`, `HEAD`, `OPTIONS` and public auth endpoints (`/api/auth/login`, `/api/auth/register`)
- Token validated on every state-changing request

## CORS

- Restrictive by default; only origins in `ALLOWED_ORIGINS` are allowed
- Credentials enabled for authenticated requests
- Requests with no origin (curl, mobile apps) are allowed in development

## Security Headers (Helmet)

- `Content-Security-Policy`: Restricts resources to self and HTTPS
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `SAMEORIGIN`
- `Referrer-Policy`: `no-referrer`
- `Strict-Transport-Security`: `max-age=31536000; includeSubDomains` (production only)

## Rate Limiting

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Auth (login/register) | 30 req | 15 min per IP |
| Inquiry submission | 40 req | 15 min per IP |

## Data Validation

- Email: lowercase, required, unique index
- Phone: required, validated format
- Price: must be >= 0 (blocked at schema level)
- Stock: must be >= 0 (blocked at schema level)
- Slugs: unique with database index
- Password: minimum 8 characters

## Database Security

- `archived` status on all content models (soft delete)
- Negative price/stock blocked via Mongoose validators
- Sensitive fields excluded from `toJSON` (password, reset tokens)
- Unique indexes on slugs and reference IDs

## API Security

- `protect` middleware: verifies JWT from cookie or Authorization header
- `adminOnly` middleware: restricts admin routes to `role: "admin"`
- Public endpoints (services, plants, projects, testimonials, health) require no auth
- Admin endpoints (inquiries, analytics, settings) require admin auth

## Secrets Management

- `JWT_SECRET`: 32+ character random string, never committed
- `ADMIN_INITIAL_PASSWORD`: Only used during seeding, not stored at runtime
- Cloudinary credentials: Only needed for image uploads
- `.env` files are in `.gitignore` for both backend and client

## Reporting Security Issues

Email: contact@janailandscape.com

We will acknowledge receipt within 48 hours and provide an initial assessment within 7 days.
