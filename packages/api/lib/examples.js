/*
import * as functions from 'firebase-functions';
import initialize from './initialize';

const { app, db } = initialize();

// Routes
app.get('/hello-world', (req, res) => {
  res.status(200).send('Hello World!')
})

// Create
app.post('/api/create', async (req, res) => {
  try {
    await db.collection('documents').doc('/' + req.body.id + '/')
    .create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });

    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

// Read
app.get('/api/read/:id', async (req, res) => {
  try {
    const document = db.collection('documents').doc(req.params.id)
    const userDocument = await document.get();
    const response = userDocument.data();
    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

// Read All
app.get('/api/read', async (req, res) => {
  try {
    const query = db.collection('documents');
    const response: any[] = [];
    await query.get().then(querySnapshot => {
      const docs = querySnapshot.docs;
      for (const doc of docs) {
        const selectedItem = {
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price
        }
        response.push(selectedItem);
      }
    });
    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

// Update
app.put('/api/update/:id', async (req, res) => {
  try {
    const document = db.collection('documents').doc(req.params.id);
    
    await document.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    })

    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

// Delete
app.delete('/api/delete/:id', async (req, res) => {
  try {
    const document = db.collection('documents').doc(req.params.id);
    
    await document.delete();

    return res.status(200).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export default functions.https.onRequest(app);
*/ 
//# sourceMappingURL=examples.js.map