const parseGetParams = (url: string): Record<string, string> => {
  const urlSplit = url.split('?');
  if (urlSplit.length < 2) {
    return {};
  }
  const params = {};
  const paramsSplit = urlSplit[1]?.split('&');
  console.log(paramsSplit)
  for (const param of paramsSplit) {
    if (param.includes('=')) {
      if (param.match(/=/g).length >= 2) {
        continue;
      }
      const [key, value] = param.split('=');
      params[key] = value;
    }
  }
  return params;
}

export default parseGetParams;