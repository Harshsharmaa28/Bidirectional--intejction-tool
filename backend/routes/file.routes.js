const express = require('express');
const controller = require('../controllers/file.controller');

module.exports = (upload) => {
  const router = express.Router();
  router.post('/import', upload.single('file'), controller.importCSV);
  return router;
};
