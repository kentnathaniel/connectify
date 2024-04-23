import { capitalize } from "lodash";

export const getFullName = (firstName: string = "", lastName: string = "") => {
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};
