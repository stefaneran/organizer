export default async (
  document: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
): Promise<FirebaseFirestore.DocumentData | undefined> => {
  const userDocument = await document.get();
  const user = userDocument.data();
  return user;
}