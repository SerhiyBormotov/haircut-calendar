import { Location } from "astronomy-bundle/earth/types/LocationTypes";

export interface ILocation {
  city: string;
  location: Location;
}

export const LOCATIONS: ILocation[] = [
  {
    city: "Київ",
    location: {
      lat: 50.45466,
      lon: 30.5238,
      elevation: 187,
    },
  },
  {
    city: "Дніпро",
    location: {
      lat: 48.464717,
      lon: 35.046183,
      elevation: 140,
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
  {
    city: "Варшава",
    location: {
      lat: 52.22977,
      lon: 21.01178,
      elevation: 113,
    },
  },
  {
    city: "Відень",
    location: {
      lat: 48.20849,
      lon: 16.37208,
      elevation: 193,
    },
  },
  {
    city: "Берлін",
    location: {
      lat: 52.52437,
      lon: 13.41053,
      elevation: 43,
    },
  },
  {
    city: "Франкфурт",
    location: {
      lat: 50.1105555,
      lon: 8.6822222,
      elevation: 112,
    },
  },
  {
    city: "Рим",
    location: {
      lat: 41.89193,
      lon: 12.51133,
      elevation: 52,
    },
  },
  {
    city: "Париж",
    location: {
      lat: 48.85341,
      lon: 2.3488,
      elevation: 42,
    },
  },
  {
    city: "Софія",
    location: {
      lat: 42.69751,
      lon: 23.32415,
      elevation: 562,
    },
  },
  {
    city: "Бухарест",
    location: {
      lat: 44.43225,
      lon: 26.10626,
      elevation: 562,
    },
  },
  {
    city: "Афіни",
    location: {
      lat: 37.97945,
      lon: 23.71622,
      elevation: 42,
    },
  },
  {
    city: "Анкара",
    location: {
      lat: 39.91987,
      lon: 32.85427,
      elevation: 874,
    },
  },
  {
    city: "Тбілісі",
    location: {
      lat: 41.69411,
      lon: 44.83368,
      elevation: 491,
    },
  },
  {
    city: "Єрусалим",
    location: {
      lat: 31.76904,
      lon: 35.21633,
      elevation: 786,
    },
  },
  {
    city: "Лондон",
    location: {
      lat: 51.50853,
      lon: -0.12574,
      elevation: 25,
    },
  },
  {
    city: "Мадрид",
    location: {
      lat: 40.4165,
      lon: -3.70256,
      elevation: 665,
    },
  },
  {
    city: "Лісабон",
    location: {
      lat: 38.71667,
      lon: -9.13333,
      elevation: 45,
    },
  },
  {
    city: "Стокгольм",
    location: {
      lat: 59.33258,
      lon: 18.0649,
      elevation: 28,
    },
  },
  {
    city: "Рига",
    location: {
      lat: 56.946,
      lon: 24.10589,
      elevation: 6,
    },
  },
];
