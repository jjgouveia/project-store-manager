const express = require('express');

const router = express.Router();

router.post('/', (_req, res) => {
  res.status(201).end();
});

module.exports = router;