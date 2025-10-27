'use client';

import { useState } from 'react';

export default function CounterButton() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="text-6xl font-bold text-blue-600 mb-2">
          {count}
        </div>
        <p className="text-gray-600">
          Current count value
        </p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={decrement}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          - Decrease
        </button>
        
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          Reset
        </button>
        
        <button
          onClick={increment}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          + Increase
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This component uses <code className="bg-blue-100 px-1 rounded">'use client'</code> directive 
          and <code className="bg-blue-100 px-1 rounded">useState</code> hook, making it a Client Component that runs in the browser.
        </p>
      </div>
    </div>
  );
}
