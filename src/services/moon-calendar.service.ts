import { Location } from "astronomy-bundle/earth/types/LocationTypes";
import { createMoon } from "astronomy-bundle/moon";
import { createTimeOfInterest } from "astronomy-bundle/time";
import TimeOfInterest from "astronomy-bundle/time/TimeOfInterest";

export interface IMoonDate {
  day: number;
  sign: number;
  isSunday: boolean;
  nextDayStart?: Date;
  signChange?: Date;
}

export class MoonCalendar {
  constructor(private location: Location) {}

  async getMoonDate(date: Date): Promise<IMoonDate> {
    const toi = createTimeOfInterest.fromDate(this.normilizeDate(date));
    const moon = createMoon(toi);
    const jd = toi.getJulianDay();

    //calculate moon's age in days
    const age = Math.ceil(
      this.getDecimal((jd - 2451550.1) / 29.530588853) * 29.53,
    );

    //get zodiac sign
    const sign = await this.getSignByDate(this.normilizeDate(date));

    const result: IMoonDate = {
      day: age,
      sign,
      isSunday: date.getDay() === 0,
    };

    // get time of the next moonrise
    let toiMoonRise: TimeOfInterest | null = null;
    try {
      toiMoonRise = await moon.getRise(this.location);
    } catch (e) {
      console.log(e.message);
    }
    const nextMoonRise = this.toiToLocalTime(toiMoonRise);
    if (nextMoonRise?.getDate() === date.getDate()) {
      result.nextDayStart = nextMoonRise;
    }

    //get time of the moon sign change
    const signChange = await this.getSignChangeTime(this.normilizeDate(date));
    if (signChange) {
      result.signChange = signChange;
    }

    return result;
  }

  private getDecimal(v: number) {
    v = v - Math.floor(v);
    if (v < 0) {
      v = v + 1;
    }
    return v;
  }

  private toiToLocalTime(toi: TimeOfInterest | null): Date | null {
    if (!toi) {
      return null;
    }

    const dateUTC = new Date(toi.getString());
    return this.UTCToLocalTime(dateUTC);
  }

  private UTCToLocalTime(dateUTC: Date): Date {
    const timeZoneOffset = new Date().getTimezoneOffset();
    const localTime = new Date(dateUTC.toISOString());

    localTime.setMinutes(localTime.getMinutes() - timeZoneOffset);

    return localTime;
  }

  private async getSignChangeTime(
    date: Date,
    endDate?: Date,
  ): Promise<Date | null> {
    const PRECISION = 1000 * 60 * 5;
    if (!endDate) {
      endDate = this.normilizeDate(date, 24);
    }

    const signStart = await this.getSignByDate(date);
    const signEnd = await this.getSignByDate(endDate);

    if (signStart === signEnd) {
      return null;
    } else if (endDate.getTime() - date.getTime() <= PRECISION) {
      return date;
    } else {
      const midDate = new Date(
        date.getTime() + (endDate.getTime() - date.getTime()) / 2,
      );
      const signMid = await this.getSignByDate(midDate);

      if (signMid === signStart) {
        return await this.getSignChangeTime(midDate, endDate);
      } else {
        return await this.getSignChangeTime(date, midDate);
      }
    }
  }

  private async getSignByDate(date: Date): Promise<number> {
    const toi = createTimeOfInterest.fromDate(date);
    const moon = createMoon(toi);
    const { lon } = await moon.getGeocentricEclipticSphericalDateCoordinates();
    return Math.floor(lon / 30);
    // let result: number = 0;

    // if (lon < 51.16 && lon > 33.18) {
    //   result = 1;
    // } else if (lon < 93.44) {
    //   result = 2;
    // } else if (lon < 119.48) {
    //   result = 3;
    // } else if (lon < 135.3) {
    //   result = 4;
    // } else if (lon < 173.34) {
    //   result = 5;
    // } else if (lon < 224.17) {
    //   result = 6;
    // } else if (lon < 242.57) {
    //   result = 7;
    // } else if (lon < 271.26) {
    //   result = 8;
    // } else if (lon < 302.49) {
    //   result = 9;
    // } else if (lon < 311.72) {
    //   result = 10;
    // } else if (lon < 348.58) {
    //   result = 11;
    // }

    // return result;
  }

  private normilizeDate(date: Date, hours: number = 0) {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hours,
      ),
    );
  }
}
