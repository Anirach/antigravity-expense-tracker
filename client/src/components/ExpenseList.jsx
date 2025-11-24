import React from 'react';

const ExpenseList = ({ expenses }) => {
    if (expenses.length === 0) {
        return (
            <div className="card animate-fade-in">
                <div className="empty-state">
                    <p>No expenses recorded yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card animate-fade-in">
            <ul className="expense-list">
                {expenses.map((expense) => (
                    <li key={expense.id} className="expense-item">
                        <div className="expense-info">
                            <span className="expense-desc">{expense.description}</span>
                            <span className="expense-meta">
                                {expense.category} • {new Date(expense.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <span className="expense-amount">
                            ฿{expense.amount.toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
