export const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const requestAPI = async (endpoint) => {
  try {
    const request = await fetch(endpoint);
    return await request.json();
  } catch (e) {
    throw new Error(e);
  }
};
