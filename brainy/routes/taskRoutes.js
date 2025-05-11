const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { 
  createTask,
  getAllTask,
  getTaskById,
  deleteTask,
  updateTask
} = require('../controllers/taskController');

const protectRoute = require('../middleware/authMiddleware');

// Buat task baru
router.post('/', protectRoute, asyncHandler(createTask));

// Ambil semua task milik user
router.get('/user/:userId', protectRoute, asyncHandler(getAllTask));

// Ambil task berdasarkan ID
router.get('/:taskId', protectRoute, asyncHandler(getTaskById));

// Perbarui task
router.put('/:taskId', protectRoute, asyncHandler(updateTask));

// Hapus task
router.delete('/:taskId', protectRoute, asyncHandler(deleteTask));

module.exports = router;
