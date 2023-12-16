import React,{useState,useEffect} from 'react'
import styles from './SearchBox.module.scss'
function SearchBox({onSearch,searchInput}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions,setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [query, setQuery] = useState('')

  useEffect(() => {
    setShowSuggestions(true)
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }
    fetch(`https://skills-api-zeta.vercel.app/jobs/search?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const jobTitles = data.data.jobs.map((job) => job.attributes.title);
        setSuggestions(jobTitles);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [query]);
  const handleSearch = (q) => {
    setQuery(q)

  };

  const handleClick = (title) => {
    onSearch(title.toLowerCase());
    setQuery(title)
    setSelectedSuggestion(title.toLowerCase())
    setShowSuggestions(false)
  };
 
    return (
      <div className={styles.searchContainer}>
       <div className={styles.searchWrapper}>
       <input
              className={styles.searchInput}
              type='text'
          placeholder='Search'
          onChange={(e) => handleSearch(e.target.value)} 
          value={query}
          />
          {showSuggestions &&   <div className={styles.suggestionsbox}>
    {suggestions.map((title, index) => (
      <div key={index}  className={`${styles['suggestionitem']} ${selectedSuggestion === title ? styles['selected'] : ''}`}
      onClick={() => handleClick(title)}>
        {title}
      </div>
    ))}
  </div>}
       </div>
      </div>
    )
  }
  
  


export default SearchBox

