const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((t, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${t.text}
            <span>₹${t.amount}</span>
            <button onclick="deleteTransaction(${index})">❌</button>
        `;

        list.appendChild(li);

        if (t.amount > 0) {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    balance.innerText = "₹" + (income + expense).toFixed(2);
    moneyPlus.innerText = "₹" + income.toFixed(2);
    moneyMinus.innerText = "₹" + Math.abs(expense).toFixed(2);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {

    if (text.value.trim() === "" || amount.value === "") {
        alert("Please fill all fields");
        return;
    }

    transactions.push({
        text: text.value,
        amount: Number(amount.value)
    });

    text.value = "";
    amount.value = "";

    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();
