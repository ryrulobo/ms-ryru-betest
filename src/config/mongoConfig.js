const mongoose = require("mongoose");
const Logging = require("../lib/logging");

const {
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_CONNECTION_STRING,
  MONGO_DB_DATABASE,
} = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}${MONGO_DB_CONNECTION_STRING}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Logging.info("MongoDB connected");

    const db = mongoose.connection;

    const databaseList = await db.db.admin().listDatabases();
    let exist = false;
    databaseList.databases.forEach((dbItem) => {
      if (dbItem.name === MONGO_DB_DATABASE) {
        exist = true;
      }
    });

    if (!exist) {
      Logging.info(`Created new database: ${MONGO_DB_DATABASE}`);
    }
  } catch (error) {
    Logging.error("MongoDB connection error:", JSON.stringify(error.message));
  }
};

module.exports = { connectDb };
