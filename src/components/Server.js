const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json());

let transactions = require("./db.json").transactions;

app.post("/api/addTransaction", (req, res) => {
  const { date, description, category, amount } = req.body;

  const newTransaction = {
    id: transactions.length + 1,
    date,
    description,
    category,
    amount: parseFloat(amount),
  };

  transactions.push(newTransaction);

  // Save transactions to the db.json file (not shown here for simplicity)

  res.status(200).json(newTransaction);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
