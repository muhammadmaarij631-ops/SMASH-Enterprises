# SMASH Enterprises - High-Performance Software Portfolio & Engine

A premium, agency-level animated portfolio and full-stack client engagement system for **SMASH Enterprises**, built on React 19, Express.js, and MongoDB.

Designed using modern futuristic glassmorphism and smooth animations.

---

## 🎨 Visual System & Themes
- **Core Dark Color Palette**: 
  - Background: `#0A0F1E` (Space Midnight)
  - Cards: `#121A2E` (Deep Navy)
  - Text Primary: `#E6EAF3`
  - Text Secondary: `#94A3B8`
  - Accents: `#00D1FF` (Cyan Glow) & `#7C3AED` (Royal Purple)
- **Responsive Fluidity**: Fully adaptive layout covering Desktop, Laptop, Tablet, and Mobile.
- **Micro-Animations**: Uses canvas particles, scroll triggers, custom slider animations, custom accordion triggers, and hover glows.

---

## 📁 Technical Architecture
- **Frontend**: React 19, Vite, TailwindCSS v4, Framer Motion (imported from `motion/react` for optimal compile stability), and Lucide Icons.
- **Backend**: Express.js server exposing public submission gateways and protected administrative endpoints.
- **Dual Storage Persistence**: 
  - **Durable**: Connects directly to a **MongoDB Atlas Cluster** if `MONGODB_URI` environment variable is defined.
  - **Resilient Fallback**: Automatically creates and writes to a local encrypted JSON file (`data/db.json`) if MongoDB Atlas credentials are not available. This prevents server crashes and guarantees 100% operation immediately!
- **Interactive Control Panel**: A private dashboard to view, analyze, search, paginate, modify statuses of, and delete orders or inquiries, with responsive metrics charting provided by Recharts.

---

## ⚙️ Environment Configuration

Create a `.env` file at the root of the project with the following parameters (refer to `.env.example`):

```env
# SERVER HOSTING PORT
PORT=3000

# DATABASE CONNECTOR
# Leave blank to use our secure, local JSON file backup automatically
MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/smash_db"

# CONTROL PANEL SECURITY CREDENTIALS
ADMIN_USER="admin"
ADMIN_PASS="admin123"

# MAIL DISPATCH SERVICES (Nodemailer SMTP specs)
# Leave blank to log emails locally in terminal outputs during testing
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="myname@gmail.com"
SMTP_PASS="my_secure_app_password"
```

---

## 🚀 Local Installation & Development

### 1. Prerequisite Setup
Ensure you have **Node.js (v18+)** and **npm** installed on your workstation.

### 2. Install Packages
Run the following command at the root directory to install all required client & server packages:
```bash
npm install
```

### 3. Run Development Server
Boot up the full-stack system locally using the tsx runner:
```bash
npm run dev
```
The server will start on [http://localhost:3000](http://localhost:3000). Vite handles frontend Hot Module Replacement (HMR) seamlessly through the Express gateway.

### 4. Build and Production Run
Compile client assets and bundle the server into a fast, standalone CommonJS module using:
```bash
npm run build
```
Once built, initiate the optimized production server using:
```bash
npm start
```

---

## 🛡️ Administrative Backdoor Control Panel
The dashboard analytics panel can be accessed securely by scrolling to the very bottom of the website and clicking the low-opacity **"Access Control Panel"** button.
- **Default Username**: `admin`
- **Default Password**: `admin123`
The dashboard lets you:
- View overall statistics (Inquiries, orders, completed rates, estimated revenue).
- Inspect and monitor interactive charts tracking monthly trends and project type percentages.
- Perform instant searches across all client messages and order specifications.
- Update client order statuses (`pending`, `reviewed`, `completed`) to track development.
- Securely delete submissions from the database once fulfilled.

---

## ☁️ Production Cloud Deployment

### 🟢 Deploying Backend to **Render.com**
1. Create a new **Web Service** on Render.
2. Link your GitHub repository.
3. Configure the following build settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Define your Environment Variables (`MONGODB_URI`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_USER`, etc.) in Render's dashboard.
5. Render will automatically expose an HTTPS server url.

### 🔵 Deploying Frontend to **Vercel**
This project is configured as a full-stack unified app, so you can host the entire app on **Render** (as a custom server that serves static built files automatically when `NODE_ENV=production` is set), or separate the client static files to Vercel:
1. Create a new project on Vercel.
2. Direct the root directory to the root of the project.
3. Configure **Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Vercel environment variables to point client API queries to your Render server url (or keep the unified Render deployment for extreme simplicity!).

---

## 📧 Automated Notification Email Templates
Every client order or contact inquiry triggers two HTML responsive email operations:
1. **Agency Notification Alert**: Dispatched directly to `smashenterprises185@gmail.com` with client name, email, phone, requested budget, timelines, and full description scope.
2. **Client Automated Dispatcher Confirmation**: Dispatched to the client confirming our Pakistan headquarters received their project, detailing how our analysts will reply within 24 hours.
