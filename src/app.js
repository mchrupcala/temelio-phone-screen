const express = require("express");

const app = express();
app.use(express.json());

const allNonprofits = new Map();
const allSentEmails = [];

app.get("/nonprofits", (req, res) => {
  return res.status(200).json(Array.from(allNonprofits.values()));
});

app.get("/nonprofits/:email", (req, res) => {
  const email = req.params.email;

  if (!allNonprofits.has(email)) {
    return res
      .status(404)
      .json({ message: `No nonprofit with email ${email} was found.` });
  }

  return res.status(200).json(allNonprofits.get(email));
});

app.post("/nonprofits", (req, res) => {
  const { name, email, address } = req.body;
  if (allNonprofits.has(email)) {
    return res
      .status(400)
      .json({ message: `${name} has already been created.` });
  }

  const newNonprofit = { name, email, address };
  allNonprofits.set(email, newNonprofit);

  return res.status(200).json({ newNonprofit });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
