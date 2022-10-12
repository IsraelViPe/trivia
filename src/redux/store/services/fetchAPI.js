async function fetchAPI() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default fetchAPI;
