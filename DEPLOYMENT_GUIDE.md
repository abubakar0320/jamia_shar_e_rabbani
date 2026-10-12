# Jamia Sher-e-Rabbani - Production Deployment & Operations Guide

This guide provides complete instructions for deploying, managing, and maintaining the **Jamia Sher-e-Rabbani** web portal in a production environment.

---

## 🏛️ System Architecture

| Layer | Technology | Key Features |
|---|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, TailwindCSS | 24 optimized routes, PWA support, dynamic XML sitemap, OpenGraph metadata |
| **Backend API** | Node.js, Express.js | Helmet security, rate limiting (brute-force 429), NoSQL sanitization |
| **Database** | MongoDB Atlas Cloud Cluster | Scalable Mongoose models, indexing, resilient DNS fallback |
| **Document Storage** | Physical Disk Storage (`/uploads`) | Multer streaming, MIME validation, 5MB limit |
| **Disaster Recovery** | Automated 24-hour Snapshot Engine | Local JSON dumps in `/backups`, 7-day retention, safe restore engine |
| **Online Payments** | Direct Accounts (Meezan, JazzCash, NayaPay/Raast) | 0% commission, dynamic QR codes, slip upload verification |
| **Live Tracking** | Public Application Tracker (`/admissions/status`) | 4-step stepper, 1-click WhatsApp formatted receipts |

---

## 🚀 Deployment Option A: Ubuntu VPS (Recommended)

### 1. Prerequisites
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git nginx
sudo npm install -g pm2
```

### 2. Clone Repository & Setup Backend
```bash
cd /var/www
git clone https://github.com/abubakar0320/jamia_shar_e_rabbani.git jamia
cd /var/www/jamia/backend

# Copy environment file
cp .env.example .env
nano .env   # Enter your MONGODB_URI, JWT_SECRET, PORT=5000

# Install dependencies
npm install --production

# Create required directories
mkdir -p uploads/admissions uploads/challans uploads/faculty backups
```

### 3. Setup Frontend
```bash
cd /var/www/jamia/frontend

# Copy environment file
cp .env.example .env.local
nano .env.local  # Set NEXT_PUBLIC_SITE_URL=https://jamiashererabbani.com

# Install & build
npm install
npm run build
```

### 4. Process Management with PM2
Create `/var/www/jamia/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'jamia-backend',
      cwd: '/var/www/jamia/backend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'jamia-frontend',
      cwd: '/var/www/jamia/frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
```

Start applications:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Nginx Reverse Proxy Configuration
Create `/etc/nginx/sites-available/jamiashererabbani`:
```nginx
server {
    server_name jamiashererabbani.com www.jamiashererabbani.com;

    # Maximum file upload size (matches Multer limits)
    client_max_body_size 25M;

    # Static Physical Uploads
    location /uploads/ {
        alias /var/www/jamia/backend/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Backend API & Health Check
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend Next.js Application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site & install SSL:
```bash
sudo ln -s /etc/nginx/sites-available/jamiashererabbani /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d jamiashererabbani.com -d www.jamiashererabbani.com
```

---

## ☁️ Deployment Option B: Cloud (Vercel + Render / Railway)

1. **Frontend on Vercel:**
   - Connect GitHub repo: `abubakar0320/jamia_shar_e_rabbani`.
   - Set Root Directory: `frontend`.
   - Set Environment Variables:
     - `NEXT_PUBLIC_SITE_URL=https://jamiashererabbani.com`
     - `NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api`
2. **Backend on Railway / Render:**
   - Set Root Directory: `backend`.
   - Set Environment Variables:
     - `MONGODB_URI=...`
     - `JWT_SECRET=...`
     - `PORT=5000`
   - Health check path: `/api/health`.

---

## 🛡️ Health Monitoring & Disaster Recovery

- **Health Endpoint:** `GET /api/health`
  - Returns `200 OK` with uptime, timestamp, and MongoDB connectivity status.
  - Setup a free ping monitor on [UptimeRobot](https://uptimerobot.com) pointing to `https://jamiashererabbani.com/api/health`.
- **Automated Daily Backups:**
  - The server automatically creates a JSON snapshot every 24 hours in `backend/backups/`.
  - Rotates and keeps the 7 most recent snapshots automatically.
- **Restoring From Backup:**
  - Open **Admin Dashboard** ➔ click **"Backup & Recovery"** on the top action bar.
  - Choose a server snapshot or upload a `.json` backup file.
  - The system creates a guaranteed pre-restore safety snapshot before modifying database records.
