
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApiStatusProps {
  apiUrl: string;
}

const ApiStatus = ({ apiUrl }: ApiStatusProps) => {
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/health`);
      if (response.ok) {
        setStatus("online");
      } else {
        setStatus("offline");
      }
    } catch (error) {
      console.error("API health check failed:", error);
      setStatus("offline");
    }
    
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkApiStatus();
    
    // Check API status every 30 seconds
    const interval = setInterval(checkApiStatus, 30000);
    
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          API Status 
          <span 
            className={`inline-block h-3 w-3 rounded-full ${
              status === "online" 
                ? "bg-green-500" 
                : status === "offline" 
                  ? "bg-red-500" 
                  : "bg-yellow-500"
            }`}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm">
            Status: 
            <span 
              className={
                status === "online" 
                  ? "text-green-500 ml-2 font-medium" 
                  : status === "offline" 
                    ? "text-red-500 ml-2 font-medium" 
                    : "text-yellow-500 ml-2 font-medium"
              }
            >
              {status === "online" 
                ? "Online" 
                : status === "offline" 
                  ? "Offline" 
                  : "Checking..."}
            </span>
          </p>
          <button 
            onClick={checkApiStatus} 
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Refresh
          </button>
        </div>
        {lastChecked && (
          <p className="text-xs text-gray-500 mt-2">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiStatus;
