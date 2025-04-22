import { format, parseISO, isValid, differenceInHours } from "date-fns";

export const formatDate = (date: string | Date, formatString: string = "PP"): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "Invalid date";
    return format(dateObj, formatString);
  } catch (error) {
    return "Invalid date";
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, "PPp");
};

export const getHoursSince = (date: string | Date): number => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return 0;
    return differenceInHours(new Date(), dateObj);
  } catch (error) {
    return 0;
  }
};

export const isReportDelayed = (bookingDate: string): boolean => {
  return getHoursSince(bookingDate) >= 12;
};