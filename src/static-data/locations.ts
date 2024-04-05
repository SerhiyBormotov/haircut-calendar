import { Location } from "astronomy-bundle/earth/types/LocationTypes";

export interface ILocation {
  city: string;
  location: Location;
}

export const LOCATIONS: ILocation[] = [
  {
    city: "Дніпро",
    location: {
      lat: 48.464717,
      lon: 35.046183,
      elevation: 140,
    },
  },
  {
    city: "Київ",
    location: {
      lat: 50.45466,
      lon: 30.5238,
      elevation: 187,
    },
  },
  {
    city: "Одеса",
    location: {
      lat: 46.47747,
      lon: 30.73262,
      elevation: 30,
    },
  },
  {
    city: "Харків",
    location: {
      lat: 49.98081,
      lon: 36.25272,
      elevation: 113,
    },
  },
  {
    city: "Львів",
    location: {
      lat: 49.83826,
      lon: 24.02324,
      elevation: 284,
    },
  },
];
