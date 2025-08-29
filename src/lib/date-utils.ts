import { format } from "date-fns";

export function formatTaskDate(date: string | Date | null | undefined): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "EEE, dd MMM yyyy");
  } catch {
    return "";
  }
}
