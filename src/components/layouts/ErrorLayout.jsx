
import React from 'react';
import gif from '../../assets/images/giphy.gif'
import styles from './Error.module.scss'
function ErrorLayout({error}) {
 
  return (
   <div className={styles.container}>
   <img src={gif} alt='error gif'/>
    <strong>{error.message}</strong>
   </div>
  )
}

export default ErrorLayout
