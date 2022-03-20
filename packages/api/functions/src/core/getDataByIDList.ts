import * as admin from 'firebase-admin';

async function getDataByIDList(
  firestore: FirebaseFirestore.Firestore, 
  userName: string,
  collection: string
) {
  // Get user document
  const userCollectionRef = firestore.collection("users");
  const userDocument = await userCollectionRef.doc(userName).get();
  const userData = userDocument.data();

  // List of all IDs in the collection that the user posseses
  const itemsIdsList = userData[collection];
  if (!itemsIdsList) {
    return {};
  }
  
  const itemsCollectionRef = firestore.collection(collection);
  const byDocumentId = admin.firestore.FieldPath.documentId()
  const items = {}

  // Query the collection for all matching items by ID
  for (let i = 0; i < itemsIdsList.length; i++) {
    const query = itemsCollectionRef.where(byDocumentId, '==', itemsIdsList[i]);
    const result = await query.get();
    const document = result.docs[0];
    const itemData = document.data();
    items[document.id] = itemData;
  }
  return items;
}

export default getDataByIDList;