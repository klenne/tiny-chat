const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const formatTime = (date: Date): string => {
  return formatter.format(date);
};

export { formatTime };
