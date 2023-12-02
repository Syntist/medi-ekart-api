import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import fileUpload from "express-fileupload";
import db from "./db/conn.js";
import router from "./routes/routes.js";

const app = express();

app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload());
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: false,
  }),
);
app.use(router);

app.get("/", (rep, res) => {
  res.sendStatus(200);
});

db;
app.listen(app.get("port"), () => {
  console.log(`Node app is running at localhost:${app.get("port")}`);
});
