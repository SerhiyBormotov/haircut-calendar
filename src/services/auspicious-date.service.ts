import { IMoonDate } from "./moon-calendar.service";
import {
  auspiciousMoonDays,
  auspiciousMoonSigns,
} from "../static-data/auspicious-days";
import { ZodiacString } from "../static-data/zodiac";
import { toSimpleTimeString } from "../utils/date-transform";

export interface IAuspiciousCheck {
  auspicious: boolean;
  condition?: string;
  details?: string[];
}

export interface IAuspiciousCriteria {
  auspicious: boolean;
  title: string;
  description: string;
}

export class AuspiciousDateService {
  private MIN_REASONABLE_HOUR = 9;
  private MAX_REASONABLE_HOUR = 18;

  isAuspiciousDate(date: IMoonDate): IAuspiciousCheck {
    const result: IAuspiciousCheck = {
      auspicious: false,
    };

    if (date.isSunday || !this.checkAuspiciousMoonSign(date.sign)) {
      return result;
    }

    const nextDayStartHours = date.nextDayStart?.getHours();
    const nextDay = this.getNextMoonDay(date.day);
    const isCurrentDayAuspicious = this.checkAuspiciousMoonDay(date.day);
    const isNextDayAuspicious = this.checkAuspiciousMoonDay(nextDay);

    if (!isCurrentDayAuspicious && !isNextDayAuspicious) {
      return result;
    }

    if (!nextDayStartHours || nextDayStartHours > this.MAX_REASONABLE_HOUR) {
      result.auspicious = isCurrentDayAuspicious;
      result.details = this.constructDetails([date.day], date.sign);
    } else if (nextDayStartHours < this.MIN_REASONABLE_HOUR) {
      result.auspicious = isNextDayAuspicious;
      result.details = this.constructDetails([nextDay], date.sign);
    } else if (isCurrentDayAuspicious && !isNextDayAuspicious) {
      result.auspicious = true;
      result.condition = `до ${toSimpleTimeString(date.nextDayStart)}`;
      result.details = this.constructDetails([date.day], date.sign);
    } else if (!isCurrentDayAuspicious && isNextDayAuspicious) {
      result.auspicious = true;
      result.condition = `з ${toSimpleTimeString(date.nextDayStart)}`;
      result.details = this.constructDetails([nextDay], date.sign);
    } else if (isCurrentDayAuspicious && isNextDayAuspicious) {
      result.auspicious = true;
      result.details = this.constructDetails([date.day, nextDay], date.sign);
    }

    return result;
  }

  getAuspiciousDetails(date: IMoonDate): IAuspiciousCriteria[] {
    const result: IAuspiciousCriteria[] = [];

    //check if the day is Sunday
    if (date.isSunday) {
      result.push({
        auspicious: false,
        title: "Неділя",
        description: "Неділя - несприятливий день для стрижки",
      });
    }

    //check moon day
    const nextDay = this.getNextMoonDay(date.day);
    auspiciousMoonDays.forEach((item) => {
      if (item.num === date.day) {
        result.push({
          auspicious: item.auspicious,
          title: `${date.day}-й місячний день ${
            date.nextDayStart
              ? `(до ${toSimpleTimeString(date.nextDayStart)})`
              : ""
          }`,
          description:
            item.description ||
            `${item.auspicious ? "Сприятливий" : "Несприятливий"} день для стрижки`,
        });
      }

      if (date.nextDayStart && item.num === nextDay) {
        result.push({
          auspicious: item.auspicious,
          title: `${item.num}-й місячний день (після ${toSimpleTimeString(date.nextDayStart)})`,
          description:
            item.description ||
            `${item.auspicious ? "Сприятливий" : "Несприятливий"} день для стрижки`,
        });
      }
    });

    //check zodiac sign
    auspiciousMoonSigns.forEach((item) => {
      if (item.num === date.sign) {
        result.push({
          auspicious: item.auspicious,
          title: `Місяць у знаку - ${ZodiacString[date.sign]}`,
          description:
            item.description ||
            `${item.auspicious ? "Сприятливий" : "Несприятливий"} знак для стрижки`,
        });
      }
    });

    return result;
  }

  public getNextMoonDay(day: number): number {
    return day + 1 <= 30 ? day + 1 : 1;
  }

  private checkAuspiciousMoonDay(moonDay: number): boolean {
    return auspiciousMoonDays.some(
      (item) => item.num === moonDay && item.auspicious === true,
    );
  }

  private checkAuspiciousMoonSign(signNumber: number): boolean {
    return auspiciousMoonSigns.some(
      (item) => item.num === signNumber && item.auspicious === true,
    );
  }

  private constructDetails(moonDays: number[], sign: number): string[] {
    const result: string[] = [];
    result.push(`Місячний день: ${moonDays.join("-")}`);
    result.push(`Місяць у знаку: ${ZodiacString[sign]}`);
    return result;
  }
}
