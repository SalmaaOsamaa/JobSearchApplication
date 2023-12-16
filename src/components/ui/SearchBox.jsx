import React,{useState,useEffect} from 'react'
import styles from './SearchBox.module.scss'
function SearchBox({onSearch,searchInput}) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    if (searchInput.trim() === '') {
      setSuggestions([]);
      return;
    }
    fetch(`https://skills-api-zeta.vercel.app/jobs/search?query=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        const jobTitles = data.data.jobs.map((job) => job.attributes.title);
        setSuggestions(jobTitles);
  
        console.log(suggestions);
        // setSuggestions(data.data.jobs.map((item) => item.));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [searchInput]);
  const handleSearch = (query) => {
    onSearch(query);
    setSelectedSuggestion(null);
  };

  const handleClick = (title) => {
    setSelectedSuggestion(title);
    handleSearch(title.toLowerCase()); 
  };
 
    return (
      <div className={styles.searchContainer}>
       <div className={styles.searchWrapper}>
       <input
              className={styles.searchInput}
              type='text'
          placeholder='Search'
          onChange={(e) => handleSearch(e.target.value)}    
                value={searchInput}
          />
            <div className={styles.suggestionsbox}>
    {suggestions.map((title, index) => (
      <div key={index}  className={`${styles['suggestionitem']} ${selectedSuggestion === title ? styles['selected'] : ''}`}
      onClick={() => handleClick(title)}>
        {title}
      </div>
    ))}
  </div>
       </div>
      </div>
    )
  }
  
  


export default SearchBox

