export const requestApiTrivia = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
};

export const requestQuestion = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  const data = await response.json();
  return data;
};
