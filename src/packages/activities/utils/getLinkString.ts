
const possiblePrefixes = [
  'https://www.',
  'http://www.',
  'https://',
  'http://'
];

const getLinkString = (link: string): string => {
  let linkString = link;
  for (const prefix of possiblePrefixes) {
    if (link.includes(prefix)) {
      linkString = linkString.replace(prefix, '');
      break;
    }
  }
  return linkString;
}

export default getLinkString;