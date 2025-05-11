const express = require('express');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

// Inisialisasi Firebase Admin
const serviceAccount = require('D:/nodejs/serviceAccountKeys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Middleware
app.use(express.json());

// Contoh route GET
app.get('/', (req, res) => {
  res.send('Server berjalan dengan Firestore');
});

// Contoh route POST untuk menambah data

app.post('/task', async (req, res) => {
  try {
    const { category, dueDate, taskId, title, userId } = req.body;

    const taskRef = await db.collection('task').add({
      category,
      dueDate,
      taskId,
      title,
      userId
    });

    return res.status(201).json({ message: 'task added', id: taskRef.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
}
});


// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
