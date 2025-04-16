const fs = require('fs');
const csvParser = require('csv-parser');
const { ClickHouse } = require('clickhouse');

let clickhouse = null;

exports.importCSVToClickhouse = (req, res) => {
  const { table, columns } = req.body;
  const filePath = req.file.path;
  clickhouse = clickhouse || new ClickHouse({
    url: 'http://localhost:8123',
    basicAuth: { username: 'default', password: '' },
    format: 'json'
  });

  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      const selected = columns.reduce((acc, col) => {
        acc[col] = row[col];
        return acc;
      }, {});
      rows.push(selected);
    })
    .on('end', async () => {
      try {
        const insertQuery = `INSERT INTO ${table} (${columns.join(',')}) FORMAT JSONEachRow`;
        await clickhouse.insert(insertQuery, rows).toPromise();
        res.json({ success: true, count: rows.length });
      } catch {
        res.status(500).json({ error: 'Insert failed' });
      }
    });
};
