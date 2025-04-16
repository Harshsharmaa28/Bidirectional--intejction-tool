import React, { useState } from 'react';
import axios from 'axios';
import ConnectionForm from './components/ConnectionForm';

function App() {
  const [conn, setConn] = useState({ host: '', port: '', database: '', username: '', jwt: '' });
  const [table, setTable] = useState('');
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const connect = async () => {
    await axios.post('http://localhost:4000/api/connect', conn);
    const res = await axios.get('http://localhost:4000/api/tables');
    setTables(res.data);
  };

  const loadSchema = async () => {
    const res = await axios.post('http://localhost:4000/api/schema', { table });
    setColumns(res.data);
  };

  const handleExport = async () => {
    await axios.post('http://localhost:4000/api/export', { table, columns: selectedColumns });
    setMessage('Export completed.');
  };

  const handleImport = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('table', table);
    formData.append('columns', selectedColumns);
    const res = await axios.post('http://localhost:4000/api/import', formData);
    setMessage(`Import completed. Records inserted: ${res.data.count}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ClickHouse ↔ CSV Ingestion Tool</h1>
      <ConnectionForm conn={conn} setConn={setConn} connect={connect} />

      <h2>Table</h2>
      <select onChange={e => setTable(e.target.value)}>
        <option>-- Select table --</option>
        {tables.map(t => <option key={t}>{t}</option>)}
      </select>
      <button onClick={loadSchema}>Load Columns</button>

      <h3>Select Columns</h3>
      {columns.map(col => (
        <label key={col}>
          <input
            type="checkbox"
            value={col}
            onChange={e =>
              setSelectedColumns(prev =>
                e.target.checked ? [...prev, col] : prev.filter(c => c !== col)
              )
            }
          />
          {col}
        </label>
      ))}

      <h2>Export to CSV</h2>
      <button onClick={handleExport}>Export</button>

      <h2>Import CSV</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleImport}>Import</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
