import React from 'react'
import styles from './SearchBox.module.scss'
function SearchBox({onSearch,searchInput}) {
    return (
      <div className={styles.searchContainer}>
          <input
              className={styles.searchInput}
              type='text'
          placeholder='Search'
          onChange={(e) => onSearch(e.target.value)}
          value={searchInput}
          />
      </div>
    )
  }
  
  


export default SearchBox

