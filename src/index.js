// Constants
const port = process.env.PORT ?? 8080;
// Express
const express = require("express");
const app = express();
app.set("trust proxy", true);
app.use(express.json());
// CORS
let allowedOrigins = ["http://localhost:8080"];
const cors = require("cors");
app.use(
  cors({
    origin: allowedOrigins,
    methods: [
      "GET",
      "HEAD",
      "POST",
      "PUT",
      "DELETE",
      "CONNECT",
      "OPTIONS",
      "TRACE",
      "PATCH"
    ],
    exposedHeaders: ["Authorization", "*"],
    credentials: true,
    // 24 hours or 1 day
    maxAge: 86400
  })
);
// Helmet
const helmet = require("helmet");
app.use(
  helmet.referrerPolicy({
    policy: "strict-origin-when-cross-origin"
  })
);
app.use(helmet.noSniff());
app.use(
  helmet.frameguard({
    action: "deny"
  })
);
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());

// Routes
app.get("/", (request, response) => {
  response.status(200).json({
    message: "CORS Is Working",
    allowed: allowedOrigins,
    hasOriginHeader: request.get("Origin") ? true : false
  });
});

// Initialize App
app.listen(port, () => {
  console.log("Litening on port " + port);
});
