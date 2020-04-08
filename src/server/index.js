import { timeout } from "async";

import { getData } from "./data";

let quotes = getData();

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function getAllQuotes() {
  return quotes;
};

export async function addQuote(quote) {
  quote = { ...quote, id: uuidv4() };
  quotes = [quote, ...quotes];

  return quote;
};

export async function deleteQuote(id) {
  quotes = quotes.filter(val => {
    return val.id !== id;
  });

  return {
    status: 200,
    message: `Success deleting quote with id=${id}`
  };
};

export async function updateQuote(quote) {
  let idx = quotes.findIndex(val => {
    return val.id === quote.id;
  });

  quotes[idx] = quote;
}