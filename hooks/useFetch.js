// // // hooks/useFetch.js
// // 'use client';

// // import { useState } from "react";
// // import { toast } from "sonner";

// // const useFetch = (cb) => {
// //   const [data, setData] = useState(undefined);
// //   const [loading, setLoading] = useState(null);
// //   const [error, setError] = useState(null);

// //   const fn = async (...args) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const response = await cb(...args);
// //       setData(response);
// //       setError(null);
// //       return response;
// //     } catch (error) {
// //       setError(error);
// //       toast.error(error.message);
// //       throw error;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return { data, loading, error, fn, setData };
// // };

// // export default useFetch;

// "use client";

// import { useState, useCallback } from "react"; // Import useCallback
// import { toast } from "sonner";

// const useFetch = (cb) => {
//   const [data, setData] = useState(undefined);
//   const [loading, setLoading] = useState(false); // Default to false
//   const [error, setError] = useState(null); // Wrap the 'fn' function in useCallback
//   // This ensures it has a stable reference across re-renders

//   const fn = useCallback(
//     async (...args) => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await cb(...args);
//         setData(response);
//         setError(null);
//         return response;
//       } catch (error) {
//         const errorMessage =
//           error instanceof Error ? error.message : "An unknown error occurred";
//         setError({ message: errorMessage });
//         toast.error(errorMessage);
//         throw error;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [cb]
//   ); // The dependency is the callback itself

//   return { data, loading, error, fn, setData };
// };

// export default useFetch;



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
      setData(response);
      setError(null);
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