import React from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';

const MonthlyBarChart = ({ transactions = [] }) => {
  if (!Array.isArray(transactions)) return null;

  const grouped = transactions.reduce((acc, transaction) => {
    const month = dayjs(transaction.date).format('MMM YYYY');
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.total += transaction.amount;
    } else {
      acc.push({ month, total: transaction.amount });
    }
    return acc;
  }, []);

  // Optional: sort by actual date
  grouped.sort((a, b) => dayjs(a.month, 'MMM YYYY').toDate() - dayjs(b.month, 'MMM YYYY').toDate());

  return (
    <Card className="my-4 p-4">
      <Card.Body>
        <Card.Title>Monthly Expenses</Card.Title>
        <div className='m-2' style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={grouped}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MonthlyBarChart;


