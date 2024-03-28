import { Location } from "astronomy-bundle/earth/types/LocationTypes";
import { LOCATIONS } from "../static-data/locations";

export const getLocationByCity = (city: string): Location => {
  return LOCATIONS.find((item) => item.city === city).location;
};
