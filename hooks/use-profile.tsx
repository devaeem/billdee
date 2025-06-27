"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";

export function useProfile() {
  // Client-only flag to prevent server-side rendering issues
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, error, mutate } = useSWR(
    isClient ? "/auth/profile" : null,
    {
      // Don't consider 401 as an error - it's an expected state
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        // Don't retry on 401 (unauthorized) errorsType error: 'key' is declared but its value is never read.
        if (error.status === 401) return;

        // Only retry up to 3 times for other errors
        if (retryCount >= 3) return;

        // Exponential backoff
        setTimeout(
          () => revalidate({ retryCount }),
          5000 * Math.pow(2, retryCount)
        );
      },
      // Provide a fallback for unauthenticated state
      fallbackData: { data: null, isAuthenticated: false },
    }
  );
  console.log(data, "profile-data");

  // For unauthenticated users, provide a standardized response
  const result = {
    data: data?.data || null,
    isAuthenticated: data?.isAuthenticated !== false, // explicitly check for false
    isLoading: !isClient || isLoading,
    error,
    mutate,
  };

  return result;
}
