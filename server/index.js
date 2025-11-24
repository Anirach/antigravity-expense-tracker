const express = require('express');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /api/expenses
app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

// POST /api/expenses
app.post('/api/expenses', async (req, res) => {
    const { description, amount, category } = req.body;

    if (!description || !amount || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const expense = await prisma.expense.create({
            data: {
                description,
                amount: parseFloat(amount),
                category,
            },
        });
        res.status(201).json(expense);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ error: 'Failed to create expense' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
