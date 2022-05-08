import STATUS from '@core/constants/statusCodes'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const jsonFetch = async ({ url, ...options }) => {
  const response = await fetch(url, {
    headers,
    ...options
  });
  let responseData: any = {};
  try {
    responseData = response.status === STATUS.NO_CONTENT ? {} : await response.json();
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

export default jsonFetch