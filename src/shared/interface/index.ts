export interface IResponseObject<T> {
  isError: boolean;
  message: string;
  data: T;
}

export interface ISortData {
  orderBy?: string;
  orderType?: OrderType;
}

export interface OrderType {
  ASC: "ASC";
  DESC: "DESC";
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
  id: string;
  username: string;
  email: string;
  name: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  token: string;
  country_code: string;
}
