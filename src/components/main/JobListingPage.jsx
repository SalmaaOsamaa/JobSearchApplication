import React, { useState,useEffect } from 'react'
import JobCard from './JobCard'
import styles from './JobListingPage.module.scss'
import SearchBox from '../ui/SearchBox';
import { useFetch } from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import Spinner from '../ui/Spinner';
import ErrorLayout from '../layouts/ErrorLayout';


function JobListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const defaultApiUrl = 'https://skills-api-zeta.vercel.app/jobs?cursor=0&limit=12';
  const generateApiUrl = (searchQuery) => {
    return searchQuery
      ? `https://skills-api-zeta.vercel.app/jobs/search?query=${searchQuery}`
      : defaultApiUrl;
  };
  const debouncedValue = useDebounce(searchQuery,500)
  const { data, isLoading, error } = useFetch(generateApiUrl(debouncedValue));
 


  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Calculate the scroll position.
  //     const scrollY = window.scrollY || window.pageYOffset;

  //     // Calculate the height of the entire page, including the scrollable area.
  //     const pageHeight = document.documentElement.scrollHeight;

  //     // Calculate the height of the viewport (the visible part of the page).
  //     const windowHeight = window.innerHeight;

  //     // Calculate how much the user has scrolled from the top of the page.
  //     const scrollPercentage = (scrollY / (pageHeight - windowHeight)) * 100;

  //     // Define a threshold value (e.g., 95%) to determine when the user has reached the bottom.
  //     const threshold = 95;

  //     if (scrollPercentage >= threshold) {
      
  //       console.log('User reached the bottom of the page!');
  //     }
  //   };

  //   // Add the scroll event listener when the component mounts.
  //   window.addEventListener('scroll', handleScroll);

  //   // Remove the event listener when the component unmounts to avoid memory leaks.
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [])



  if (isLoading) {
    return <Spinner/>;
  }

  if (error) {
    return <ErrorLayout error={error} />;
  }

 

  return (
    <div  >
      <div className={styles.search} >
        <SearchBox
        searchInput={debouncedValue}
        onSearch={(e)=> {
          setSearchQuery(e)
    }}
        />
      </div>
      <div className={styles.jobsContainer} o  style={{overflowY: 'scroll'}}>
        {data.data.jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

    </div>

  )
}

export default JobListingPage