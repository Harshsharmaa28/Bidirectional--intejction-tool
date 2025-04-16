const express = require('express');
const cors = require('cors');
const multer = require('multer');
const clickhouseRoutes = require('./routes/clickhouse.routes');
const fileRoutes = require('./routes/file.routes');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
app.use('/api', clickhouseRoutes);
app.use('/api', fileRoutes(upload));

app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
