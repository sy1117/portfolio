import React, { FormHTMLAttributes, FormEvent } from "react";
import { IField } from "./Field";
export declare type TFormMode = "create" | "read" | "update";
export interface IForm extends FormHTMLAttributes<HTMLFormElement> {
    mode?: TFormMode;
    validate?: "onSubmit" | "onChange" | "onBlur" | "all";
    fields: Array<IField<any>>;
    compareFields?: string[];
    data?: object;
    onChange?: (e: FormEvent<HTMLFormElement>, values?: any, errors?: any) => void;
    onSubmit: (data: any) => void;
    forceDirtyFields?: Array<string>;
}
export declare const FormController: React.FC<IForm>;
export default FormController;
