import { config } from "dotenv";
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  config({
    path: "config/.env",
  });
}
import app from "./app.js";
import connectDatabase from "./db/database.js";
import connectCloudinary from "./config/cloudinary.js";
// handling uncaught exception

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`server on runing on http://localhost:${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});

// connect database

connectDatabase();

connectCloudinary();

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
