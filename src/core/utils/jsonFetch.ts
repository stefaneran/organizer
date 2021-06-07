const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export default async ({ url, ...options }) => {
  const response = await fetch(url, {
    headers,
    ...options
  });
  let responseData = {};
  try {
    responseData = response.status === 204 ? {} : await response.json();
  } catch (e) {
    return {
      data: responseData,
      status: response.status
    };
  }
  return {
    data: responseData,
    status: response.status
  };
}