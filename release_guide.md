# 🚀 Release Guide: Putting SK Marketing Online

To release your portal so Bank Managers can access it from anywhere, follow these 4 simple phases.

## Phase 1: Upload to GitHub
*Deployment services (Render & Vercel) connect to your GitHub account to put your code online.*

1.  Create a free account at [GitHub.com](https://github.com).
2.  Create a "New Repository" named `sk-marketing-portal`.
3.  Upload your project folder to this repository.

---

## Phase 2: Deploy the Backend (The Brain)
*We will use **Render.com** to host the server.*

1.  Create a free account at [Render](https://render.com).
2.  Click **"New +"** -> **"Web Service"**.
3.  Connect your GitHub repository.
4.  **Settings**:
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables** (Find the "Env Vars" tab):
    *   `MONGODB_URI`: *Paste your MongoDB Atlas string here.*
    *   `JWT_SECRET`: *Create a random secret string.*
6.  **Copy your Service URL**: It will look like `https://sk-marketing-backend.onrender.com`.

---

## Phase 3: Deploy the Frontend (The Interface)
*We will use **Vercel** for the fastest user experience.*

1.  Create a free account at [Vercel](https://vercel.com).
2.  Click **"Add New"** -> **"Project"**.
3.  Import the same GitHub repository.
4.  **Settings**:
    *   Vercel will detect it's a "Vite" project—keep the defaults.
5.  **Environment Variables**:
    *   `VITE_API_URL`: *Paste the Render URL from Phase 2 (e.g., https://...onrender.com/api)*.
6.  Click **"Deploy"**.

---

## Phase 4: Final Check
Once done, Vercel will give you a public link (e.g., `https://sk-marketing.vercel.app`).

1.  Send this link to your Bank Managers.
2.  They can now log in using their email and password from their own computers!

> [!TIP]
> **Why two services?**
> Render is great for "running" code (Backend), while Vercel is best for "displaying" websites (Frontend). Together, they keep your portal fast and reliable.
