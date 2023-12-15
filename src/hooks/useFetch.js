import { useState, useEffect } from 'react';

export function useFetch(apiUrl) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data.')
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false)
      } catch (err) {
        setError({message:err.message || ''});
        setIsLoading(false)
      }
    }
    fetchData()
  }, [apiUrl]);

  return { data, isLoading, error };
}
