import { Instance, types } from "mobx-state-tree";

export const LocationModel = types.model({
  lat: types.number,
  lon: types.number,
  elevation: types.number,
});

export type ILocationModel = Instance<typeof LocationModel>;
