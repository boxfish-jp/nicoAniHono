const betweenDay = (date: Date, loose: any) => {
  const beforeDay =
    loose != undefined
      ? new Date(date.getTime() - 30 * 60 * 60 * 1000)
      : new Date(date.getTime() - 24 * 60 * 60 * 1000);
  return [
    beforeDay.toLocaleString("sv-SE", { timeZone: "UTC" }),
    date.toLocaleString("sv-SE", { timeZone: "UTC" }),
  ];
};

export default betweenDay;
