# 📦 Install Backend Dependencies

Before running the server, you need to install the required backend dependencies.

## Required Dependencies

Run this command in your project root directory:

```bash
npm install express cors dotenv @google-cloud/vertexai concurrently
```

### What each package does:

- **express** - Web server framework for the backend API
- **cors** - Enables Cross-Origin Resource Sharing between frontend and backend
- **dotenv** - Loads environment variables from .env file
- **@google-cloud/vertexai** - Official Google Cloud Vertex AI SDK
- **concurrently** - Runs frontend and backend servers simultaneously

## After Installation

Once dependencies are installed, you can run:

### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev
```

This will start:
- React frontend on `http://localhost:3000`
- Backend proxy on `http://localhost:5000`

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm start
```

**Terminal 2 - Backend:**
```bash
npm run server
```

## Verify Installation

After running `npm run dev`, you should see:
```
🚀 Vertex AI Proxy Server running on http://localhost:5000
📍 Project: gen-lang-client-0510232212
📍 Location: us-central1
✅ Ready to handle AI chat requests
```

## Next Steps

1. ✅ Install dependencies: `npm install express cors dotenv @google-cloud/vertexai concurrently`
2. ✅ Place `vertex-ai-credentials.json` in root directory
3. ✅ Run `npm run dev` to start both servers
4. ✅ Test the integration by sending a message in AI Chat

---

**Ready to install?** Run the command above and let me know when it's done!
