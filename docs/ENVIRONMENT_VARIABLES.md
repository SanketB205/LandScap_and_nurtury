# Environment Variables Reference — Janai Landscape Services

All environment variables used by the backend and frontend. Copy the `.env.example` files and fill in production values.

## Backend (`backend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port | `5000` |
| `NODE_ENV` | Yes | Environment mode | `development` or `production` |
| `MONGO_URI` | Yes | MongoDB connection string | `mongodb://localhost:27017/Nursery` |
| `JWT_SECRET` | Yes | Secret for signing JWT (32+ chars) | `janai_landscape_dev_secret_change_before_production_2026` |
| `ADMIN_INITIAL_PASSWORD` | Yes (seed only) | Initial admin password (min 8 chars) | Set during `node seed.js` |
| `ADMIN_PHONE` | No | Admin phone number | `+91 97676 71968` |
| `CLOUD_NAME` | No | Cloudinary cloud name | `your_cloud_name` |
| `CLOUD_KEY` | No | Cloudinary API key | `your_api_key` |
| `CLOUD_SECRET` | No | Cloudinary API secret | `your_api_secret` |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins | `http://localhost:5173,https://janailandscape.com` |
| `RESEND_API_KEY` | No | Email service API key | `re_xxxxx` |
| `NOTIFICATION_EMAIL` | No | Notification email address | `info@janailandscape.com` |

### JWT_SECRET Requirements

Must be at least 32 characters. Generate a strong one:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### ADMIN_INITIAL_PASSWORD

Required only when running `node seed.js`. Must be at least 8 characters. Not needed at runtime.

## Frontend (`client/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API base URL | `https://api.janailandscape.com` |

## Security Notes

- Never commit `.env` files to version control (both are in `.gitignore`)
- Rotate `JWT_SECRET` immediately after initial deployment
- Use different secrets for development and production
- Store production secrets in your platform's secret manager (not in `.env` on disk if possible)

## Validation

Backend validates `JWT_SECRET` at startup and exits if missing. Seed script validates `ADMIN_INITIAL_PASSWORD` before creating admin user.
