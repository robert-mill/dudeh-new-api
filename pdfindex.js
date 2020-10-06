const express = require("express");
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const app = express();
const router = express.Router();
const pdfTemplate = require("./documents");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.post("/", auth, async (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});
router.get("/", auth, async (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

module.exports = router;
