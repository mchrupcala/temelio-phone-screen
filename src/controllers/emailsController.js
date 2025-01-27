const { allSentEmails, allNonprofits } = require("../data/database");
const { v4: uuidv4 } = require("uuid");
const emailService = require("../services/emailService.js");

// added CC and BCC.
// both are optional fields.
// When we look at sent emails, we want to see the fields included in sent emails.

exports.getSentEmails = (req, res) => {
  return res.status(200).json(allSentEmails);
};

exports.sendBulkEmails = (req, res) => {
  const { nonProfitEmails, template, sender, subject, cc, bcc } = req.body;
  const sentEmails = [];

  if (!sender || !subject || !nonProfitEmails || !template) {
    return res.status(400).json({
      message:
        "Missing data please try again. Please include sender, subject, nonProfitEmails, and template fields.",
    });
  }

  if (allNonprofits.size === 0) {
    return res.status(404).json({
      message: "Please create a nonprofit first.",
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
      subject: subject,
      from: sender,
      to: nonprofit.email,
      cc: cc,
      bcc: bcc,
    };

    emailService.sendEmail(email, emailItem);

    allSentEmails.push(emailItem);
    sentEmails.push(emailItem);
  });

  res.status(200).json({
    message: "Emails sent successfully",
    count: sentEmails.length,
    sentEmails,
  });
};
