import React from 'react'
import styles from './Card.module.scss'

function Card({  id, type,importance,level,children,onClick }) {
    return (
  
     <div key={id} className={styles.card} onClick={onClick}>
      <div className={styles.cardcontent}>
      </div>
      
      {children}
   
    <div className={styles.tags}>
         {type && <>
          <p> <strong>Type:</strong> <span>{type}</span></p> 
         </>}
        {importance && <>
          <p><strong>Importance:</strong> <span>{importance}</span></p>  
        </>}
        {level && <>
          <p><strong>Level:</strong><span>{level}</span></p> 
        </>} 
      </div>
      </div>
   
   
      );
}

export default Card