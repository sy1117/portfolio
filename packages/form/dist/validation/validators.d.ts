import { TField } from "../Field";
export declare const equal: (control: any, _: TField, { name, message }: any) => (value: any) => any;
export declare const notEqual: (control: any, _: TField, { name, message }: any) => (value: any) => any;
export declare const greaterThan: (control: any, type: TField, { name, message }: any) => (value: any) => any;
export declare const greaterThanOrEqual: (control: any, type: TField, { name, message }: any) => (value: any) => any;
export declare const lessThan: (control: any, type: TField, { name, message }: any) => (value: any) => any;
export declare const lessThanOrEqual: (control: any, type: TField, { name, message }: any) => (value: any) => any;
