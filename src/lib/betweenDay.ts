const betweenDay = (date: Date) => {
  let beforeDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  return [
    beforeDay.toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" }),
    date.toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" }),
  ];
};

export default betweenDay;
