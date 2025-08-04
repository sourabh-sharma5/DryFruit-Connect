const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');


initializeApp({ credential: applicationDefault() });
const db = getFirestore();

const app = express();


app.use(cors({ origin: true }));
app.use(express.json());

app.post('/orders/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    const orderData = req.body;
    if (!userId || !orderData) return res.status(400).json({ error: 'Missing user id or order data' });

    
    const docRef = await db
      .collection('users')
      .doc(userId)
      .collection('orders')
      .add({
        ...orderData,
        createdAt: new Date(),
        status: "pending",
      });

    res.json({ orderId: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/orders/user/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    const snapshot = await db.collection('users').doc(userId).collection('orders').get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/cart/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    const { cartItems } = req.body;
    await db.collection('carts').doc(userId).set({ cartItems: cartItems || [] });
    res.json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/cart/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    const docSnap = await db.collection('carts').doc(userId).get();
    res.json({ cartItems: docSnap.exists ? docSnap.data().cartItems : [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


exports.api = functions.https.onRequest(app);
