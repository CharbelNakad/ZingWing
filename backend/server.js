const express = require("express");
const cors = require("cors");
const missionsRoutes = require("./routes/missionsRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Zing Wing missions API.",
  });
});

app.use("/missions", missionsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Zing Wing backend running on http://localhost:${PORT}`);
});
