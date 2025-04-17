import React from 'react'
import '../styles/Home.css';

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='home-container'>
        <h1>Personal Finance Visualizer</h1>
        <h3 className='m-2'>A simple web application for tracking personal finances.</h3>
        <div className='d-flex flex-row'>
        <Link to='/dashboard' className='me-3 m-5'><h4>Dashboard</h4></Link>
        <Link to='/transactions' className='me-3 m-5'><h4>Transactions</h4></Link>
        <Link to='/budgets' className='me-3 m-5'><h4>Budgets</h4></Link>
        </div>
    </div>
  )
}

export default Home


