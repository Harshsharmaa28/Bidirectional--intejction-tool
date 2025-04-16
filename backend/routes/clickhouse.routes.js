const express = require('express');
const router = express.Router();
const controller = require('../controllers/clickhouse.controller');

router.post('/connect', controller.connectClickhouse);
router.get('/tables', controller.listTables);
router.post('/schema', controller.getSchema);
router.post('/export', controller.exportToCSV);

module.exports = router;
