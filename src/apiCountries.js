const URL = "https://restcountries.com/v3.1";
// const URL = "https://restcountries.com/v3.1/all";
// https://restcountries.com/v3.1/alpha/de
//https://restcountries.com/v3.1/name/deutschland

export async function getCities() {
  const res = await fetch(`${URL}/all`);
  if (!res.ok) throw new Error("Error Fetching the Countries");
  const data = await res.json();
  return data;
}

export async function getCityByCode(code) {
  const res = await fetch(`${URL}/alpha/${code.toLowerCase()}`);
  if (!res.ok) throw new Error("Error Fetching the Country");
  const data = await res.json();
  return data[0];
}

export async function getCityByName(name) {
  const res = await fetch(`${URL}/name/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Error Fetching the Country");
  const data = await res.json();
  return data[0];
}
