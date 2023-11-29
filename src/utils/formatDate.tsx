export function formatDate(string: string) {
  //return string.slice(0, 10);
  const date = new Date(string);
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
}
