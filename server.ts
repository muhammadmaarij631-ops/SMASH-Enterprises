import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import apiRouter from './src/backend/routes/api.js';
import { connectDB } from './src/backend/config/db.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Connect Database
    await connectDB();

    // API Routes
    app.use('/api', apiRouter);

    if (process.env.NODE_ENV !== 'production') {
      console.log('🔄 Starting Vite development server...');

      const vite = await createViteServer({
        server: {
          middlewareMode: true,
        },
        appType: 'spa',
      });

      app.use(vite.middlewares);
    } else {
      console.log('🚀 Serving production build...');

      const distPath = path.join(process.cwd(), 'dist');

      app.use(express.static(distPath));

      app.get('*', (_, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log('========================================');
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`========================================`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();