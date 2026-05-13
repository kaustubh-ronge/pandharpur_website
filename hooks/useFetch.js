
// In hooks/useFetch.js

'use client';

import { useState, useCallback } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(...args);
      
      if (response && response.success === false) {
          toast.error(response.error || "An unknown server error occurred.");
          setError({ message: response.error });
      } else {
          setData(response);
          setError(null);
      }
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setError({ message: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [cb]);

  return { data, loading, error, fn, setData };
};

export default useFetch;