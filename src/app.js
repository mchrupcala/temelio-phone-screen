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

app.get("/emails", (req, res) => {
  return res.status(200).json(allSentEmails);
});

app.post("/emails", (req, res) => {
  const { name, address, to, from, subject, body } = req.body;
  const receiver = allNonprofits.get(to);

  if (!name || !address || !to || !from || !subject || !body) {
    return res.status(400).json({
      message:
        "Missing data, please try again. Please include name, address, to, from, subject, and body fields.",
    });
  }

  if (!receiver) {
    return res.status(404).json({ message: "Nobody found at that email" });
  }

  const newEmail = {
    name: name,
    address: address,
    to: to,
    from: from,
    subject: subject,
    body: body,
  };

  allSentEmails.push(newEmail);

  return res.status(200).json(newEmail);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
