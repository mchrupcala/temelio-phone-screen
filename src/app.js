const express = require("express");
const nonProfitsRoutes = require("./routes/nonprofitsRoutes");
const emailsRoutes = require("./routes/emailsRoutes");

const app = express();
app.use(express.json());

app.use("/nonprofits", nonProfitsRoutes);
app.use("/emails", emailsRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
