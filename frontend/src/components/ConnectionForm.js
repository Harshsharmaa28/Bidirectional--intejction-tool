import React from 'react';

export default function ConnectionForm({ conn, setConn, connect }) {
  return (
    <div>
      <h2>ClickHouse Connection</h2>
      {['host', 'port', 'database', 'username', 'jwt'].map(field => (
        <input
          key={field}
          placeholder={field}
          value={conn[field]}
          onChange={e => setConn({ ...conn, [field]: e.target.value })}
        />
      ))}
      <button onClick={connect}>Connect</button>
    </div>
  );
}
