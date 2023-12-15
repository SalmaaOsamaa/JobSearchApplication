import React from 'react'
import search from '../../assets/images/searchh.svg'
import styles from './NoData.module.scss'
function NoDataLayout() {
  return (
    <div className={styles.container}>
        <img src={search} alt='search image'/>
        <strong>No data to display</strong>
    </div>
  )
}

export default NoDataLayout