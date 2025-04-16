const clickhouseService = require('../services/clickhouse.service');

exports.connectClickhouse = clickhouseService.connect;
exports.listTables = clickhouseService.listTables;
exports.getSchema = clickhouseService.getSchema;
exports.exportToCSV = clickhouseService.exportData;
