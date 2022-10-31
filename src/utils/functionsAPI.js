export const getExchangeRates = async () => {
  return await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      };
      return resp.json();
    })
    .catch(err => console.log(err));
};