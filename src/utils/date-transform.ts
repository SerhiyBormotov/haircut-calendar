/**
 * Transform date to string. Format: dd / mm. Optional - include year to string
 */
export const toSimpleDateString = (
  date: Date,
  includeYear: boolean = false,
): string => {
  let result: string = "";

  try {
    result = `${formatNumber(date.getDate())} / ${formatNumber(date.getMonth() + 1)}${includeYear ? ` / ${date.getFullYear()}` : ""}`;
  } catch (e) {}

  return result;
};

/**
 * Transform date to time string. Format: HH:MM
 */
export const toSimpleTimeString = (date: Date): string => {
  let result: string = "";

  try {
    result = `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;
  } catch (e) {}

  return result;
};

/**
 * Converts number to two-character string, adds 0 if it is needed
 */
export const formatNumber = (num: number): string => {
  if (num > 9 || num < 0) {
    return num.toString();
  } else {
    return "0" + num.toFixed(0).toString();
  }
};
