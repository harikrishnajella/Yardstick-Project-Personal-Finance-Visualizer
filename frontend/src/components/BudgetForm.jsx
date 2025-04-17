import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const BudgetForm = ({ categories = [], onAddBudget }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!category || !amount) return;
    onAddBudget({ category, amount: parseFloat(amount), month });
    setCategory('');
    setAmount('');
    setMonth('')
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Set Budget</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">--Select--</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter budget amount"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Month</Form.Label>
            <Form.Control
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BudgetForm;
