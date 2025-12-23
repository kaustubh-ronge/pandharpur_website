
// In hooks/useFetch.js

'use client';

import { useState, useCallback } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = useCallback(async (...args) => {
    console.log(`[useFetch BROWSER LOG] Starting server action: ${cb.name}`);
    setLoading(true);
    setError(null);
    try {
      const response = await cb(...args);
      
      if (response && response.success === false) {
          toast.error(response.error || "An unknown server error occurred.");
          setError({ message: response.error });
      } else {
          console.log(`[useFetch BROWSER LOG] Server action ${cb.name} succeeded with response:`, response);
          setData(response);
          setError(null);
      }
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error(`[useFetch BROWSER LOG] CRITICAL ERROR caught from ${cb.name}:`, error);
      setError({ message: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
      console.log(`[useFetch BROWSER LOG] Finished server action: ${cb.name}`);
    }
  }, [cb]);

  return { data, loading, error, fn, setData };
};

export default useFetch;