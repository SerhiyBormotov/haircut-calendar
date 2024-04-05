import { Instance, types } from "mobx-state-tree";

export const AuspiciousCriteriaModel = types.model({
  auspicious: types.boolean,
  title: types.string,
  description: types.string,
});

export interface IAuspiciousCriteriaModel
  extends Instance<typeof AuspiciousCriteriaModel> {}
