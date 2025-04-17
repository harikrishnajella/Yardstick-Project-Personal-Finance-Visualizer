import React from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';

const SummaryCards = ({ transactions = [] }) => {
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);
  const recent = transactions.slice(-5).reverse();

  return (
    <div className="my-4 p-4">
      <Row className="g-4">
        {/* Total Expenses Card */}
        <Col md={6}>
          <Card bg="light" text="dark" className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <Card.Text as="h4">${total.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Transactions Card */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Recent Transactions</Card.Title>
              <ListGroup variant="flush">
                {recent.length > 0 ? (
                  recent.map((t) => (
                    <ListGroup.Item key={t._id}>
                      <strong>{t.description}</strong> — ${t.amount}
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No recent transactions</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryCards;

