import React, { useState } from "react";
import TransactionList from "./TransactionList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import transactions, { addTransaction } from "./Transaction";

function AccountContainer() {
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  // Filter the transactions based on the query
  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(query.toLowerCase())
  );

  function handleAddTransaction(newTransaction) {
    addTransaction(newTransaction);
    alert("Added successfully!");
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
