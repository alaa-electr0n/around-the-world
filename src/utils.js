//1234567 => 1,234,567
export function formatNumber(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function setDatainLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDatafromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key) || []);
}
