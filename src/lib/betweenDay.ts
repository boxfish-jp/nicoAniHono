const betweenDay = (date: Date) => {
  let startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0
  );
  let endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );
  return [
    startOfDay.toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" }),
    endOfDay.toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" }),
  ];
};

export default betweenDay;
