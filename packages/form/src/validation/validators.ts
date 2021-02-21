import { TField } from "../Field";
import moment from "moment";

export const equal = (control: any, _: TField, { name, message }: any) => (
  value: any
) => {
  let data = control.getValues();
  let compareValue = data[name];
  return value === compareValue || message;
};

export const notEqual = (control: any, _: TField, { name, message }: any) => (
  value: any
) => {
  let data = control.getValues();
  let compareValue = data[name];
  return value !== compareValue || message;
};

export const greaterThan = (
  control: any,
  type: TField,
  { name, message }: any
) => (value: any) => {
  let data = control.getValues();
  let compareValue = data[name];
  if (type === "date") {
    return moment(value).isAfter(compareValue) || message;
  } else {
    return parseInt(value) > compareValue || message;
  }
};

export const greaterThanOrEqual = (
  control: any,
  type: TField,
  { name, message }: any
) => (value: any) => {
  let data = control.getValues();
  let compareValue = data[name];
  if (type === "date") {
    return moment(value).isSameOrAfter(compareValue) || message;
  } else {
    return parseInt(value) >= compareValue || message;
  }
};

export const lessThan = (
  control: any,
  type: TField,
  { name, message }: any
) => (value: any) => {
  let data = control.getValues();
  let compareValue = data[name];
  if (type === "date") {
    return moment(value).isBefore(compareValue) || message;
  } else {
    return parseInt(value) < compareValue || message;
  }
};

export const lessThanOrEqual = (
  control: any,
  type: TField,
  { name, message }: any
) => (value: any) => {
  const data = control.getValues();
  const compareValue = data[name];
  if (type === "date") {
    const date = moment(value);
    return date.isSameOrBefore(compareValue) || message;
  } else {
    return parseInt(value) <= parseInt(compareValue) || message;
  }
};
