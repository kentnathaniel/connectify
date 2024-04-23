export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
  fullName: string;
};

export enum PopupType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}
