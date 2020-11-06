const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export default async ({ url, ...options }) => {
  const response = await fetch(url, {
    headers,
    ...options
  });
  const responseData = response.status === 204 ? {} : await response.json();
  return {
    data: responseData,
    status: response.status
  };
}