import { db } from "src/firebase";

export const updateCurrenciesData = async (currency) => {
  if (!currency || !currency.name || !currency.id || !currency.rate) {
    return new Promise((_, rej) => {
      rej('Wrong data', currency);
    })
  }
  
  try {
    return db
      .collection('currencies')
      .doc(currency.id)
      .update({
        name: currency.name,
        rate: currency.rate
      });
  } catch (err) {
    return console.log(err);
  }
}