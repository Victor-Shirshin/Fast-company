export const displayDate = (created) => {
  const date = new Date(parseInt(created));
  const dateNow = new Date();
  const yearDifference = dateNow.getFullYear() - date.getFullYear();

  if (yearDifference === 0) {
    const dayDifference = dateNow.getDay() - date.getDay();
    if (dayDifference === 0) {
      const hoursDifference = dateNow.getHours() - date.getHours();
      if (hoursDifference === 0) {
        const minutesDifference = dateNow.getMinutes() - date.getMinutes();
        if (minutesDifference === 0 && minutesDifference <= 1) {
          return "1 минуту назад";
        } else if (minutesDifference > 1 && minutesDifference <= 5) {
          return "5 минут назад";
        } else if (minutesDifference > 5 && minutesDifference <= 10) {
          return "10 минут назад";
        } else if (minutesDifference > 10 && minutesDifference <= 30) {
          return "30 минут назад";
        }
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.getDate()}.${date.getMonth() + 1}`;
  }
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};