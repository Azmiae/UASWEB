const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/rolemiddleware');
const transaksiController = require('../controllers/transaksiController');
const authmiddleware = require('../middleware/authmiddleware');

router.post(
  '/masuk',
  authmiddleware,
  authorizeRole('staff', 'admin'),
  transaksiController.masuk
);

module.exports = router;

router.post(
    '/keluar',
    authmiddleware,
    authorizeRole('staff', 'admin'),
    transaksiController.keluar 
);