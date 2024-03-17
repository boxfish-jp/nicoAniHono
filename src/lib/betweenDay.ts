const betweenDay = (date: Date) => {
  let beforeDay = new Date(date.getTime() - 30 * 60 * 60 * 1000);
  return [
    beforeDay.toLocaleString("sv-SE", { timeZone: "UTC" }),
    date.toLocaleString("sv-SE", { timeZone: "UTC" }),
  ];
};

export default betweenDay;
