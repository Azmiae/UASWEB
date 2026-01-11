const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/rolemiddleware');
const userController = require('../controllers/userControllers');

router.get(
  '/profile',
  authMiddleware,
  authorizeRole("staff", "admin"),
  userController.getProfile,
);

router.get(
    '/',
    authMiddleware,
    authorizeRole('admin'),
    userController.getAllUsers
)

router.put(
    '/profile',
    authMiddleware,
    userController.updateProfile
);

router.put(
    '/profile/password',
    authMiddleware,
    userController.gantipassword
);
module.exports = router;
