const express = require("express");
const { v4: uuidv4 } = require("uuid");

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
  const { nonProfitEmails, template, sender, subject } = req.body;
  const sentEmails = [];

  if (!sender || !subject) {
    return res.status(400).json({
      message:
        "Missing data, please try again. Please include sender, subject, and body fields.",
    });
  }

  nonProfitEmails.forEach((email) => {
    const nonprofit = allNonprofits.get(email);
    if (!nonprofit) return;

    const body = template
      .replace("{ name }", nonprofit.name)
      .replace("{ address }", nonprofit.address);
    const emailItem = {
      id: uuidv4(),
      body: body,
      from: sender,
      to: nonprofit.email,
      subject: subject,
    };
    allSentEmails.push(emailItem);
    sentEmails.push(emailItem);
  });

  res
    .status(200)
    .json({
      message: "Emails sent successfully",
      count: sentEmails.length,
      sentEmails,
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
