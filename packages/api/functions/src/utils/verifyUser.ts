export default (user: FirebaseFirestore.DocumentData | undefined, password: string) => {
  if (user && user.password !== password) {
    throw new Error("Error: Wrong password");
  }
}