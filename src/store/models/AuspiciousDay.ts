import { Instance, types, SnapshotOut } from "mobx-state-tree";

export const AuspiciousDayModel = types.model({
  date: types.Date,
  condition: types.maybe(types.string),
  details: types.maybe(types.array(types.string)),
});

export interface IAuspiciousDayModel
  extends Instance<typeof AuspiciousDayModel> {}
export interface IAuspiciousDaySnapshot
  extends SnapshotOut<typeof AuspiciousDayModel> {}
