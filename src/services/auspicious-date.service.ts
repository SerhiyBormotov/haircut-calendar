import { IMoonDate } from "./moon-calendar.service";
import {
  auspiciousMoonDays,
  auspiciousMoonSigns,
} from "../static-data/auspicious-days";
import { ZodiacString } from "../static-data/zodiac";
import { toSimpleTimeString } from "../utils/date-transform";

export const enum ConditionType {
  BEFORE = "до",
  AFTER = "з",
  NEXT_ONLY = "наступний",
  CURRENT_ONLY = "поточний",
  BOTH = "поточний і наступний",
}

export interface ICondition {
  type: ConditionType;
  date?: Date;
}
export interface IAuspiciousCheck {
  auspicious: boolean;
  condition?: ICondition | string;
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

  public isAuspiciousDate(date: IMoonDate): IAuspiciousCheck {
    const result: IAuspiciousCheck = {
      auspicious: false,
    };

    if (date.isSunday) {
      return result;
    }

    const nextDay = this.getNextMoonDay(date.day);
    const isCurrentDayAuspicious = this.checkAuspiciousMoonDay(date.day);
    const isNextDayAuspicious = this.checkAuspiciousMoonDay(nextDay);

    const moonDayAuspicious = this.getAuspiciousWithTransition(
      isCurrentDayAuspicious,
      isNextDayAuspicious,
      date.nextDayStart,
    );

    if (!moonDayAuspicious.auspicious) {
      return result;
    }

    const nextSign = this.getNextSign(date.sign);
    const isCurrentSignAuspicious = this.checkAuspiciousMoonSign(date.sign);
    const isNextSignAuspicious = this.checkAuspiciousMoonSign(nextSign);

    const moonSignAuspicious = this.getAuspiciousWithTransition(
      isCurrentSignAuspicious,
      isNextSignAuspicious,
      date.signChange,
    );

    if (!moonSignAuspicious.auspicious) {
      return result;
    }

    let condition: string;
    try {
      condition = this.constructConditionString([
        moonSignAuspicious.condition as ICondition,
        moonDayAuspicious.condition as ICondition,
      ]);

      if (condition) {
        result.condition = condition;
      }
    } catch (e) {
      return result; //auspicious: false
    }

    result.auspicious = true;
    result.details = this.constructDetails(
      date,
      moonDayAuspicious.condition as ICondition,
      moonSignAuspicious.condition as ICondition,
    );

    return result;
  }

  public getAuspiciousDetails(date: IMoonDate): IAuspiciousCriteria[] {
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
    const nextSign = this.getNextSign(date.sign);
    auspiciousMoonSigns.forEach((item) => {
      if (item.num === date.sign) {
        result.push({
          auspicious: item.auspicious,
          title: `Місяць у знаку - ${ZodiacString[date.sign]} ${
            date.signChange ? `(до ${toSimpleTimeString(date.signChange)})` : ""
          }`,
          description:
            item.description ||
            `${item.auspicious ? "Сприятливий" : "Несприятливий"} знак для стрижки`,
        });
      }

      if (date.signChange && item.num === nextSign) {
        result.push({
          auspicious: item.auspicious,
          title: `Місяць у знаку - ${ZodiacString[item.num]} (після ${toSimpleTimeString(date.signChange)})`,
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

  public getNextSign(sign: number): number {
    return sign + 1 <= 11 ? sign + 1 : 0;
  }

  private getAuspiciousWithTransition(
    isCurrentAuspicious: boolean,
    isNextAuspicious: boolean,
    changeDate: Date | null,
  ): IAuspiciousCheck {
    const changeHours = changeDate?.getHours();

    if (!changeHours || changeHours > this.MAX_REASONABLE_HOUR) {
      return {
        auspicious: isCurrentAuspicious,
        condition: {
          type: ConditionType.CURRENT_ONLY,
        },
      };
    }

    if (changeHours < this.MIN_REASONABLE_HOUR) {
      return {
        auspicious: isNextAuspicious,
        condition: {
          type: ConditionType.NEXT_ONLY,
        },
      };
    }

    if (!isCurrentAuspicious && !isNextAuspicious) {
      return {
        auspicious: false,
      };
    }

    const result: IAuspiciousCheck = {
      auspicious: true,
    };

    if (isCurrentAuspicious && !isNextAuspicious) {
      result.condition = { type: ConditionType.BEFORE, date: changeDate };
    } else if (!isCurrentAuspicious && isNextAuspicious) {
      result.condition = { type: ConditionType.AFTER, date: changeDate };
    } else if (isCurrentAuspicious && isNextAuspicious) {
      result.condition = { type: ConditionType.BOTH };
    }

    return result;
  }

  private constructDetails(
    moonDate: IMoonDate,
    moonDayAuspiciousCondition: ICondition,
    moonSignAuspiciousCondition: ICondition,
  ): string[] {
    let moonDays: number[], signs: number[];

    if (moonDayAuspiciousCondition.type === ConditionType.BOTH) {
      moonDays = [moonDate.day, this.getNextMoonDay(moonDate.day)];
    } else if (
      moonDayAuspiciousCondition.type === ConditionType.NEXT_ONLY ||
      moonDayAuspiciousCondition.type === ConditionType.AFTER
    ) {
      moonDays = [this.getNextMoonDay(moonDate.day)];
    } else {
      moonDays = [moonDate.day];
    }

    if (moonSignAuspiciousCondition.type === ConditionType.BOTH) {
      signs = [moonDate.sign, this.getNextSign(moonDate.sign)];
    } else if (
      moonSignAuspiciousCondition.type === ConditionType.NEXT_ONLY ||
      moonSignAuspiciousCondition.type === ConditionType.AFTER
    ) {
      signs = [this.getNextSign(moonDate.sign)];
    } else {
      signs = [moonDate.sign];
    }

    const result: string[] = [];
    result.push(`Місячний день: ${moonDays.join(" - ")}`);
    result.push(
      `Місяць у знаку: ${signs.map((item) => ZodiacString[item]).join(" - ")}`,
    );
    return result;
  }

  public constructConditionString(
    conditions: (ICondition | undefined)[],
  ): string {
    const valuableConditions = conditions.filter(
      (item) =>
        item?.type === ConditionType.AFTER ||
        item?.type === ConditionType.BEFORE,
    );

    if (valuableConditions.length === 0) {
      return "";
    }

    if (valuableConditions.length === 1) {
      return `${valuableConditions[0].type} ${toSimpleTimeString(valuableConditions[0].date)}`;
    }

    const maxAfterDate = valuableConditions
      .filter((item) => item.type === ConditionType.AFTER)
      .map((item) => item.date)
      .sort()
      .pop();

    const minBeforeDate = valuableConditions
      .filter((item) => item.type === ConditionType.BEFORE)
      .map((item) => item.date)
      .sort()[0];

    if (minBeforeDate <= maxAfterDate) {
      throw new Error("No conditions intersection");
    }
    const result: string[] = [];

    if (maxAfterDate) {
      result.push(`${ConditionType.AFTER} ${toSimpleTimeString(maxAfterDate)}`);
    }

    if (minBeforeDate) {
      result.push(
        `${ConditionType.BEFORE} ${toSimpleTimeString(minBeforeDate)}`,
      );
    }

    return result.join(" - ");
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
}
