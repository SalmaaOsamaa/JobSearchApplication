import React from 'react'
import styles from './Button.module.scss'
function Button({key,children,onClick}) {
  return (
    <div key = { key} className={styles.button} onClick={onClick}>{children}</div>
  )
}

export default Button