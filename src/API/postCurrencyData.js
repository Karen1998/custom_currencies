import { db } from "src/firebase";

export const postCurrenciesData = async (currency) => {
  if (!currency || !currency.name || !currency.id || !currency.rate) {
    return new Promise((_, rej) => {
      rej("Wrong data", currency);
    });
  }

  try {
    return db.collection("currencies").add({
      id: currency.id,
      name: currency.name,
      rate: currency.rate,
    });
  } catch (err) {
    return console.log(err);
  }
};
