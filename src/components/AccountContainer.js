import React, { useEffect, useState } from "react";
import TransactionList from "./TransactionList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch initial transactions from the server when the component mounts
    fetch("/api/transactions")
      .then((resp) => resp.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(query.toLowerCase())
  );

  function handleAddTransaction(newTransaction) {
    // Send the new transaction to the server to be added to db.json
    fetch("/api/addTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Update the local state with the new transaction received from the server
        setTransactions((prevTransactions) => [...prevTransactions, data]);
        alert("Added successfully!");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
      });
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
