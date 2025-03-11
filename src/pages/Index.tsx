
import React from "react";
import MessageForm from "@/components/MessageForm";
import ApiStatus from "@/components/ApiStatus";

// In a production app, these would come from environment variables
const API_URL = "http://localhost:5000";
const API_KEY = "umaapikeyqueseraenviada";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Text Message Sender</h1>
          <p className="text-gray-600">Send text messages via API</p>
        </header>
        
        <div className="flex flex-col items-center gap-8">
          <MessageForm apiKey={API_KEY} apiUrl={API_URL} />
          <ApiStatus apiUrl={API_URL} />
        </div>
        
        <div className="mt-12 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">API Documentation</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">Health Check</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              GET {API_URL}/v1/health
            </pre>
            
            <h3 className="text-lg font-medium mt-6 mb-2">Send Text Message</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`curl --location '${API_URL}/v1/message/sendText' \\
--header 'Content-Type: application/json' \\
--header 'apikey: ${API_KEY}' \\
--data '{
    "number": "5585998728964",
    "text": "teste de envio"
}'`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
