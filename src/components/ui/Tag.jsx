import React from 'react'
import styles from './Tag.module.scss'
function Tag({key,children}) {
  return (
    <div className={styles.skills}>
  <span className={styles.skill} key = {key}>{children}</span>
  </div>
  )
}

export default Tag