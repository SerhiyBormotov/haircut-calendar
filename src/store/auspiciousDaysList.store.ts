import { flow, getRoot, types } from "mobx-state-tree";
import {
  AuspiciousDayModel,
  IAuspiciousDaySnapshot,
} from "./models/AuspiciousDay";
import { AuspiciousDateService } from "../services/auspicious-date.service";
import { IMoonDate, MoonCalendar } from "../services/moon-calendar.service";
import { ISettings } from "./settings.store";

export const AuspiciousDaysListStore = types
  .model({
    isPending: types.boolean,
    list: types.array(AuspiciousDayModel),
  })
  .actions((self) => {
    const getNextMonthList = flow(function* () {
      self.isPending = true;
      self.list.clear();

      const { settings }: { settings: ISettings } = getRoot(self);
      const moonCalendar = new MoonCalendar(settings.location);
      const auspiciousDateService = new AuspiciousDateService();

      const startDate = new Date();
      const range = 30;
      const list: IAuspiciousDaySnapshot[] = [];

      for (let i = 0; i < range; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const moonDate: IMoonDate = yield moonCalendar.getMoonDate(date);

        const auspiciousCheck =
          auspiciousDateService.isAuspiciousDate(moonDate);

        if (auspiciousCheck.auspicious) {
          list.push({
            date: date as unknown as number,
            condition: auspiciousCheck.condition,
            details: auspiciousCheck.details,
          });
        }
      }

      self.list.push(...list);
      self.isPending = false;
    });

    return {
      getNextMonthList,
    };
  });
