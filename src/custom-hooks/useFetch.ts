import { useState, useEffect } from "react";

function useFetch<T>(url: string | null) {
  // 1️ Define state inside the hook
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    // 2️ Fetch logic
  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

    // Return state variables
    return{
        data,
        loading,
        error
    };
};

export default useFetch;