import { useState, useEffect } from "react";

export const useDashboardData = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace with actual API call
      // const response = await api.get('/dashboard');
      // setMessage(response.data.message);

      setMessage("Hello, World! Welcome to the Dashboard.");

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    message,
    isLoading,
  };
};
