import React from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#af19ff', '#ff4f81'];

const CategoryPieChart = ({ transactions = [] }) => {
  if (!Array.isArray(transactions)) return null;

  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.category || 'Uncategorized';
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += transaction.amount;
    } else {
      acc.push({ name: category, value: transaction.amount });
    }
    return acc;
  }, []);

  return (
    <Card className="my-4 shadow-sm">
      <Card.Body>
        <Card.Title>Spending by Category</Card.Title>
        <div className="d-flex justify-content-center ">
          <PieChart width={500} height={400}>
            <Pie
              data={categoryData} 
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CategoryPieChart;

