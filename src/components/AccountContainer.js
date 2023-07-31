import React, { useState } from "react";
import TransactionList from "./TransactionList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import transactions from "./Transactions";

function AccountContainer() {
  const [transaction, setTransaction] = useState(transactions);
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  // Filter the transactions based on the query
  const filteredTransactions = transaction.filter((t) =>
    t.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
