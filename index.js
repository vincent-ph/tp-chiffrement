const express = require("express");
const app = express();
const crypto = require("crypto");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", (req, res) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.randomBytes(32).toString("hex").substr(0, 32);
  const iv = crypto.randomBytes(16).toString("hex").substr(0, 16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(req.body.stringToEncrypt, "utf8", "hex");
  encrypted += cipher.final("hex");

  res.send(`<h2>String chiffré:</h2><p>${encrypted}</p>`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
