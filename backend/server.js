const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/expenses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definisi Skema MongoDB
const ExpenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', ExpenseSchema);

// Middleware untuk parsing JSON
app.use(express.json());

// API Endpoint
app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post('/expenses', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.status(201).json(expense);
});

app.delete('/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Menjalankan server
app.listen(3000, () => console.log('Server running on port 3000'));
