export function formatCurrency(amount: number): string {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NOK",
  }).format(amount);
  return formattedAmount;
}
