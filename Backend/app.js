const express = require("express");
const cors = require("cors");
const csvtojson = require("csvtojson");

const port = process.env.PORT || 2024;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/convert", (req, res) => {
  const csvString = req.body.csvString;

  csvtojson()
    .fromString(csvString)
    .then((json) => {
      res.json({ jsonData: json });
    })
    .catch((error) => {
      res.status(500).json({ error: error, message: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server listing at port ${port}`);
});
