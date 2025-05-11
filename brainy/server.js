const express = require('express');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

// Inisialisasi Firebase Admin
const serviceAccount = require('./serviceAccountKeys.json');

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

app.post('/user', async (req, res) => {
  try {
    const { email, password, userId, userName } = req.body;

    const docRef = await db.collection('user').add({
      email,
      password,
      userId,
      userName
    });

    return res.status(201).json({ message: 'User added', id: docRef.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
