const express = require('express');
const router = express.Router();

const authorizeRole = require('../middleware/rolemiddleware');
const transaksiController = require('../controllers/transaksiController');
const authmiddleware = require('../middleware/authmiddleware');

router.post(
  '/masuk',
  authmiddleware,
  authorizeRole('staff', 'admin'),
  transaksiController.masuk
);

router.post(
    '/keluar',
    authmiddleware,
    authorizeRole('staff', 'admin'),
    transaksiController.keluar 
);

router.get(
    '/',
    authmiddleware,
    authorizeRole('staff','admin'),
    transaksiController.getTransactions
);

router.delete(
    '/delete/:id',
    authmiddleware,
    authorizeRole('admin'),
    transaksiController.deleteTransaksi
)
module.exports = router;