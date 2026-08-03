# ShopO — MultiVendor E-Commerce Platform

A full-stack MERN multivendor marketplace where independent sellers can open their own shops, list products and events, manage orders, and chat with customers — while shoppers can browse across every shop, buy from multiple sellers in a single checkout, track orders, and message sellers directly. Includes a separate admin panel for platform oversight.

**Live demo:** `https://multi-vendor-eshop.vercel.app`

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started (Local Development)](#getting-started-local-development)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [API Overview](#api-overview)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)

---

## Features

### For Shoppers (Users)
- Browse products by category, search, and view detailed product pages
- Add to cart and wishlist (persisted in localStorage)
- Multi-vendor checkout — a single order automatically splits into per-shop sub-orders
- Coupon code discounts
- Pay via Stripe (card), PayPal, or Cash on Delivery
- Track order status in real time (Processing → Shipping → Delivered)
- Request refunds on delivered orders
- Leave star ratings + written reviews on purchased products
- Real-time chat with sellers via Socket.IO
- Manage profile: avatar, personal info, password, saved addresses

### For Sellers (Shops)
- Register a shop with its own storefront, logo, and description
- Full product and event (time-limited/flash sale) management — create, edit, delete
- Dashboard with order overview, revenue tracking, and recent orders
- Create and manage discount coupon codes
- Handle order fulfillment and refund requests
- Withdraw earnings (10% platform service charge auto-deducted)
- Real-time inbox to chat with customers

### For Admins
- Platform-wide dashboard: total orders, total sellers, total revenue
- Manage all users and all sellers (view/delete)
- Oversee all products, events, and orders across every shop
- Approve/process seller withdrawal requests

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router v7
- Redux Toolkit (state management)
- Tailwind CSS v4
- Material UI (`@mui/x-data-grid` for admin/dashboard tables)
- Socket.IO client
- Stripe.js & PayPal React SDK

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose 9
- JSON Web Tokens (JWT) for auth (separate cookies for users vs. sellers)
- Cloudinary (image storage for avatars, products, events, chat images)
- Nodemailer (account activation emails, withdrawal notifications)
- Stripe (payment processing)
- bcrypt (password hashing)

**Real-time**
- Standalone Socket.IO server (separate service from the main API) for live chat and online-status indicators

**Hosting**
- Frontend → Vercel
- Backend API + Socket server → Render
- Database → MongoDB Atlas
- Images → Cloudinary

---

## Architecture

This project runs as **three independent services**, not a single monolith:

```
┌─────────────┐      HTTPS/REST       ┌─────────────┐
│   Frontend   │ ───────────────────▶ │   Backend    │
│ (Vercel/Vite)│ ◀─────────────────── │  (Express)   │──────▶ MongoDB Atlas
└─────────────┘                       └─────────────┘
       │                                                  ──────▶ Cloudinary
       │            WebSocket
       └───────────────────────────▶ ┌─────────────┐
                                      │Socket Server │
                                      │ (Socket.IO)  │
                                      └─────────────┘
```

The backend handles all REST API calls (auth, products, orders, payments, etc.). The socket server exclusively handles real-time messaging between users and sellers and is deployed separately so it can scale/restart independently of the main API.

---

## Project Structure

```
MultiVendor-Eshop/
├── backend/                 # Express REST API
│   ├── config/               # .env (not committed) + Cloudinary config
│   ├── controller/           # Route handlers (user, shop, product, event, order, etc.)
│   ├── db/                   # MongoDB connection
│   ├── middleware/            # Auth guards, error handling, async wrapper
│   ├── model/                 # Mongoose schemas
│   ├── utils/                 # JWT cookie helpers, error class, mailer
│   ├── app.js                 # Express app + middleware setup
│   └── server.js              # Entry point
│
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/        # UI components grouped by domain (Shop, Admin, Route, etc.)
│   │   ├── pages/               # Route-level page components
│   │   ├── redux/                # Actions + reducers + store
│   │   ├── routes/                # Route group exports + protected route wrappers
│   │   ├── static/                 # Static reference data (categories, nav links, footer links)
│   │   └── styles/                  # Shared Tailwind class bundles
│   └── vercel.json             # SPA rewrite rule for client-side routing
│
└── socket/                   # Standalone Socket.IO server
    └── index.js
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Cloudinary account (free tier is fine)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) for SMTP (or another SMTP provider)
- A Stripe account (test mode is fine for development)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd MultiVendor-Eshop
```

### 2. Install dependencies for all three services
```bash
cd backend && npm install
cd ../frontend && npm install
cd ../socket && npm install
```

### 3. Set up environment variables
See the [Environment Variables](#environment-variables) section below and create the three `.env` files described there.

### 4. MongoDB Atlas network access
In Atlas → **Network Access**, add your current IP (or `0.0.0.0/0` for unrestricted access during development).

---

## Environment Variables

### `backend/config/.env`
```env
PORT=4000
NODE_ENV=development

DB_URL=<your MongoDB Atlas connection string>

JWT_SECRET_KEY=<any long random string>
JWT_EXPIRES=7d
ACTIVATION_SECRET=<any long random string>

CLOUDINARY_CLOUD_NAME=<your Cloudinary cloud name>
CLOUDINARY_API_KEY=<your Cloudinary API key>
CLOUDINARY_API_SECRET=<your Cloudinary API secret>

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=<your email>
SMTP_PASSWORD=<your app password>

STRIPE_PUBLISHABLE_KEY=<your Stripe publishable key>
STRIPE_SECRET_KEY=<your Stripe secret key>

FRONTEND_URL=http://localhost:5173
```

### `socket/.env`
```env
PORT=4001
FRONTEND_URL=http://localhost:5173
```

### `frontend/.env`
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_SOCKET_ENDPOINT=http://localhost:4001/
```

> ⚠️ **Important:** `VITE_BACKEND_URL` must **not** have a trailing slash — the frontend concatenates `/api/v2` onto it, and a trailing slash produces a malformed double-slash URL.

---

## Running the App

Open three terminals, one per service:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Socket server
cd socket
npm run dev   # or: node index.js

# Terminal 3 — Frontend
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`
- Socket server: `http://localhost:4001`

**First-time setup tip:** the storefront will show "No products Found!" until you register a seller account (`/shop-create`), activate it via the email sent to your configured SMTP address, log in, and add at least one product from the seller dashboard.

---

## Deployment

This project deploys as three separate services:

| Service | Platform | Root Directory |
|---|---|---|
| Frontend | Vercel | `frontend` |
| Backend API | Render (Web Service) | `backend` |
| Socket server | Render (Web Service, same project as backend) | `socket` |

### Key deployment notes
1. **Set `NODE_ENV=PRODUCTION`** on the backend's Render environment variables — this controls whether auth cookies are set with `secure: true` / `sameSite: 'none'`, which is required for cross-origin cookies to work between Vercel and Render (different domains, HTTPS-only).
2. **`FRONTEND_URL`** on both the backend and socket Render services must exactly match your live Vercel URL (no trailing slash) — this is used directly in the CORS `origin` allow-list.
3. **`VITE_BACKEND_URL`** and **`VITE_SOCKET_ENDPOINT`** on Vercel must point to your live Render URLs.
4. **MongoDB Atlas Network Access** must allow connections from anywhere (`0.0.0.0/0`), since Render doesn't provide a static outbound IP on the free tier.
5. **`frontend/vercel.json`** is required for client-side routing to work — without it, refreshing or directly navigating to any non-root route (e.g. `/dashboard`, `/product/:id`) returns Vercel's platform 404 instead of your React app:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
6. Free-tier Render services spin down after inactivity and take 30–60 seconds to wake on the next request — this is expected, not a bug.

---

## API Overview

Base URL: `/api/v2`

| Resource | Base Path | Notes |
|---|---|---|
| Users | `/user` | Signup (email activation), login, profile, addresses, password |
| Shops (Sellers) | `/shop` | Shop registration/activation, login, profile, withdraw methods |
| Products | `/product` | CRUD, reviews |
| Events | `/event` | Time-limited product listings |
| Orders | `/order` | Create, fetch by user/shop/admin, status updates, refunds |
| Coupons | `/coupon` | Create/delete/lookup discount codes |
| Payment | `/payment` | Stripe payment intent creation |
| Conversations | `/conversation` | Chat thread creation and listing |
| Messages | `/message` | Send/fetch chat messages |
| Withdraw | `/withdraw` | Seller payout requests (admin-approved) |

Authentication uses two separate JWT cookies — `token` for regular users and `seller_token` for sellers — allowing a person to be logged in as both simultaneously in the same browser.

---

## Known Limitations

- Real-time "last seen" / last-message-preview socket event has a minor property-name mismatch between client and server and is currently inert (no functional impact on core messaging).
- Free-tier Render hosting introduces cold-start delays after idle periods.
- Stripe integration currently uses test-mode keys; switch to live keys for real transactions.
- Search and category browsing rely on the live product database — an empty store will show "No products Found!" until a seller lists at least one item.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes with clear messages
4. Push and open a Pull Request

---

## License

ISC
