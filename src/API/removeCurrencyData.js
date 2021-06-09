import { db } from "src/firebase";

export const removeCurrencyData = async (id) => {
  if (!id) {
    return new Promise((_, rej) => {
      rej('Wrong data');
    })
  }
  
  try {
    return db
      .collection('currencies')
      .doc(id)
      .delete();
  } catch (err) {
    return console.log(err);
  }
}