import React, { useEffect, useState } from 'react'
import {Container, Table, Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import {toast} from 'react-toastify';

import Navbar from './Navbar'
import TransactionForm from '../components/TransactionForm';

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  let url = "https://personal-finance-visualizer-backend.onrender.com/api"
  
  // fetching data
    const fetchData = async () => {
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(`${url}/transactions`, options)
        const data = await response.json()
        setTransactions(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

  // delete specific transaction by id
 const deleteTransaction = async id => {
    if (window.confirm("Are you sure you want to delete the transaction ?")) {
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(`${url}/transactions/${id}`, options)
    const data = await response.json()
    toast.success(data.message)
    fetchData()
    } 
  }

    // fecthing transactions on updating
    const fetchTransactions = () => {
        fetchData()
    }  


  return (
    <div>
      <Navbar />
      <Container>
      <h2 className="mt-4 text-center" >Transactions Page</h2>
      <Popup modal trigger={<Button variant="primary" className="mb-3">Add Transaction</Button>}>
        {(close) => (
            <TransactionForm fetchTransactions={fetchTransactions} close={close} />
        )}
        </Popup>

        
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(eachItem => (
              <tr key={eachItem._id}>
              <td>{new Date(eachItem.date).toLocaleDateString()}</td>
              <td>{eachItem.category}</td>
              <td>{eachItem.amount}</td>
              <td>{eachItem.description}</td>
              <td>
                <Popup modal trigger={<Button variant="warning" className="me-2 mb-2">Edit</Button>}>
                {(close) => (
                    <TransactionForm transactionDetails={eachItem} fetchTransactions={fetchTransactions} close={close} />
                )}
                </Popup>
                
                  <Button variant="danger" className="me-2 mb-2" onClick={() => deleteTransaction(eachItem._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </Container>
      {transactions.length === 0 &&
          <h1 className='m-5 text-center'>Your transaction list is empty...</h1>
        }
    </div>
  )
}

export default Transactions