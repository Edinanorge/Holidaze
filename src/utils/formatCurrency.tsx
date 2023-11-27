export function formatCurrency(amount: number): string {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NOK",
    currencyDisplay: "symbol",
  }).format(amount);

  return formattedAmount;
}
