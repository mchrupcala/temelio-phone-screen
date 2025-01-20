const { allNonprofits } = require("../data/database");

exports.createNonprofit = (req, res) => {
  const { name, email, address } = req.body;
  if (allNonprofits.has(email)) {
    return res
      .status(400)
      .json({ message: `${name} has already been created.` });
  }

  const newNonprofit = { name, email, address };
  allNonprofits.set(email, newNonprofit);

  return res.status(200).json({ newNonprofit });
};

exports.getNonprofits = (req, res) => {
  return res.status(200).json(Array.from(allNonprofits.values()));
};

exports.getNonprofitByEmail = (req, res) => {
  const email = req.params.email;

  if (!allNonprofits.has(email)) {
    return res
      .status(404)
      .json({ message: `No nonprofit with email ${email} was found.` });
  }

  return res.status(200).json(allNonprofits.get(email));
};
