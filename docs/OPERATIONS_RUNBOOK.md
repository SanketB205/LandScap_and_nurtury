# Operations Runbook — Janai Landscape Services

## Daily Operations

### Morning Checklist

- [ ] Verify backend health: `GET /api/health` returns `{"status":"ok"}`
- [ ] Check new inquiries in the last 24h: `GET /api/analytics/stats` (admin auth required)
- [ ] Review inquiry status: pending "New" inquiries need same-day response
- [ ] Verify WhatsApp contact number is reachable: +91 97676 71968

### Evening Checklist

- [ ] All "New" inquiries acknowledged or contacted
- [ ] No failed backup alerts
- [ ] Server disk space < 80%

## Weekly Operations

- [ ] Review analytics: inquiry volume, conversion rate
- [ ] Check MongoDB connection pool usage
- [ ] Verify Cloudinary storage usage
- [ ] Review rate limiter logs for suspicious activity
- [ ] Rotate any temporary credentials

## Monthly Operations

- [ ] Database backup restore test
- [ ] Review and archive old inquiries (set `archived: true` for completed > 1 year)
- [ ] Update plant stock quantities based on physical inventory
- [ ] Review site settings (tax rates, pricing rules)
- [ ] Security audit: review access logs, failed login attempts

## Incident Response

### Site Down

1. Check health endpoint: `curl https://api.janailandscape.com/api/health`
2. If 502/503: Check backend process status (`pm2 list` or `systemctl status`)
3. If process is down: Restart (`pm2 restart janai-backend`)
4. If process is up but unhealthy: Check MongoDB connection
5. If MongoDB is down: Check cluster status in Atlas UI
6. Post-incident: Document root cause and fix

### Database Connection Failure

1. Check MongoDB Atlas cluster status
2. Verify `MONGO_URI` is correct in `.env`
3. Check IP whitelist in Atlas (backend server IP must be whitelisted)
4. Restart backend after fixing connection

### High Inquiry Volume

1. Monitor rate limiter headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`)
2. If rate limit is being hit: consider increasing limits temporarily
3. Ensure admin team is responding to inquiries promptly

### Failed Build/Deploy

1. Rollback to previous build artifact
2. Check build logs for errors
3. Fix and redeploy

## Admin Tasks

### Managing Inquiries

- List: `GET /api/inquiries` (admin auth)
- View details: `GET /api/inquiries/:id`
- Update status: `PATCH /api/inquiries/:id/status`
- Add notes: `PATCH /api/inquiries/:id/notes`
- Delete: `DELETE /api/inquiries/:id`

### Managing Services

- List: `GET /api/services`
- Create/Update: Admin routes (see service controller)
- Archive: `PATCH /api/services/:id/archive`
- Restore: `PATCH /api/services/:id/restore`

### Managing Plants

- List: `GET /api/plants`
- Update stock: `PATCH /api/plants/:id` (update `stockQuantity`)
- Archive: `PATCH /api/plants/:id/archive`

### Managing Site Settings

- View: `GET /api/settings`
- Update tax rate: `PATCH /api/settings` (update `taxConfig.percent`)
- Update pricing: `PATCH /api/settings` (update `pricingRules`)

## Contact

- Email: contact@janailandscape.com
- Phone: +91 97676 71968
- Address: Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045
