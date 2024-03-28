import { types } from "mobx-state-tree";
import { LocationModel } from "./models/Location";
import { Location } from "astronomy-bundle/earth/types/LocationTypes";

export const SettingsStore = types
  .model({
    city: types.string,
    location: types.maybeNull(LocationModel),
  })
  .actions((self) => ({
    update(data: Partial<ISettings>) {
      data.city && (self.city = data.city);
      data.location && (self.location = data.location);
    },
  }));

export interface ISettings {
  city: string;
  location: Location;
}
