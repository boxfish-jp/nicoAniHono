const betweenDay = (date: Date, loose: string | undefined) => {
  let beforeDay : Date;
  switch (loose) {
    case undefined:
      beforeDay = new Date(date.getTime() - 24 * 60 * 60 * 1000)
      break;
    case "strict":
      beforeDay = new Date(date.getTime() - 23 * 60 * 60 * 1000);
      break;
    default:
      beforeDay = new Date(date.getTime() - 30 * 60 * 60 * 1000);
      break;
  }
  return [
    beforeDay.toLocaleString("sv-SE", { timeZone: "UTC" }),
    date.toLocaleString("sv-SE", { timeZone: "UTC" }),
  ];
};

export default betweenDay;
