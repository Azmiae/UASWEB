const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/rolemiddleware');
const productController = require('../controllers/productController');

// ADMIN ONLY
router.post(
  '/',
  authMiddleware,
  authorizeRole('admin'),
  productController.tambahProduk
);

router.put(
  '/:id',
  authMiddleware,
  authorizeRole('admin'),
  productController.updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  authorizeRole('admin'),
  productController.deleteProduct
);

// ALL ROLES
router.get(
  '/',
  authMiddleware,
  productController.getProducts
);

module.exports = router;