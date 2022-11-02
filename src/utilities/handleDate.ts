export function handleDate(date: string) {
    const handleDate = date.split("/");
    const finalDate = handleDate[0] + "-" + handleDate[1] + "-" + handleDate[3];
    return parseInt(finalDate);
  }