# FastAPI Backend Deployment Guide (Free)

This guide shows you how to deploy your FastAPI backend for free using several reliable platforms.

## Option 1: Koyeb (Highly Recommended)
Koyeb is a powerful platform that offers a free "Nano" instance. It's very fast and reliable.

### Fix: "The application type could not be identified" error
Since your backend is in a sub-folder, you must tell Koyeb where to find it:

1. Sign up at [Koyeb](https://www.koyeb.com/).
2. Create a **New Service**.
3. Connect your GitHub repository.
4. **IMPORTANT: App Directory**:
   - In the "Service" settings, find **App Directory**.
   - Set it to `/backend`.
5. **Settings**:
   - **Instance Size**: Nano (Free).
   - **Builder**: Choose **Buildpack** (for automatic detection) OR **Docker** (recommended).
     - If you choose **Docker**, ensure the **Dockerfile path** is set to `Dockerfile` (it's inside the `/backend` folder).
   - **Environment Variables**: Add `GEMINI_API_KEY`.
   - **Port**: 8000.

## Option 2: Render
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Name**: `tnc-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Select **Free**.
5. Add `GEMINI_API_KEY` in the **Environment** section.

## Option 3: Hugging Face Spaces (Great for AI Apps)
Hugging Face is unique because it's completely free for AI projects and very stable.
1. Create a [Hugging Face](https://huggingface.co/) account.
2. Create a **New Space**.
3. Name it and choose **Docker** as the SDK.
4. Choose the **Blank** template or **FastAPI**.
5. Upload your files (`main.py`, `requirements.txt`, `Dockerfile`).
6. Go to **Settings** > **Variables and Secrets** to add your `GEMINI_API_KEY`.

## Option 4: Vercel (FastAPI Serverless)
Vercel is mostly for frontend, but it can run FastAPI as serverless functions.
1. Install Vercel CLI: `npm i -g vercel`.
2. In your `backend` folder, create a `vercel.json`:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "main.py" }]
   }
   ```
3. Run `vercel`.
4. **Note**: Best for small APIs. Long responses might hit timeout limits.

## Option 5: Docker Compose (Full Stack)

We have added a `docker-compose.yml` in the root folder. This is the best way to run your entire stack (Frontend + Backend) with one command.

### How to use:
1. Ensure you have **Docker Desktop** installed.
2. Open a terminal in the root folder (`tnc`).
3. Run the following command:
   ```bash
   docker-compose up --build
   ```
4. Access your apps:
   - **Frontend**: `http://localhost:3000`
   - **Backend**: `http://localhost:8000`

### Why use Docker Compose?
- **Everything works together**: The frontend is automatically configured to talk to the backend.
- **Environment variables**: It uses your `backend/.env` file for the AI keys.
- **Identical to Production**: This is the closest you can get to how the app will run on a professional server.

---

## Final Step: Connecting the Frontend

Now that your backend is live at `https://classical-tybie-rag-chatbot-44e67076.koyeb.app`, you need to point your frontend to it.

### 1. For Local Development
Create a file named `.env.local` inside [frontend/tnc-frontend](file:///d:/react%20practice/tnc/frontend/tnc-frontend) and add this line:
```env
NEXT_PUBLIC_API_URL=https://classical-tybie-rag-chatbot-44e67076.koyeb.app
```

### 2. For Production (Vercel/Koyeb)
Add an environment variable in your frontend project settings:
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://classical-tybie-rag-chatbot-44e67076.koyeb.app`

### 3. Manual UI Overrides (Koyeb Docker)
If you deploy your **Backend** again on Koyeb using Docker:
- **App Directory**: `backend`
- **Dockerfile Path**: `Dockerfile`
- **Port**: `8000`
- **Work Directory**: `/app`

For the **Frontend**:
- **App Directory**: `frontend/tnc-frontend`
- **Dockerfile Path**: `Dockerfile`
- **Port**: `3000`
