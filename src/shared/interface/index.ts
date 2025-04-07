export interface IResponseObject<T> {
  isError: boolean;
  message: string;
  data: T;
}

export interface ISortData {
  orderBy?: string;
  orderType?: OrderType;
}

export enum OrderType {
  ASC = "ASC",
  DESC = "DESC"
}

export interface IPage {
  pageNumber: number;
  pageSize: number;
}

export interface IDropdownOptions {
  label: string;
  value: string;
  id?: string | number;
  disabled?: boolean;
}

export interface IUserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
