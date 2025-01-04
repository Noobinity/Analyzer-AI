const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/analyze", async (req, res) => {
  const { contractAddress } = req.body;

  try {
    // Simulate data for demonstration purposes
    const twitterPosted = contractAddress.includes("valid");
    const devRugHistory = contractAddress.includes("rug");

    res.json({ twitterPosted, devRugHistory });
  } catch (error) {
    console.error("Error analyzing CA:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
