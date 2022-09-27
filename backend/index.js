import express from "express";
import cors from "cors";

// Routes
import UserRoute from "./routes/UserRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.get("/", (req, res) => {
  res.status(200).json({ name: "skyes pirates" });
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});
