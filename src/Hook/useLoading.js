import { useState, useEffect } from 'react';

// Custom hook để quản lý loading state
export const usePageLoading = (initialLoading = true, minLoadingTime = 2000) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    let startTime = Date.now();
    let progressInterval;

    // Simulate loading progress
    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / minLoadingTime) * 100, 100);
      
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(progressInterval);
        // Add small delay before hiding loading
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }, 50);

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isLoading, minLoadingTime]);

  const startLoading = () => {
    setProgress(0);
    setIsLoading(true);
  };

  const finishLoading = () => {
    setProgress(100);
    setTimeout(() => setIsLoading(false), 300);
  };

  return {
    isLoading,
    progress,
    startLoading,
    finishLoading
  };
};

// Hook để simulate API loading
export const useApiLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const simulateApiCall = async (duration = 2000) => {
    setIsLoading(true);
    setError(null);
    console.log('Lỗi ')

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 90% success rate
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error('Lỗi kết nối mạng'));
          }
        }, duration);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    simulateApiCall
  };
};
