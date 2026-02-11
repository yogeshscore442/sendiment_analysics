import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// CONFIG: Change this URL after you deploy your backend to Render

  // --- App.jsx ---

import React, { useState, useEffect } from 'react';
// ... other imports ...

// UPDATE THIS LINE HERE:
const API_BASE = "https://sentiment-analyzer-api-ogve.onrender.com"; 

// The rest of your code remains the same...
export default function App() {
  // ...
}
export default function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/analyze`, { url });
      setResult(res.data);
    } catch (err) {
      alert("Analysis failed!");
    }
  };

  const chartData = result ? {
    labels: ['Good', 'Moderate', 'Bad'],
    datasets: [{
      data: [result.distribution.good, result.distribution.moderate, result.distribution.bad],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
    }]
  } : null;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Sentiment AI Dashboard</h1>
      <input 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        placeholder="Paste product URL..." 
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleAnalyze} style={{ padding: '10px 20px', marginLeft: '10px' }}>Analyze</button>

      {result && (
        <div style={{ display: 'flex', gap: '50px', marginTop: '40px' }}>
          <div style={{ width: '300px' }}>
            <h3>Review Share (Pie)</h3>
            <Pie data={chartData} />
          </div>
          <div style={{ width: '400px' }}>
            <h3>Comparison (Bar)</h3>
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}