import { useEffect, useState } from 'react';
import next from 'next';

export function useData(url: string, tags: string[]) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (url) {
      let ignore = false;
      setLoading(true);
      fetch(url, {
        next: { revalidate: 5 * 60, tags: tags },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        })
        .catch((err) => {
          setError(err);
        });
      return () => {
        ignore = true;
        setLoading(false);
      };
    }
  }, [url, tags]);
  return { data, error, loading };
}
