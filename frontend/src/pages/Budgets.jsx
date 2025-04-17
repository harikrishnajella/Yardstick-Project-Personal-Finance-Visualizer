import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BudgetForm from '../components/BudgetForm';
import BudgetChart from '../components/BudgetChart';
import Navbar from './Navbar';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  let url = "https://personal-finance-visualizer-backend.onrender.com/api"

  const fetchAll = async () => {
    const [b, t, c] = await Promise.all([
      fetch(`${url}/budgets`).then(res => res.json()),
      fetch(`${url}/transactions`).then(res => res.json()),
      fetch(`${url}/categories`).then(res => res.json()),
    ]);
    setBudgets(b);
    setTransactions(t);
    setCategories(c);
  };

  const addBudget = async (budget) => {
    await fetch(`${url}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget),
    });
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const getInsight = (budget, actual) => {
    const diff = actual - budget;
    return diff > 0 ? `Over by $${diff}` : `Under by $${Math.abs(diff)}`;
  };

  const actuals = transactions.reduce((acc, t) => {
    const cat = t.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + t.amount;
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <Container>
        <h2 className="my-4 text-center">Budget Planner</h2>
        <Row>
          <Col md={6}>
            <BudgetForm categories={categories} onAddBudget={addBudget} />
          </Col>
          <Col md={6}>
            <BudgetChart budgets={budgets} transactions={transactions} />
          </Col>
        </Row>

        <h4 className="mt-4">Spending Insights</h4>
        <Row>
          {budgets.map(b => (
            <Col md={4} key={b._id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{b.category}</Card.Title>
                  <Card.Text>
                    Budget: ${b.amount} <br />
                    Spent: ${actuals[b.category] || 0} <br />
                    {getInsight(b.amount, actuals[b.category] || 0)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Budgets;
