import { config } from "dotenv";

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  config({
    path: "config/.env",
  });
}
import express from "express";
import errorMiddleware from "./middleware/error.js";

const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});



import userRouter from "./controller/user.controller.js";

app.use("/api/v2/user", userRouter);

// it's for ErrorHandling...
app.use(errorMiddleware);
export default app;
