import React from "react";
import { RegisterOptions } from "react-hook-form";
import { TFormMode } from "./index";
export declare type TField = "text" | "password" | "date" | "hidden" | "email" | "number" | "checkbox" | "textarea" | "select";
export declare type TCompositionField = "image" | "radiogroup" | "content";
export declare const getComponent: (type: TField) => any;
export interface ValidationNameMessage {
    name: string;
    message: string;
}
export interface CustomValidationRules extends RegisterOptions {
    equal?: ValidationNameMessage;
    notEqual?: ValidationNameMessage;
    lessThan?: ValidationNameMessage;
    lessThanOrEqual?: ValidationNameMessage;
    greaterThan?: ValidationNameMessage;
    greaterThanOrEqual?: ValidationNameMessage;
}
export interface IField<T> {
    type: TField | TCompositionField | Array<TField> | any;
    name: keyof T & string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    required?: boolean;
    disabled?: boolean;
    readOnly?: true;
    value?: string | number | boolean;
    rules?: CustomValidationRules;
    props?: any;
    hiddenIf?: TFormMode[];
    readOnlyIf?: TFormMode[];
    className?: string;
}
export declare const Field: React.FC<IField<any>>;
export default Field;
