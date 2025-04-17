//src/components/Navbar.js

import React from "react";
import '../styles/Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className='navbar-container'>
            <h4>Personal Finance Visualizer</h4>

            <div>
              <Link to='/'><button className="button">Home</button></Link>
              <Link to='/dashboard'><button className="button">Dashboard</button></Link>
              <Link to='/transactions'><button className="button">Transactions</button></Link>
              <Link to='/budgets'><button className="button">Budgets</button></Link>
            </div>
        </div>
  );
};

export default Navbar;