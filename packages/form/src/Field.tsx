/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
// import {
//   Textarea,
//   Select,
//   ImageUploader2 as ImageUploader,
//   Checkbox,
// } from "@donation/admin-ui";
import generateErrorMessage from "./generateErrorMessage";
import { mixCustomValidate } from "./validation";
import { TFormMode } from "./index";

export type TField =
  | "text"
  | "password"
  | "date"
  | "hidden"
  | "email"
  | "number"
  | "checkbox"
  | "textarea"
  | "select";

const FieldMap: Record<Partial<TField>, any> = {
  text: forwardRef(({ ...props }: any, ref) => (
    <input type="text" {...props} ref={ref} />
  )),
  date: forwardRef(({ ...props }: any, ref) => (
    <input type="date" {...props} ref={ref} />
  )),
  password: forwardRef(({ ...props }: any, ref) => (
    <input type="password" {...props} ref={ref} />
  )),
  number: forwardRef(({ ...props }: any, ref) => (
    <input type="number" {...props} ref={ref} />
  )),
  hidden: forwardRef(({ ...props }: any, ref) => (
    <input type="hidden" {...props} ref={ref} />
  )),
  email: forwardRef(({ ...props }: any, ref) => (
    <input type="email" {...props} ref={ref} />
  )),
  checkbox: forwardRef(({ ...props }: any, ref) => (
    <input type="checkbox" {...props} ref={ref} />
  )),
  select: forwardRef(({ ...props }: any, ref) => (
    <select {...props} ref={ref} />
  )),
  textarea: forwardRef(({ ...props }: any, ref) => (
    <textarea {...props} ref={ref} />
  )),
};

export type TCompositionField = "image" | "radiogroup" | "content";

export const getComponent = (type: TField) => {
  return FieldMap[type];
};

// type StringKey<T> = keyof T & string;
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
  // rules?: CustomValidationRules<T>;
  rules?: CustomValidationRules;
  props?: any;
  hiddenIf?: TFormMode[];
  readOnlyIf?: TFormMode[];
  className?: string;
}

export const Field: React.FC<IField<any>> = ({
  name,
  rules,
  type,
  label,
  placeholder,
  props,
  className,
  ...extra
}) => {
  const { control, errors, register, getValues } = useFormContext();
  if (rules) {
    rules = generateErrorMessage(label || placeholder || "", name || "", rules);
    rules = mixCustomValidate(control, type, rules);
  }

  if (typeof type === "string") {
    let Component = getComponent(type as TField);

    if (name && type === "content") {
      props = {
        ...props,
        data: getValues(),
      };
    }

    if (name && errors[name]) {
      props = {
        ...props,
        error: true,
        helperText:
          errors[name] === "object" && Array.isArray(errors[name])
            ? errors[name]
            : errors[name]?.message,
      };
    }
    return (
      <Component
        ref={register(rules as any)}
        className={className}
        name={name}
        {...(label && { label })}
        {...(placeholder && { placeholder })}
        {...props}
        {...extra}
      />
    );
  } else {
    const Type = type;
    return (
      <Type
        name={name}
        label={label}
        data={getValues()}
        control={control}
        {...props}
        {...extra}
      />
    );
  }
};

export default Field;
