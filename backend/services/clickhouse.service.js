const fs = require('fs');
const { ClickHouse } = require('clickhouse');

let clickhouse = null;

exports.connect = (req, res) => {
  const { host, port, database, username, jwt } = req.body;
  try {
    clickhouse = new ClickHouse({
      url: `${host}:${port}`,
      basicAuth: { username, password: jwt },
      isUseGzip: false,
      format: 'json',
      config: { session_timeout: 60 }
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Connection failed' });
  }
};

exports.listTables = async (_, res) => {
  try {
    const result = await clickhouse.query(`SHOW TABLES`).toPromise();
    res.json(result.data.map(t => t.name));
  } catch {
    res.status(500).json({ error: 'Table fetch failed' });
  }
};

exports.getSchema = async (req, res) => {
  const { table } = req.body;
  try {
    const result = await clickhouse.query(`DESCRIBE TABLE ${table}`).toPromise();
    res.json(result.data.map(r => r.name));
  } catch {
    res.status(500).json({ error: 'Schema fetch failed' });
  }
};

exports.exportData = async (req, res) => {
  const { table, columns } = req.body;
  try {
    const query = `SELECT ${columns.join(',')} FROM ${table}`;
    const stream = clickhouse.query(query).stream();
    const output = fs.createWriteStream(`exports/${table}.csv`);
    stream.pipe(output);
    stream.on('end', () => res.json({ success: true, file: `exports/${table}.csv` }));
  } catch {
    res.status(500).json({ error: 'Export failed' });
  }
};
