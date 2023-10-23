const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const Logging = require("../lib/logging");

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

const {
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_CONNECTION_STRING,
  MONGO_DB_DATABASE,
} = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}${MONGO_DB_CONNECTION_STRING}`;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Logging.info("MongoDB connected");

    const db = mongoose.connection;
    const collectionList = await db.db.listCollections().toArray();
    const collectionExists = collectionList.some(
      (collection) => collection.name === MONGO_DB_DATABASE
    );

    if (!collectionExists) {
      await db.createCollection(MONGO_DB_DATABASE);
      Logging.info(`Created new collection: ${MONGO_DB_DATABASE}`);
    }
  } catch (error) {
    Logging.error("MongoDB connection error:", JSON.stringify(error.message));
  }
};

module.exports = { connectDb };
