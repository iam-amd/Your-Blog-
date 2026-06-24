// Returns today's date as an ISO yyyy-mm-dd string.
export function today() {
  return new Date().toISOString().slice(0, 10);
}
