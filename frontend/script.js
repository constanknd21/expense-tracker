const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

// Fungsi untuk mengambil semua pengeluaran
const getExpenses = async () => {
  const response = await fetch('http://localhost:3000/expenses');
  const expenses = await response.json();
  
  // Tampilkan pengeluaran dalam bentuk list
  expenseList.innerHTML = '';
  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.textContent = `${expense.description}: Rp${expense.amount}`;
    expenseList.appendChild(li);
  });
};

// Fungsi untuk menambahkan pengeluaran
const addExpense = async (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;

  const newExpense = { description, amount };

  const response = await fetch('http://localhost:3000/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newExpense),
  });

  if (response.ok) {
    getExpenses(); // Reload pengeluaran setelah ditambahkan
  }
};

expenseForm.addEventListener('submit', addExpense);
window.onload = getExpenses; // Memuat pengeluaran ketika halaman dimuat
