const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;
const apikey = "aa4c431689e3593d22325f9109bf2cd1";
const baseUrl = `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my Scrapper API.");
});
// product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
