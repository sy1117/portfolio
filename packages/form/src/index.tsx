import React, { useEffect, FormHTMLAttributes, FormEvent, Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import { refine } from "src/module/FormData";
import Field, { IField, TField, TCompositionField } from "./Field";
// import FieldArray, { IFieldArray } from "./compositionField/FieldArray";
// import FieldContent from "./compositionField/FieldContent/FieldContent";
// import FieldImage from "./compositionField/FieldImage";
// import FieldRadioGroup from "./compositionField/FieldRadioGroup";
import generateErrorMessage from "./generateErrorMessage";

export type TFormMode = "create" | "read" | "update";

export interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  mode?: TFormMode;
  validate?: "onSubmit" | "onChange" | "onBlur" | "all";
  fields: Array<IField<any>>;//| IFieldArray>;
  compareFields?: string[];
  data?: object;
  onChange?: (
    e: FormEvent<HTMLFormElement>,
    values?: any,
    errors?: any
  ) => void;
  onSubmit: (data: any) => void;
  forceDirtyFields?: Array<string>;
}

export const FormController: React.FC<IForm> = ({
  mode = "create",
  validate = "onSubmit",
  data,
  compareFields,
  fields,
  onChange,
  onSubmit,
  children,
  forceDirtyFields,
  ...props
}) => {
  const methods = useForm({ defaultValues: data, mode: validate as "onSubmit" });
  useEffect(() => {
    methods.reset(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    formState: { dirtyFields },
    getValues,
    errors,
  } = methods;

  const getComponent = (type: TField | TField[] | TCompositionField) => {
    // if (typeof type === "object" || Array.isArray(type)) return FieldArray;

    switch (type) {
      // case "content":
      //   return FieldContent;
      // case "image":
      //   return FieldImage;
      // case "radiogroup":
      //   return FieldRadioGroup;
      default:
        return Field;
    }
  };

  const onChangeHandler = (e: FormEvent<HTMLFormElement>) => {
    let errorFields: any = {};
    if (onChange) {
      Object.keys(errors).forEach((key) => {
        errorFields[key] = {};
      });
      onChange(e, getValues(), errorFields);
    }
  };

  const submitHandler = (data: any) => {
    // data = refine(data);

    if (mode === "create") onSubmit(data);
    else {
      let editedData: any = {};
      Object.keys(dirtyFields).forEach((key) => {
        editedData[key] = data[key];
      });

      (forceDirtyFields || []).forEach((forceDirtyField) => {
        editedData[forceDirtyField] = data[forceDirtyField];
      });

      /**
       * 삭제 시, 변경 사항 표시 안되서 일단 리스트는 다 보냄
       */
      //@ts-ignore
      for (let key of methods.control.fieldArrayNamesRef.current) {
        editedData[key] = data[key];
      }
      onSubmit(editedData);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler)}
        onChange={onChangeHandler}
        {...props}
      >
        {fields.map((field, idx) => {
          const { type, rules, label, placeholder, name } = field;
          const FieldComponent = getComponent(type);
          field.rules = generateErrorMessage(
            label || placeholder || "",
            name,
            rules || {}
          );
          if (field.hiddenIf && field.hiddenIf.indexOf(mode) > -1) {
            return <Fragment></Fragment>;
          }

          field.props = {
            ...field.props,
            readOnly:
              mode === "read" ||
              (field.readOnlyIf && field.readOnlyIf.indexOf(mode) > -1),
          };

          return <FieldComponent {...field} key={idx} />;
        })}
        {children}
      </form>
    </FormProvider>
  );
};

export default FormController;
