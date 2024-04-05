import {
  Instance,
  SnapshotOut,
  applySnapshot,
  onSnapshot,
  types,
} from "mobx-state-tree";
import { createContext, useContext } from "react";
import { AuspiciousDaysListStore } from "./auspiciousDaysList.store";
import { AuspiciousDetailsStore } from "./auspiciousDetails.store";
import { SettingsStore } from "./settings.store";
import storage from "../storage/storage";

const ROOT_STORE_KEY = "root-store";

//Root store model
const RootStore = types
  .model({
    auspiciousDaysList: AuspiciousDaysListStore,
    auspiciousDetails: AuspiciousDetailsStore,
    settings: SettingsStore,
  })
  .actions((self) => ({
    /** Reset entire MST structure */
    reset: () => {
      applySnapshot(self, initialData);
      storage.remove({ key: ROOT_STORE_KEY });
    },
  }));
export interface IRootStore extends Instance<typeof RootStore> {}
export interface IRootStoreSnapshot extends SnapshotOut<typeof RootStore> {}

const initialData: IRootStoreSnapshot = {
  auspiciousDaysList: {
    isPending: false,
    list: [],
  },
  auspiciousDetails: {
    criteria: [],
    date: NaN,
    isPending: true,
    moonDays: [],
    moonSign: NaN,
  },
  settings: {
    city: "",
    location: null,
  },
};

//Root store context provider
const RootStoreContext = createContext<null | IRootStore>(null);
export const { Provider } = RootStoreContext;

/**
 * Root store hook
 * */
export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }

  return store;
}

/**
 * Root store Initial setup
 */
export const setupStore = async () => {
  let data: IRootStoreSnapshot;
  let rootStore: IRootStore;

  try {
    data = (await storage.load({ key: ROOT_STORE_KEY })) || initialData;
    rootStore = RootStore.create(data);
  } catch (error) {
    rootStore = RootStore.create(initialData);
  }

  onSnapshot(rootStore, (snapshot) => {
    storage.save({ key: ROOT_STORE_KEY, data: snapshot });
  });

  return rootStore;
};
