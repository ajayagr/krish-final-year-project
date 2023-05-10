const dateFormat = Intl.DateTimeFormat("en-IN", { dateStyle: "short" });

export const formatDate = (date: string) =>
  dateFormat.format(new Date(date)).replace(/[\s/]/g, ".");
