import express from "express";
import { env } from "./config/env.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet()); //! 1. Sıra Güvenlik

app.use(cors()); //! 2. Sıra Cors

app.use(cookieParser()) //! 4. Cookie Parser
app.use(express.json()); //! 3. Sıra Body Parsing


app.use(rateLimiter); //! 5. Sıra Rate Limiting

app.use(requestLogger); //! 6. Request Logging

app.get("/health", (req, res) => {
  res.json({
    success: true,
    data: { status: "OK", uptime: Math.floor(process.uptime()) },
  });
});

app.use("/api/v1", routes);
// app.use("/api/v2", routes);

app.use(notFound);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`🚀 Sunucu: http://localhost:${env.PORT}`);
  console.log(`🌍 Ortam: ${env.NODE_ENV}`);
  console.log(`📘 API: http://localhost:${env.PORT}/api/v1`);
});
