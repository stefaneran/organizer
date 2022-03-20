export default async (firestore, userName): Promise<FirebaseFirestore.DocumentData | undefined> => {
  const userDocument = await firestore.collection('users').doc(userName).get()
  return userDocument.data();
}