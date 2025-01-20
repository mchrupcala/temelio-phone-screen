exports.sendEmail = (recipient, content) => {
  console.log(`📧 Email Sent to: ${recipient} via Fake SendGrid`);
  console.log(`ID: ${content.id}`);
  console.log(`Content: ${content.body}`);
};
