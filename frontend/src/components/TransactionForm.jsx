import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import {toast} from 'react-toastify';

const TransactionForm = ({ transactionDetails, fetchTransactions, close }) => {
  const [userTransaction, setUserTransaction] = useState({
          amount: transactionDetails ? transactionDetails.amount : "",
          description: transactionDetails ? transactionDetails.description : "",
          date: transactionDetails ? new Date(transactionDetails.date).toISOString().slice(0, 10) : "",
          category: transactionDetails ? transactionDetails.category : "",
    });
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(true)


  let url = "https://personal-finance-visualizer-backend.onrender.com/api"

  const fetchData = async () => {    
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(`${url}/categories`, options)
    const data = await response.json()
    setCategories(data)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleChange = (e) => {
    setUserTransaction({ ...userTransaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (transactionDetails) {
        let res = await axios.put(`${url}/transactions/${transactionDetails._id}`, userTransaction);
        if (res){
          toast.success(res.data.message)
          fetchTransactions()
          close(); 
        }
      } else {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userTransaction)
        }

        const response = await fetch(`${url}/transactions`, options)
        const data = await response.json()

        if (response.ok) {
            setShowForm(false)
            toast.success(data.message)
            fetchTransactions()
            close(); 
        } else {
          toast.error(data.error)
          console.log(data.error)
        }
      }
    } catch (err) {
      toast.error("Error saving transaction:", err)
      console.error("Error saving transaction:", err);
    }
  };

  return (
    <>
    {showForm &&
    <div style={{ padding: '15px' }}>
        <h2>{transactionDetails ? "Edit Transaction" : "Add Transaction"}</h2>
        <hr/>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={userTransaction.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={userTransaction.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(each => 
                <option key={each._id} value={each.name}>{each.name}</option>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={userTransaction.amount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={userTransaction.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          
          <div>
             <Button variant="success" className="me-3" type='submit'>{transactionDetails ? 'Update' : 'Save'}</Button>
             <Button variant="primary" className="me-3" onClick={() => setShowForm(false)}>Close</Button>
             </div>
        </Form>
    </div> 
     }
    </>
  );
};

export default TransactionForm;