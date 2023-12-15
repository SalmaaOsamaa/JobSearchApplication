import React from 'react'
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
function Header() {
  
  return (
    <header className={styles.header}>
       <div className={styles.logo}>
       <h6>JobsNow</h6>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
        <li><Link to="/jobs">Home</Link></li>
          <li><Link to="/jobs/search">Search</Link></li>
          <li><Link to="/services">History</Link></li>
        </ul>
      </nav>
   
       
      </header>
  )
}

export default Header