import { db } from "src/firebase";

export const getCurrenciesData = async () => {
  const existingCurrencies = [];

  try {
    const snapshot = await db.collection("currencies").get();
    snapshot.forEach((doc) => {
      existingCurrencies.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return existingCurrencies;
  } catch (err) {
    return console.log(err);
  }
};
