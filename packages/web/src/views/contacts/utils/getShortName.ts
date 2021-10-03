const getShortName = (fullName: string): string => {
  const nameSplit = fullName?.split(' ') ?? [];
  let name = fullName || '';
  if (nameSplit.length > 1) {
    const firstName = nameSplit[0];
    const surnameInitial = nameSplit[nameSplit.length - 1].charAt(0).toUpperCase();
    name = `${firstName} ${surnameInitial}.`;
  }
  return name;
}

export default getShortName;