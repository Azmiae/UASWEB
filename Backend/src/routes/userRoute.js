const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/rolemiddleware');
const userController = require('../controllers/userControllers');

router.get(
  '/profile',
  authMiddleware,
  authorizeRole('user', 'staff', 'admin'),
  userController.getProfile,
);

module.exports = router;
