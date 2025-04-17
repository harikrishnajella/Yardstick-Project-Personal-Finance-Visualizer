import React, { useEffect, useState } from 'react';
import SummaryCards from '../components/SummaryCards';
import MonthlyBarChart from '../components/MonthlyBarChart';
import CategoryPieChart from '../components/CategoryPieChart';

import Navbar from './Navbar'

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  let url = "https://personal-finance-visualizer-backend.onrender.com/api"

  useEffect(() => {
    fetch(`${url}/transactions`)
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  return (
    <>
       <Navbar />
    <div>
      <h2 className="mt-4 text-center">Dashboard</h2>
      <SummaryCards transactions={transactions} />
      <MonthlyBarChart transactions={transactions} />
      <CategoryPieChart transactions={transactions} />
    </div>
  </>
  );
};

export default Dashboard;
