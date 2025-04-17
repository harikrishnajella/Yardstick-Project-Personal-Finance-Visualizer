import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';

const BudgetChart = ({ budgets = [], transactions = [] }) => {
  const actuals = transactions.reduce((acc, t) => {
    const cat = t.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = budgets.map(b => ({
    category: b.category,
    Budget: b.amount,
    Actual: actuals[b.category] || 0,
  }));

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Budget vs Actual</Card.Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#8884d8" />
            <Bar dataKey="Actual" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default BudgetChart;
