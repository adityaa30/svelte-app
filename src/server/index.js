import { timeout } from "async";

import quotes from "./data";

export async function getAllQuotes() {
  // Wait for sometime
  await timeout(500);

  return quotes;
};