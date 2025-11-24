import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const API_URL = '/api/expenses';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleAddExpense = async (expense) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });

        if (!response.ok) {
            throw new Error('Failed to add expense');
        }

        const newExpense = await response.json();
        setExpenses((prev) => [newExpense, ...prev]);
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <ExpenseForm onAddExpense={handleAddExpense} />
            {loading ? (
                <div className="card animate-fade-in" style={{ textAlign: 'center' }}>
                    <p>Loading expenses...</p>
                </div>
            ) : (
                <ExpenseList expenses={expenses} />
            )}
        </div>
    );
}

export default App;
