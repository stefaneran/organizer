export default (fullName: string) => {
  const nameSplit = fullName.split(' ');
  let name = fullName;
  if (nameSplit.length > 1) {
    const firstName = nameSplit[0];
    const surnameInitial = nameSplit[nameSplit.length - 1].charAt(0);
    name = `${firstName} ${surnameInitial}.`;
  }
  return name;
}