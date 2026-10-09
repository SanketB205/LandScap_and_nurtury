# 🌿 Janai Landscape Services — Complete MERN Stack Platform

> **Production-grade web application for Janai Landscape Services** (also operating as *GreenLandScape / EverGreen Landscapes & Nursery*), Pune, Maharashtra, India.
> Built with clean architecture, role-based JWT authentication, dynamic cost estimation, plant matchmaker recommendations, digital quotation workflows, and an administrative control panel.

---

## 🌟 Key Highlights & Feature Matrix

### 1. Public Website Experiences
* **Home Page**: High-impact hero section with Pune regional focus, live stats strip (870+ gardens designed, 48,000+ sq ft turf installed), featured services, why choose us cards, portfolio highlights, nursery showcase, and verified testimonials.
* **8 Core Services**:
  1. *Landscape Design and Planning (2D & 3D Visual Masterplans)*
  2. *Garden Development and Maintenance*
  3. *Natural Grass and Artificial Turf Installation (Selection 1, Korean sod, 35mm UV turf)*
  4. *Sports Ground and Sports Field Development (FIFA-grade football turf & cricket box nets)*
  5. *Nursery Plants and Gardening Supplies (Direct farm stock)*
  6. *Irrigation Systems (Automated drip laterals & pop-up gear sprinklers)*
  7. *Residential and Commercial Landscaping*
  8. *Lawn Renovation and Aeration*
* **Smart Landscape Planner & Cost Estimator (`/estimator`)**:
  - Interactive dimension calculation (Length × Width = Sq Ft).
  - Dynamic surface selection (Natural lawn, artificial turf, sports turf, hybrid planting).
  - Irrigation and soil grading options.
  - Generates itemized cost breakdown with 18% GST estimate and material take-offs (turf required with 5% cutting waste, soil bags, estimated work days).
  - One-click transfer to formal quotation request.
* **Intelligent Nursery Plant Matchmaker (`/plants`)**:
  - Search and filter by category (indoor, outdoor, flowering, ornamental, lawn grass, trees, shrubs).
  - Horticultural filter by sunlight exposure (Full Sun, Indirect Bright, Partial Shade, Low Light) and watering routine.
  - Interactive matchmaker engine providing tailored plant recommendations based on sunlight, watering, and space.
  - Detailed care guide modal for every plant.
* **Portfolio Showcase (`/projects`)**:
  - Filterable by Residential, Commercial, Sports Turf, and Terrace Garden.
  - **Interactive Before / After toggle controls** on project cards.
* **Request a Quote Workflow (`/quote`)**:
  - Dedicated form with property type, area, budget range, and timeline.
  - Generates a unique tracking Reference ID (`JLS-INQ-XXXXX`) upon submission.
  - Provides instant WhatsApp fast-track inquiry button with the generated reference.
* **Contact & Site Visit Booking (`/contact`)**:
  - Direct telephone (`+91 97676 71968`), email, Pune office address, operating hours, and embedded Google Map.

### 2. Secure Admin Dashboard (`/admin`)
* **Role-Based Access Control**: Protected routes requiring `admin` role via HTTP-only cookies and Authorization Bearer JWT.
* **Dashboard Overview**: Real MongoDB database aggregations (Total Leads, New Inquiries requiring action, Active Services, Plant stock count, Projects, and recent inquiry activity).
* **Inquiries & Leads Management**:
  - Filter by status: *New, Contacted, Quotation Sent, Approved, Rejected, Completed*.
  - Customer drawer showing full property specs, phone, email, and location.
  - Status transition logging with timestamped audit trail.
  - Internal staff notes thread.
* **Service Management**: Full CRUD operations for services with categories and rates.
* **Nursery Catalog Management**: Manage plant stock quantities, selling prices, categories, and care directions.
* **Portfolio Management**: Add and update completed projects with Before/After images.
* **Digital Quotation Generator**: Generate formal itemized proposals with quantity, unit rates, subtotal, 18% GST, and printable invoice preview.
* **Site Settings & Live Rate Editor**: Real-time configuration of company contact details and the live estimator's per-square-foot base rates.

---

## 🛠️ Technology Stack

| Component | Technology | Version / Details |
| :--- | :--- | :--- |
| **Frontend** | React, Vite | React 19, Vite 7 |
| **Styling** | Tailwind CSS v4, PostCSS | Custom nature-inspired theme |
| **Routing** | React Router DOM | v7 |
| **Icons** | Lucide React | v0.562.0 |
| **HTTP Client** | Axios | Custom client with token interceptor |
| **Backend** | Node.js, Express.js | Express 5 |
| **Database** | MongoDB, Mongoose | Mongoose 9 |
| **Authentication** | JWT, bcryptjs | 7-day tokens, salted password hashing |
| **Security** | Helmet, express-rate-limit, cookie-parser | Security headers, IP rate limiting |

---

## 🚀 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [MongoDB](https://www.mongodb.com/) running locally on port `27017` or a MongoDB Atlas connection string.

### 2. Clone & Environment Configuration

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (or copy from `.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/Nursery
JWT_SECRET=janai_landscape_secret_key_2026_dev
```

#### Client Setup
```bash
cd ../client
npm install
```

Create a `.env` file inside `client/` (or copy from `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🌱 Database Seeding & Admin Provisioning

To populate the database with authentic Pune landscaping services, nursery plants, sample projects, testimonials, and default credentials:

```bash
cd backend
npm run seed
```

### Default Credentials
* **Admin Account:**
  - **Email:** `admin@janailandscape.com`
  - **Password:** `Admin@Janai2026`
  - **Role:** `admin` (access to `/admin`)
* **Customer Account:**
  - **Email:** `rahul.deshmukh@example.com`
  - **Password:** `Customer@123`
  - **Role:** `customer`

---

## 🧪 Automated Testing

An automated test suite tests health check, services CRUD, plant recommendations, dynamic estimator calculations, inquiry reference ID generation, unauthorized route blocking, and admin JWT flows:

```bash
cd backend
npm test
```

> **Test Results:** 25 out of 25 tests passing.

---

## 🏃 Running Locally

### Start Backend
```bash
cd backend
npm run dev
# Server runs at http://localhost:5000
```

### Start Frontend
```bash
cd client
npm run dev
# Frontend runs at http://localhost:5173
```

---

## 📦 Production Build

To test and compile production bundles:
```bash
cd client
npm run build
```

---

## 📡 REST API Reference

### Authentication
* `POST /api/auth/register` — Register new customer account
* `POST /api/auth/login` — Sign in and receive JWT token + cookie
* `POST /api/auth/logout` — Clear session cookie
* `GET /api/auth/me` — Get current authenticated user profile

### Services
* `GET /api/services` — List active services (supports category filter)
* `GET /api/services/:slug` — Get single service by URL slug
* `POST /api/services` — [Admin] Create service
* `PUT /api/services/:id` — [Admin] Update service
* `DELETE /api/services/:id` — [Admin] Delete service

### Plants / Nursery
* `GET /api/plants` — Search & list plants (category, sunlight, watering filters)
* `GET /api/plants/recommendations` — Intelligent nursery recommendations
* `GET /api/plants/:id` — Single plant details
* `POST /api/plants` — [Admin] Add plant listing
* `PUT /api/plants/:id` — [Admin] Update plant listing
* `DELETE /api/plants/:id` — [Admin] Delete plant listing

### Projects Portfolio
* `GET /api/projects` — List completed projects (supports category & featured filters)
* `GET /api/projects/:slug` — Single project details
* `POST /api/projects` — [Admin] Create project
* `PUT /api/projects/:id` — [Admin] Update project
* `DELETE /api/projects/:id` — [Admin] Delete project

### Inquiries & Quotation Requests
* `POST /api/inquiries` — [Rate-limited] Submit quote request (returns `JLS-INQ-XXXXX`)
* `GET /api/inquiries` — [Admin] Search & filter customer leads
* `GET /api/inquiries/:id` — [Admin] Get full customer lead details
* `PATCH /api/inquiries/:id/status` — [Admin] Update lead status & log history
* `PATCH /api/inquiries/:id/notes` — [Admin] Append internal staff note
* `DELETE /api/inquiries/:id` — [Admin] Delete lead record

### Smart Estimator & Pricing
* `POST /api/planner/estimate` — Calculate dynamic cost estimate & material takeoffs
* `GET /api/settings` — Get live company profile & pricing rules
* `PUT /api/settings` — [Admin] Update company details & estimator rates

### Digital Quotations
* `POST /api/quotations` — [Admin] Generate digital quotation with line items & GST
* `GET /api/quotations` — [Admin] List issued quotations
* `GET /api/quotations/:id` — Get single quotation details

### Analytics
* `GET /api/analytics/stats` — [Admin] Real database statistics for the admin overview

---

## 🛡️ Security & Reliability Architecture
1. **Password Hashing:** Passwords hashed with `bcryptjs` using 10 salt rounds with pre-save Mongoose middleware.
2. **Session Security:** JWT signed with environment secrets, transmitted via both HTTP-only cookies and Authorization headers.
3. **HTTP Headers:** Protected with `helmet` for Cross-Origin Resource Policy and secure framing.
4. **Rate Limiting:** Public quote submissions and login endpoints protected against brute-force attacks via `express-rate-limit`.
5. **Safe Database Aggregations:** MongoDB queries validate input data and prevent unbounded queries.
6. **Centralized Error Handling:** Standardized JSON error responses without leaking internal stack traces in production.

---

## 📍 Business Information
* **Business:** Janai Landscape Services
* **Address:** Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045
* **Contact Phone:** +91 97676 71968
* **Email:** contact@janailandscape.com
* **WhatsApp:** [Chat on WhatsApp](https://wa.me/919767671968)