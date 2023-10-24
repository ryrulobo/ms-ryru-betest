const express = require("express");
const cors = require("cors");

const { connectDb } = require("./config/mongoConfig");
const Logging = require("./lib/logging");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.SERVER_PORT || 5555;

// Only start server if MongoDb connects
connectDb()
  .then(() => {
    Logging.info("Connected to MongoDb");
    StartServer();
  })
  .catch((err) => {
    Logging.error("Unable to connect to MongoDb:");
    Logging.error(err);
  });

const StartServer = () => {
  app.use((req, res, next) => {
    Logging.info(`Incoming => Method: [${req.method}] | URL: [${req.url}]`);

    res.on("finish", () => {
      Logging.info(
        `Incoming => Method: [${req.method}] | URL: [${req.url}] | Status: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
    })
  );
  app.use(router);
  app.use(errorHandler);
  app.listen(port, () => {
    Logging.info(`🚀 Server is running on port ${port}`);
  });
};
