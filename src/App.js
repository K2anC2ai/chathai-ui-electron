import React, { useState } from 'react';

function App() {
  const [excelPath, setExcelPath] = useState('');
  const [outputDir, setOutputDir] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateTests = async () => {
    if (!excelPath || !outputDir) {
      setMessage('Please provide both Excel path and output directory.');
      return;
    }

    const result = await window.chathaiAPI.generateTests(excelPath, outputDir);
    setMessage(result.message);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Chathai Test Generator</h1>
      <input
        type="text"
        placeholder="Excel File Path"
        value={excelPath}
        onChange={(e) => setExcelPath(e.target.value)}
        className="mb-2 p-2 border rounded w-1/2"
      />
      <input
        type="text"
        placeholder="Output Directory"
        value={outputDir}
        onChange={(e) => setOutputDir(e.target.value)}
        className="mb-2 p-2 border rounded w-1/2"
      />
      <button
        onClick={handleGenerateTests}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Tests
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}

export default App;