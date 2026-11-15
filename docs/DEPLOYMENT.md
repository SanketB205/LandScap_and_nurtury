# Deployment Guide — Janai Landscape Services

Production deployment checklist for the Janai Landscape Services MERN stack platform
serving Pune, Maharashtra, India.

## Architecture Overview

| Component | Technology | Location |
|-----------|-----------|----------|
| Frontend | React 19 + Vite 7 | Vercel / Netlify / Static host |
| Backend | Node.js + Express 5 | Render / Railway / AWS EC2 / DigitalOcean |
| Database | MongoDB 9 + Mongoose | MongoDB Atlas (recommended) or self-hosted |
| File Storage | Cloudinary | Cloudinary CDN |
| Auth | JWT (HttpOnly cookies) + CSRF | Backend |

## Prerequisites

- Node.js 20+
- MongoDB Atlas cluster (or self-hosted MongoDB 7+)
- Cloudinary account (for image uploads)
- Domain name with DNS access
- SSL certificate (Let's Encrypt or provider-managed)

## 1. Backend Deployment

### 1.1 Environment Variables

Copy `backend/.env.example` to `backend/.env` on the production server and fill in all values:

```bash
cd backend
cp .env.example .env
```

Never commit `.env` to version control. It is already in `.gitignore`.

### 1.2 Install Dependencies

```bash
cd backend
npm install --production
```

### 1.3 Seed the Database

The seed script requires `ADMIN_INITIAL_PASSWORD` to create the admin user:

```bash
ADMIN_INITIAL_PASSWORD="<strong-password>" node seed.js
```

This creates:
- Admin user (`admin@janailandscape.com`)
- Site settings with configurable tax (GST)
- 8 services, plants, projects, and testimonials

**Never hardcode admin credentials.** The seed script will exit with an error if `ADMIN_INITIAL_PASSWORD` is missing.

### 1.4 Start the Server

```bash
npm start
```

For production, use a process manager (PM2, systemd, or the platform's native process management):

```bash
# PM2 example
npm install -g pm2
pm2 start index.js --name janai-backend
pm2 save
```

### 1.5 Health Check

Verify the backend is healthy:

```bash
curl https://api.janailandscape.com/api/health
```

Expected response:
```json
{"status":"ok","service":"Janai Landscape Services API","location":"Pune, Maharashtra","timestamp":"..."}
```

## 2. Frontend Deployment

### 2.1 Environment Variables

Copy `client/.env.example` to `client/.env`:

```bash
cd client
cp .env.example .env
```

Set `VITE_API_URL` to your production backend URL:
```
VITE_API_URL=https://api.janailandscape.com
```

### 2.2 Build

```bash
cd client
npm install
npm run build
```

The output is in `client/dist/`. Deploy this to your static host (Vercel, Netlify, S3, etc.).

### 2.3 CORS Configuration

Ensure your backend `ALLOWED_ORIGINS` includes your frontend domain:

```
ALLOWED_ORIGINS=https://janailandscape.com,https://www.janailandscape.com
```

## 3. Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Whitelist your backend server IP addresses (or use VPC peering)
4. Get the connection string:
   ```
   mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
5. Set as `MONGO_URI` in backend `.env`

## 4. Cloudinary Setup (Image Uploads)

1. Create a Cloudinary account
2. Get your Cloud Name, API Key, and API Secret
3. Add to backend `.env`:
   ```
   CLOUD_NAME=your_cloud_name
   CLOUD_KEY=your_api_key
   CLOUD_SECRET=your_api_secret
   ```
4. Without these, image uploads will fail gracefully (not a blocking issue)

## 5. SSL / HTTPS

- Use Let's Encrypt via your hosting provider or `certbot`
- Ensure all backend routes are served over HTTPS
- Set `NODE_ENV=production` so cookies use `secure` flag
- Redirect HTTP to HTTPS at the load balancer / reverse proxy level

## 6. Rate Limiting

The backend includes rate limiters:
- Auth endpoints: 30 requests per 15 minutes per IP
- Inquiry submissions: 40 requests per 15 minutes per IP

Adjust in `backend/middleware/rateLimiter.js` if needed.

## 7. Rollback Plan

1. Keep the previous build artifact (`dist/`) available
2. Keep the previous Docker image or server snapshot
3. Database changes are backward-compatible (new fields are additive, existing fields unchanged)
4. To rollback: redeploy the previous build and restart the server

## 8. Monitoring

- Health endpoint: `GET /api/health`
- Log requests and errors via your platform's logging
- Set up uptime monitoring on the health endpoint
- Monitor MongoDB connection pool and disk space

## 9. Support Contacts

- Email: contact@janailandscape.com
- Phone: +91 97676 71968
- Address: Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045
