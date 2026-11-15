# Go-Live Checklist — Janai Landscape Services

## Pre-Launch (Critical)

### Security

- [ ] `JWT_SECRET` is a strong 32+ character random string (not the default dev value)
- [ ] `ADMIN_INITIAL_PASSWORD` is set and strong (used only during seeding)
- [ ] `.env` files are in `.gitignore` and not committed
- [ ] No hardcoded credentials in source code
- [ ] `NODE_ENV=production` set on backend
- [ ] Cookies use `secure` flag in production
- [ ] CORS `ALLOWED_ORIGINS` includes production frontend domain only
- [ ] Rate limiters configured and active
- [ ] CSRF protection active on all state-changing endpoints

### Database

- [ ] MongoDB Atlas cluster provisioned and accessible
- [ ] Database user created with least-privilege access
- [ ] IP whitelist configured for backend server
- [ ] Seed script run successfully (`ADMIN_INITIAL_PASSWORD` provided)
- [ ] Admin user can log in with seeded credentials
- [ ] `archived` status works on all content models
- [ ] Slug uniqueness enforced with indexes
- [ ] Negative price/stock validation active

### Backend

- [ ] All API routes respond correctly (health, services, plants, inquiries, etc.)
- [ ] Auth endpoints return cookies, not tokens in body
- [ ] Forgot password / reset password flow works
- [ ] Error handler returns proper status codes
- [ ] Helmet security headers active
- [ ] Rate limiters active on auth and inquiry endpoints

### Frontend

- [ ] Production build succeeds (`npm run build`)
- [ ] `VITE_API_URL` points to production backend
- [ ] AuthContext uses HttpOnly cookies (no localStorage)
- [ ] API client injects CSRF token on state-changing requests
- [ ] Legal pages accessible: Privacy Policy, Terms, Cookie Policy
- [ ] Footer links to legal pages present
- [ ] No unverified statistics or claims on homepage
- [ ] WhatsApp number correct: +91 97676 71968
- [ ] Contact email correct: contact@janailandscape.com
- [ ] Address correct: Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune

### DNS & SSL

- [ ] Domain `janailandscape.com` points to production frontend
- [ ] API subdomain `api.janailandscape.com` points to production backend
- [ ] SSL certificate installed and valid
- [ ] HTTP redirects to HTTPS
- [ ] Health endpoint accessible over HTTPS

### Content

- [ ] 8 services seeded with SEO titles/descriptions
- [ ] 5+ plants seeded with pricing and stock
- [ ] 2+ projects seeded with before/after images
- [ ] 2+ testimonials seeded
- [ ] Site settings configured (company name, phone, email, address, tax rate)
- [ ] All images load from Cloudinary or external URLs

## Launch Day

- [ ] Frontend deployed to production host
- [ ] Backend deployed to production server
- [ ] Database seeded and verified
- [ ] Health check passes: `GET /api/health` returns `{"status":"ok"}`
- [ ] Test inquiry submission works end-to-end
- [ ] Admin login works with seeded credentials
- [ ] All legal pages load correctly
- [ ] DNS propagated for domain and API subdomain
- [ ] SSL valid for all domains

## Post-Launch (First 7 Days)

- [ ] Monitor error logs daily
- [ ] Respond to all inquiries within 24 business hours
- [ ] Verify backup is working
- [ ] Check analytics for unusual traffic patterns
- [ ] Collect customer feedback on quote/inquiry flow

## Rollback Triggers

- [ ] Health endpoint returns non-200 for > 5 minutes
- [ ] Database connection failures
- [ ] Failed inquiry submissions
- [ ] Auth/login broken
- [ ] Critical frontend build errors

## Contacts

- Email: contact@janailandscape.com
- Phone: +91 97676 71968
- Address: Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045
