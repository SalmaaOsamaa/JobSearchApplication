import React, { useEffect, useState } from 'react'
import styles from './SearchHistory.module.scss'
import SearchBox from '../ui/SearchBox'
import { useDebounce } from '../../hooks/useDebounce';
import JobCard from './JobCard';
import NoDataLayout from '../layouts/NoDataLayout';

const SEARCH_HISTORY_KEY = 'searchHistory';

function SearchHistoryPage() {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const[count,setCount] = useState(null)
  const debouncedValue = useDebounce(query, 2000)


  useEffect(() => {
    const cachedSearchHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (cachedSearchHistory) {
      setSearchHistory(JSON.parse(cachedSearchHistory));
    }
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (!debouncedValue) return
      try {
        const response = await fetch(`https://skills-api-zeta.vercel.app/jobs/search?query=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const {meta} = data.data
        setCount(meta.count)
        setJobs(data.data.jobs);
        console.log(jobs,"here is jobs");
        
        setSearchHistory((prevHistory) => {
          const newHistory = [...prevHistory, query];
          localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
          return newHistory;
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [debouncedValue]);

  return (
    <>
      <SearchBox onSearch={(e) => {
        setQuery(e)
      }} searchInput={query} />
      <div className={styles.container}>
      <div className={styles.wrapper}>
      {/* <h5>{query}({count})</h5> */}
      {!query ? (
        <NoDataLayout/>
      ): (
        <>
     <div className={styles.searchResult}>

<>
  {jobs.map((job) => (
    <JobCard key={job.id} job={job} />

  ))}
  </>

</div>
<div className={styles.searchHistory}>
<>
  <strong>Search History:</strong>
  <ul>
    {searchHistory.map((search, index) => (
      <li key={index}>{search}</li>
    ))}
  </ul>
</>
</div>
     </>
      )}
    
      </div>
      </div>
    </>

  )
}

export default SearchHistoryPage