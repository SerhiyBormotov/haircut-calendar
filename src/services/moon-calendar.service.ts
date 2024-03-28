import { Location } from "astronomy-bundle/earth/types/LocationTypes";
import { createMoon } from "astronomy-bundle/moon";
import { createTimeOfInterest } from "astronomy-bundle/time";
import TimeOfInterest from "astronomy-bundle/time/TimeOfInterest";

export interface IMoonDate {
  day: number;
  sign: number;
  isSunday: boolean;
  nextDayStart?: Date;
}

export class MoonCalendar {
  constructor(private location: Location) {}

  async getMoonDate(date: Date): Promise<IMoonDate> {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const toi = createTimeOfInterest.fromTime(year, month, day, 12);
    const moon = createMoon(toi);
    const jd = toi.getJulianDay();

    //calculate moon's age in days
    const age = Math.ceil(
      this.getDecimal((jd - 2451550.1) / 29.530588853) * 29.53,
    );

    //get zodiac sign
    const { lon } = await moon.getGeocentricEclipticSphericalDateCoordinates();
    const sign = Math.floor(lon / 30);

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
    const nextMoonRise = this.convertToLocalTime(toiMoonRise);
    if (nextMoonRise?.getDate() === day) {
      result.nextDayStart = nextMoonRise;
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

  private convertToLocalTime(toi: TimeOfInterest | null): Date | null {
    if (!toi) {
      return null;
    }

    const timeZoneOffset = new Date().getTimezoneOffset();
    const localTime = new Date(toi.getString());

    localTime.setMinutes(localTime.getMinutes() - timeZoneOffset);

    return localTime;
  }
}
