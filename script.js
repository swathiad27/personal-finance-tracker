let totalIncome = 0;
let totalExpense = 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function displayTransactions() {
    totalIncome = 0;
    totalExpense = 0;

    let transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = "";
    
    transactions.forEach(function(item) {

        let transaction = document.createElement("li");

        transaction.innerHTML =
            item.description + " - ₹" + item.amount + " - " + item.type + " - " + item.category;
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        transaction.appendChild(deleteButton);
        transaction.appendChild(editButton);


        transactionList.appendChild(transaction);

        if(item.type === "income"){

            totalIncome = totalIncome + item.amount;

        } else {

            totalExpense = totalExpense + item.amount;
        }
    });

    let balance = totalIncome - totalExpense;
    document.getElementById("income").textContent = "₹" + totalIncome;
    document.getElementById("expense").textContent = "₹" + totalExpense;
    document.getElementById("balance").textContent = "₹" + balance;

}
displayTransactions();

document.getElementById("addTransaction").addEventListener("click", function() {

    let description = document.getElementById("description").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (description === "" || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
}
    transactions.push({
        description: description,
        amount: amount,
        type: type,
        category: category
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  
    let transactionList = document.getElementById("transactionList");

    let transaction = document.createElement("li");

    transaction.innerHTML =
        description + " - ₹" + amount + " - " + type + " - " + category;

    
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";

    transaction.appendChild(deleteButton);
    transaction.appendChild(editButton);


    transactionList.appendChild(transaction);
    editButton.addEventListener("click", function() {

    let newDescription = prompt("Enter new description:", description);
    let newAmount = Number(prompt("Enter new amount:", amount));

    if (newDescription && newAmount > 0) {

    let oldDescription = description;
    let oldAmount = amount;

    description = newDescription;
    amount = newAmount;

    transaction.firstChild.textContent =
        description + " - ₹" + amount + " - " + type + " - " + category;

    transactions = transactions.map(function(item) {

        if (item.description === oldDescription && item.amount === oldAmount) {
            item.description = newDescription;
            item.amount = newAmount;
        }

        return item;
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    displayTransactions();
}
});

    deleteButton.addEventListener("click", function() {

        transaction.remove();

        transactions = transactions.filter(function(item) {
        return item.description !== description || item.amount !== amount;
        });

        localStorage.setItem("transactions", JSON.stringify(transactions));

        if (type === "income") {
            totalIncome = totalIncome - amount;
        } else {
            totalExpense = totalExpense - amount;
        }

        let balance = totalIncome - totalExpense;

        document.getElementById("income").textContent = "₹" + totalIncome;
        document.getElementById("expense").textContent = "₹" + totalExpense;
        document.getElementById("balance").textContent = "₹" + balance;
    });


    if (type === "income") {
        totalIncome = totalIncome + amount;
    } else {
        totalExpense = totalExpense + amount;
    }

    let balance = totalIncome - totalExpense;

    document.getElementById("income").textContent = "₹" + totalIncome;
    document.getElementById("expense").textContent = "₹" + totalExpense;
    document.getElementById("balance").textContent = "₹" + balance;

});
document.getElementById("clearAll").addEventListener("click", function() {

    transactions = [];

    localStorage.removeItem("transactions");

    displayTransactions();

});