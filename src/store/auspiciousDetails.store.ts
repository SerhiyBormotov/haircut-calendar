import { flow, getRoot, types } from "mobx-state-tree";
import { AuspiciousCriteriaModel } from "./models/AuspiciousCriteria";
import { IMoonDate, MoonCalendar } from "../services/moon-calendar.service";
import { AuspiciousDateService } from "../services/auspicious-date.service";
import { ISettings } from "./settings.store";

export const AuspiciousDetailsStore = types
  .model({
    isPending: types.boolean,
    criteria: types.array(AuspiciousCriteriaModel),
    moonDays: types.array(types.number),
    moonSigns: types.array(types.number),
    date: types.Date,
  })
  .actions((self) => {
    const getDateDetails = flow(function* () {
      self.isPending = true;
      self.criteria.clear();
      self.moonDays.clear();
      self.moonSigns.clear();

      const date = self.date;

      const { settings }: { settings: ISettings } = getRoot(self);
      const moonCalendar = new MoonCalendar(settings.location);
      const auspiciousDateService = new AuspiciousDateService();

      const moonDate: IMoonDate = yield moonCalendar.getMoonDate(date);

      self.moonDays.push(moonDate.day);
      if (moonDate.nextDayStart) {
        self.moonDays.push(auspiciousDateService.getNextMoonDay(moonDate.day));
      }

      self.moonSigns.push(moonDate.sign);
      if (moonDate.signChange) {
        self.moonSigns.push(auspiciousDateService.getNextSign(moonDate.sign));
      }

      self.criteria.push(
        ...auspiciousDateService.getAuspiciousDetails(moonDate),
      );

      self.isPending = false;
    });

    const setDate = (date: Date) => {
      self.isPending = true;
      self.date = date;
    };

    return {
      getDateDetails,
      setDate,
    };
  });
