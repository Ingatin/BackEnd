const admin = require('firebase-admin');
const db = admin.firestore();

// Buat task baru
const createTask = async (req, res) => {
  const { category, dueDate, taskId, title, userId } = req.body;

  if (!category || !dueDate || !taskId || !title || !userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const taskRef = await db.collection('task').add({
    category,
    dueDate,
    taskId,
    title,
    userId,
  });

  res.status(201).json({ message: 'Task created successfully', id: taskRef.id });
};

// Ambil semua task berdasarkan userId
const getAllTask = async (req, res) => {
  const { userId } = req.params;

  const snapshot = await db.collection('task').where('userId', '==', userId).get();

  if (snapshot.empty) {
    return res.status(200).json({ tasks: [] });
  }

  const tasks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  res.status(200).json({ tasks });
};

// Ambil task berdasarkan taskId
const getTaskById = async (req, res) => {
  const { taskId } = req.params;

  const taskDoc = await db.collection('task').doc(taskId).get();

  if (!taskDoc.exists) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(200).json({ id: taskDoc.id, ...taskDoc.data() });
};

// Update task berdasarkan taskId
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  const taskRef = db.collection('task').doc(taskId);
  const taskDoc = await taskRef.get();

  if (!taskDoc.exists) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await taskRef.update({
    ...updates,
    updatedAt: new Date().toISOString()
  });

  res.status(200).json({ message: 'Task updated successfully' });
};

// Hapus task berdasarkan taskId
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  const taskRef = db.collection('task').doc(taskId);
  const taskDoc = await taskRef.get();

  if (!taskDoc.exists) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await taskRef.delete();
  res.status(200).json({ message: 'Task deleted successfully' });
};

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask
};
